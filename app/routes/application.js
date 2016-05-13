import Ember from 'ember';

export default Ember.Route.extend({
  
  ajax: Ember.inject.service(),
  
  
  
  model() {
    
    
    
    var all = 'http://spotcrime.com/feed/search.php?searchQuery=cdate%3D04%242F09%252F2016%26cdate1%3D05%252F12%252F2016%26keyword%3D%26ctype%255B30%255D%3D1%26ctype%255B25%255D%3D1%26ctype%255B22%255D%3D1%26ctype%255B24%255D%3D1&reloadZoom=&zoom=13&ne_lat=34.62537360668766&ne_lng=-117.37998075085449&sw_lat=34.54835254568556&sw_lng=-117.5044352491455&area_id=ca%2Fadelanto&callback=stcCallback1001&_=1463157051348';
    
    return this.get('ajax').request(all, {
      dataType: "jsonp"
    });
  }
});
