/**
 * @Author: Edmund Lam <edl>
 * @Date:   22:03:49, 24-Nov-2018
 * @Filename: map_data.js
 * @Last modified by:   edl
 * @Last modified time: 17:11:04, 25-Nov-2018
 */

var MAP_DATA = {
  "test_bg":{
    doors:[
      {
        color:0xFF0000,
        dest:["test_bg", 370-24, 110]
      },
      {
        color:0xFFFF00,
        dest:["test_bg", 250-12, 251-32]
      },
      {
        color:0x00FF00,
        dest:["test_bg", 6, 110]
      },
      {
        color:0x0000FF,
        dest:["test_bg", 250-12, 5]
      }
    ]
  }
}

// var image_load_canvas = document.createElement('canvas');
// var image_load_ctx = image_load_canvas.getContext("2d");
Object.keys(MAP_DATA).forEach(key => {
  let types = ["back", "front", "map"]
  for (let i = 0; i < types.length; i++){
    let img = new Image();
    img.src = "../images/map/background/"+key+"/"+key+"-"+types[i]+".png";
    // img.crossOrigin = "Anonymous";
    img.onload = function() {
      MAP_DATA[key][types[i]] = img
      //
      // if (types[i] === "map"){
      //   image_load_canvas.width = img.width;
      //   image_load_canvas.height = img.height;
      //   image_load_ctx.drawImage(img, 0, 0, img.width, img.height);
      //
      //   let data = image_load_ctx.getImageData(0, 0, img.width, img.height).data
      //
      //   for(let i = 0; i<data.length; i+=4) {
      //     let r = data[i];
      //     let g = data[i+1];
      //     let b = data[i+2];
      //     let a = data[i+3];
      //     console.log("looping_data");
      //     if (a === 255){
      //       for (let j = 0; j < MAP_DATA[key].doors.length; i++){
      //         if (rgbHex(r, g, b) === MAP_DATA[key].doors[j].color){
      //           if ("start" in MAP_DATA[key].doors[j]){
      //             MAP_DATA[key].doors[j]["end"] = [(i/4)%img.width, Math.floor((i/4)/img.width)]
      //           }else{
      //             MAP_DATA[key].doors[j]["start"] = [(i/4)%img.width, Math.floor((i/4)/img.width)]
      //           }
      //           break;
      //         }
      //       }
      //     }
      //   }
      // }
    }
  }
});

console.log(MAP_DATA);
