--------------------------------------------------------------------------
-- Author:      Fabián Vargas
-- Date:        23-10-11
-- Description: Deletes an image
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_Image_Delete]
    @IN_ImageID INT
AS
BEGIN
    SET NOCOUNT ON;
    -- No metadata returned

    -- ERROR HANDLING
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transactionBegun BIT = 0;

    -- VARIABLE DECLARATION
    -- 

    BEGIN TRY

        -- VALIDATIONS
        
        -- Verify exists
        IF NOT EXISTS(
            SELECT 1
            FROM Images I
            WHERE I.ID = @IN_ImageID
                AND I.Deleted = 0
                )
        BEGIN
            RAISERROR('The indicated image does not exist %d.', 16, 1, @IN_ImageID)
        END

        -- TRANSACTION BEGUN
        IF @@TRANCOUNT = 0
        BEGIN
        SET @transactionBegun = 1;
        BEGIN TRANSACTION;
    END;

        UPDATE Image
        SET Deleted = 1
        WHERE ID = @IN_ImageID

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
        VALUES
            (
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