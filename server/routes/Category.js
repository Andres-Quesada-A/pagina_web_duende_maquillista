const express = require("express");  //copiado de AP
const router = express.Router();  //copiado de AP
const { pool, sqlcon } = require("../settings/database.js");  //copiado de AP
const manejarError = require("../settings/errores.js");  //copiado de AP
const estaAutenticado = require("../settings/autenticado.js");  //copiado de AP
const { MAX } = require("mssql");  //copiado de AP

//descripcion: lista las categorias de las imagenes
//parametros: 
//Retorna: nombre
//SP : Duende_SP_ImageCategory_List
router.get("/", (req, res) => {
    const request = pool.request();

    request.execute("Duende_SP_ImageCategory_List", (error, result) => {
        if (error) {
            manejarError(res, error);
        } else {
            res.setHeader("Content-Type", "application/json").send(
                result.recordset[0]["results"]
            );
        }
    });
});

//descripcion: agrega una categoria
//parametros: nombre
//Retorna: NULL
//SP :Duende_SP_ImageCategory_Add
router.post("/add", (req, res) => {
    const categoryName = req.body.categoryName;
    const request = pool.request();

    try {
        request.input("IN_imageCategory", sqlcon.VarChar(32), categoryName);
    } catch (error) {
        console.log(error);
        return res.status(400).send({ mensaje: "Datos inválidos" });
    }

    request.execute("Duende_SP_ImageCategory_Add", (error, result) => {
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
//SP : Duende_SP_ImageCategory_Delete
router.delete("/delete", (req, res) => {
    const categoryName = req.query.categoryName;

    //if (!estaAutenticado(req, true, true, carnet)) {
    //    return res.status(403).send({ mensaje: "Acceso denegado" });
    //}
    const request = pool.request();
    try {
        request.input("IN_imageCategory", sqlcon.VarChar(32), categoryName);
    } catch (error) {
        return res.status(400).send("Identificador invalido");
    }

    request.execute("Duende_SP_ImageCategory_Delete", (error, result) => {
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
//SP : Duende_SP_ImageCategory_Edit
router.put("/edit", (req, res) => {
    const categoryName = req.body.categoryName;
    const newCategoryName = req.body.newCategoryName;

    //if (!estaAutenticado(req, true, true, carnet)) {
    //    return res.status(403).send({ mensaje: "Acceso denegado" });
    //}
    const request = pool.request();
    try {
        request.input("IN_imageCategory", sqlcon.VarChar(32), newCategoryName);
        request.input("IN_newImageCategory", sqlcon.VarChar(32), categoryName);
    } catch (error) {
        return res.status(400).send("Identificador invalido");
    }

    request.execute("Duende_SP_ImageCategory_Edit", (error, result) => {
        if (error) {
            manejarError(res, error);
        } else {
            res.status(200).send({ mensaje: "Eliminado con éxito." });
        }
    });
});


module.exports = router;