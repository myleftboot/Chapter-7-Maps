// All source code Copyright 2013 Cope Consultancy Services. All rights reserved


// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create base root window
//
var win1 = Titanium.UI.createWindow({  
    backgroundColor:'#fff'
});

var theMap = Titanium.Map.createView({
			mapType: Ti.Map.SATELLITE_TYPE,
			region: {latitude:42.909134, longitude:0.145054, 
					  latitudeDelta:0.01, longitudeDelta:0.01},
			animate:true,
			regionFit:true,
		});
		
var tourmalet = Titanium.Map.createAnnotation({
	latitude:42.908655,
	longitude:0.145054,
	title:"Col du Tourmalet",
	subtitle:'France',
	pincolor:Titanium.Map.ANNOTATION_RED,
	animate:true
});

function addRouteToMap(_args) {
        var points = [];        
        for (var aLeg=0; aLeg < _args.routes[0].legs.length; aLeg++) {

        	for (var aStep=0; aStep< _args.routes[0].legs[aLeg].steps.length; aStep++) {
        		// add the end location of every step of the route to the array of points
        		points.push({latitude: _args.routes[0].legs[aLeg].steps[aStep].end_location.lat
        		            ,longitude: _args.routes[0].legs[aLeg].steps[aStep].end_location.lng
        		           });
        	}
        }

        var route = {
                name:"The climb",
                points:points,
                color:"red",
                width:4
            };
 
        // add a route
        theMap.addRoute(route);
}

// now get the directions from the bottom to the top
var url = "http://maps.googleapis.com/maps/api/directions/json?origin=Luz-Saint-Sauveur,+France&destination=42.908655,0.145054&sensor=false";
xhr = Titanium.Network.createHTTPClient();
xhr.open('GET',url);
xhr.onload = function(){
	// Now parse the XML 

	var theData = JSON.parse(this.responseText);
	addRouteToMap(theData);
};
xhr.send();


//theMap.addAnnotation(tourmalet);
win1.add(theMap);
win1.open();
