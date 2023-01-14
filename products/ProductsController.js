const express = require("express");
const router = express.Router();
const Product = require("./Product");

router.get("/product", (req, res) => {
    res.render("product");
});


router.get("/admin/products", (req, res) => {
    res.render("admin/products/index");
});

router.get("/admin/products/register", (req, res) => {
    res.render("admin/products/register");
});

router.post("/products/save", (req, res) => {
    var name = req.body.name;
    var codbar = req.body.codbar;
    var color = req.body.color;
    var size = req.body.size;
    var marca = req.body.marca;
    
    Product.create({
        name: name,
        cod_barra: codbar,
        color: color,
        size: size,
        marca: marca
    }).then(() =>{
        res.redirect("/admin/products/register")
    })
});

router.get("/admin/products/:id", (req, res) => {

    var id = req.params.id;

    Product.findOne({
        where: {cod_barra: id}
    }).then(product => {
        if(product != undefined){
            res.render("admin/products/finder", {
                product: product
            });
        } else {
            res.redirect("/");
        }
    });
});

router.get("/product/:id", (req, res) => {

    var id = req.params.id;

    Product.findOne({
        where: {cod_barra: id}
    }).then(product => {
        if(product != undefined){
            res.render("finder", {
                product: product
            });
        } else {
            res.redirect("/");
        }
    });
});


router.post("/admin/search", (req, res) =>{
    var codigo = req.body.codigo;

    Product.findOne({
        where: {cod_barra: codigo}
    }).then(product =>{
        res.redirect("products/" + codigo)
    })
});

router.post("/search", (req, res) =>{
    var codigo = req.body.codigo;

    Product.findOne({
        where: {cod_barra: codigo}
    }).then(product =>{
        res.redirect("product/" + codigo)
    })
});


module.exports = router;