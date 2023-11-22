--------------------------------------------------------------------------
-- Author:      Fabián Vargas
-- Date:        23-11-21
-- Description: Adds a notification
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_Notifications_Add]
    @IN_category VARCHAR(32),
    @IN_UserID INT,
    @IN_title VARCHAR(128),
    @IN_description VARCHAR(512),
    @IN_moreDetailsURL VARCHAR(512) = NULL

AS
BEGIN
    SET NOCOUNT ON;         -- No metadata returned

    -- ERROR HANDLING
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transactionBegun BIT = 0;

    -- VARIABLE DECLARATION
    DECLARE @CategoryID INT = NULL;

    BEGIN TRY

        -- VALIDATIONS

        -- select category id
        SELECT @CategoryID = id 
        FROM NotificationCategories 
        WHERE description = @IN_category;

        -- Verify if category exists
        IF @CategoryID IS NULL
        BEGIN
            RAISERROR('La categoría no existe.', 16, 1);
        END

        -- Verify if user exists
        IF NOT EXISTS (SELECT 1 FROM Users WHERE id = @IN_UserID)
        BEGIN
            RAISERROR('El usuario no existe.', 16, 1);
        END

        -- Verify if title is empty
        IF LTRIM(RTRIM(@IN_title)) = ''
        BEGIN
            RAISERROR('Debe proporcionar un título.', 16, 1);
        END

        -- Verify if description is empty
        IF LTRIM(RTRIM(@IN_description)) = ''
        BEGIN
            RAISERROR('Debe proporcionar una descripción.', 16, 1);
        END

        -- Verify if moreDetailsURL is empty
        IF LTRIM(RTRIM(@IN_moreDetailsURL)) = ''
        BEGIN
            RAISERROR('Debe proporcionar una URL.', 16, 1);
        END
        
        -- TRANSACTION BEGUN
        IF @@TRANCOUNT = 0
        BEGIN
            SET @transactionBegun = 1;
            BEGIN TRANSACTION;
        END;

        -- INSERT
        INSERT INTO Notifications (
            categoryId,
            userId,
            title,
            description,
            moreDetailsURL,
            timestamp,
            deleted
        )VALUES (
            @CategoryID,
            @IN_UserID,
            @IN_title,
            @IN_description,
            @IN_moreDetailsURL,
            GETUTCDATE(),
            0
        );

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