var express = require("express");
var router = express.Router();
var titleCase = require("title-case")

router.get("/", function(req, res) {
  res.render("index", { title: "Welcome - " });
});


router.get("/products/:section/", function(req, res) {
  var data = [req.imdb.find(req.url.replace("/products", "/public/catalog"))]
  var section = req.params.section;
  if(isFinishes(section)){
      section = "finishes"
      data.push(req.imdb.find("/public/catalog/nail-heads"))
  }
  res.render("catalog", {
    title: titleCase(data.title),
    data : data,
    grouping : "products"
  });
});
router.get("/products/:section/:product/", function(req, res) {
  res.render("product", {
    title: titleCase(req.params.product),
    data : req.imdb.find("/public/catalog/" + req.params.section + "/" + req.params.product),
    showSmall : showSmall(req.params.section)
  });
});

function isFinishes(section){
  return (section.indexOf("finishes") !== -1)
}
function showSmall(section){
  return (
      section.indexOf("finishes") !== -1
      || section.indexOf("nail-heads") !== -1
      || section.indexOf("vinyls") !== -1
  )
}

module.exports = router;