--------------------------------------------------------------------------
-- Autor:       Luis Fernando Molina
-- Fecha:       2023-09-03
-- Descripci�n: edition of the Imagecategory
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_ImageCategory_Edit]
    -- Parameters,
	@IN_newImageCategory VARCHAR(32),
    @IN_imageCategory VARCHAR(32)
AS
BEGIN
    SET NOCOUNT ON;

    -- Errors control
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transactionBegun BIT = 0;

    -- Variable declaration
    DECLARE @UseIdImageCategory int = NULL;


    BEGIN TRY
        -- VALIDATIONS

		--validacion de Administradora(necesaria?)

        --new value
        IF(LTRIM(RTRIM(@IN_newImageCategory)) = '')
	        BEGIN
	        	RAISERROR('No se ingresó texto para modificar la categoría.', 16, 1)
	        END;

        --palabras reservadas
        IF(LTRIM(RTRIM(@IN_newImageCategory)) = 'seleccione')
	        BEGIN
	        	RAISERROR('La categoría "%s" es inválida.', 16, 1,@IN_newImageCategory)
	        END;
        
        SELECT @UseIdImageCategory = C.id 
        FROM [dbo].ImageCategories C 
        WHERE LTRIM(RTRIM(C.description)) = LTRIM(RTRIM(@IN_imageCategory))
        AND C.deleted = 0

        --previous existence
        IF EXISTS (SELECT 1 FROM [dbo].ImageCategories C WHERE LTRIM(RTRIM(C.description)) = LTRIM(RTRIM(@IN_newImageCategory)) AND C.deleted = 0
         AND C.id <> @UseIdImageCategory)
            BEGIN
                RAISERROR('La categoría "%s" ya existe.', 16, 1,@IN_imageCategory)
            END;

        --Imagecategory value
        IF(LTRIM(RTRIM(@IN_imageCategory)) = '')
	        BEGIN
	        	RAISERROR('No se ingresó texto de la categoría por modificar.', 16, 1)
	        END;
        

        --previous existence
        IF (@UseIdImageCategory IS NULL)
            BEGIN
                RAISERROR('La categoría "%s" no existe.', 16, 1,@IN_imageCategory)
            END;


		-- TRANSACTION BEGIN
		IF @@TRANCOUNT = 0
		BEGIN
		    SET @transactionBegun = 1;
		    BEGIN TRANSACTION;
		END;

		-- edit of the Imagecategory
		UPDATE C
        SET description = LTRIM(RTRIM(@IN_newImageCategory))
        FROM [dbo].ImageCategories C
        WHERE C.id = @UseIdImageCategory
		

		-- COMMIT OF THE TRANSACTION
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