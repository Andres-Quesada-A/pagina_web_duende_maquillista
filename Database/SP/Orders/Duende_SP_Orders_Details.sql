--------------------------------------------------------------------------
-- Author:      Fabián Vargas
-- Date:        23-10-12
-- Description: Retrieves an order with product names and quantities.
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_Orders_Details]
    @IN_OrderID INT
AS
BEGIN
    SET NOCOUNT ON;         -- No metadata returned

    -- ERROR HANDLING
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transactionBegun BIT = 0;

    BEGIN TRY

        IF NOT EXISTS(
            SELECT 1 FROM Orders
            WHERE id = @IN_OrderID
                AND deleted = 0
        )
        BEGIN 
            RAISERROR('La orden no existe.', 16, 1)
        END
        
        -- Retrieve order with products
        SELECT 
            O.id AS OrderID,
            OS.description AS OrderStatus,
            U.id AS UserID,
            U.name as UserName,
            U.lastname1 AS UserLastname1,
            U.lastname2 AS UserLastname2,
            U.email AS UserEmail,
            U.password AS UserPassword,
            U.token AS UserToken,   
            A.specificAddress AS 'Address',
            A.province AS 'Province',
            A.canton AS 'Canton',
            A.district AS 'District',
            A.shippingFee AS 'ShippingFee',
            O.voucherImageUrl,
            O.timestamp,
            (
                SELECT P.id,
                    P.name,
                    P.description,
                    PC.Description as category,
                    P.price,
                    P.imageUrl,
                    P.weight,
                    P.available,
                    OP.amount
                    FROM Products P
                    INNER JOIN ProductCategories as PC ON P.categoryId = PC.id
                    INNER JOIN OrderProducts OP ON P.id = OP.productId
                    WHERE OP.orderId = O.id
                    FOR JSON PATH
            ) AS Products
            FROM Orders O
            INNER JOIN OrderStatuses OS ON O.orderStatusId = OS.id
            INNER JOIN Users U ON O.userId = U.id
            INNER JOIN Addresses A ON O.addressId = A.id
            WHERE O.id = @IN_OrderID
            AND O.deleted = 0;

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
