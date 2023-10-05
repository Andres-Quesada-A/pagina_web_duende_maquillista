--------------------------------------------------------------------------
-- Autor:       Luis Fernando Molina
-- Fecha:       2023-09-03
-- Descripci�n: agregamos la instancia de la imagen
-- 				 (adicionalmente se crean nuevos tags de ser necesarios)
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_Imagen_Agregar]
    -- Par�metros
	@IN_name VARCHAR(64) NOT NULL,
	@IN_descripcion VARCHAR(128) NOT NULL,
	@IN_category VARCHAR(32) NOT NULL,
	@IN_subcategory VARCHAR(32) NOT NULL,
	@IN_tags Tags READONLY,
	@IN_imageUrl VARCHAR(256) NOT NULL
AS
BEGIN
    SET NOCOUNT ON;         -- No retorna metadatos

    -- CONTROL DE ERRORES
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transaccionIniciada BIT = 0;

    -- DECLARACI�N DE VARIABLES
	DECLARE @usarTags BIT;
	DECLARE @idcategory INT = NULL;
	DECLARE @idsubcategory INT = NULL;
	DECLARE @usarIDImag INT = NULL;
	DECLARE @tempTagsID TABLE(
			[in_tags] VARCHAR(32) NOT NULL,
			[id] INT
		);


	DECLARE @Imag TABLE(

		id int IDENTITY NOT NULL,
		name VARCHAR(64) NOT NULL,
		descripcion VARCHAR(128) NOT NULL,
		date DATETIME NOT NULL,
		idCategory int NOT NULL,
		idSubcategory int NOT NULL,
		imageUrl VARCHAR(256) NOT NULL,
		erased BIT NOT NULL
	)
	DECLARE @Category TABLE(

		id int IDENTITY NOT NULL,
		name VARCHAR(32) NOT NULL,
		erased BIT NOT NULL
	)	
	DECLARE @Subcategory TABLE(

		id int IDENTITY NOT NULL,
		name VARCHAR(32) NOT NULL,
		erased BIT NOT NULL
	)	
	DECLARE @Tags TABLE(

		id int IDENTITY NOT NULL,
		name VARCHAR(32) NOT NULL
	)
	DECLARE @Tagsfromimage TABLE(
		id int IDENTITY NOT NULL,
		idTags int NOT NULL,
		idImage int NOT NULL,
		erased BIT NOT NULL
	)


    BEGIN TRY
        -- VALIDACIONES

		--validacion de Administradora(necesaria?)


		IF(LTRIM(RTRIM(@IN_name)) = '')
			BEGIN
				RAISERROR('No se ingreso nombre', 16, 1)
			END;

		IF(LTRIM(RTRIM(@IN_descripcion)) = '')
			BEGIN
				RAISERROR('No se ingreso descripcion', 16, 1)
			END;

		IF(LTRIM(RTRIM(@IN_imageUrl)) = '')
			BEGIN
				RAISERROR('No se ingreso imagen', 16, 1)
			END;

		--validacion category texto o id
		IF ISNUMERIC(@IN_category) = 1
		    BEGIN
		        -- Attempt to cast the input variable as an integer
		        DECLARE @InputAsInt INT;
		        SET @InputAsInt = TRY_CAST(@IN_category AS INT);

		        IF @InputAsInt IS NOT NULL
		        BEGIN
		            -- se le pasa un numero
					SELECT @idcategory = C.id
					FROM @Category C
					WHERE C.id = @InputAsInt
		        END
		    END
		    ELSE
		    BEGIN
		        -- se le pasa texto
				SELECT @idcategory = C.id
				FROM @Category C
				WHERE C.name = @IN_name
		    END;

		IF(@idcategory IS NULL)
			BEGIN
				RAISERROR('No se ingreso categoria valida', 16, 1);
			END

		--validacion subcategory texto o id
		IF ISNUMERIC(@IN_subcategory) = 1
			BEGIN
			    -- Attempt to cast the input variable as an integer
			    DECLARE @InputAsInt INT;
			    SET @InputAsInt = TRY_CAST(@IN_subcategory AS INT);

			    IF @InputAsInt IS NOT NULL
			    BEGIN
			        -- se le pasa un numero
			        SELECT @idsubcategory = S.id
			        FROM @Subcategory S
			        WHERE S.id = @InputAsInt
			    END
			END
			ELSE
			BEGIN
			    -- se le pasa texto
			    SELECT @idsubcategory = S.id
			    FROM @Subcategory S
			    WHERE S.name = @IN_name
			END;

		IF (@idsubcategory IS NULL)
			BEGIN
			    RAISERROR('No se ingreso subcategoria valida', 16, 1);
			END

		--validaciones de los tags
		IF EXISTS (SELECT TOP 1 1 FROM @IN_tags) 
			--
			
			BEGIN
				SET @usarTags = 1;

				INSERT INTO @tempTagsID (
				[in_tags], 
				[id])
			SELECT 
				LTRIM(RTRIM(It.[IN_tags])) AS 'etiqueta' ,
				CASE WHEN LTRIM(RTRIM(T.[name])) = LTRIM(RTRIM(It.[IN_tags]))  COLLATE Latin1_General_CI_AI
					THEN T.[id]
					ELSE NULL END AS 'id'
			FROM @Tags T
			RIGHT JOIN @IN_tags It
				ON LTRIM(RTRIM(T.[name])) = LTRIM(RTRIM(It.[IN_tags]))  COLLATE Latin1_General_CI_AI; -- Para omitir tildes

			END;


		-- INICIO DE LA TRANSACCI�N
		IF @@TRANCOUNT = 0
		BEGIN
		    SET @transaccionIniciada = 1;
		    BEGIN TRANSACTION;
		END;
		
		IF(@usarTags = 1)
			BEGIN
				--insertamos las nuevas etiquetas
				INSERT INTO @Tags(
					name
				)
				SELECT LTRIM(RTRIM(tTID.[in_tags]))
				FROM @tempTagsID tTID
				WHERE tTID.[id] IS NULL;
			END;

		-- creamos la nueva imagen
		INSERT INTO @Imag (
			name,
			descripcion,
			date,
			idCategory,
			idSubcategory,
			imageUrl,
			erased
		)
		VALUES(
			@IN_name,
			@IN_descripcion,
			GETUTCDATE(),
			@idcategory,
			@idsubcategory,
			@IN_imageURL,
			0
		);

		SET @usarIDImag = SCOPE_IDENTITY();

		IF(@usarTags = 1)
		BEGIN
			--asociamos las etiquetas a la imagen
			INSERT INTO @Tagsfromimage(
				idTags,
				idImage,
				erased
			)
			SELECT ideti.[id], 
				   @usarIDImag,
				   0
			FROM (
					SELECT T.[id] AS 'id'
					FROM @Tags T
					INNER JOIN @IN_tags It
						ON LTRIM(RTRIM(T.name)) = LTRIM(RTRIM(It.[IN_tags]))  COLLATE Latin1_General_CI_AI
				) AS ideti -- Para omitir tildes
		END;

		-- COMMIT DE LA TRANSACCI�N
		IF @transaccionIniciada = 1
		BEGIN
		    COMMIT TRANSACTION;
		END;

    END TRY
    BEGIN CATCH

        SET @ErrorNumber = ERROR_NUMBER();
        SET @ErrorSeverity = ERROR_SEVERITY();
        SET @ErrorState = ERROR_STATE();
        SET @Message = ERROR_MESSAGE();

        IF @transaccionIniciada = 1
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