import Ember from 'ember';

export default Ember.Route.extend({
  
  ajax: Ember.inject.service(),
  
  model() {
    var fullRequest = "http://spotcrime.com/feed/search.php?searchQuery=cdate%3D05%252F08%252F2016%26cdate1%3D05%252F13%252F2016%26keyword%3D%26ctype%255B29%255D%3D1%26ctype%255B26%255D%3D1%26ctype%255B30%255D%3D1%26ctype%255B23%255D%3D1%26ctype%255B21%255D%3D1%26ctype%255B25%255D%3D1%26ctype%255B22%255D%3D1%26ctype%255B24%255D%3D1&reloadZoom=&zoom=12&ne_lat=43.13150660626061&ne_lng=-89.27624750170901&sw_lat=42.994803187230815&sw_lng=-89.52515649829104&area_id=madison&callback=stcCallback1001&_=1463165631332";
    
    return this.get('ajax').request(fullRequest, {
      dataType: "jsonp"
    });
  },
  
  setupController(controller, model) {

    var result = [];

    model.crimeList.forEach((current, index) => {

      var curGeoJson = {};

      curGeoJson.type = "Feature";

      var properties = {};
      properties["Primary ID"] = Math.random() * 5;
      properties["Secondary ID"] = current.caddress + ", " + current.ccity;

      var geometry = {};
      geometry.type = "Point";
      geometry.coordinates = [current.clongitude,current.clatitude];

      curGeoJson.properties = properties;
      curGeoJson.geometry = geometry;

      result[index] = curGeoJson;

    });
    
    controller.set('mapModel', result);
  }
  
});
