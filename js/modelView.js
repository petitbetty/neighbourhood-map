
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


function AppViewModel() {
    this.museumName = ko.observable("Bucerius");
    this.museumAddress = ko.observable("22880 Wedel");
    this.museumTelephone = ko.observable("0122-2121-232");
    this.museumWebsite = ko.observable("http:www.bucerius.com");


}    


// Activates knockout.js
var vm = new AppViewModel();
ko.applyBindings(vm, document.getElementById("infoWindow-wrapper"));


