var map, service, infowindow;
var input = /** @type {!HTMLInputElement} */(
      document.getElementById('autocomplete'));
var infoWindow;
var $search = $('.search');
var $list = $('#list');
var myMuseums = [];
var museumIcon = 'https://maps.gstatic.com/mapfiles/place_api/icons/museum-71.png';

var museumlist = [
{
  name:"Deutsches Zollmuseum",
  lat: 53.5458558223613,
  lng: 9.99780874916624
},
{
  name:"10. Nacht Der Kirchen",
  lat: 53.5458,
  lng: 9.99448
},
{
  name:"Galerie Peter Borchardt",
  lat: 53.5482245,
  lng: 9.9989131
},

{
  name:"Wilfried Bobsien",
  lat: 53.548621,
  lng: 9.997361
},
{
  name:"Galerie Commeter Persiehl & Co.",
  lat: 53.55092,
  lng: 9.995273
},
{
  name:"Galerie Commeter Sommer & Co.",
  lat: 53.5509911,
  lng: 9.9950304
},
{
  name:"Kaffeemuseum Burg",
  lat: 53.5447541998337,
  lng: 9.99679114669561
},


]; 

var Location = function(model) { 
    this.name = ko.observable(model.name);   
    this.lng = ko.observable(model.lng); 
    this.lat = ko.observable(model.lat);    
    //this.marker = new google.maps.Marker({}); 
};  

function initMap() {

  var hamburg = {lat: 53.548410, lng: 9.997090};

  map = new google.maps.Map(document.getElementById('map'), {
    center: hamburg,
    zoom: 15
  });

  for (var i = 0; i < museumlist.length; i++) {
    //Creating new marker object for each site.        
    marker = new google.maps.Marker({
      position: {lat: museumlist[i].lat, lng: museumlist[i].lng},
      map: map,
      title:museumlist[i].name
      });
  }

  // creating the infoWindow 
  infoWindow = new google.maps.InfoWindow({
  });

ko.applyBindings(new viewModel());
}

/*--- ViewModel ---*/
var viewModel = function() {

  //var self = this;

  //create an abservable array for the locations
  this.locationList = ko.observable([]);

  //iterating through the array of objects, and adding each museum to the locationList array and 
  //passing each museum to the location constructor.(creating new cat basically)
  museumlist.forEach(function(museum){
    //this.locationList.push(new Location(museum) );
  });

  function nonce_generate() {
    return (Math.floor(Math.random() * 1e12).toString());
  }
  //var hamburg = {lat: 53.548410, lng: 9.997090};
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
              myMuseums.push(yelpresult[i].name);
             
          }
          console.log(myMuseums);
          

        },
        fail: function() {
          // Do stuff on fail
        }
      };

      // Send AJAX query via jQuery library.
      $.ajax(settings);







}

/* Generates a random number and returns it as a string for OAuthentication
 * @return {string} 
 */


  //Search function create and add the filter form to the search field
  $(input).change(function(){

    //Get the value of the input, which we filter on
    var filter = $(this).val();

    if(filter) {
      $(list).find("li:not(:Contains(" + filter + "))").slideUp();
      $(list).find("li:Contains("+filter+")").slideDown();
    } else {
      $(list).find("li").slideDown();
    }
    

  }).keyup(function(){
    //Fire the above change event after every letter
    $(this).change();
  });

//Solving the case sensitive for the user input.
  jQuery.expr[':'].Contains = function(a,i,m){
    return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
};

  // Create the autocomplete object and associate it with the UI input control.
  $('#autocomplete').autocomplete({ 
      source: museumlist
    });

  /*
    //creating a array of the li.
function myBinding(){
  var liArray = $("li").toArray();
  for (var i = 0; i< liArray.length; i++) {
    $("#"+liArray[i].id).click(function(){ 
      $(this).addClass('clicked-li').siblings().removeClass('clicked-li');
    });
  }
  
} */

