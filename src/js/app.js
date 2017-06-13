$(window).scroll(function() {
  var scrolledY = $(window).scrollTop();
  $('.central-pic').css('background-position', 'left ' + ((scrolledY)) + 'px');
});




// Adding Google Maps

function initMap() {
        var notaria = {lat: -11.998234, lng: -77.054965};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: notaria,
          zoom: 18
        });
        var marker = new google.maps.Marker({
          position: notaria,
          map: map,
          title: 'Notaría Beatriz Zevallos Giampietri'
        });


    var infoContent = '<div class="col-xs-6"><div> <span class="info-contacto"> Dirección: </span> Avenida Las Violetas' +
    ' Nº 782, Independencia, </br> Lima, Perú. </br> <span class="info-contacto"> Teléfono: </span> +511 485 2526</div>' +
    '<span class="info-contacto">Horario de atencion: </span> </br> L-V: 9:00 a.m. - 6:00 p.m. Sáb: 9:00 a.m. - 1:00 p.m.</div>'
    var largeInfowindow = new google.maps.InfoWindow();

    marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
          });

      function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          // Clear the infowindow content to give the streetview time to load.
          infowindow.setContent('');
          infowindow.marker = marker;

          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
          var streetViewService = new google.maps.StreetViewService();
          var radius = 75;
          // In case the status is OK, which means the pano was found, compute the
          // position of the streetview image, then calculate the heading, then get a
          // panorama from that and set the options
          function getStreetView(data, status) {
            if (status == google.maps.StreetViewStatus.OK) {
              var nearStreetViewLocation = data.location.latLng;
              var heading = google.maps.geometry.spherical.computeHeading(
                nearStreetViewLocation, marker.position);
                infowindow.setContent('<div class = "info-content"> <div class = "row info-title">' + marker.title + '</div><div class= row><div class="col-xs-6" id="pano"></div>' +
                						 infoContent + '</div></div>' );
                var panoramaOptions = {
                  position: nearStreetViewLocation,
                  pov: {
                    heading: heading,
                    pitch: 30
                  }
                };
              var panorama = new google.maps.StreetViewPanorama(
                document.getElementById('pano'), panoramaOptions);
            } else {
              infowindow.setContent('<div>' + marker.title + '</div>' +
                '<div>No Street View Found</div>');
            }
          }
          // Use streetview service to get the closest streetview image within
          // 50 meters of the markers position
          streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
          // Open the infowindow on the correct marker.
          infowindow.open(map, marker);
        }
      }
}

// Footer positioning

var mapaHeight =$('.mapa-container').height();
var spacing = 300 - mapaHeight + 30;
$('footer').css({'margin-top': spacing});


// Recalculate footer when window screen is changed
$( window ).resize(function(){
	var mapaHeight =$('.mapa-container').height();
	var spacing = 300 - mapaHeight + 30;
	$('footer').css({'margin-top': spacing});
});

