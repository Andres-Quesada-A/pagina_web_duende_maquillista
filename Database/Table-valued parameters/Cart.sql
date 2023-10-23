--------------------------------------------------------------------------
-- Autor:       Fabián Vargas
-- Fecha:       2023-10-22
-- Descripción: TVP for cart
--------------------------------------------------------------------------

CREATE TYPE CartTVP AS TABLE(
	productId INT NOT NULL,
    amount INT NOT NULL
)