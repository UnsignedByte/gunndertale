/**
 * @Author: Edmund Lam <edl>
 * @Date:   22:03:49, 24-Nov-2018
 * @Filename: map_data.js
 * @Last modified by:   edl
 * @Last modified time: 15:24:29, 09-Feb-2019
 */

var MAP_DATA = {
  "test_bg":{
    doors:{
      0xFF0000:["bedroom", 127, 157],
      0x0000FF:["test_bg_2", 740, 120],
      0x00FF00:["test_bg_2", 10, 120],
      0xFFFF00:["test_bg", 320, 290]
    }
  },
  "test_bg_2":{
    doors:{
      0xFF0000:["test_bg", 450, 150],
      0x0000FF:["test_bg", 320, 290]
    }
  },
  "bedroom": {
    doors: {
      0xFFFF00: ["test_bg", 11, 150]
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
      },
      0x0000FF: {
        dir:1,
        responses:[
          //["On the desk you see...", [
          //  ["A lamp."], ["A Chemistry Textbook."], ["A Chromebook."]]],
          //["There is a desk.", "It reminds you of studying.", "You are filled with \"Boredom\"!"],
          ["You can study.", "Will you study?", {
            "yes":["You studied.", "Your intelligence didn't increase."],
            "no":["You didn't study."],
            "maybe":["You thought about studying."],
            "????":["You couldn't come to a decision."],
          }]
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
