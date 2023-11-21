--------------------------------------------------------------------------
-- Autor:       Luis Fernando Molina
-- Fecha:       2023-09-03
-- Descripci�n: edition of the Event
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_Events_Edit]
    -- Parameters,
	@IN_eventId INT,
	@IN_title VARCHAR(64),
	@IN_category VARCHAR(32),
	@IN_startTime DATETIME,
	@IN_endTime DATETIME,
	@IN_description VARCHAR(256),
	@IN_orderId INT = -1
AS
BEGIN
    SET NOCOUNT ON;

    -- Errors control
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transactionBegun BIT = 0;

    -- Variable declaration
    DECLARE @idCategory INT = -1
	DECLARE @useOrderID INT = NULL
	DECLARE @categoryWithCollision VARCHAR(32) = 'Maquillaje'
	DECLARE @valuesInRange AS TABLE(
		[id] INT, 
		[title] VARCHAR(64), 
		[startTime] DATETIME, 
		[endTime]DATETIME, 
		[category] VARCHAR(32), 
		[description] VARCHAR(256), 
		[orderId] INT
	)


    BEGIN TRY
        -- Validations

        IF(LTRIM(RTRIM(@IN_title)) = '')
	        BEGIN
	        	RAISERROR('No se ingresó texto para el título', 16, 1)
	        END;

        IF(LTRIM(RTRIM(@IN_description)) = '')
	        BEGIN
	        	RAISERROR('No se ingresó texto para la descripción', 16, 1)
	        END;

		IF(LTRIM(RTRIM(@IN_category)) = '')
	        BEGIN
	        	RAISERROR('No se ingresó texto para la categoria', 16, 1)
	        END;

        SELECT @idCategory = CASE WHEN EC.id IS NULL THEN -1 ELSE EC.id END
        FROM [dbo].[EventCategories] EC
        WHERE description = LTRIM(RTRIM(@IN_category))
        AND deleted = 0
		
		IF (@idCategory = -1)
			BEGIN
				RAISERROR('La categoria: "%s" no es reconocida', 16, 1,@IN_category)
			END;

		IF(@IN_endTime <= @IN_startTime)
		BEGIN
			RAISERROR('Fecha final es menor o igual que la fecha de inicio', 16, 1)
		END;

		IF NOT (@IN_orderId = -1)
			BEGIN
				IF NOT EXISTS(SELECT 1
							  FROM  [dbo].[Orders] O
							  WHERE O.id = @IN_orderId
							  AND deleted = 0)
			BEGIN
				--no existe la orden
				RAISERROR('La orden indicada no existe', 16, 1)
			END
				--si existe la orden
				SET @useOrderID = @IN_orderId
			END

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

		--validation of colisions
		INSERT INTO @valuesInRange
		EXEC Duende_SP_Events_List
        
		IF EXISTS (SELECT 1 
				   FROM @valuesInRange E
				   WHERE E.category = @categoryWithCollision
				   AND E.id != @IN_eventId
				   AND ( (E.startTime <= @IN_startTime AND @IN_startTime <= E.endTime) -- event starts midway
					   OR (E.startTime <= @IN_endTime AND @IN_endTime <= E.endTime) -- event finish midway
				       OR (E.startTime <= @IN_startTime AND @IN_endTime <= E.endTime)-- old encapsulates new
				       OR (@IN_startTime <= E.startTime AND E.endTime <= @IN_endTime) -- new encapsulates old
					   )
				  )
			BEGIN
				-- la orden colisiona con un maquillaje
				RAISERROR('El evento indicado tiene al menos una colisión con un Maquillaje', 16, 1)
			END



		-- TRANSACTION BEGIN
		IF @@TRANCOUNT = 0
		BEGIN
		    SET @transactionBegun = 1;
		    BEGIN TRANSACTION;
		END;

		UPDATE E
		SET E.[categoryId] = @idCategory, 
			E.[orderId] = @useOrderID, 
			E.[startTime] = @IN_startTime, 
			E.[endTime] = @IN_endTime, 
			E.[title] = @IN_title, 
			E.[description] = @IN_description
		FROM [dbo].[Events] E
        WHERE E.id = @IN_eventId
		

		-- COMMIT OF THE TRANSACTION
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