--------------------------------------------------------------------------
-- Autor:       Luis Fernando Molina
-- Fecha:       2023-09-03
-- Descripci�n: Tabla para pasar lista de tags posibles
--------------------------------------------------------------------------

CREATE TYPE Tags AS TABLE(
	tags VARCHAR(32) NOT NULL
)