--------------------------------------------------------------------------
-- Autor:       Luis Fernando Molina
-- Fecha:       2023-09-03
-- Descripci�n: eliminamos la Categoria
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_Category_Eliminar]
    -- Par�metros,
    @IN_category VARCHAR(32) NOT NULL
AS
BEGIN
    SET NOCOUNT ON;         -- No retorna metadatos

    -- CONTROL DE ERRORES
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transaccionIniciada BIT = 0;

    -- DECLARACI�N DE VARIABLES
    DECLARE @idcategory int = NULL;


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

        --validacion de categoria a modificar
        IF(LTRIM(RTRIM(@IN_category)) = '')
	        BEGIN
	        	RAISERROR('No se ingreso texto de la Categoria a modificar', 16, 1)
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


        --borrado solo si esta libre

        --validamos por la existencia de subcategorias
        IF EXISTS ( SELECT 1 
                    FROM @Subcategoriesofcategory Scoc 
                    INNER JOIN @Subcategory Sc
                        ON Scoc.idSubcategory = Sc.id
                    WHERE Scoc.idCategory = @idcategory
                    AND Sc.erased = 0
                    AND Scoc.erased = 0
                    )
            BEGIN
                RAISERROR('la Categoria "%s" aun tiene subcategorias asociadas', 16, 1,@IN_category)
            END;

		-- INICIO DE LA TRANSACCI�N
		IF @@TRANCOUNT = 0
		BEGIN
		    SET @transaccionIniciada = 1;
		    BEGIN TRANSACTION;
		END;

		-- eliminamos la sociacion con subcategorias de la categoria
		UPDATE Scoc
        SET erased = 1
        FROM @Subcategoriesofcategory Scoc
        WHERE Scoc.id = @idcategory
        AND Scoc.erased = 0

        -- eliminamos la categoria
		UPDATE C
        SET erased = 1
        FROM @Category C
        WHERE C.id = @idcategory
        AND C.erased = 0
		

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