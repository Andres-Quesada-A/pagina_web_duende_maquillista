--------------------------------------------------------------------------
-- Author:      Paúl Rodríguez García
-- Date:        2023-10-11
-- Description: Lists all products in the store.
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_Product_List]
AS
BEGIN
    SET NOCOUNT ON;         -- No metadata returned

    -- ERROR HANDLING
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);

    BEGIN TRY

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
        WHERE   P.[deleted] = 0;

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