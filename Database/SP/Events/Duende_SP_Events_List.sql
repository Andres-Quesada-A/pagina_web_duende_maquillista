--------------------------------------------------------------------------
-- Autor:       Luis Fernando Molina
-- Fecha:       2023-09-03
-- Descripci�n: listamos los Eventos en el rango de fechas
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_Events_List]
    -- Par�metros,
	@IN_startTime DATETIME = NULL,
	@IN_endTime DATETIME = NULL
AS
BEGIN
    SET NOCOUNT ON;         -- No retorna metadatos

	--Variables
	DECLARE @startTime DATE = NULL;
	DECLARE @endTime DATE = NULL;
	DECLARE @option INT = 0;

    -- CONTROL DE ERRORES
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transactionBegun BIT = 0;

    BEGIN TRY
        IF (@IN_endTime IS NOT NULL)
		BEGIN
			SET @endTime = @IN_endTime
		END
		IF (@IN_startTime IS NOT NULL)
		BEGIN
			SET @startTime = @IN_startTime
		END

		SELECT @option = CASE WHEN @IN_startTime IS NULL 
								   AND @IN_endTime IS NULL THEN 0
							  WHEN @IN_startTime IS NULL 
								   AND @IN_endTime IS NOT NULL THEN 1
							  WHEN @IN_startTime IS NOT NULL 
								   AND @IN_endTime IS NULL THEN 2
							  ELSE 3 END

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
		AND ( (@option = 0) -- selection of everything
			  OR ( (@option = 1) 
				   AND (E.startTime <= @endTime )
				 ) -- selection of everything from start until the endTime
			  OR ( (@option = 2)
				   AND (E.startTime >= @startTime )
				 ) -- selection of everything after the startTime
			  OR ( (@option = 3) 
				   AND (E.startTime >= @startTime)
				   AND (E.startTime <= @endTime)
				 )-- selection of everything in the given range
			)


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