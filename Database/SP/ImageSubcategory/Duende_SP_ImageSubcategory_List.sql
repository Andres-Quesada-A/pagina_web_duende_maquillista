--------------------------------------------------------------------------
-- Autor:       Luis Fernando Molina
-- Fecha:       2023-09-03
-- Descripci�n: listamos las Subcategorias de una Categoria
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_ImageSubcategory_List]
    -- Par�metros,
	@IN_imageCategory VARCHAR(32) NOT NULL
AS
BEGIN
    SET NOCOUNT ON;         -- No retorna metadatos

    -- CONTROL DE ERRORES
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transactionBegun BIT = 0;

    -- DECLARACI�N DE VARIABLES
    DECLARE @UseIdCategory INT = NULL;

	DECLARE @ImageCategory TABLE(

		id int IDENTITY NOT NULL,
		name VARCHAR(32) NOT NULL,
        erased BIT NOT NULL
	)	

	DECLARE @ImageSubcategory TABLE(

		id int IDENTITY NOT NULL,
        idCategory int NOT NULL,
		name VARCHAR(32) NOT NULL,
		erased BIT NOT NULL
	)	


    BEGIN TRY
        -- VALIDACIONES

		--validacion de Administradora(necesaria?)

        --validacion de categoria
        IF(LTRIM(RTRIM(@IN_imageCategory)) = '')
	        BEGIN
	        	RAISERROR('No se ingreso texto de la Categoria', 16, 1)
	        END;

        SELECT @UseIdCategory = C.id 
        FROM @ImageCategory C 
        WHERE LTRIM(RTRIM(C.name)) = LTRIM(RTRIM(@IN_imageCategory))
        AND C.erased = 0

        --validacion de existencia previa
        IF (@UseIdCategory IS NULL)
            BEGIN
                RAISERROR('la Categoria no existe', 16, 1)
            END;

		-- consulta

        SELECT Sc.id AS "id", Sc.name AS "subcategoria" 
        FROM @ImageSubcategory Sc
        WHERE Sc.idCategory = @UseIdCategory
        AND Sc.erased = 0

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