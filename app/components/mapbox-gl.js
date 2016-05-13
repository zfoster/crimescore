import Ember from 'ember';

/* globals mapboxgl */

export default Ember.Component.extend({
  attributeBindings: ['id'],

  id: Ember.computed.alias('selector'),

  data: {
    "type": "FeatureCollection",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": [
      { "type": "Feature", "properties": { "Primary ID": "1.3", "Secondary ID": "110km NW of Talkeetna, Alaska" }, "geometry": { "type": "Point", "coordinates": [ -151.4235, 63.109 ] } },
      { "type": "Feature", "properties": { "Primary ID": "3.1", "Secondary ID": "18km NW of Medford, Oklahoma" }, "geometry": { "type": "Point", "coordinates": [ -97.8529, 36.9421 ] } }
    ]
  },



  _initHeatMap(map) {
    var data = this.get('data');
    map.on('load', function(){

        // Add a new source from our GeoJSON data and set the
        // 'cluster' option to true.
        map.addSource("earthquakes", {
            type: "geojson",
            // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
            // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
            data: data,
            cluster: true,
            clusterMaxZoom: 15, // Max zoom to cluster points on
            clusterRadius: 20 // Use small cluster radius for the heatmap look
        });

        // Use the earthquakes source to create four layers:
        // three for each cluster category, and one for non-clustered markers

        // Each point range gets a different fill color.
        var layers = [
            [0, 'green'],
            [20, 'orange'],
            [200, 'red']
        ];

        layers.forEach(function (layer, i) {
            map.addLayer({
                "id": "cluster-" + i,
                "type": "circle",
                "source": "earthquakes",
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
            "source": "earthquakes",
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
      style: 'mapbox://styles/lucgray/cili41xp900ad9gm3p45c6zxr'
    });

    this._initHeatMap(map);
  }
});
