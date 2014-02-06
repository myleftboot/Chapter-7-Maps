// All source code Copyright 2013 Cope Consultancy Services. All rights reserved


// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var Map = require('ti.map');
// create base root window
//
var win1 = Titanium.UI.createWindow({  
    backgroundColor:'#fff'
});

var theMap = Map.createView({
			mapType:   Map.SATELLITE_TYPE,
			region:    {latitude:42.909134, longitude:0.145054, 
					    latitudeDelta:0.01, longitudeDelta:0.01},
			animate:   true,
			regionFit: true,
		});
		
var tourmalet = Map.createAnnotation({
	latitude:   42.908655,
	longitude:  0.145054,
	title:      "Col du Tourmalet",
	subtitle:   'France',
	pincolor:   Map.ANNOTATION_RED,
	animate:    true
});

theMap.addAnnotation(tourmalet);
win1.add(theMap);
win1.open();
