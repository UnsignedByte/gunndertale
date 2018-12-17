/**
 * @Author: Edmund Lam <edl>
 * @Date:   22:03:49, 24-Nov-2018
 * @Filename: map_data.js
 * @Last modified by:   edl
 * @Last modified time: 16:34:17, 01-Dec-2018
 */

var MAP_DATA = {
  "hallway":{
    doors:{
      0xFF0000:["bedroom", 127, 155]
    }
  },
    "bedroom": {
        doors: {
            0xffff00: ["hallway", 327, 88] //y would be 59 in a perfect world :(
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
