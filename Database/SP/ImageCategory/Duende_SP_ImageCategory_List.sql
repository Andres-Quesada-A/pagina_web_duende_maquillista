--------------------------------------------------------------------------
-- Autor:       Luis Fernando Molina
-- Fecha:       2023-09-03
-- Descripci�n: listamos las Categorias
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_ImageCategory_List]
    -- Par�metros,
AS
BEGIN
    SET NOCOUNT ON;         -- No retorna metadatos

    -- CONTROL DE ERRORES
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transactionBegun BIT = 0;

    -- DECLARACI�N DE VARIABLES
    DECLARE @usarSeparador VARCHAR(1) = ','

    BEGIN TRY
        -- VALIDACIONES
		--validacion de Administradora(necesaria?)

        --consulta
        SELECT C.description AS 'category' ,
                CASE WHEN Every.subcategories IS NULL THEN ''
                ELSE Every.subcategories END AS 'subcategories'
        FROM [dbo].ImageCategories C
        LEFT JOIN ( SELECT C.id AS 'id' ,
                    STRING_AGG( S.description, ',') AS 'subcategories' 
		            FROM [dbo].ImageCategories C
		            INNER JOIN [dbo].ImageSubcategories S
		            	ON S.categoryId = C.id
                    WHERE C.[deleted] = 0
		            AND S.[deleted] = 0
		            GROUP BY C.[id]) AS Every
            ON Every.id = C.id
        WHERE C.deleted = 0 
                      

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