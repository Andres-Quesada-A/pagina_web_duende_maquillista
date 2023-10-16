--------------------------------------------------------------------------
-- Author:      Paúl Rodríguez García
-- Date:        2023-10-11
-- Description: Deletes a category for products in the store.
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_ProductCategory_Delete]
    -- Parameters
    @IN_description         VARCHAR(32)
AS
BEGIN
    SET NOCOUNT ON;         -- No metadata returned

    -- ERROR HANDLING
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transactionBegun BIT = 0;

    -- VARIABLE DECLARATIONS
    DECLARE @categoryId INT = NULL;

    BEGIN TRY

        -- VALIDATIONS
        SET @IN_description = LTRIM(RTRIM(@IN_description));

        SELECT  @categoryId = PC.[id]
        FROM    [dbo].[ProductCategories] PC
        WHERE   PC.[description] = @IN_description
            AND PC.[deleted] = 0;

        IF @categoryId IS NULL
        BEGIN
            RAISERROR('No existe la categoría "%s"', 16, 1, @IN_description);
        END;

        -- TRANSACTION BEGUN
        IF @@TRANCOUNT = 0
        BEGIN
            SET @transactionBegun = 1;
            BEGIN TRANSACTION;
        END;

            UPDATE  PC
            SET     PC.[deleted] = 1
            FROM    [dbo].[ProductCategories] PC
            WHERE   PC.[id] = @categoryId
                AND PC.[deleted] = 0;

        -- TRANSACTION COMMITTED
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