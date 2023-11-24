--------------------------------------------------------------------------
-- Author:      Fabián Vargas
-- Date:        23-11-21
-- Description: List all notifications of a user
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_Notifications_List]
    @IN_userEmail VARCHAR(128)
AS
BEGIN
    SET NOCOUNT ON;
    -- No metadata returned

    -- ERROR HANDLING
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transactionBegun BIT = 0;

    -- VARIABLE DECLARATION


    BEGIN TRY

        IF @IN_userEmail IS NULL
        OR LTRIM(RTRIM(@IN_userEmail)) = ''
        BEGIN
        RAISERROR('Debe proporcionar un correo electrónico válido.', 16, 1);
    END

        SELECT
        N.id AS NotificationID,
        C.description AS Category,
        N.title AS Title,
        N.description AS Description,
        N.timestamp AS Timestamp,
        N.moreDetailsURL AS MoreDetailsURL,
        U.id as userId,
        U.name as userName,
        U.lastName1 as userLastName1,
        U.lastName2 as userLastName2,
        U.email as userEmail,
        U.password as userPassword,
        U.token as userToken
    FROM Notifications N
        INNER JOIN Users U ON N.userId = U.id
        INNER JOIN NotificationCategories C ON N.categoryId = C.id
    WHERE U.email = LTRIM(RTRIM(@IN_userEmail))
        AND N.deleted = 0
    ORDER BY N.timestamp DESC;

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