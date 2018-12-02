/**
 * @Author: Edmund Lam <edl>
 * @Date:   22:03:49, 24-Nov-2018
 * @Filename: map_data.js
 * @Last modified by:   edl
 * @Last modified time: 16:34:17, 01-Dec-2018
 */

var MAP_DATA = {
  "test_bg":{
    doors:{
      0xFF0000:["test_bg_2", 740, 120],
      0x0000FF:["test_bg", 320, 25],
      0x00FF00:["bedroom", 10, 120],
      0xFFFF00:["test_bg", 320, 290]
    }
  },
  "test_bg_2":{
    doors:{
      0xFF0000:["test_bg", 450, 150],
      0x0000FF:["test_bg", 11, 150]
    }
  },
    "bedroom": {
        doors: {
            0xffff00: ["test_bg", 11, 150]
        }
    }
}

Object.keys(MAP_DATA).forEach(key => {
  let types = ["back", "front", "map"]
  for (let i = 0; i < types.length; i++){
    let img = new Image();
    img.src = "../images/map/"+key+"/"+key+"-"+types[i]+".png";
    img.onload = function() {
      MAP_DATA[key][types[i]] = img;
    }
  }
});
