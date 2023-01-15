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
    var estoque = req.body.estoque
    
    Product.create({
        name: name,
        cod_barra: codbar,
        color: color,
        size: size,
        marca: marca,
        estoque: estoque
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

router.post("/admin/products/delete", (req, res) => {
    var id = req.body.id;

    if(id != undefined) {
        if(!isNaN(id)) {
            Product.destroy({
                where: {
                    id: id
                }
            }).then(() =>{
                res.redirect("/admin/products");
            });

        }else{// Não for um numero
            res.redirect("/admin/products");
        }
    }else{//NULL
        res.redirect("/admin/products");
    }
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

router.get("/admin/stock", (req, res) => {
    Product.findAll().then(product =>{
        res.render("admin/products/stock", {
            product: product
        });
    })

});

router.get("/stock", (req, res) => {
    Product.findAll().then(product =>{
        res.render("stock", {
            product: product
        });
    })

});

router.get("/admin/product/edit/:id", (req, res) => {
    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/admin/product");
    }
    Product.findByPk(id).then(product =>{
        if(product != undefined){
            res.render("admin/products/edit", {product: product})
        }else{
            res.redirect("/admin/products");
        }
    }).catch(erro => {
        res.redirect("/admin/products");
    });
});

router.post("/admin/products/update", (req, res) => {
    var id = req.body.id;
    var name = req.body.name;
    var codbar = req.body.codbar;
    var color = req.body.color;
    var size = req.body.size;
    var marca = req.body.marca;
    var estoque = req.body.estoque

    Product.update({
        name: name,
        cod_barra: codbar,
        color: color,
        size: size,
        marca: marca,
        estoque: estoque
    }, {
        where: {
            id:id
        }
    }).then(() => {
        res.redirect("/admin/products");
    });
})

module.exports = router;