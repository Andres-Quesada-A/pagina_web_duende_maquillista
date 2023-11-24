--------------------------------------------------------------------------
-- Autor:       Luis Fernando Molina
-- Fecha:       2023-11-20
-- Descripci�n: Deletion of an Event
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_Events_Delete]
    -- Parameters
	@IN_eventId INT = NULL,
    @IN_orderID INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Errors control
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transactionBegun BIT = 0;

    -- Variables declaration

    BEGIN TRY
        -- Validations

        -- Verify parameters
        IF @IN_eventId IS NULL AND @IN_orderID IS NULL
        BEGIN
            RAISERROR('Debe ingresar un evento o una orden.', 16, 1)
        END

        IF @IN_eventId IS NOT NULL AND @IN_orderID IS NOT NULL
        BEGIN
            RAISERROR('Debe ingresar un evento o una orden, no ambos.', 16, 1)
        END

        -- Verify exists
        IF @IN_eventId IS NULL
        BEGIN
            IF NOT EXISTS(
                SELECT 1
                FROM [dbo].[Events] E
                WHERE E.orderId = @IN_orderID
                    AND E.Deleted = 0
                    )
            BEGIN
                RAISERROR('El evento no existe.', 16, 1)
            END
        END

        IF @IN_orderID IS NULL
        BEGIN
            IF NOT EXISTS(
                SELECT 1
                FROM [dbo].[Events] E
                WHERE E.id = @IN_eventId
                    AND E.Deleted = 0
                    )
            BEGIN
                RAISERROR('El evento no existe.', 16, 1)
            END
        END
        
		-- TRANSACTION BEGIN
		IF @@TRANCOUNT = 0
		BEGIN
		    SET @transactionBegun = 1;
		    BEGIN TRANSACTION;
		END;

        IF @IN_eventId IS NULL
        BEGIN
            UPDATE E
            SET E.Deleted = 1
            FROM [dbo].[Events] E
            WHERE E.orderId = @IN_orderID
        END
        ELSE
        BEGIN
            UPDATE E
            SET E.Deleted = 1
            FROM [dbo].[Events] E
            WHERE E.id = @IN_eventId
        END

		-- COMMIT OF THE TRANSSACTION
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
            -- If it is not a personalised error
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