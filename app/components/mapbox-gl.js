import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    this._super(...arguments);

    let selector = this.get('selector');
    debugger;

    mapboxgl.accessToken = '<your access token here>';
    var map = new mapboxgl.Map({
      container: selector,
      style: 'mapbox://styles/mapbox/streets-v8'
    });
  }
});
