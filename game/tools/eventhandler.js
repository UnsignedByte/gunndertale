/**
 * @Author: Edmund Lam <edl>
 * @Date:   13:14:43, 10-Jun-2019
 * @Filename: eventhandler.js
 * @Last modified by:   edl
 * @Last modified time: 21:05:42, 18-Jun-2019
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
      tcanv.id = key;
      document.getElementById('debug').replaceChild(tcanv, document.getElementById(key));
    });
    let objmap = document.createElement('canvas');
    objmap.width = MAP_DATA[mc.map].map.width
    objmap.height = MAP_DATA[mc.map].map.height
    let ojc = objmap.getContext('2d');
    ojc.fillStyle = "#FFFFFF";
    ojc.fillRect(0,0,objmap.width, objmap.height);

    for(let j = 0; j < MAP_DATA[mc.map].objects.length; j++){
      let him = OBJ_DATA[MAP_DATA[mc.map].objects[j].type].hitbox;
      ojc.drawImage(him, ...MAP_DATA[mc.map].objects[j].pos);
      var iD = ojc.getImageData(...MAP_DATA[mc.map].objects[j].pos, him.width, him.height);
      for (var i=0;i<iD.data.length;i+=4)
        {
          if(iD.data[i]==0 && iD.data[i+1]==0 && iD.data[i+2]==0){
            let h = byte2hex(j);
            iD.data[i]=h.substring(0, 2);
            iD.data[i+1]=h.substring(2, 4);
            iD.data[i+2]=h.substring(4, 6);
          }
        }
      ojc.putImageData(iD,...MAP_DATA[mc.map].objects[j].pos);
    }
    Game.map.objmap = objmap;
    objmap.id = 'objmap';
    document.getElementById('debug').replaceChild(objmap, document.getElementById('objmap'));
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
