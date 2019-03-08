/**
 * @Author: Edmund Lam <edl>
 * @Date:   23:01:22, 06-Mar-2019
 * @Filename: stathandler.js
 * @Last modified by:   edl
 * @Last modified time: 19:25:33, 07-Mar-2019
 */


 var Stats = (function(){
   var self = {};

   function calc_subcategory(category, subcategory){
     let sum = 0;
     let naive_sum = 0;
     Object.keys(mc.stats[category][subcategory]).forEach(key => {
       let val = mc.stats[category][subcategory][key];
       naive_sum+=val.val;
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
     let parse_sum = (x=> {return Math.round(MC_DATA.stats[category][subcategory](x))});
     let pssum = parse_sum(sum);
     let sumdiff = pssum-parse_sum(naive_sum);
     if (sumdiff !== 0) Game.stats.cqueue.push(`${(sumdiff > 0 ? '+':'-')}${Math.abs(sumdiff)} ${subcategory}.`);
     return pssum;
   };

   self.calculate = function(){
     Game.stats.cqueue = [];
     Game.stats.happiness = 0;
     Object.keys(mc.stats.happiness).forEach(key => {
       Game.stats.happiness+=calc_subcategory("happiness",key);
     });
   };

   self.add_subsubcategory = function(category, subcategory, name, vals){
     if (mc.stats[category][subcategory][name] === undefined) mc.stats[category][subcategory][name] = vals;
     else mc.stats[category][subcategory][name].val+=+vals.val;
   };

   return self;
 }());
