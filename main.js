import 'ol/ol.css';
import 'ol-ext/control/Permalink.css'
import 'ol-ext/control/Search.css'
import 'ol-ext/control/Swipe.css'
import Map from 'ol/map';
import View from 'ol/view';
import ol_Scaleline from 'ol/control/scaleline'
import Permalink from 'ol-ext/control/Permalink';
import SearchNominatim from 'ol-ext/control/SearchNominatim'
import ol_layer_Tile from 'ol/layer/tile'
import ol_source_OSM from 'ol/source/osm'
import ol_source_Stamen from 'ol/source/stamen'
import ol_control_Swipe from 'ol-ext/control/Swipe';

// Layers
var osm = new ol_layer_Tile({
  source: new ol_source_OSM()
  });
var stamen = new ol_layer_Tile({
  source: new ol_source_Stamen({
    layer: 'watercolor'
  })
  });
var label = new ol_layer_Tile({
  source: new ol_source_Stamen({
    layer: 'terrain-labels'
  })
  });

var map = new Map({
            target: 'map',
            layers: [osm, stamen, label],
            view: new View({
              center: [0, 30],
              zoom: 4
            })
          });

// Control
var ctrl = new ol_control_Swipe();

// Set stamen on left
ctrl.addLayer(stamen);
// OSM on right
ctrl.addLayer(osm, true);
map.addControl(ctrl);

map.addControl(new ol_Scaleline())
map.addControl(new Permalink())

// Search control
const search = new SearchNominatim();
// Move to the position on selection in the control list
search.on('select', function(e) {	
  // console.log(e);
  map.getView().animate({
    center: e.coordinate,
    zoom: Math.max (map.getView().getZoom(),16)
  });
});
map.addControl(search);
