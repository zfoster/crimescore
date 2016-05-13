import Ember from 'ember';
import mapboxgl_heatmap from 'npm:mapboxgl-heatmap';

/* globals mapboxgl */

export default Ember.Component.extend({
  attributeBindings: ['id'],

  id: Ember.computed.alias('selector'),

  msgRec(msg) {
    var latlng = new mapboxgl.LatLng(msg.lat, msg.lng);
    var point = this.get('map').project(latlng);
    this.get('heatmap').addPoint(point.x, point.y, 25, 0.5);
  },

  _initHeatMap() {
    let map = this.get('map');
    // Add heatmap to the map
    this.set('heatmap', mapboxgl_heatmap.heatmap(map));

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.Navigation());

    //bootstrap web socket
    webSocket.on('data', this.msgRec);
  },

  didInsertElement() {
    this._super(...arguments);

    let selector = this.get('selector');

    mapboxgl.accessToken = 'pk.eyJ1IjoibHVjZ3JheSIsImEiOiJjaWxpM3VjcmsydHVudjZtMHR0eGYzMTd0In0.R0Hi7W-vRakpM2xmMAXbzw';
    var map = new mapboxgl.Map({
      container: selector,
      style: 'mapbox://styles/lucgray/cili41xp900ad9gm3p45c6zxr'
    });

    this.set('map', map);
    this._initHeatMap();
  }
});
