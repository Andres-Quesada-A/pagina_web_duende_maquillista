--------------------------------------------------------------------------
-- Author:      Paúl Rodríguez García
-- Date:        2023-10-11
-- Description: Lists all products in the store.
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_Product_List]
    @IN_limit INT = NULL
AS
BEGIN
    SET NOCOUNT ON;         -- No metadata returned

    -- ERROR HANDLING
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);

    BEGIN TRY

        IF (@IN_limit IS NULL) OR (@IN_limit < 1)
        BEGIN
            SELECT  P.[id],
                    PC.[description] AS 'category',
                    P.[name],
                    P.[description],
                    P.[imageUrl],
                    P.[price],
                    P.[available]
            FROM    [dbo].[Products] P
            JOIN    [dbo].[ProductCategories] PC
                ON  P.[categoryId] = PC.[id]
            WHERE   P.[deleted] = 0
        END
        ELSE
        BEGIN
            SELECT  TOP (@IN_limit)
                    P.[id],
                    PC.[description] AS 'category',
                    P.[name],
                    P.[description],
                    P.[imageUrl],
                    P.[price],
                    P.[available]
            FROM    [dbo].[Products] P
            JOIN    [dbo].[ProductCategories] PC
                ON  P.[categoryId] = PC.[id]
            WHERE   P.[deleted] = 0
        END

    END TRY
    BEGIN CATCH

        SET @ErrorNumber = ERROR_NUMBER();
        SET @ErrorSeverity = ERROR_SEVERITY();
        SET @ErrorState = ERROR_STATE();
        SET @Message = ERROR_MESSAGE();

        RAISERROR('%s - Error Number: %i', 
            @ErrorSeverity, @ErrorState, @Message, @ErrorNumber);

    END CATCH;
END;