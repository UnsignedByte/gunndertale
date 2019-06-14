/**
 * @Author: Edmund Lam <edl>
 * @Date:   13:14:43, 10-Jun-2019
 * @Filename: eventhandler.js
 * @Last modified by:   edl
 * @Last modified time: 23:48:39, 13-Jun-2019
 */

 var Events = (function(){
   var self = {};

   self.initText = function(full, key=null){
     Game.curr_action_type = "text";
     Game.text.full = [full];
     Game.text.door_id = key;
     Game.text.pos = [-1];
     ActionList.next();
   };

   self.text = function(){
     if (Game.text.options !== null){
       Effects.options();
     }else{
       Effects.text(ActionList.get_pos());
     }
   };

   self.set_map = function(map){
     mc.map = map;
     ['front', 'back', 'map'].forEach(key => {
       let cmap = MAP_DATA[mc.map][key];
       let tcanv = document.createElement('canvas');
       tcanv.width = cmap.width;
       tcanv.height = cmap.height;
       tcanv.getContext('2d').drawImage(cmap, 0, 0);
       Game.map[key]=tcanv;
     });
   };

   self.use_item = function(item){
     self.initText(ITEM_DATA[item].action.message);
     for(let i = 0; i < ITEM_DATA[item].action.stats.length; i++){
       let sub = ITEM_DATA[item].action.stats[i];
       Stats.add_subsubcategory("happiness", sub[0], item, sub[1]);
     }
   };

   self.give_item = function(action){
     if (lmd[mc.map].items[Game.text.door_id][action] > 0){
       lmd[mc.map].items[Game.text.door_id][action]--;
       mc.inventory.push(action);
       mc.inventory = mc.inventory.slice(0, MAX_INVENTORY_SIZE);
     }
     return 0;
   };

   self.get_amount = function(action, min, max){
     return Math.min(max,Math.max(min, lmd[mc.map].items[Game.text.door_id][action]));
   };

   self.container = function(){
     if (mc.inventory.length === 0) Game.inventory.chosen = null;
     if (lmd[mc.map].containers[Game.container.id].length === 0) Game.container.chosen = null;
     Effects.container();
   }

   self.warp_calc = function(secs){
     mc.time+=secs;
     mc.time%=86400;
     Stats.calculate(secs);
   }

   self.warp = function(secs){
     Game.curr_action_type = "darken";
     Game.cmde = [self.warp_calc,[secs]];
   }

   self.change_map = function(map,x,y){
     if(mc.map === "minimap"){
       mc.time += MATH_DATA["minimap"].SIZE_RATIO*(Math.random/10+1.1)*(Math.abs(mc.minimap_startpos[0]-mc.pos[0])+Math.abs(mc.minimap_startpos[1]-mc.pos[1]));
     }
     Events.set_map(map);
     mc.pos = [x, y];
   }

   return self;
 }());
