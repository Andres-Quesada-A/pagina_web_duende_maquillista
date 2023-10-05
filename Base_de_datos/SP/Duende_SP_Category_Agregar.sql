--------------------------------------------------------------------------
-- Autor:       Luis Fernando Molina
-- Fecha:       2023-09-03
-- Descripci�n: agregamos la Categoria
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_Category_Agregar]
    -- Par�metros,
	@IN_category VARCHAR(32) NOT NULL
AS
BEGIN
    SET NOCOUNT ON;         -- No retorna metadatos

    -- CONTROL DE ERRORES
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transaccionIniciada BIT = 0;

    -- DECLARACI�N DE VARIABLES

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

        IF(LTRIM(RTRIM(@IN_category)) = '')
	        BEGIN
	        	RAISERROR('No se ingreso texto para la Categoria', 16, 1)
	        END;


        --validacion de existencia previa
        IF EXISTS (SELECT 1 FROM @Category C WHERE LTRIM(RTRIM(C.name)) = LTRIM(RTRIM(@IN_category)) AND C.erased = 0)
            BEGIN
                RAISERROR('la Categoria "%s" ya existe', 16, 1,@IN_category)
            END;


		-- INICIO DE LA TRANSACCI�N
		IF @@TRANCOUNT = 0
		BEGIN
		    SET @transaccionIniciada = 1;
		    BEGIN TRANSACTION;
		END;

		-- creamos la nueva categoria
		INSERT INTO @Category (
			name,
			erased
		)
		VALUES(
			LTRIM(RTRIM(@IN_category)),
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