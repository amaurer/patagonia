var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
  res.render("index", { title: "Welcome - " });
});

router.get("/products/:section/", function(req, res) {
  // Remove plural
  var temp = req.params.section;
  if(req.params.section.substr(req.params.section.length-1) === "s"){
  	temp = req.params.section.substr(0, req.params.section.length -1);
  };
  res.render("catalog", {
  	//title: req.params.section.substr(0,1).toUpperCase() + req.params.section.substr(1),
  	title: req.params.section,
  	data : global.catalogCollection[temp],
  	section : temp
  });
});

router.get("/products/:section/:product/", function(req, res) {
  // Remove plural
  var temp = req.params.section;
  if(req.params.section.substr(req.params.section.length-1) === "s"){
  	temp = req.params.section.substr(0, req.params.section.length -1);
  };
  res.render("product", {
  	title: req.params.product,
  	data : global.catalogCollection[temp][req.params.product],
  	section : temp,
  	product : req.params.product
  });
});

/*
router.get("/beds/", function(req, res) {
  res.render("catalog", { title: "Beds", data : global.catalogCollection.beds, section : "beds" });
});
router.get("/sofas/", function(req, res) {
  res.render("catalog", { title: "Sofas", data : global.catalogCollection.sofas, section : "sofas" });
});
router.get("/occasional-chairs/", function(req, res) {
  res.render("catalog", { title: "Occasional Chairs", data : global.catalogCollection["occasional-chairs"], section : "occasional-chairs" });
});
router.get("/dining-chairs-bonquetes/", function(req, res) {
  res.render("catalog", { title: "Dining Chairs and Banquetes", data : global.catalogCollection["dining-chairs-tables"], section : "dining-chairs-tables" });
});
router.get("/chase-ottoman/", function(req, res) {
  res.render("catalog", { title: "Chases and Ottomans", data : global.catalogCollection["chases-ottoman"], section : "chases-ottoman" });
});
router.get("/chase-goods/", function(req, res) {
  res.render("catalog", { title: "Chase Goods", data : global.catalogCollection["chase-goods"], section : "chase-goods" });
});

router.get("/products/:section/:product", function(req, res) {
  res.render("product", { title: "", data : global.catalogCollection[req.params.section][req.params.product] });
});
*/


module.exports = router;