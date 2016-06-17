
 /*function loadData() {

    
    var $yelpElem = $('yelpElem');

    //Your NY Times AJAX request goes here
   /*var nytimesUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + $city + '&sort=newest&api-key=9e9bb9ce5431476596f9c75e59a36f6e';
    //console.log(nytimesUrl);

     $.getJSON(nytimesUrl, function(data) {

        $nytHeaderElem.text('New York Times Articles about ' + $city);

        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">' +
                '<a href="' + article.web_url + '">' + article.headline.main + '</a>' +
                '<p>' + article.snippet + '</p>' +
                '</li>');
        }
    }).error(function(){
        $nytHeaderElem.text('New York Times Articles Could NOT BE LOADED due to error!');
    });*/

    //yelp AJAX request goes here
    /* var yelpUrl = 'https://api.yelp.com/v2/search?term=museums&location=hamburg&radius_filter=750';
     var yelpRequestTimeout = setTimeout(function(){
        $yelpElem.text("failed to get wikipedia resources");
     }, 8000);
     $.ajax({
        url: yelpUrl,
        dataType: "jsonp",
        //jsonp:"callback",
        success: function(response) {
            var articlesList = response[6];

            for (var i = 0; i < articlesList.length; i++) {
                articleStr =articlesList[i];

                //var url = 'https://en.wikipedia.org/wiki/' + articleStr;
                $yelpElem.append('<li><a href="">' + articleStr + '</a>,</li>');
            }
            clearTimeout(wikiRequestTimeout);
        }
     });
return false;
}


$('#form-container').submit(loadData); */


var mmyMuseums =[];
/* Generates a random number and returns it as a string for OAuthentication
 * @return {string} 
 */
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
        radius_filter: '750',
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
        for(var i = 0; i < results.businesses.length; i++ ) {
            //console.log( results.businesses[i] ); // server response
            mmyMuseums.push(results.businesses[i].name);


        }
        console.log(mmyMuseums);
        console.log( results.businesses.length );

        
      },
      fail: function() {
        // Do stuff on fail
      }
    };

    // Send AJAX query via jQuery library.
    $.ajax(settings);



function AppViewModel() {
    this.museumName = ko.observable("Bucerius");
    this.museumAddress = ko.observable("22880 Wedel");
    this.museumTelephone = ko.observable("0122-2121-232");
    this.museumWebsite = ko.observable("http:www.bucerius.com");


}    


// Activates knockout.js
var vm = new AppViewModel();
ko.applyBindings(vm, document.getElementById("infoWindow-wrapper"));


