/**
 * @Author: Edmund Lam <edl>
 * @Date:   21:16:29, 24-Nov-2018
 * @Filename: main.js
 * @Last modified by:   edl
 * @Last modified time: 21:50:43, 24-Nov-2018
 */

var canv = document.getElementById('game');
var context = canv.getContext("2d");

init();

function init(){
  canv.width = window.innerWidth;
  canv.height = window.innerHeight;
}
