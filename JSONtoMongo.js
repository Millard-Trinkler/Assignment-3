'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var MongoClient = require('mongodb').MongoClient;


var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'),
    listingsData = require('./listings.json'), 
    config = require('./config');

/* Connect to your database */
mongoose.connect(config.db.uri);


function saveEntries(){
  var i = 0;
  for(i; i<listingsData.entries.length; i++){

    var listing = listingsData.entries[i];

    if(listing.coordinates){
      var entry = new Listing({ 
        code: listing.code,
        name: listing.name, 
        coordinates: {
          latitude: listing.coordinates.latitude,
          longitude: listing.coordinates.longitude
        },
        address: listing.address
      })
    }

    else{
      var entry = new Listing({ 
        code: listing.code,
        name: listing.name,
        address: listing.address
      })
    }


   entry.save(function(err){
      if(err) throw err;

      console.log('Entry Created!');
    })
  }
};

saveEntries();





/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */
 


/* 
  Once you've written + run the script, check out your MongoLab database to ensure that  it saved everything correctly. 
 */