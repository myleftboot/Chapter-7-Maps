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

// now get the directions from the bottom to the top
    var url = "http://maps.googleapis.com/maps/api/directions/json?origin=Luz-Saint-Sauveur,+France&destination=42.908655,0.145054&sensor=false";
    xhr = Titanium.Network.createHTTPClient();
    xhr.open('GET',url);
    xhr.onload = function(){
        // Now parse the XML 
        
        var theData = JSON.parse(this.responseText);
        //alert(this.responseText);
        alert(theData.routes[0].legs.length);
        for (var aLeg=0; aLeg < theData.routes[0].legs.length; aLeg++) {
        	var points = [];
alert(theData.routes[0].legs[aLeg].distance.text);
        	for (var aStep=0; aStep< theData.routes[0].legs[aLeg].steps.length; aStep++) {
        		alert('here');
        		alert(theData.routes[0].legs[aLeg].steps[aStep].end_location.lat);
        		var endLoc = theData.routes[0].legs[aLeg].steps[aStep].end_location;
        	}
        }
        //alert(theData.routes.legs.steps.end_location[0]);
        //routes/legs/steps/end_location
/*        var points = [];
        var coords = xml.documentElement.getElementsByTagName("LineString");
        for(var cc=0; cc < coords.length; cc++) {
            var line = coords.item(cc);
            var str = line.firstChild.text.split(" ");
            for(dd = 0; dd < str.length; dd++) {
                var loc = str[dd].split(',');
                if(loc[0] && loc[1]) {
                    points.push({latitude: loc[1], 
                         longitude: loc[0]});
                }
            }
        }
        var route = {
                name:"boston",
                points:points,
                color:"red",
                width:4
            };
 
        // add a route
        map.addRoute(route);*/
    };  
    xhr.send();



//theMap.addAnnotation(tourmalet);
win1.add(theMap);
win1.open();
