/**
 * @Author: Edmund Lam <edl>
 * @Date:   16:38:05, 01-Dec-2018
 * @Filename: gameutils.js
 * @Last modified by:   edl
 * @Last modified time: 22:26:49, 06-Mar-2019
 */

var Game = {
  game_anim_dir_mod:0,
  curr_collision_data:[false, false, false, false],
  curr_action_type:"game",
  cmde:null,
  text:{
    door_id:null,
    pos:null,
    full:null,
    options:null,
    chosen:null,
    chosenKey:null
  },
  inventory:{
    chosen:null,
    chosen_action:null
  },
  container:{
    id:null,
    chosen:null
  },
  stats:{
    happiness:100
  }
};

function test_keypress(){
  let is_moving = false;
  Object.keys(KEYS_DOWN).forEach(key => {
    if (KEYS_DOWN[key] === true){
      pkey = KEY_NAMES[key];
      KEYS_DOWN[key] = false;
      switch (Game.curr_action_type){
        case "game":
          if (37<=Number(key) && Number(key)<=40){
            KEYS_DOWN[key]=true;
            if(!Game.curr_collision_data[Number(key)-37]){
              is_moving=true;
              switch (pkey){
                case "left":
                  mc.pos[0]-=MOV_SPEED;
                  break;
                case "up":
                  mc.pos[1]-=MOV_SPEED;
                  break;
                case "right":
                  mc.pos[0]+=MOV_SPEED;
                  break;
                case "down":
                  mc.pos[1]+=MOV_SPEED;
                  break;
              }
            }
            mc.dir[0]=SWITCH_DIRS[Number(key)-37]
          }else{
            switch (pkey){
              case "z":
                Collision.check_actions();
                Collision.check_containers();
                break;
              case "c":
                Game.inventory.chosen = 0;
                Game.curr_action_type="inventory";
                break;
              default:
            }
          }
          break;
        case "text":
          switch(pkey){
            case "z":
              if(Effects.pub_vars.text.done){
                if(Game.text.options !== null){
                  Game.text.pos.push(Game.text.chosenKey);
                  Game.text.pos.push(-1);
                }
                ActionList.next();
                Effects.pub_vars.text.done = "pending";
              }
              break;
            case "x":
              Effects.pub_vars.text.done = true;
              break;
            case "left":
              Game.text.chosen=0;
              break;
            case "up":
              Game.text.chosen=2;
              break;
            case "right":
              Game.text.chosen=1;
              break;
            case "down":
              Game.text.chosen=3;
              break;
            default:
          }
          break;
        case "inventory":
          switch(pkey){
            case "left":
              Game.inventory.chosen_action = loop_add(Game.inventory.chosen_action,2, 3);
              break;
            case "up":
              if(Game.inventory.chosen_action === null) Game.inventory.chosen = loop_add(Game.inventory.chosen,-1, mc.inventory.length);
              break;
            case "right":
              Game.inventory.chosen_action = loop_add(Game.inventory.chosen_action,1, 3);
              break;
            case "down":
              if(Game.inventory.chosen_action === null) Game.inventory.chosen = loop_add(Game.inventory.chosen,1, mc.inventory.length);
              break;
            case "c":
              Game.curr_action_type="game";
              break;
            case "z":
              if(Game.inventory.chosen_action === null && mc.inventory.length > 0){
                Game.inventory.chosen_action = 0;
              }else{
                switch(Game.inventory.chosen_action){
                  case 1:
                    break;
                  case 0:
                    Events.use_item(mc.inventory[Game.inventory.chosen]);
                  case 2:
                    mc.inventory.splice(Game.inventory.chosen, 1);
                    break;
                }
                Game.inventory.chosen = 0;
                Game.inventory.chosen_action = null;
              }
              break;
            default:
          }
          break;
        case "container":
          switch(pkey){
            case "left":
              Game.inventory.chosen = null;
              Game.container.chosen = 0;
              break;
            case "up":
              Game.inventory.chosen = loop_add(Game.inventory.chosen,-1, mc.inventory.length);
              Game.container.chosen = loop_add(Game.container.chosen,-1, lmd[mc.map].containers[Game.container.id].length);
              break;
            case "right":
              Game.inventory.chosen = 0;
              Game.container.chosen = null;
              break;
            case "down":
              Game.inventory.chosen = loop_add(Game.inventory.chosen,1, mc.inventory.length);
              Game.container.chosen = loop_add(Game.container.chosen,1, lmd[mc.map].containers[Game.container.id].length);
              break;
            case "z":
              if (Game.inventory.chosen !== null && lmd[mc.map].containers[Game.container.id].length < MAX_INVENTORY_SIZE){
                lmd[mc.map].containers[Game.container.id].push(mc.inventory[Game.inventory.chosen]);
                mc.inventory.splice(Game.inventory.chosen, 1);
              }else if (Game.container.chosen !== null && mc.inventory.length < MAX_INVENTORY_SIZE){
                mc.inventory.push(lmd[mc.map].containers[Game.container.id][Game.container.chosen]);
                lmd[mc.map].containers[Game.container.id].splice(Game.container.chosen, 1);
              }
              break;
            case "x":
            case "c":
              Game.curr_action_type = "game";
              break;
            default:
          }
          break;
        default:
      }
    }
  });
  if (Game.game_anim_dir_mod===0){
    mc.dir[1]++;
    if (is_moving){
      mc.dir[1]%=MC_DATA.animations[0].length;
    }else{
      mc.dir[1] = 0;
    }
  }
  if(is_moving){
    Game.game_anim_dir_mod++;
    Game.game_anim_dir_mod%=FRAMES_BEFORE_WALK;
  }else{
    Game.game_anim_dir_mod=0;
  }
}

var ActionList = (function(){
  var self = {};

  self.get_pos = function(pos=Game.text.pos, l=Game.text.full){
    for(let i = 0; i < pos.length; i++){
      l = l[pos[i]];
    }
    return l;
  };

  function parse_currpos(lastm, pos){
    Game.text.options = null;
    if (lastm.length === pos){
      Game.curr_action_type="game";
      return null;
    }
    if(typeof lastm[pos]=== 'string'){
    }else if (Array.isArray(lastm[pos])){
      if(typeof lastm[pos][0] === "function"){ // is action
        Game.text.pos.pop()
        Game.text.pos.push(pos+1);
        Game.text.pos.push(lastm[pos][0](...lastm[pos][1]));
        Game.text.pos.push(0);
      }else{
        Game.text.pos.push(randInt(0,lastm[pos].length)); // Is array
        Game.text.pos.push(0);
      }
    }else if (lastm[pos].constructor == Object){ //Is dictionary
      Game.text.options = lastm[pos];
      Game.text.chosen = 0;
    }
  }

  self.next = function(){
    let lastpos = Game.text.pos.pop();
    let lastm = self.get_pos();
    Game.text.pos.push(lastpos+1);
    parse_currpos(lastm, lastpos+1);

    if(typeof self.get_pos() !== 'string'){
      let pos = Game.text.pos.pop();
      let m = self.get_pos();
      Game.text.pos.push(pos);
      parse_currpos(m, pos);
    }
  };

  return self;
}());


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

  return self;
}());


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
    mc.stats[category][subcategory][name] = dict_add(mc.stats[category][subcategory][name], vals);
  };

  return self;
}());
