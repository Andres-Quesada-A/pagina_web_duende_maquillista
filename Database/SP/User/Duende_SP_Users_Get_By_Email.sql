-- Autor:       Andres Quesada
-- Fecha:       2023-10-14
-- Descripción: Procedimiento para obtener un usuario por correo electrónico
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_Users_Get_By_Email]
    -- Parameters
    @IN_email VARCHAR(128) NOT NULL,
    @OUT_userID INT OUTPUT,
    @OUT_name VARCHAR(32) OUTPUT,
    @OUT_lastName1 VARCHAR(32) OUTPUT,
    @OUT_lastName2 VARCHAR(32) OUTPUT,
    @OUT_password VARCHAR(64) OUTPUT,
    @OUT_token VARCHAR(128) OUTPUT,
    @OUT_deleted BIT OUTPUT
AS
BEGIN
    SET NOCOUNT ON; -- No metadata returned

    -- ERROR HANDLING
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);

    BEGIN TRY
        -- TRANSACTION BEGUN (no es necesario para lectura)
        
        -- OBTENER USUARIO POR EMAIL
        SELECT TOP 1
            @OUT_userID = id,
            @OUT_name = name,
            @OUT_lastName1 = lastName1,
            @OUT_lastName2 = lastName2,
            @OUT_password = password,
            @OUT_token = token,
            @OUT_deleted = deleted
        FROM [dbo].[Users]
        WHERE email = LTRIM(RTRIM(@IN_email));

        -- COMMIT TRANSACTION (no es necesario para lectura)
    END TRY
    BEGIN CATCH
        SET @ErrorNumber = ERROR_NUMBER();
        SET @ErrorSeverity = ERROR_SEVERITY();
        SET @ErrorState = ERROR_STATE();
        SET @Message = ERROR_MESSAGE();

        IF @ErrorNumber != 50000
        BEGIN
            -- Non-custom errors son logged in the Errors table
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
