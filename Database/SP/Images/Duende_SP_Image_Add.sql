--------------------------------------------------------------------------
-- Author: 		Luis Fernando Molina
-- Date:	 	2023-09-03
-- Description: Add the image instance
--              (Additionally, create new tags if necessary)
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_Image_Add]
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

		-- Administrator validation (Is it necessary?)


		IF (LTRIM(RTRIM(@IN_name)) = '')
        BEGIN
            RAISERROR('No name was provided', 16, 1);
        END;

        IF (LTRIM(RTRIM(@IN_description)) = '')
        BEGIN
            RAISERROR('No description was provided', 16, 1);
        END;

        IF (LTRIM(RTRIM(@IN_imageUrl)) = '')
        BEGIN
            RAISERROR('No image was provided', 16, 1);
        END;


		-- Category validation: text or ID

        IF ISNUMERIC(@IN_category) = 1
        BEGIN
            -- Attempt to cast the input variable as an integer
            DECLARE @InputAsInt INT;
            SET @InputAsInt = TRY_CAST(@IN_category AS INT);

            IF @InputAsInt IS NOT NULL
            BEGIN
                -- Passed a number
                SELECT @idcategory = C.id
                FROM @Category C
                WHERE C.id = @InputAsInt;
            END;
        END
        ELSE
        BEGIN
            -- Passed text
            SELECT @idcategory = C.id
            FROM @Category C
            WHERE C.name = @IN_category;
        END;

        IF (@idcategory IS NULL)
        BEGIN
            RAISERROR('No valid category was provided', 16, 1);
        END;

        -- Subcategory validation: text or ID

        IF ISNUMERIC(@IN_subcategory) = 1
        BEGIN
            -- Attempt to cast the input variable as an integer
            DECLARE @InputAsInt INT;
            SET @InputAsInt = TRY_CAST(@IN_subcategory AS INT);

            IF @InputAsInt IS NOT NULL
            BEGIN
                -- Passed a number
                SELECT @idsubcategory = S.id
                FROM @Subcategory S
                WHERE S.id = @InputAsInt;
            END;
        END
        ELSE
        BEGIN
            -- Passed text
            SELECT @idsubcategory = S.id
            FROM @Subcategory S
            WHERE S.name = @IN_subcategory;
        END;

		IF (@idsubcategory IS NULL)
        BEGIN
            RAISERROR('No valid subcategory was provided', 16, 1);
        END;

        -- Tag validations

        IF EXISTS (SELECT TOP 1 1 FROM @IN_tags) 
        BEGIN
            SET @useTags = 1;

            INSERT INTO @tempTagsID (
                [in_tags], 
                [id]
            )
            SELECT 
                LTRIM(RTRIM(It.[IN_tags])) AS 'tag' ,
                CASE WHEN LTRIM(RTRIM(T.[name])) = LTRIM(RTRIM(It.[IN_tags]))  COLLATE Latin1_General_CI_AI
                    THEN T.[id]
                    ELSE NULL END AS 'id'
            FROM @Tags T
            RIGHT JOIN @IN_tags It
            ON LTRIM(RTRIM(T.[name])) = LTRIM(RTRIM(It.[IN_tags]))  COLLATE Latin1_General_CI_AI; -- To ignore accents
        END;

		-- TRANSACTION START
		IF @@TRANCOUNT = 0
		BEGIN
		    SET @transaccionIniciada = 1;
		    BEGIN TRANSACTION;
		END;
		
		IF(@usarTags = 1)
			BEGIN
				-- Insert new tags
				INSERT INTO @Tags(
					name
				)
				SELECT LTRIM(RTRIM(tTID.[in_tags]))
				FROM @tempTagsID tTID
				WHERE tTID.[id] IS NULL;
			END;

		-- Create the new image
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
			-- Associate tags with the image
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
				) AS ideti -- To ignore accents
		END;

		-- TRANSACTION COMMIT
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