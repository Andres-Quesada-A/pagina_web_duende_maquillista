-- Autor:       Andres Quesada
-- Fecha:       2023-10-14
-- Descripción: Procedimiento para editar un usuario
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_Users_Edit]
    -- Parameters
    @IN_userID INT NOT NULL,
    @IN_name VARCHAR(32) NOT NULL,
    @IN_lastName1 VARCHAR(32) NOT NULL,
    @IN_lastName2 VARCHAR(32) NOT NULL,
    @IN_email VARCHAR(128) NOT NULL,
    @IN_password VARCHAR(300) NOT NULL,
    @IN_token VARCHAR(300) NOT NULL
AS
BEGIN
    SET NOCOUNT ON; -- No metadata returned

    -- ERROR HANDLING
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transactionBegun BIT = 0;

    BEGIN TRY
        -- VALIDATIONS
        IF(LTRIM(RTRIM(@IN_name)) = '' OR LTRIM(RTRIM(@IN_lastName1)) = '' OR LTRIM(RTRIM(@IN_lastName2)) = '' OR LTRIM(RTRIM(@IN_email)) = '' OR LTRIM(RTRIM(@IN_password)) = '' OR LTRIM(RTRIM(@IN_token)) = '')
        BEGIN
            RAISEERROR('Todos los campos son obligatorios. Por favor, complete la información.', 16, 1);
        END;

        -- TRANSACTION BEGUN
        IF @@TRANCOUNT = 0
        BEGIN
            SET @transactionBegun = 1;
            BEGIN TRANSACTION;
        END;

        -- UPDATE USER
        UPDATE [dbo].[Users]
        SET
            name = LTRIM(RTRIM(@IN_name)),
            lastName1 = LTRIM(RTRIM(@IN_lastName1)),
            lastName2 = LTRIM(RTRIM(@IN_lastName2)),
            email = LTRIM(RTRIM(@IN_email)),
            password = LTRIM(RTRIM(@IN_password)),
            token = LTRIM(RTRIM(@IN_token))
        WHERE
            id = @IN_userID;

        -- COMMIT TRANSACTION
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

        RAISEERROR('%s - Error Number: %i', 
            @ErrorSeverity, @ErrorState, @Message, @ErrorNumber);
    END CATCH;
END;
