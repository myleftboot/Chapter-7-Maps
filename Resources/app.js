// All source code Copyright 2013 Cope Consultancy Services. All rights reserved


// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create base root window
//
var win1 = Titanium.UI.createWindow({  
    backgroundColor:'#fff'
});

function isLocationAuthorized(_args) {
    //check that we are allowed to use
    var retVal = true;
    if (!Ti.Geolocation.locationServicesEnabled) return false;
    
    if (Ti.Platform.name === 'iPhone OS') {
      // Explain to the user why we are going to use the location services.
    
      Ti.Geolocation.purpose = _args.purpose;
      var authorization = Titanium.Geolocation.locationServicesAuthorization;
      
      if (authorization == Titanium.Geolocation.AUTHORIZATION_DENIED) {
      	// user has decided to not allow this use of location
      	retVal = false;
      }
      else if (authorization == Titanium.Geolocation.AUTHORIZATION_RESTRICTED) {
      	// a device restriction prevents us from using location services
      	retVal = false;
      } else retVal = true;
    }
    return retVal;
    
};

function getLocation(_args) {
    // we dont ned to be any more accurate than this
    // ACCURACY_LOW is one of the few settings that work with both Android and iOS
    // see the Ti API documentation
    Ti.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_LOW;

    Ti.Geolocation.getCurrentPosition(function(e)
    {
       if (!e.success || e.error)
       {
          alert('error ' + JSON.stringify(e.error));
       }
       if (_args.success) _args.success(e.coords)

    });
     
};

function updateMap(_args) {
	theMap.setLocation({latitude : _args.latitude
		               ,longitude : _args.longitude});
}
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

if (isLocationAuthorized({purpose:'To show your location on the map'})) {
	getLocation({success : updateMap});
};

theMap.addAnnotation(tourmalet);
win1.add(theMap);
win1.open();
