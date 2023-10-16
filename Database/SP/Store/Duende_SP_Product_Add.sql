--------------------------------------------------------------------------
-- Author:      Paúl Rodríguez García
-- Date:        2023-10-11
-- Description: Adds a product to the store.
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_Product_Add]
    -- Parameters
    @IN_category            VARCHAR(32),
    @IN_name                VARCHAR(128),
    @IN_description         VARCHAR(512),
    @IN_imageUrl            VARCHAR(256),
    @IN_price               MONEY,
    @IN_weight              FLOAT,
    @IN_available           BIT
AS
BEGIN
    SET NOCOUNT ON;         -- No metadata returned

    -- ERROR HANDLING
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transactionBegun BIT = 0;

    -- VARIABLE DECLARATION
    DECLARE @categoryId INT = NULL;

    BEGIN TRY

        -- VALIDATIONS
        SET @IN_category = LTRIM(RTRIM(@IN_category));
        SET @IN_name = LTRIM(RTRIM(@IN_name));
        SET @IN_description = LTRIM(RTRIM(@IN_description));
        SET @IN_imageUrl = LTRIM(RTRIM(@IN_imageUrl));

        -- Category
        SELECT  @categoryId = PC.[id]
        FROM    [dbo].[ProductCategories] PC
        WHERE   PC.[description] = @IN_description
            AND PC.[deleted] = 0;

        IF @categoryId IS NULL
        BEGIN
            RAISERROR('No existe la categoría "%s"', 16, 1, @IN_description);
        END;

        -- Name
        IF @IN_name = ''
        BEGIN
            RAISERROR('Debe proporcionar un nombre', 16, 1);
        END;

        -- Description
        IF @IN_description = ''
        BEGIN
            RAISERROR('Debe proporcionar una descripción', 16, 1);
        END;

        -- Image URL
        IF @IN_imageUrl = ''
        BEGIN
            RAISERROR('Debe proporcionar una imagen', 16, 1);
        END;

        -- TRANSACTION BEGUN
        IF @@TRANCOUNT = 0
        BEGIN
            SET @transactionBegun = 1;
            BEGIN TRANSACTION;
        END;

            INSERT INTO [dbo].[Products]
            (
                [categoryId],
                [name],
                [description],
                [imageUrl],
                [price],
                [weight],
                [available],
                [deleted]
            )
            VALUES
            (
                @categoryId,
                @IN_name,
                @IN_description,
                @IN_price,
                @IN_weight,
                @IN_available,
                0
            );

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