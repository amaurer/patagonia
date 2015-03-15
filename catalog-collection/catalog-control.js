"use strict";

var fs = require("fs");
var catalog = {};
var imagePath = "";


module.exports = function buildCatalog(imagePath){

	var n, nn, i, data, fileSplit, root, files, temp;
	//read this directory, build catalog, loop image directory and assign

	// NEW
	root = "public/catalog";
	files = fs.readdirSync(root);
	for (i = files.length - 1; i >= 0; i--) {
		if(files[i].indexOf("-lg.") === -1) continue;
		fileSplit = files[i].split(".");
		if(fileSplit[1] !== "jpg") continue;
		temp = fileSplit[0].toLowerCase().split("-").splice(0,2);
		if(catalog[temp[0]] == null) catalog[temp[0]] = [];
		catalog[temp[0]].push(temp[1]);
	};

	return catalog;



	// INDEX CATALOG
	// OLD CATALOG
	root = "catalog-collection";
	files = fs.readdirSync(root);
	for (i = files.length - 1; i >= 0; i--) {
		fileSplit = files[i].split(".");
		if(fileSplit[1] !== "json") continue;
		data = JSON.parse(fs.readFileSync("./" + root + "/" + files[i]));
		temp = {};
		for(n in data){
			temp[n] = {};
			temp[n].title = n;
			temp[n].description = data[n];
			temp[n].images = [];
		}
		catalog[fileSplit[0]] = temp;
	};

	// IMAGE ASSIGNMENT
	root = "public/catalog";
	files = fs.readdirSync(root);
	for (i = files.length - 1; i >= 0; i--) {
		fileSplit = files[i].split(".");
		if(fileSplit[1] !== "jpg") continue;

		// matching logic
		temp = fileSplit[0].toLowerCase().split("-").splice(0,2);
		for(n in catalog){
			var counter = 0;
			for(nn in catalog[n]){
				if(nn.toLowerCase().indexOf(temp[1]) !== -1){
					counter++
					if(counter >1) console.log(nn, temp[1] + "-" + temp[0], counter)
					catalog[n][nn].images.push(files[i]);
				} else {
					//console.log("NOT FOUND!!!! " + files[i])
				};
			};
		};

	};

	return catalog;

	// Missing Images
	for(n in catalog){
		for(nn in catalog[n]){
			if(catalog[n][nn].images.length === 0){
				console.log(catalog[n][nn].title + " -- MISSING IMAGES!!!");
			}
		};
	};



}