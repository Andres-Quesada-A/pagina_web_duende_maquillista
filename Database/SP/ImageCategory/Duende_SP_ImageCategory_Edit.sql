--------------------------------------------------------------------------
-- Autor:       Luis Fernando Molina
-- Fecha:       2023-09-03
-- Descripci�n: edition of the Imagecategory
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_ImageCategory_Edit]
    -- Parameters,
	@IN_newImageCategory VARCHAR(32) NOT NULL,
    @IN_imageCategory VARCHAR(32) NOT NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Errors control
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transactionBegun BIT = 0;

    -- Variable declaration
    DECLARE @UseIdImageCategory int = NULL;


	DECLARE @Imagecategory TABLE(

		id int IDENTITY NOT NULL,
		name VARCHAR(32) NOT NULL,
        erased BIT NOT NULL
	)	

    BEGIN TRY
        -- VALIDATIONS

		--validacion de Administradora(necesaria?)

        --new value
        IF(LTRIM(RTRIM(@IN_newImageCategory)) = '')
	        BEGIN
	        	RAISERROR('No se ingreso texto para modificar la Categoria', 16, 1)
	        END;

        --previous existence
        IF EXISTS (SELECT 1 FROM @Imagecategory C WHERE LTRIM(RTRIM(C.name)) = LTRIM(RTRIM(@IN_newImageCategory)) AND C.erased = 0)
            BEGIN
                RAISERROR('la Categoria "%s" ya existe', 16, 1,@IN_imageCategory)
            END;

        --Imagecategory value
        IF(LTRIM(RTRIM(@IN_imageCategory)) = '')
	        BEGIN
	        	RAISERROR('No se ingreso texto de la Categoria a modificar', 16, 1)
	        END;

        SELECT @UseIdImageCategory = C.id 
        FROM @Imagecategory C 
        WHERE LTRIM(RTRIM(C.name)) = LTRIM(RTRIM(@IN_imageCategory))
        AND C.erased = 0

        --previous existence
        IF (@UseIdImageCategory IS NULL)
            BEGIN
                RAISERROR('la Categoria "%s" no existe', 16, 1,@IN_imageCategory)
            END;


		-- TRANSACTION BEGIN
		IF @@TRANCOUNT = 0
		BEGIN
		    SET @transactionBegun = 1;
		    BEGIN TRANSACTION;
		END;

		-- edit of the Imagecategory
		UPDATE C
        SET name = LTRIM(RTRIM(@IN_newImageCategory))
        FROM @Imagecategory C
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