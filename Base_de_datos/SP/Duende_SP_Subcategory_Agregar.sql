--------------------------------------------------------------------------
-- Autor:       Luis Fernando Molina
-- Fecha:       2023-09-03
-- Descripci�n: agregamos la Subcategoria
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_Subcategory_Agregar]
    -- Par�metros,
	@IN_category VARCHAR(32) NOT NULL,
    @IN_subcategory VARCHAR(32) NOT NULL
AS
BEGIN
    SET NOCOUNT ON;         -- No retorna metadatos

    -- CONTROL DE ERRORES
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transaccionIniciada BIT = 0;

    -- DECLARACI�N DE VARIABLES
    DECLARE @usarIDSubcategoria INT = NULL;
    DECLARE @idcategory INT = NULL;

	DECLARE @Category TABLE(

		id int IDENTITY NOT NULL,
		name VARCHAR(32) NOT NULL,
        erased BIT NOT NULL
	)	

	DECLARE @Subcategoriesofcategory TABLE(

		id int IDENTITY NOT NULL,
		idCategory int NOT NULL,
        idSubcategory int NOT NULL,
        erased BIT NOT NULL
	)

	DECLARE @Subcategory TABLE(

		id int IDENTITY NOT NULL,
		name VARCHAR(32) NOT NULL,
		erased BIT NOT NULL
	)	


    BEGIN TRY
        -- VALIDACIONES

		--validacion de Administradora(necesaria?)

        --validacion de categoria
        IF(LTRIM(RTRIM(@IN_category)) = '')
	        BEGIN
	        	RAISERROR('No se ingreso texto de la Categoria', 16, 1)
	        END;

        SELECT @idcategory = C.id 
        FROM @Category C 
        WHERE LTRIM(RTRIM(C.name)) = LTRIM(RTRIM(@IN_category))
        AND C.erased = 0

        --validacion de existencia previa
        IF (@idcategory IS NULL)
            BEGIN
                RAISERROR('la Categoria "%s" no existe', 16, 1,@IN_category)
            END;

        --validacion de subcategoria
        IF(LTRIM(RTRIM(@IN_subcategory)) = '')
	        BEGIN
	        	RAISERROR('No se ingreso texto de la Subcategoria a agregar', 16, 1)
	        END;

        --validacion de existencia previa de subcategoria
        IF EXISTS ( SELECT 1
                    FROM @Subcategoriesofcategory Scoc
                    INNER JOIN @Subcategory Sc
                        ON Sc.id = Scoc.idSubcategory
                    WHERE Scoc.idCategory = @idcategory
                    AND Scoc.erased = 0
                    AND Sc.erased = 0
                    AND LTRIM(RTRIM(Sc.name)) = LTRIM(RTRIM(@IN_subcategory))
                    ) 
            BEGIN
                RAISERROR('la Subcategoria "%s" ya existe', 16, 1,@IN_subcategory)
            END;


		-- INICIO DE LA TRANSACCI�N
		IF @@TRANCOUNT = 0
		BEGIN
		    SET @transaccionIniciada = 1;
		    BEGIN TRANSACTION;
		END;

		-- creamos la nueva categoria
		INSERT INTO @Subcategory (
			name,
			erased
		)
		VALUES(
			LTRIM(RTRIM(@IN_subcategory)),
			0
		);

        SET @usarIDSubcategoria = SCOPE_IDENTITY();

        INSERT INTO @Subcategoriesofcategory (
			idCategory,
            idSubcategory,
            erased
		)
		VALUES(
			@idcategory,
            @usarIDSubcategoria,
			0
		);

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