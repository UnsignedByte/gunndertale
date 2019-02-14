/**
 * @Author: Edmund Lam <edl>
 * @Date:   22:03:49, 24-Nov-2018
 * @Filename: map_data.js
 * @Last modified by:   edl
 * @Last modified time: 00:00:01, 14-Feb-2019
 */

var MAP_DATA = {//lol my tab space is different from yours.... i might calibrate mine later to match yours but for now i think ill be the only one editing this so.
    "livingroom": {
        doors: {
            0x00FFCC: ["hallway", 10, 112 - 29 / 2]
        },
        actions: {
            0x00FFFF: {
                dir: 1,
                responses: [
                    ["You see a frying pan left on the table.", "Pick it up?", {
                        yes: [
                            [Events.give_item, "Frying Pan"],
                            "You recieved \"Frying Pan\"!"
                        ],
                        no: ["You left the pan where it was."]
                    }]
                ]
            }
        }
    },
    "hallway": {
        doors: {
            0xFF0000: ["bedroom", 127, 155],
            0x00FF00: ["livingroom", 310, 224 - 29 / 2]
        },
        actions: {
            0xFFFF00: {
                dir: 1,
                responses: [
                    ["The door is locked."]
                ]
            }
        }
    },
    "bedroom": {
        doors: {
            0xffff00: ["hallway", 327, 59]
        },
        actions: {
            0xFF0000: {
                dir: 2,
                responses: [
                    ["You don't need to sleep yet."],
                    ["You look closely.", "It's still a bed."],
                    ["You feel tired.", "Go to sleep?", {
                        yes: ["You try to sleep,", "but you realize you have homework to do."],
                        no: ["You decide to sleep later."]
                    }]
                ]
            },
            0x00FF00: {
                dir: 1,
                responses: [
                    ["There are books.", "But unfortunately you can't read."],
                    ["You look behind the books.", "There are more books."]
                ]
            },
            0x0000FF: {
                dir: 1,
                responses: [
                    ["On the desk you see...", [
                        ["A lamp."], ["A Chemistry Textbook."], ["A Chromebook."]
                    ]],
                    ["There is a desk.", "It reminds you of studying.", "You are filled with \"Boredom\"!"],
                    ["You can study.", "Will you study?", {
                        "yes": ["You studied.", "Your intelligence didn't increase."],
                        "no": ["You didn't study."],
                        "maybe": ["You thought about studying."],
                        "????": ["You couldn't come to a decision."],
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
