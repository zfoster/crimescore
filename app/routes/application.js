import Ember from 'ember';

export default Ember.Route.extend({
  
  ajax: Ember.inject.service(),
  
  model() {
    
    //var base = 'http://spotcrime.com/feed/search.php?';
    //var beginSearchQuery = 'searchQuery=';
    //var beginDateToken = 'cdate';
    //var endDateToken = 'cdate1';
    //var begin = '04/01/2016';
    //var end = '05/13/2016';
    //var types = 'ctype[30]=1&ctype[25]=1&ctype[22]=1&ctype[24]=1';
    //var extras = 'ne_lat=34.62537360668766&ne_lng=-117.37998075085449&sw_lat=34.54835254568556&sw_lng=-117.5044352491455&area_id=ca/adelanto';
       
    //var allDate = '&' + beginDateToken + '=' + encodeURIComponent(begin) + '&' + endDateToken + '=' + encodeURIComponent(end);
    //var allSearchQuery = allDate + encodeURIComponent(types) + encodeURIComponent(extras);
    
    //console.log
    //console.log(encodeURI(allSearchQuery));
   
   var fullRequest = "http://spotcrime.com/feed/search.php?searchQuery=cdate%3D05%252F08%252F2016%26cdate1%3D05%252F13%252F2016%26keyword%3D%26ctype%255B29%255D%3D1%26ctype%255B26%255D%3D1%26ctype%255B30%255D%3D1%26ctype%255B23%255D%3D1%26ctype%255B21%255D%3D1%26ctype%255B25%255D%3D1%26ctype%255B22%255D%3D1%26ctype%255B24%255D%3D1&reloadZoom=&zoom=12&ne_lat=43.13150660626061&ne_lng=-89.27624750170901&sw_lat=42.994803187230815&sw_lng=-89.52515649829104&area_id=madison&callback=stcCallback1001&_=1463165631332";
    //'http://spotcrime.com/feed/search.php?searchQuery=cdate%3D04%242F09%252F2016%26cdate1%3D05%252F12%252F2016%26keyword%3D%26ctype%255B30%255D%3D1%26ctype%255B25%255D%3D1%26ctype%255B22%255D%3D1%26ctype%255B24%255D%3D1&reloadZoom=&zoom=13&ne_lat=34.62537360668766&ne_lng=-117.37998075085449&sw_lat=34.54835254568556&sw_lng=-117.5044352491455&area_id=ca%2Fadelanto&callback=stcCallback1001&_=1463157051348';
    
    
    
    
    //what we want!!
    
// {
//       "type": "Feature",
//       "geometry": {
//         "type": "Point",
//         "coordinates": [125.6, 10.1]
//       },
//       "properties": {
//            "Primary ID" : "1.0",
//            "Secondary ID" : "Dinagat Islands"
//       }
//}
    
    //what we have!!
//{
//   "cdid": "76850822",
//   "calc_date": "05/12/2016",
//   "calc_time": "11:56 PM",
//   "clatitude": "43.07221300000000",
//   "clongitude": "-89.39003090000000",
//   "cdescription": "Weapons Violations",
//   "caddress": "4XX W MIFFLIN ST",
//   "ccity": "Madison",
//   "cid": "30",
//   "cname": "Assault",
//   "icon": "30",
//   "reference": "",
//   "reference_id": "",
//   "type": "C",
//   "sid": "76850822-91bde07047ebaa28140197f8c23a716a",
//   "user": ""
// }
    
    return this.get('ajax').request(fullRequest, {
      dataType: "jsonp"
    });
  },
  
  afterModel(model) {

    var result = [];

    model.crimeList.forEach((current, index) => {

      var curGeoJson = {};

      curGeoJson.type = "Feature";

      var properties = {};
      properties["Primary ID"] = "1.0";
      properties["Secondary ID"] = current.caddress + ", " + current.ccity;

      var geometry = {};
      geometry.type = "Point";
      geometry.coordinates = [current.clongitude,current.clatitude];

      curGeoJson.properties = properties;
      curGeoJson.geometry = geometry;

      result[index] = curGeoJson;

    });
    
    //return result;
    this.set('model', result);
  }
  
});
