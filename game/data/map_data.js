/**
* @Author: Edmund Lam <edl>
* @Date:   22:03:49, 24-Nov-2018
* @Filename: map_data.js
 * @Last modified by:   edl
 * @Last modified time: 16:16:03, 17-Feb-2019
*/

var MAP_DATA = {//lol my tab space is different from yours.... i might calibrate mine later to match yours but for now i think ill be the only one editing this so.
    "secret": {//this is a test room that i will delete later
        doors: {
            0xffff00: ["house", 119, 455]
        },
        actions: {
            0xff0000: {
                dir: 1,
                responses: [
                    ["QWxsIEhhaWwgU0VMRiE"]
                ]
            }
        }
    },
    "house": {
        doors: {
            0xff0000: ["livingroom", 39, 271],
            0xffff00: ["secret", 135, 175]
        }
    },
    "livingroom": {
        doors: {
            0x00ffcc: ["hallway", 4, 97],
            0x00ccff: ["house", 119, 455]
        },
        actions: {
            0x00ffff: {
                dir: [1],
                responses: [
                    ["You see a frying pan left on the counter.", "Pick it up?", {
                        yes: [
                            [Events.give_item, "Frying Pan"],
                            "You recieved \"Frying Pan\"!"
                        ],
                        no: ["You left the pan where it was."]
                    }]
                ]
            },
            0x0000ff: {
                dir: [1],
                responses: [
                    ["You feel a bit hungry.", "Eat?", {
                        yes: ["You feel a little bit better."],
                        no: ["You go hungry as usual."]
                    }]
                ]
            },
            0xff00ff: {
                dir: [0, 1, 2, 3],
                responses: [["The table reminds you of eating."]]
            },
            0xffcc00: {
                dir: [2],
                responses: [["You probably would enjoy this couch more if you knew how to relax."]]
            },
            0xccff00: {
                dir: [0],
                responses: [["You want to watch TV but you have to do homework."]]
            },
            0xff0000: {
                dir: [1],
                responses: [["You notice that the TV is always showing bad news."]]
            },
            0xffff00: {
                dir: [3],
                responses: [["Why did you think there was anything to say about this?"]]
            },
            0x00ff00: {
                dir: [1],
                responses: [["You don't know how to bake."]]
            }
        }
    },
    "hallway": {
        doors: {
            0xff0000: ["bedroom", 135, 175],
            0x00ff00: ["livingroom", 313, 209]
        },
        actions: {
            0xffff00: {
                dir: [1],
                responses: [
                    ["The bathroom door is locked."]
                ]
            },
            0x0000ff: {
                dir: [1],
                responses: [
                    ["You don't own much so it's empty."]
                ]
            },
            0x00ffff: {
                dir: [1],
                responses: [
                    ["You resonate deeply with this painting."]
                ]
            }
        }
    },
    "bedroom": {
        doors: {
            0xffff00: ["hallway", 327, 55]
        },
        actions: {
            0xff0000: {
                dir: [2],
                responses: [
                    ["You don't need to sleep yet."],
                    ["You look closely.", "It's still a bed."],
                    ["You feel tired.", "Go to sleep?", {
                        yes: ["You try to sleep,", "but you realize you have homework to do."],
                        no: ["You decide to sleep later."]
                    }]
                ]
            },
            0x00ff00: {
                dir: [1],
                responses: [
                    ["It's an empty drawer."]
                ]
            },
            0x00ffff: {
                dir: [1],
                responses: [
                    ["It's a beautiful day.", "But you need to study and do homework."]
                ]
            },
            0xff00ff: {
                dir: [1],
                responses: [
                    ["There are books.", "But unfortunately you can't read."],
                    ["You look behind the books.", "There are more books."]
                ]
            },
            0x0000ff: {
                dir: [1],
                responses: [
                    ["On the desk you see...", [
                        ["A lamp."], ["A chemistry textbook."], ["A Chromebook."]
                    ]],
                    ["There is a desk.", "It reminds you of studying.", "You are filled with \"Boredom\"!"],
                    ["You can study.", "Will you study?", {
                        "yes": ["You studied.", "But your intelligence didn't increase."],
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
