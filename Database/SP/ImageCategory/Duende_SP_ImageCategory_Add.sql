--------------------------------------------------------------------------
-- Autor:       Luis Fernando Molina
-- Fecha:       2023-09-03
-- Descripci�n: adition of a Imagecategoria
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_ImageCategory_Add]
    -- Parameters,
	@IN_imageCategory VARCHAR(32)
AS
BEGIN
    SET NOCOUNT ON;

    -- Errors control
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transactionBegun BIT = 0;

    -- Variables declaration

    BEGIN TRY
        -- Validations

		--validacion de Administradora(necesaria?)

        IF(LTRIM(RTRIM(@IN_imageCategory)) = '')
	        BEGIN
	        	RAISERROR('No se ingresó texto para la categoría.', 16, 1)
	        END;

        --palabras reservadas
        IF(LTRIM(RTRIM(@IN_imageCategory)) = 'seleccione')
	        BEGIN
	        	RAISERROR('La categoría "%s" es inválida.', 16, 1,@IN_imageCategory)
	        END;


        --previous existence
        IF EXISTS (SELECT 1 FROM [dbo].ImageCategories C WHERE LTRIM(RTRIM(C.description)) = LTRIM(RTRIM(@IN_imageCategory)) AND C.deleted = 0)
            BEGIN
                RAISERROR('La categoría "%s" ya existe.', 16, 1,@IN_imageCategory)
            END;


		-- TRANSACTION BEGIN
		IF @@TRANCOUNT = 0
		BEGIN
		    SET @transactionBegun = 1;
		    BEGIN TRANSACTION;
		END;

		INSERT INTO [dbo].ImageCategories (
			description,
			deleted
		)
		VALUES(
			LTRIM(RTRIM(@IN_imageCategory)),
			0
		);

		-- COMMIT OF THE TRANSSACTION
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
            -- If it is not a personalised error
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