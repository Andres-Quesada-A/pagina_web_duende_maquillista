--------------------------------------------------------------------------
-- Author:      Fabián Vargas
-- Date:        23-10-12
-- Description: Retrieves a list of orders.
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_Orders_List]
AS
BEGIN
    SET NOCOUNT ON;         -- No metadata returned

    -- ERROR HANDLING
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transactionBegun BIT = 0;

    BEGIN TRY
        -- Retrieve order list
        SELECT 
            O.id AS OrderID,
            OS.description AS OrderStatus,
            U.id AS UserID,
            A.id AS AddressID,
            O.voucherImageUrl,
            O.timestamp,
            O.deleted
        FROM 
            Orders O
            INNER JOIN OrderStatuses OS ON O.orderStatusId = OS.id
            INNER JOIN Users U ON O.userId = U.id
            INNER JOIN Addresses A ON O.addressId = A.id
        WHERE 
            O.deleted = 0;

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
