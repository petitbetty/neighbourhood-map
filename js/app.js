var map, service, infowindow;
var museumlist = [];
var markers = [];
var $search = $('.search');
var $list = $('#list');
//var navElem = $('#bs-example-navbar-collapse-1');
var museumIcon = 'https://maps.gstatic.com/mapfiles/place_api/icons/museum-71.png';
//var markerIcon = 'https://maps.gstatic.com/intl/en_us/mapfiles/marker.png';
var musuems;
var input = /** @type {!HTMLInputElement} */(
      document.getElementById('autocomplete'));
//var $infoContent ='<div id="infoWindow-wrapper"><div id="info-content"><p>Name:<strong data-bind="text: museumName"></strong></p><p>Address:<strong data-bind="text: museumAddress"></strong></p><p>Telephone:<strong data-bind="text: museumTelephone"></strong></p><p>Website:<strong data-bind="text: museumWebsite"></strong></p> </div></div>';
  var $infoContent = $('#infowindow');

function initMap() {
  var hamburg = {lat: 53.548410, lng: 9.997090};

  map = new google.maps.Map(document.getElementById('map'), {
    center: hamburg,
    zoom: 15
  });

  infowindow = new google.maps.InfoWindow({content: $infoContent});
    
  

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: hamburg,
    radius: 600,
    type: ['museum']
  }, callback); 


}


//Creating the markers of the found museums
function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      
      //markers = createMarker(results[i]);
      $list.append( "<li id='museum"+ i +"'><img src='"+museumIcon+"' alt='museum icon' class='museumIcon'><h5 class='name'>" +results[i].name+"</h5></li>" );
      createMarker(results[i]);
      //console.log(results[i]);
      //Adding the found museum on the museumList array
      museumlist.push(results[i].name);
      // Creating and adding an element to the page at the same time.
     
    }
    myBinding()
  }   

}
//console.log(markers);
//Create a marker for each museum found,
function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    animation: google.maps.Animation.DROP 
   });

  //Displaying info-window with the clicked museum info.
  google.maps.event.addListener(marker, 'click', function() {
    //infowindow.setContent($infoContent);
    //open info window.
    infowindow.open(map, this);
  });

}


//creating a array of the li.
function myBinding(){
  var liArray = $("li").toArray();
  for (var i = 0; i< liArray.length; i++) {
    $("#"+liArray[i].id).click(function(){ 
      $(this).addClass('clicked-li').siblings().removeClass('clicked-li');
    });
  }
  
  $('.listElem').click(function(){
    //$(this).css({"backgroundColor":"#ccc","color":"#a94442"});
  });
  //$li.style.backgroundColor = (i % 2 === 0 ? '#F0F0F0' : '#FFFFFF');
  //$li.onclick = function() {
   // google.maps.event.trigger(place, 'click');
  //};
}

  //create and add the filter form to the search field
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

//Array of the museums in the list use for the autocomplete
var museums = [
  'Kunstkontakt e. V.',
  'Bischofsturm' ,
  'Gerhard D.Wempe KG' ,
  'Kaffeemusuem-Burg' ,
  'Deutsches Zollmuseum',
  'CHOCOVERSUM Schokoladen - Museum',
  'Bucerius Kunst Forum',
  'Dialog im Stillen',
  'Art Business Clud Prima Gallerina',
  'Genuss Speicher',
  'Chokoladen Museum',
  'Dinner in the Dark'

  ];
  // Create the autocomplete object and associate it with the UI input control.
  $('#autocomplete').autocomplete({
      source: museums
  });

function model() {

  
}

function view(){
  

    
}

