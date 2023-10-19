--------------------------------------------------------------------------
-- Autor:       Luis Fernando Molina
-- Fecha:       2023-09-03
-- Descripci�n: eliminamos la Categoria
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_ImageCategory_Delete]
    -- Par�metros,
    @IN_imageCategory VARCHAR(32)
AS
BEGIN
    SET NOCOUNT ON;         -- No retorna metadatos

    -- CONTROL DE ERRORES
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transactionBegun BIT = 0;

    -- DECLARACI�N DE VARIABLES
    DECLARE @UseIdImageCategory int = NULL;


    BEGIN TRY
        -- VALIDACIONES

		--validacion de Administradora(necesaria?)

        --validacion de categoria a modificar
        IF(LTRIM(RTRIM(@IN_imageCategory)) = '')
	        BEGIN
	        	RAISERROR('No se ingreso texto de la Categoria a modificar', 16, 1)
	        END;

        SELECT @UseIdImageCategory = C.id 
        FROM [dbo].ImageCategories C 
        WHERE LTRIM(RTRIM(C.description)) = LTRIM(RTRIM(@IN_imageCategory))
        AND C.deleted = 0

        --validacion de existencia previa
        IF (@UseIdImageCategory IS NULL)
            BEGIN
                RAISERROR('la Categoria "%s" no existe', 16, 1,@IN_imageCategory)
            END;


        --borrado solo si esta libre

        --validamos por la existencia de subcategorias
        IF EXISTS ( SELECT 1 
                    FROM [dbo].ImageSubcategories Sc
                    WHERE Sc.categoryId = @UseIdImageCategory
                    AND Sc.deleted = 0
                    )
            BEGIN
                RAISERROR('la Categoria "%s" aun tiene subcategorias asociadas', 16, 1,@IN_imageCategory)
            END;

		-- INICIO DE LA TRANSACCI�N
		IF @@TRANCOUNT = 0
		BEGIN
		    SET @transactionBegun = 1;
		    BEGIN TRANSACTION;
		END;

		-- eliminamos la sociacion con subcategorias de la categoria
		UPDATE Sc
        SET deleted = 1
        FROM [dbo].ImageSubcategories Sc
        WHERE Sc.categoryId = @UseIdImageCategory
        AND Sc.deleted = 0

        -- eliminamos la categoria
		UPDATE C
        SET deleted = 1
        FROM [dbo].ImageCategories C
        WHERE C.id = @UseIdImageCategory
        AND C.deleted = 0
		

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