--------------------------------------------------------------------------
-- Author:      Paúl Rodríguez García
-- Date:        2023-10-11
-- Description: Adds a category for products in the store.
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_ProductCategory_Add]
    -- Parameters
    @IN_description         VARCHAR(32)
AS
BEGIN
    SET NOCOUNT ON;         -- No metadata returned

    -- ERROR HANDLING
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transactionBegun BIT = 0;

    -- VARIABLE DECLARATIONS
    DECLARE @createdId INT = NULL;

    BEGIN TRY

        -- VALIDATIONS
        SET @IN_description = LTRIM(RTRIM(@IN_description));

        IF EXISTS(SELECT 1
                  FROM  [dbo].[ProductCategories] PC
                  WHERE PC.[description] = @IN_description
                    AND PC.[deleted] = 0)
        BEGIN
            RAISERROR('Ya existe la categoría "%s".', 16, 1, @IN_description);
        END;

        IF @IN_description = ''
        BEGIN
            RAISERROR('Debe proporcionar una descripción.', 16, 1);
        END;

        -- TRANSACTION BEGUN
        IF @@TRANCOUNT = 0
        BEGIN
            SET @transactionBegun = 1;
            BEGIN TRANSACTION;
        END;

            INSERT INTO [dbo].[ProductCategories]
            (
                [description],
                [deleted]
            )
            VALUES
            (
                @IN_description,
                0
            );

            SELECT @createdId = SCOPE_IDENTITY();

        -- TRANSACTION COMMITTED
        IF @transactionBegun = 1
        BEGIN
            COMMIT TRANSACTION;
        END;

        SELECT  PC.[description]
        FROM    [dbo].[ProductCategories] PC
        WHERE   PC.[deleted] = 0
            AND PC.[id] = @createdId;

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
            -- Non-custom errors are logged in the Errors table
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