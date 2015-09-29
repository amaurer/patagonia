
var IDB = require("image-database")
var imdb = new IDB("./public/catalog/", "_", function(e, catalog){
    if(e != null){
        console.warn(e);
    } else {
        // console.log(catalog.public.catalog.beds)
        require("./catalog-collection/catalog-control")(catalog)
    }
})

var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");


var routes = require("./routes/index");
var about = require("./routes/about");
var contact = require("./routes/contact");
var editorial = require("./routes/editorial");

var app = express();

var hbs = require("hbs");
hbs.registerPartials(__dirname + "/views/partials");
hbs.handlebars.registerHelper("toUpperCase", function(str) {
  return str.toUpperCase().replace(/\_/g, " ").replace(/\-/g, " ").replace(/\|/g, "<br />");
});
hbs.handlebars.registerHelper("carriageReturnOnPipe", function(str) {
  return str.replace(/|/g, "<br>").replace(/\-/g, " ");
});


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + "/public/images/favicon.png"));
// app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

app.use("/public", express.static(__dirname + "/public"));

app.use(function(req, res, next){
    req.imdb = imdb
    next()
})

app.use("/", routes);
app.use("/about", about);
app.use("/contact", contact);
app.use("/editorial", editorial);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error("Page Not Found");
    err.status = 404;
    next(err);
});


// development error handler
// will print stacktrace
if (app.get("env") === "development") {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render("error", {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
        message: err.message,
        error: {}
    });
});


module.exports = app;
