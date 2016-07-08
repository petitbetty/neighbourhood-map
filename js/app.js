var map, infowindow, autocomplete, places;
var urls =['https://maps.gstatic.com/intl/en_us/mapfiles/marker.png','https://maps.gstatic.com/intl/en_us/mapfiles/marker_green.png'];
var markers = [];  

var errorMessage = ko.observable('');

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 53.548410, lng: 9.997090},
    zoom: 15
  });

infowindow = new google.maps.InfoWindow();

//markerListener();
ko.applyBindings(new viewModel());
}

//Class for location object
var Location = function(model) { 
  var self = this;
  
  self.name = ko.observable(model.name); 
  self.lng = ko.observable(model.lng); 
  self.lat = ko.observable(model.lat); 
  self.address = ko.observable(model.address); 
  self.phone = ko.observable(model.phone); 
  self.marker = new google.maps.Marker({
    position: {lat: model.lat, lng: model.lng},
    map: map,
    animation: google.maps.Animation.DROP,
    title:model.name
  });
  google.maps.event.addListener(self.marker,'click', function() {
      infowindow.setContent('<div><p>Name:<strong> '+ self.name()+ '</strong></p><p>Address:<strong> '+self.address() +'</strong></p><p>Telephone:<strong> '+ self.phone()+'</strong></p></div>');
      infowindow.open(map, this);

       if (this.getAnimation() !== null) {
         this.setAnimation(null);
        } else {
          this.setAnimation(google.maps.Animation.BOUNCE);
        }  

    });

  
  
}

//Click listener for marker
/*function markerListener() {
  for (var i = 0; i < viewModel.locationList().lenght; i++) {
    //var theLocation;
    google.maps.event.addListener(viewModel.locationList()[i].marker,'click', function() {
      console.log("cliked");
      infowindow.setContent('<div><p>Name:<strong> '+ viewModel.locationList()[i].name()+ '</strong></p><p>Address:<strong> '+viewModel.locationList()[i].address() +'</strong></p><p>Telephone:<strong> '+ viewModel.locationList()[i].phone()+'</strong></p></div>');
      infowindow.open(map, this);

       if (this.getAnimation() !== null) {
         this.setAnimation(null);
        } else {
          this.setAnimation(google.maps.Animation.BOUNCE);
        }  

     });
  }

}*/


Location.prototype.clickedName = function() {
  google.maps.event.trigger(this.marker, 'click');
  
};

  //creating a array of the li.


//hide marker function
Location.prototype.hideMarker = function() {
  console.log('hideMarker');
  // "this" is the current instance
  var self = this;
  self.marker.setVisible(false);
};

//Show marker funtion
Location.prototype.showMarker = function() {
  console.log('showMarker');
  // "this" is the current instance
  var self = this;
  self.marker.setVisible(true);
};





/*--- ViewModel ---*/
var viewModel = function() {

  var self = this;

  //create an abservable array for the locations
  self.locationList = ko.observableArray([]);
  self.filterText = ko.observable();
  
/* Generates a random number and returns it as a string for OAuthentication
 * @return {string}
 */
  function nonce_generate() {
    return (Math.floor(Math.random() * 1e12).toString());
  }

  var consumerSecret = 'eukvtXpjSVpHflSBfrIAx0BsupU',
      tokenSecret = 'X-d9JxoQQBXmr7_Q4FkITvVzk3k';
  var httpMethod = 'GET';
  var Yelp_url = 'https://api.yelp.com/v2/search/?',
      parameters = {
          oauth_consumer_key : '0TqRpmnRh5LnU36tggLf6Q',
          oauth_token : 'Tjjb2L_1j2OmRDugXvaY99jMeXM71lYm',
          oauth_nonce : nonce_generate(),
          oauth_timestamp : Math.floor(Date.now()/1000),
          oauth_signature_method : 'HMAC-SHA1',
          oauth_version : '1.0',
          callback: 'cb',
          location: 'Altstadt+hamburg',
          limit: '20',
          radius_filter: '500',
          term: 'museum',
          category_filter: 'museums'
      },

      // generates a RFC 3986 encoded, BASE64 encoded HMAC-SHA1 hash
      encodedSignature = oauthSignature.generate(httpMethod, Yelp_url , parameters, consumerSecret, tokenSecret),
      // generates a BASE64 encode HMAC-SHA1 hash
      signature = oauthSignature.generate(httpMethod, Yelp_url , parameters, consumerSecret, tokenSecret,
          { encodeSignature: false});


  var encodedSignature = oauthSignature.generate('GET',Yelp_url , parameters, consumerSecret, tokenSecret);
      parameters.oauth_signature = encodedSignature;
  //Error ajax message variable
  errorMessage = setTimeout(function(){
    $("#yelpElem").text("Error, failed to get yep resources");
  }, 8000);

  //yelp AJAX request goes here
    var settings = {
      url: Yelp_url,
      data: parameters,
      cache: true,                // This is crucial to include as well to prevent jQuery from adding on a cache-buster parameter "_=23489489749837", invalidating our oauth-signature
      dataType: 'jsonp',
      success: function(results) {
        var yelpresult = results.businesses;
         //var myPlaces = [];
        

        for(var i = 0; i < yelpresult.length; i++ ) {

          var museumModel = {
            name: yelpresult[i].name,
            lat: yelpresult[i].location.coordinate.latitude,
            lng: yelpresult[i].location.coordinate.longitude,
            phone: yelpresult[i].phone,
            address: yelpresult[i].location.address[0]
          }

          self.locationList.push(new Location(museumModel)); 
            
        }

        console.log(self.locationList());
        
        clearTimeout(errorMessage);
      }
    };

    // Send AJAX query via jQuery library.
    $.ajax(settings);

  //the museums filter function
    self.filteredPlaces = ko.computed(function() {
        if(!self.filterText()){
         // self.locationList().hideMarker;
          return self.locationList();
          
        }
        else {
          
          return ko.utils.arrayFilter(self.locationList(), function(item){
            var filterResults = item.name().toLowerCase().indexOf(self.filterText()) > -1;
            return filterResults;
           // self.locationList().showMarker;
            
          });
        }
    });

  self.filteredPlaces();

 
}
