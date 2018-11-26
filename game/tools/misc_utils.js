/**
 * @Author: Edmund Lam <edl>
 * @Date:   22:39:11, 24-Nov-2018
 * @Filename: misc_utils.js
 * @Last modified by:   edl
 * @Last modified time: 16:34:08, 25-Nov-2018
 */

function array_sum(arr1, arr2){
  return arr1.map(function (num, idx) {
    return num + arr2[idx];
  });
}

function byte2hex(byte) {
  var hex = Number(byte).toString(16);
  if (hex.length < 2) {
       hex = "0" + hex;
  }
  return hex;
}

function rgbHex(r,g,b) {
  return parseInt(byte2hex(r)+byte2hex(g)+byte2hex(b), 16);
}
