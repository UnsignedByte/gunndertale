/**
 * @Author: Edmund Lam <edl>
 * @Date:   23:01:22, 06-Mar-2019
 * @Filename: stathandler.js
 * @Last modified by:   edl
 * @Last modified time: 17:34:30, 07-Mar-2019
 */


 var Stats = (function(){
   var self = {};

   function calc_subcategory(category, subcategory){
     let sum = 0;
     Object.keys(mc.stats[category][subcategory]).forEach(key => {
       let val = mc.stats[category][subcategory][key];
       if(val.dt > 0 && mc.time%val.dt === 0){
         val.val=val.val*(1-val.dr);
       }
       if (Math.abs(val.val) < 1){
         delete mc.stats[category][subcategory][key];
         return;
       }
       sum+=val.val;
       mc.stats[category][subcategory][key] = val;
     });
     return sum;
   };

   self.calculate = function(){
     Game.stats.happiness = 0;
     Object.keys(mc.stats.happiness).forEach(key => {
       Game.stats.happiness+=Math.round(MC_DATA.stats.happiness[key](calc_subcategory("happiness",key)));
     });
   };

   self.add_subsubcategory = function(category, subcategory, name, vals){
     if (mc.stats[category][subcategory][name] === undefined) mc.stats[category][subcategory][name] = vals;
     else mc.stats[category][subcategory][name].val+=+vals.val;
   };

   return self;
 }());
