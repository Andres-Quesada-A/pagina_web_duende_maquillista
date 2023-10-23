-- Autor:       Andres Quesada
-- Fecha:       2023-10-14
-- Descripción: Procedure to add a user with email validation
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_Users_Add]
    -- Parameters
    @IN_name VARCHAR(32),
    @IN_lastName1 VARCHAR(32),
    @IN_lastName2 VARCHAR(32),
    @IN_email VARCHAR(128),
    @IN_password VARCHAR(64),
    @IN_token VARCHAR(300)
AS
BEGIN
    SET NOCOUNT ON; -- No metadata returned

    -- ERROR HANDLING
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transactionBegun BIT = 0;

    -- VARIABLE DECLARATION
    DECLARE @createdId INT = NULL;

    BEGIN TRY
        -- VALIDATIONS
        IF LTRIM(RTRIM(@IN_name)) = '' OR
           LTRIM(RTRIM(@IN_lastName1)) = '' OR
           LTRIM(RTRIM(@IN_lastName2)) = '' OR
           LTRIM(RTRIM(@IN_email)) = '' OR
           LTRIM(RTRIM(@IN_password)) = ''
        BEGIN
            RAISERROR('Todos los campos son obligatorios. Por favor, complete la información.', 16, 1);
        END;

        -- Check if the email is already registered
        IF EXISTS (SELECT 1 FROM [dbo].[Users] WHERE email = LTRIM(RTRIM(@IN_email)))
        BEGIN
            RAISERROR('El correo electrónico ya está registrado. Por favor, utilice otro correo.', 16, 1);
        END;

        -- TRANSACTION BEGUN
        IF @@TRANCOUNT = 0
        BEGIN
            SET @transactionBegun = 1;
            BEGIN TRANSACTION;
        END;

        -- INSERT USER
        INSERT INTO [dbo].[Users] (name, lastName1, lastName2, email, password, token, administrator, deleted)
        VALUES (
            LTRIM(RTRIM(@IN_name)),
            LTRIM(RTRIM(@IN_lastName1)),
            LTRIM(RTRIM(@IN_lastName2)),
            LTRIM(RTRIM(@IN_email)),
            LTRIM(RTRIM(@IN_password)),
            LTRIM(RTRIM(@IN_token)),
            0, 
            0-- Assuming a new user is not deleted
        );

        SET @createdId = SCOPE_IDENTITY();

        -- COMMIT TRANSACTION
        IF @transactionBegun = 1
        BEGIN
            COMMIT TRANSACTION;
        END;

        SELECT  [id],
                [name],
                [lastName1],
                [lastName2],
                [email],
                [password],
                [token],
                [administrator],
                [deleted]
        FROM [dbo].[Users]
        WHERE [id] = @createdId;

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
