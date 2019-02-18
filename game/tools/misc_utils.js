/**
 * @Author: Edmund Lam <edl>
 * @Date:   22:39:11, 24-Nov-2018
 * @Filename: misc_utils.js
 * @Last modified by:   edl
 * @Last modified time: 23:17:25, 17-Feb-2019
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

function randChoice(l){
  return l[randInt(0, l.length)];
}

function randInt(a, b){
  return a+Math.floor(Math.random()*b);
}

function secs2time(s){
  s%=86400;
  return {
    h:Math.floor(s/(3600)),
    m:Math.floor(s/60)%60,
    s:s%60};
}
