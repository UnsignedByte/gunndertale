/**
 * @Author: Edmund Lam <edl>
 * @Date:   22:03:49, 24-Nov-2018
 * @Filename: map_data.js
 * @Last modified by:   edl
 * @Last modified time: 12:59:39, 26-Nov-2018
 */

var MAP_DATA = {
  "test_bg":{
    doors:{
      0xFF0000:["test_bg", 370-24, 110],
      0xFFFF00:["test_bg", 250-12, 251-32],
      0x00FF00:["test_bg", 6, 110],
      0x0000FF:["test_bg", 250-12, 5]
    }
  }
}

Object.keys(MAP_DATA).forEach(key => {
  let types = ["back", "front", "map"]
  for (let i = 0; i < types.length; i++){
    let img = new Image();
    img.src = "../images/map/"+key+"/"+key+"-"+types[i]+".png";
    img.onload = function() {
      MAP_DATA[key][types[i]] = img
    }
  }
});
