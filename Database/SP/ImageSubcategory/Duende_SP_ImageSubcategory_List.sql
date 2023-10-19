--------------------------------------------------------------------------
-- Autor:       Luis Fernando Molina
-- Fecha:       2023-09-03
-- Descripci�n: listamos las Subcategorias de una Categoria
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_ImageSubcategory_List]
    -- Par�metros,
	@IN_imageCategory VARCHAR(32)
AS
BEGIN
    SET NOCOUNT ON;         -- No retorna metadatos

    -- CONTROL DE ERRORES
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transactionBegun BIT = 0;

    -- DECLARACI�N DE VARIABLES
    DECLARE @UsecategoryId INT = NULL;


    BEGIN TRY
        -- VALIDACIONES

		--validacion de Administradora(necesaria?)

        --validacion de categoria
        IF(LTRIM(RTRIM(@IN_imageCategory)) = '')
	        BEGIN
	        	RAISERROR('No se ingreso texto de la Categoria', 16, 1)
	        END;

        SELECT @UsecategoryId = C.id 
        FROM [dbo].ImageCategories C 
        WHERE LTRIM(RTRIM(C.description)) = LTRIM(RTRIM(@IN_imageCategory))
        AND C.deleted = 0

        --validacion de existencia previa
        IF (@UsecategoryId IS NULL)
            BEGIN
                RAISERROR('la Categoria "%s" no existe', 16, 1, @IN_imageCategory)
            END;

		-- consulta

        SELECT Sc.description AS "subcategoria" 
        FROM [dbo].ImageSubcategories Sc
        WHERE Sc.categoryId = @UsecategoryId
        AND Sc.deleted = 0

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