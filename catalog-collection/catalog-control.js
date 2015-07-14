"use strict";

var fs = require("fs");
var catalog = {};
var imagePath = "";


module.exports = function buildCatalog(data){

	var n, nn, ni, nnn, i, x, data, fileSplit, root, files, temp, catalogIndex, catName;
	var catalogIndex = JSON.parse(fs.readFileSync("./catalog-collection/catalog-all.json"));
	var catalog = data.public.catalog

	data = {}
	// New LOGIC
	for(ni in catalog){
		for(n in catalog[ni]){

			// BED
			for(nn in catalogIndex){
				// blah chaise : size
				if(nn.toUpperCase().indexOf(n.split("-").shift().toUpperCase()) !== -1){
					// IF has bed in it
					catalog[ni][n].desc = catalogIndex[nn];
					// for(nnn in catalog[n]){
					// 	// find names in catalog
					// 	if(nn.toUpperCase().indexOf(nnn.name.toUpperCase()) !== -1){
					// 		catalog[n][nnn.name] = catalogIndex[nn];
					// 	}
					// };
				};
			};

		};
	};
	// console.log(catalog)
	return catalog;
}