var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: "Welcome - " });
});


router.get('/beds/', function(req, res) {
  res.render('catalog', { title: "Beds", data : global.catalogCollection.beds, section : "beds" });
});
router.get('/sofas/', function(req, res) {
  res.render('catalog', { title: "Sofas", data : {} });
});
router.get('/occasional-chairs/', function(req, res) {
  res.render('catalog', { title: "Occasional Chairs", data : {} });
});
router.get('/dining-chairs-bonquetes/', function(req, res) {
  res.render('catalog', { title: "Dining Chairs and Banquetes", data : {} });
});
router.get('/chase-ottoman/', function(req, res) {
  res.render('catalog', { title: "Chases and Ottomans", data : {} });
});
router.get('/chase-goods/', function(req, res) {
  res.render('catalog', { title: "Chase Goods", data : {} });
});
router.get('/product/:catalog/:product', function(req, res) {
  res.render('product', { title: "", data : global.catalogCollection[req.params.catalog][req.params.product] });
});


module.exports = router;