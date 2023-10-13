--------------------------------------------------------------------------
-- Author:      Fabián Vargas
-- Date:        23-10-12
-- Description: Updates the status of an order.
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_Order_Status]
    @OrderID INT,
    @NewStatusID INT
AS
BEGIN
    SET NOCOUNT ON;         -- No metadata returned

    -- ERROR HANDLING
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transactionBegun BIT = 0;

    BEGIN TRY

        -- VALIDATIONS

        -- Verify if order exists
        IF NOT EXISTS(
            SELECT 1
            FROM Orders O
            WHERE O.ID = @OrderID
                AND O.Deleted = 0
            )
        BEGIN
            RAISERROR('The indicated order does not exist %d.', 16, 1, @OrderID)
        END

        -- Verify if new status ID is valid
        IF NOT EXISTS(
            SELECT 1
            FROM OrderStatuses OS
            WHERE OS.ID = @NewStatusID
            )
        BEGIN
            RAISERROR('Invalid status ID %d.', 16, 1, @NewStatusID)
        END

        -- TRANSACTION BEGUN
        IF @@TRANCOUNT = 0
        BEGIN
            SET @transactionBegun = 1;
            BEGIN TRANSACTION;
        END;

        -- Update order status
        UPDATE Orders
        SET orderStatusId = @NewStatusID
        WHERE ID = @OrderID;

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
