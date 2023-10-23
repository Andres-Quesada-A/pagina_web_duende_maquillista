--------------------------------------------------------------------------
-- Author:      Fabián Vargas
-- Date:        23-10-12
-- Description: Updates the status of an order.
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_Orders_Edit]
    @IN_OrderID INT,
    @IN_NewStatus VARCHAR(32)
AS
BEGIN
    SET NOCOUNT ON;         -- No metadata returned

    -- ERROR HANDLING
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transactionBegun BIT = 0;

    -- VARIABLE DECLARATION
    DECLARE @IN_NewStatusID INT= NULL;

    BEGIN TRY

        -- VALIDATIONS

        -- Verify if order exists
        IF NOT EXISTS(
            SELECT 1
            FROM Orders O
            WHERE O.ID = @IN_OrderID
                AND O.Deleted = 0
            )
        BEGIN
            RAISERROR('The indicated order does not exist %d.', 16, 1, @IN_OrderID)
        END

        SELECT @IN_NewStatusID = ID
        FROM OrderStatuses
        WHERE Description = @IN_NewStatus
        AND Deleted = 0

        -- Verify if new status ID is valid
        IF @IN_NewStatusID IS NULL
        BEGIN
            RAISERROR('Invalid status ID %d.', 16, 1, @IN_NewStatusID)
        END

        -- TRANSACTION BEGUN
        IF @@TRANCOUNT = 0
        BEGIN
            SET @transactionBegun = 1;
            BEGIN TRANSACTION;
        END;

        -- Update order status
        UPDATE Orders
        SET orderStatusId = @IN_NewStatusID
        WHERE ID = @IN_OrderID;

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
