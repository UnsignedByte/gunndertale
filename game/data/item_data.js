/**
 * @Author: Edmund Lam <edl>
 * @Date:   16:09:05, 10-Feb-2019
 * @Filename: item_data.js
 * @Last modified by:   edl
 * @Last modified time: 20:59:41, 06-Mar-2019
 */

var ITEM_DATA = {
  "Airpods":{
    description:"Makes you look rich.",
    action:{
      stats:[["reputation", {val:20, dt:0, dr:0}]],
      message:"*Laughs in rich*"
    }
  },
  "Macbook":{
    description:"Overpriced computer by Apple.",
    action:{
      stats:[["reputation", {val:5, dt:0, dr:0}]],
      message:"You felt superior to Chromebook users."
    }
  },
  "Boba Milk Tea":{
    description:"A drink",
    action:{
      stats:[["hunger", {val:10, dt:60, dr:0.01}]],
      message:"The milk tea was good."
    }
  },
  "Frying Pan":{
    description:"It's a pan for frying.",
    action:{
      stats:[],
      message:"You used the frying pan. It didn't do much."
    }
  },
  "Sweater":{
    description:"Keeps you warm and cozy",
    action:{
      stats:[["reputation", {val:10, dt:0, dr:0}]],
      message:"You wore the sweater and feel cool."
    }
  }
};
