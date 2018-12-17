/**
 * @Author: Edmund Lam <edl>
 * @Date:   22:03:49, 24-Nov-2018
 * @Filename: map_data.js
 * @Last modified by:   edl
 * @Last modified time: 00:28:09, 15-Dec-2018
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
    },
    actions: {
      0xFF0000: {
        dir:2,
        responses:[
          ["You don't need to sleep yet."],
          ["You look closely.", "It's still a bed."]
        ]
      },
      0x00FF00: {
        dir:1,
        responses:[
          ["There are books.", "But unfortunately you can't read."],
          ["You look behind the books.", "There are more books."]
        ]
      }
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
