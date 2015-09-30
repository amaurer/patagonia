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
    grouping : "products",
    showSmall : showSmall(section)
  });
});
router.get("/products/:section/:product/", function(req, res) {
  var section = "/public/catalog/" + req.params.section + "/"
  var data = req.imdb.find(section + req.params.product)
  var prevNext = getPrevNext(req.imdb, section, req.params.product)
  res.render("product", {
    title: titleCase(req.params.product),
    data : data,
    showSmall : showSmall(req.params.section),
    prevNext : prevNext
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
      || section.indexOf("fabrics") !== -1
  )
}
function getPrevNext(imdb, section, product){
  var data = imdb.find(section)
  var tempA = []
  for(var n in data){
    tempA.push(n)
  }
  tempA = tempA.sort()
  var indexOfProduct = tempA.indexOf(product)
  return {
    next : tempA[(indexOfProduct === tempA.length-1)? 0 : indexOfProduct + 1]
    ,prev : tempA[(indexOfProduct === 0)? tempA.length-1 : indexOfProduct - 1]
  }
}

module.exports = router;