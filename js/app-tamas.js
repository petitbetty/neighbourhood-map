var map, infowindow;
var myMuseums = [];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 53.548410, lng: 9.997090},
    zoom: 15
  });

infowindow = new google.maps.InfoWindow();
    
ko.applyBindings(new viewModel());
}


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
    title:model.name
  });
  
}

Location.prototype.hideMarker = function() {
  // "this" is the current instance
  var self = this;
  self.marker.setVisible(false);
};

Location.prototype.showMarker = function() {
  // "this" is the current instance
  var self = this;
  self.marker.setVisible(true);
};


/*--- ViewModel ---*/
var viewModel = function() {

  var self = this;

  //create an abservable array for the locations
  self.locationList = ko.observableArray();
  self.filter = ko.observable();
  self.markers = ko.observableArray();


  ko.utils.stringStartsWith = function (string, startsWith) {         
    string = string || "";
    if (startsWith.length > string.length)
      return false;
      return string.substring(0, startsWith.length) === startsWith;
  },

  self.filteredPlaces = ko.computed(function() {
    // return array, string
   /*  self.filter ==  $('input').val();//the current value of the input in the DOM
    var tempArray = [];
    self.locationList().forEach(function(location) {
      // location matches filter?
      if(!self.filter){
        // NO: location.hideMarker();
        //location.hideMarker();

      } else {
        // YES: push location to tempArray
        tempArray.push(location);
        return ko.utils.arrayFirst(tempArray, function(location) {
            return ko.utils.stringStartsWith(location.name().toLowerCase(), self.filter());
            console.log(self.filter);

        });
      }
    });
     
  
    // loop through locations and push tempArray
    // return tempArray
    */

    
  });

  self.filteredPlaces();


  // console.log(locationList[0]);

  // self.locationList().forEach(function(location) {
  //   location.hideMarker();
  // });

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

  //yelp AJAX request goes here
      var settings = {
        url: Yelp_url,
        data: parameters,
        cache: true,                // This is crucial to include as well to prevent jQuery from adding on a cache-buster parameter "_=23489489749837", invalidating our oauth-signature
        dataType: 'jsonp',
        success: function(results) {
         var yelpresult = results.businesses;

          for(var i = 0; i < yelpresult.length; i++ ) {
              //console.log( results.businesses[i].name +" " + results.businesses[i].location.coordinate.longitude); // server response
              //myMuseums.push(yelpresult[i].name);
              //console.log(yelpresult[i]);
              var museumModel = {
                name: yelpresult[i].name,
                lat: yelpresult[i].location.coordinate.latitude,
                lng: yelpresult[i].location.coordinate.longitude,
                phone: yelpresult[i].phone,
                address: yelpresult[i].location.address
              }
              self.locationList.push(new Location(museumModel));
              /*markers.push(self.locationList.marker);
               google.maps.event.addListener(markers[i],'click', function() {
                infowindow.setContent(self.locationList.name);
                infowindow.open(map, this);
              })*/
              
          }
          //console.log(markers.length);
          
          
          

        
         /* google.maps.event.addListener(marker,'click', function() {
            infowindow.setContent(model.name);
            infowindow.open(map, this);
          });
          */
          

          //console.log(myMuseums);


        },
        fail: function() {
          // Do stuff on fail
        }
      };

      // Send AJAX query via jQuery library.
      $.ajax(settings);
  
}
