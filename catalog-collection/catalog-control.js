"use strict";

var fs = require("fs");
var catalog = {};
var imagePath = "";


module.exports = function buildCatalog(imagePath){

	var n, nn, nnn, i, x, data, fileSplit, root, files, temp, catalogIndex;
	//read this directory, build catalog, loop image directory and assign

	// NEW
	root = "public/catalog";
	files = fs.readdirSync(root);
	for (i = files.length - 1; i >= 0; i--) {
		if(files[i].indexOf("-lg.") === -1) continue;
		fileSplit = files[i].split(".");
		if(fileSplit[1] !== "jpg") continue;
		temp = fileSplit[0].toLowerCase().split("-")
		if(temp.length === 4){
			temp = [temp[0], temp[1] + "-" + temp[2]]
		} else {
			temp = temp.splice(0,2);
		}
		if(catalog[temp[0]] == null) catalog[temp[0]] = {};
		catalog[temp[0]][temp[1]] = ""
	};

	var catalogIndex = JSON.parse(fs.readFileSync("./catalog-collection/catalog-all.json"));

	data = {}
	// New LOGIC
	for(n in catalog){
		// BED
		for(nn in catalogIndex){
			// blah chaise : size
			if(nn.toUpperCase().indexOf(n.toUpperCase()) !== -1){
				// IF has bed in it
				for(nnn in catalog[n]){
					// find names in catalog
					if(nn.toUpperCase().indexOf(nnn.toUpperCase()) !== -1){
						catalog[n][nnn] = catalogIndex[nn];
					}
				};
			};
		};

	};
	//console.log(catalog)
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