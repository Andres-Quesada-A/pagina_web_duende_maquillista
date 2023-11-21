--------------------------------------------------------------------------
-- Author:      Fabián Vargas
-- Date:        23-11-21
-- Description: List the details of a notification
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_Notifications_Details]
    @IN_notificationID INT
AS
BEGIN
    SET NOCOUNT ON;         -- No metadata returned

    -- ERROR HANDLING
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transactionBegun BIT = 0;

    -- VARIABLE DECLARATION
     

    BEGIN TRY

        -- VALIDATIONS
        IF NOT EXISTS (SELECT 1 FROM Notifications WHERE id = @IN_notificationID)
        BEGIN
            RAISERROR('No existe la notificación.', 16, 1);
        END

        SELECT 
            N.id AS NotificationID,
            N.categoryId AS CategoryID,
            N.title AS Title,
            N.description AS Description,
            N.timestamp AS Timestamp,
            N.moreDetailsURL AS MoreDetailsURL
        FROM Notifications N
        WHERE N.id = @IN_notificationID
        AND N.deleted = 0;

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