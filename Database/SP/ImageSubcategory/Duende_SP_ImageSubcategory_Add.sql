--------------------------------------------------------------------------
-- Autor:       Luis Fernando Molina
-- Fecha:       2023-09-03
-- Descripci�n: agregamos la Subcategoria
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_ImageSubcategory_Add]
    -- Par�metros,
	@IN_imageCategory VARCHAR(32),
    @IN_imageSubcategory VARCHAR(32)
AS
BEGIN
    SET NOCOUNT ON;         -- No retorna metadatos

    -- CONTROL DE ERRORES
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transactionBegun BIT = 0;

    -- DECLARACI�N DE VARIABLES
    DECLARE @UseIdSubcategoria INT = NULL;
    DECLARE @UsecategoryId INT = NULL;


    BEGIN TRY
        -- VALIDACIONES

		--validacion de Administradora(necesaria?)

        --validacion de categoria
        IF(LTRIM(RTRIM(@IN_imageCategory)) = '')
	        BEGIN
	        	RAISERROR('No se ingresó texto de la categoría.', 16, 1)
	        END;

        SELECT @UsecategoryId = C.id 
        FROM [dbo].ImageCategories C 
        WHERE LTRIM(RTRIM(C.description)) = LTRIM(RTRIM(@IN_imageCategory))
        AND C.deleted = 0

        --validacion de existencia previa
        IF (@UsecategoryId IS NULL)
            BEGIN
                RAISERROR('La categoría "%s" no existe.', 16, 1,@IN_imageCategory)
            END;

        --validacion de subcategoria
        IF(LTRIM(RTRIM(@IN_imageSubcategory)) = '')
	        BEGIN
	        	RAISERROR('No se ingresó texto de la subcategoría por agregar.', 16, 1)
	        END;

        --palabras reservadas
        IF(LTRIM(RTRIM(@IN_imageSubcategory)) = 'seleccione')
	        BEGIN
	        	RAISERROR('La subcategoría "%s" es inválida.', 16, 1,@IN_imageSubcategory)
	        END;

        --validacion de existencia previa de subcategoria
        IF EXISTS ( SELECT 1
                    FROM [dbo].ImageSubcategories Sc
                    WHERE Sc.categoryId = @UsecategoryId
                    AND Sc.deleted = 0
                    AND LTRIM(RTRIM(Sc.description)) = LTRIM(RTRIM(@IN_imageSubcategory))
                    ) 
            BEGIN
                RAISERROR('La subcategoría "%s" ya existe.', 16, 1,@IN_imageSubcategory)
            END;


		-- INICIO DE LA TRANSACCI�N
		IF @@TRANCOUNT = 0
		BEGIN
		    SET @transactionBegun = 1;
		    BEGIN TRANSACTION;
		END;

		-- creamos la nueva subcategoria
		INSERT INTO [dbo].ImageSubcategories (
			categoryId,
            description,
			deleted
		)
		VALUES(
			@UsecategoryId,
            LTRIM(RTRIM(@IN_imageSubcategory)),
			0
		);

		-- COMMIT DE LA TRANSACCI�N
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