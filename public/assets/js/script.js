$(document).ready(function() {
    initMap();
    $('#location').focus();
});

function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 13.7244425, lng: 100.3529026},
        zoom: 13
    });

    var input = (document.getElementById('location'));

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var marker     = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    var infoWindow = new google.maps.InfoWindow({map: map});

    // Try HTML5 geolocation.
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here.');
            map.setCenter(pos);

        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
      
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
    }

    autocomplete = new google.maps.places.Autocomplete(input);

    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        $('#search').trigger('click'); 
    });

    $('#search').on('click', function () {
        searchInLocation();
    });

}

function searchInLocation()
{

    var geocoder  = new google.maps.Geocoder();
    var address   = $('#location').val();

    geocoder.geocode({
        'address': address
    }, function (results, status) {

        if (status == google.maps.GeocoderStatus.OK) {

            var latitude  = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            var relocate  = new google.maps.LatLng(latitude, longitude);

            var mapOptions = {
                 zoom:      12,
                 center:    latlng,
                 mapTypeId: google.maps.MapTypeId.ROADMAP
             }

             map = new google.maps.Map(document.getElementById('map'), mapOptions);

             var latlng = new google.maps.LatLng(latitude, longitude);
             map.setCenter(latlng);

            tweetsInLocation(latitude, longitude);

        } else {
            alert('No data found. Please try again!!');
        }
    });
}

function tweetsInLocation(latitude, longitude) {

    var markersList = [];
    
    $.ajax({
        dataType : 'json',
        url : '/search?latitude='+latitude+'&longitude='+longitude,
        success : function(json){

            $.each(json,function(k,v){
        
                if(v.place != null){
                    
                    var latitude        = v.place.bounding_box.coordinates[0][0][1];
                    var longitude       = v.place.bounding_box.coordinates[0][0][0];
                    var screen_name     = v.user.screen_name
                    var tweetText       = v.text;
                    var profileImageURL = v.user.profile_image_url;
                    var acc             = v.user.screen_name

                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(latitude, longitude),
                        map: map,
                        title: tweetText,
                        icon: profileImageURL
                    });

                    markersList.push(marker);
                    var content    = '@'+acc + ' Tweet : '+tweetText+'<br /> When : '+v.created_at;  
                    var infowindow = new google.maps.InfoWindow();
                    
                    google.maps.event.addListener(marker, 'click', (function (marker, content, infowindow) {
                        return function () {
                            infowindow.setContent(content);
                            infowindow.open(map, marker);
                        };
                    })(marker, content, infowindow)); 
                }
            });

        },error: function(){
            // show error message
            console.log("No response from the server!");
        }
        
    });
}