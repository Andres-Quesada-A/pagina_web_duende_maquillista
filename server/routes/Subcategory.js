const express = require("express");  //copiado de AP
const router = express.Router();  //copiado de AP
const { pool, sqlcon } = require("../settings/database.js");  //copiado de AP
const manejarError = require("../settings/errores.js");  //copiado de AP
const estaAutenticado = require("../settings/autenticado.js");  //copiado de AP
const { MAX } = require("mssql");  //copiado de AP

//descripcion: lista las categorias de las imagenes
//parametros: nombrecategoria
//Retorna: lista de subcategorias
//SP : Duende_SP_ImageSubcategory_List
router.get("/", (req, res) => {
    const categoryName = req.query.categoryName;
    const request = pool.request();

    try {
        request.input("IN_imageCategory", sqlcon.VarChar(32), categoryName);
    } catch (error) {
        console.log(error);
        return res.status(400).send({ mensaje: "Datos inválidos" });
    }

    request.execute("Duende_SP_ImageSubcategory_List", (error, result) => {
        if (error) {
            manejarError(res, error);
        } else {
            res.setHeader("Content-Type", "application/json").send(
                result.recordset[0]["results"]
            );
        }
    });
});

//descripcion: agrega una subcategoria
//parametros: nombrecategoria, nombresubcategoria
//Retorna: NULL
//SP :Duende_SP_ImageSubcategory_Add
router.post("/add", (req, res) => {
    const subcategoryName = req.body.subcategoryName;
    const categoryName = req.body.categoryName;
    const request = pool.request();

    try {
        request.input("IN_imageCategory", sqlcon.VarChar(32), categoryName);
        request.input("IN_imageSubcategory", sqlcon.VarChar(32), subcategoryName);
    } catch (error) {
        console.log(error);
        return res.status(400).send({ mensaje: "Datos inválidos" });
    }

    request.execute("Duende_SP_ImageSubcategory_Add", (error, result) => {
        if (error) {
            manejarError(res, error);
        } else {
            res.status(200).send({ mensaje: "Agregado con éxito" });
        }
    });
});

//descripcion: elimina la categoria
//parametros: name
//Retorna: NULL
//SP : Duende_SP_ImageSubcategory_Delete
router.delete("/delete", (req, res) => {
    const subcategoryName = req.query.subcategoryName;
    const categoryName = req.query.categoryName;
    const request = pool.request();

    try {
        request.input("IN_imageCategory", sqlcon.VarChar(32), categoryName);
        request.input("IN_imageSubcategory", sqlcon.VarChar(32), subcategoryName);
    } catch (error) {
        return res.status(400).send("Identificador invalido");
    }

    request.execute("Duende_SP_ImageSubcategory_Delete", (error, result) => {
        if (error) {
            manejarError(res, error);
        } else {
            res.status(200).send({ mensaje: "Eliminado con éxito." });
        }
    });
});

//descripcion: edita la categoria
//parametros: name, newname
//Retorna: NULL
//SP : Duende_SP_ImageSubcategory_Edit
router.put("/edit", (req, res) => {
    const newSubcategoryName = req.body.newSubcategoryName;
    const subcategoryName = req.body.subcategoryName;
    const categoryName = req.body.categoryName;

    IN_imagenewsubcategory
    const request = pool.request();
    try {
        request.input("IN_imageCategory", sqlcon.VarChar(32), categoryName);
        request.input("IN_imageSubcategory", sqlcon.VarChar(32), subcategoryName);
        request.input("IN_newImageSubcategory", sqlcon.VarChar(32), newSubcategoryName);
    } catch (error) {
        return res.status(400).send("Identificador invalido");
    }

    request.execute("Duende_SP_ImageSubcategory_Edit", (error, result) => {
        if (error) {
            manejarError(res, error);
        } else {
            res.status(200).send({ mensaje: "Eliminado con éxito." });
        }
    });
});


module.exports = router;