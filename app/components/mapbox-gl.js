import Ember from 'ember';
import mapboxgl from 'npm:mapbox-gl';

export default Ember.Component.extend({
  attributeBindings: ['id'],

  id: Ember.computed.alias('selector'),

  _initHeatMap(map) {
    var pointsArray = this.get('data');
    var data =  {
        "type": "FeatureCollection",
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
        "features": pointsArray
    };

    map.on('load', function(){

        // Add a new source from our GeoJSON data and set the
        // 'cluster' option to true.
        map.addSource("crimes", {
            type: "geojson",
            data: data,
            cluster: true,
            clusterMaxZoom: 15, // Max zoom to cluster points on
            clusterRadius: 20 // Use small cluster radius for the heatmap look
        });

        var layers = [
            [0, 'green'],
            [8, 'orange'],
            [18, 'red']
        ];

        layers.forEach(function (layer, i) {
            map.addLayer({
                "id": "cluster-" + i,
                "type": "circle",
                "source": "crimes",
                "paint": {
                    "circle-color": layer[1],
                    "circle-radius": 70,
                    "circle-blur": 1 // blur the circles to get a heatmap look
                },
                "filter": i === layers.length - 1 ?
                    [">=", "point_count", layer[0]] :
                    ["all",
                        [">=", "point_count", layer[0]],
                        ["<", "point_count", layers[i + 1][0]]]
            }, 'waterway-label');
        });

        map.addLayer({
            "id": "non-cluster-markers",
            "type": "circle",
            "source": "crimes",
            "paint": {
                "circle-color": 'rgba(0,255,0,0.5)',
                "circle-radius": 20,
                "circle-blur": 1
            },
            "filter": ["!=", "cluster", true]
        }, 'waterway-label');
    });
  },

  didInsertElement() {
    this._super(...arguments);

    let selector = this.get('selector');

    mapboxgl.accessToken = 'pk.eyJ1IjoibHVjZ3JheSIsImEiOiJjaWxpM3VjcmsydHVudjZtMHR0eGYzMTd0In0.R0Hi7W-vRakpM2xmMAXbzw';
    var map = new mapboxgl.Map({
      container: selector,
      style: 'mapbox://styles/mapbox/light-v9'
    });

    this._initHeatMap(map);
  }
});
