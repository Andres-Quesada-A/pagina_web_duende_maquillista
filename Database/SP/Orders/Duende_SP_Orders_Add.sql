--------------------------------------------------------------------------
-- Author:      Fabian Vargas
-- Date:        23-10-22
-- Description: Adds an order to the database
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_Orders_Add]
    @IN_Province VARCHAR(16),
    @IN_Canton VARCHAR(32),
    @IN_District VARCHAR(32),
    @IN_Address VARCHAR(128),
    @IN_ShippingFee MONEY,
    @IN_Products CartTVP READONLY,
    @IN_UserID INT,
    @IN_VoucherUrl VARCHAR(256) = NULL

AS
BEGIN
    SET NOCOUNT ON;         -- No metadata returned

    -- ERROR HANDLING
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transactionBegun BIT = 0;

    -- VARIABLE DECLARATION
    -- 

    BEGIN TRY

        -- VALIDATIONS

        -- Verify if province is valid
        IF LTRIM(RTRIM(@IN_Province)) = ''
        BEGIN
            RAISERROR('Provincia inválida.', 16, 1);
        END;

        -- Verify if canton is valid
        if LTRIM(RTRIM(@IN_Canton)) = ''
        BEGIN
            RAISERROR('Cantón inválido.', 16, 1);
        END;

        -- Verify if district is valid
        if LTRIM(RTRIM(@IN_District)) = ''
        BEGIN
            RAISERROR('Distrito inválido.', 16, 1);
        END;

        -- Verify if address is valid
        if LTRIM(RTRIM(@IN_Address)) = ''
        BEGIN
            RAISERROR('Dirección inválida.', 16, 1);
        END;

        -- Verify if shipping fee is valid
        IF @IN_ShippingFee < 0
        BEGIN
            RAISERROR('Costo de envío inválido.', 16, 1);
        END;

        -- Verify if user exists
        IF NOT EXISTS (
            SELECT 1
            FROM Users
            WHERE ID = @IN_UserID
                AND Deleted = 0
        )
        BEGIN
            RAISERROR('Usuario inválido.', 16, 1);
        END;

        -- Verify if voucher exists
        IF LTRIM(RTRIM(@IN_VoucherUrl)) = ''
        BEGIN
            RAISERROR('No se proporcionó el URL de una imagen del comprobante.', 16, 1);
        END;

        -- Verify if products are provided
        IF NOT EXISTS (
            SELECT 1 FROM @IN_Products
        )
        BEGIN
            RAISERROR('No hay productos en el carrito.', 16, 1);
        END;

        -- TRANSACTION BEGUN
        IF @@TRANCOUNT = 0
        BEGIN
            SET @transactionBegun = 1;
            BEGIN TRANSACTION;
        END;

        -- Add address
        INSERT INTO Addresses
        VALUES (
            @IN_Province,
            @IN_Canton,
            @IN_District,
            @IN_Address,
            @IN_ShippingFee
        );

        DECLARE @AddressID INT = SCOPE_IDENTITY();

        -- Add order
        INSERT INTO Orders
        VALUES (
            1,
            @IN_UserID,
            @AddressID,
            @IN_VoucherUrl,
            GETUTCDATE(),
            0
        );

        DECLARE @OrderID INT = SCOPE_IDENTITY();

        INSERT INTO OrderProducts (orderID, productID, amount)
        SELECT @OrderID, productId, amount
        FROM @IN_Products;

        -- TRANSACTION COMMITTED
        IF @transactionBegun = 1
        BEGIN
            COMMIT TRANSACTION;
        END;

    END TRY
    BEGIN CATCH

        SET @ErrorNumber = ERROR_NUMBER();
        SET @ErrorSeverity = ERROR_SEVERITY();
        SET @ErrorState = ERROR_STATE();
        SET @Message = ERROR_MESSAGE();

        IF @transactionBegun = 1
        BEGIN
            ROLLBACK;
        END;

        IF @ErrorNumber != 50000
        BEGIN
            -- Non-custom errors are logged in the Errors table
            INSERT INTO [dbo].[Errors]
            VALUES (
                SUSER_NAME(),
                ERROR_NUMBER(),
                ERROR_STATE(),
                ERROR_SEVERITY(),
                ERROR_LINE(),
                ERROR_PROCEDURE(),
                ERROR_MESSAGE(),
                GETUTCDATE()
            );
        END;

        RAISERROR('%s - Error Number: %i', 
            @ErrorSeverity, @ErrorState, @Message, @ErrorNumber);

    END CATCH;
END;