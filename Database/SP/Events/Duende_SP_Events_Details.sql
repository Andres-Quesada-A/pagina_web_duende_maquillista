--------------------------------------------------------------------------
-- Autor:       Luis Fernando Molina
-- Fecha:       2023-09-03
-- Descripci�n: listamos los Eventos en el rango de fechas
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_Events_Details]
    -- Par�metros,
	@IN_eventId INT
AS
BEGIN
    SET NOCOUNT ON;         -- No retorna metadatos

	--Variables

    -- CONTROL DE ERRORES
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transactionBegun BIT = 0;

    BEGIN TRY
        
		-- Verify exists
        IF NOT EXISTS(
            SELECT 1
            FROM [dbo].[Events] E
            WHERE E.id = @IN_eventId
                AND E.Deleted = 0
                )
        BEGIN
            RAISERROR('El evento no existe.', 16, 1)
        END

		SELECT E.id,
			   E.title, 
			   E.startTime, 
			   E.endTime, 
			   CASE WHEN EC.description IS NULL 
					THEN 'got deleted' 
					ELSE EC.description 
					END AS 'category', 
			   E.description,
			   E.orderId
		FROM [dbo].[Events] E
		INNER JOIN [dbo].[EventCategories] EC
			ON EC.id = E.categoryId
		WHERE E.deleted = 0
		AND EC.deleted = 0
		AND E.id = @IN_eventId


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
            -- Si no es un error personalizado, se registra el error
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