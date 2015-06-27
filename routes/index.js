var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
  res.render("index", { title: "Welcome - " });
});

router.get("/products/:section/", function(req, res) {
  // Remove plural
  var section = handlePlural(req.params.section);
  res.render("catalog", {
  	//title: req.params.section.substr(0,1).toUpperCase() + req.params.section.substr(1),
  	title: req.params.section,
  	data : global.catalogCollection[section],
  	section : section,
    grouping : "products"
  });
});
router.get("/products/:section/:product/", function(req, res) {
  // Remove plural
  var section = handlePlural(req.params.section);
  res.render("product", {
    title: req.params.product,
    data : global.catalogCollection[section][req.params.product],
    section : section,
    product : req.params.product
  });
});


router.get("/upholstery/:section/", function(req, res) {
  // Remove plural
  var section = handlePlural(req.params.section);
  var sectionSubName = section.split("-")[section.split("-").length - 1];
  res.render("catalog", {
    title: req.params.section,
    data : global.catalogCollection[sectionSubName],
    section : sectionSubName,
    grouping : "upholstery",
    padded : true
  });
});
router.get("/upholstery/:section/:product/", function(req, res) {
  // Remove plural
  var section = handlePlural(req.params.section);
  var sectionSubName = section.split("-")[section.split("-").length - 1];
  res.render("product", {
    title: req.params.product,
    data : global.catalogCollection[sectionSubName][req.params.product],
    section : sectionSubName,
    showSmall : true,
    product : req.params.product
  });
});


function handlePlural(phrase){
  // I know this is crazy....
  if(phrase.substr(phrase.length-3) === "ses" || phrase.substr(phrase.length-3) === "les"){
    phrase = phrase.substr(0, phrase.length -1);
  } else if (phrase.substr(phrase.length-2) === "es"){
    phrase = phrase.substr(0, phrase.length -2);
  } else if (phrase.substr(phrase.length-1) === "s"){
    phrase = phrase.substr(0, phrase.length -1);
  }
  return phrase;
}

/*
router.get('/beds/', function(req, res) {
  res.render('catalog', { title: "Beds - ", data : global.catalogCollection.beds, section : "beds" });
});
router.get('/sofas/', function(req, res) {
  res.render('catalog', { title: "Sofas - ", data : global.catalogCollection.sofas, section : "sofas" });
});
router.get('/occasional-chairs/', function(req, res) {
  res.render('catalog', { title: "Occasional Chairs - ", data : global.catalogCollection["occasional-chairs"], section : "occasional-chairs" });
});
router.get('/dining-chairs-bonquetes/', function(req, res) {
  res.render('catalog', { title: "Dining Chairs and Banquetes - ", data : global.catalogCollection["dining-chairs-tables"], section : "dining-chairs-tables" });
});
router.get('/chase-ottoman/', function(req, res) {
  res.render('catalog', { title: "Chases and Ottomans - ", data : global.catalogCollection["chases-ottoman"], section : "chases-ottoman" });
});
router.get('/chase-goods/', function(req, res) {
  res.render('catalog', { title: "Chase Goods - ", data : global.catalogCollection["chase-goods"], section : "chase-goods" });
>>>>>>> 463816272b8414aa806e787dc0d303bfc1d5a202
});

router.get("/products/:section/:product", function(req, res) {
  res.render("product", { title: "", data : global.catalogCollection[req.params.section][req.params.product] });
});
*/


module.exports = router;