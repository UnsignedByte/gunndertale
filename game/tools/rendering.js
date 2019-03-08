/**
 * @Author: Edmund Lam <edl>
 * @Date:   21:59:40, 24-Nov-2018
 * @Filename: rendering.js
 * @Last modified by:   edl
 * @Last modified time: 19:36:00, 07-Mar-2019
 */

var Window = (function(){
  var self = {};

  self.height = 192;
  self.zoom = canv.height/self.height;
  self.width = canv.width/self.zoom;

  self.invis_canv = document.createElement('canvas');
  self.invis_canv_context = self.invis_canv.getContext('2d');

  function get_window_pos(){
    let xpos = Math.max(Math.min(0, self.width/2-mc.pos[0]), self.width-MAP_DATA[mc.map].back.width);
    if (MAP_DATA[mc.map].back.width < self.width){
      xpos-=(self.width-MAP_DATA[mc.map].back.width)/2;
    }
    let ypos = Math.max(Math.min(0, self.height/2-mc.pos[1]), self.height-MAP_DATA[mc.map].back.height);
    // if (MAP_DATA[mc.map].back.height < self.height){
    //   ypos-=(self.width-MAP_DATA[mc.map].back.width)/2;
    // }
    return [xpos, ypos];
  }

  function drawImage(im, xy){
    let x = xy[0];
    let y=xy[1];
    w_p = get_window_pos();
    context.drawImage(im, (w_p[0]+x)*self.zoom, (w_p[1]+y)*self.zoom, im.width*self.zoom, im.height*self.zoom);
  }

  self.render = function(){
    let win_pos = get_window_pos();
    drawImage(MAP_DATA[mc.map].back, [0, 0]);
    drawImage(mc.currAnim, mc.pos);
    drawImage(MAP_DATA[mc.map].front, [0, 0]);
    Effects.displaytime();
    Effects.happiness();
  }

  self.get_map = function(){
    self.invis_canv_context.width = MAP_DATA[mc.map].map.width;
    self.invis_canv_context.height = MAP_DATA[mc.map].map.height;
    invis_canv_context.drawImage(MAP_DATA[mc.map].map, 0, 0);
  }

  return self;
}());

var Effects = (function(){
  var self = {};

  self.pub_vars = {
    text:{
      done:false
    }
  };

  var Vars = {
    darken:{
      opacity:0,
      rate:0.05
    },
    text:{
      pos:0,
      num_frames:2,
      font_size:Math.round(8*Window.zoom),
      box:{
        height:36*Window.zoom,
        width:144*Window.zoom,
        bottom_margin:12*Window.zoom,
        border_thicc:1.5*Window.zoom
      }
    },
    inventory:{
      box:{
        margin:12*Window.zoom,
        width:108*Window.zoom,
        border_thicc:3*Window.zoom
      }
    }
  };

  self.darken = function(){
    Vars.darken.opacity+=Vars.darken.rate;
    if (Vars.darken.opacity>1.25){
      Vars.darken.rate*=-1;
      mc.map = Game.cmde[0];
      mc.pos = [Game.cmde[1], Game.cmde[2]];
      Game.cmde = null;
    }else if (Vars.darken.opacity<0){
      Vars.darken.opacity = 0;
      Vars.darken.rate*=-1;
      Game.curr_action_type="game";
    }
    context.fillStyle="rgba(0, 0, 0, "+Vars.darken.opacity+")"
    context.fillRect(0, 0, canv.width, canv.height);
    // context.stroke();
  };

  function fill_text(str, x,  y, width=null, size=Vars.text.font_size){
    context.font = size.toString()+"px VT323";
    if (width === null){
      context.fillText(str, x, y);
    }else{
      let splstr = str.split(" ");
      let lasti = 0;
      let num_lines = 0;
      for(let i = 1; i < splstr.length+1; i++){
        if(context.measureText(splstr.slice(lasti, i).join(' ')).width > width){
          context.fillText(splstr.slice(lasti, i-1).join(' '), x, y+size*1.25*(68/91)*num_lines);
          lasti = i-1;
          num_lines++;
        }
      }
      context.fillText(splstr.slice(lasti, splstr.length).join(' '), x, y+size*1.25*(68/91)*num_lines);
    }
  }

  function draw_bounded_box(x, y, w, h, lw=Vars.text.box.border_thicc){
    context.fillStyle = "black";
    context.fillRect(x, y, w, h);
    context.beginPath();
    context.lineWidth = lw.toString();
    context.strokeStyle = "white";
    context.rect(x,y,w,h);
    context.stroke();
  }

  self.text = function(text){
    draw_bounded_box((Window.width*Window.zoom-Vars.text.box.width)/2,
      Window.height*Window.zoom-Vars.text.box.bottom_margin-Vars.text.box.height,
      Vars.text.box.width,
      Vars.text.box.height);
    context.fillStyle = "white";
    context.font = Vars.text.font_size.toString()+"px VT323";

    Vars.text.pos++;
    switch(self.pub_vars.text.done){
      case "pending":
        self.pub_vars.text.done = false;
        Vars.text.pos=0;
        break;
      case true:
        Vars.text.pos = text.length*Vars.text.num_frames
    }
    let last = Math.ceil(Vars.text.pos/Vars.text.num_frames)+1;
    fill_text(text.substring(0, last), (Window.width*Window.zoom-Vars.text.box.width)/2+Vars.text.box.border_thicc*1.5, Window.height*Window.zoom-Vars.text.box.bottom_margin-Vars.text.box.height+Vars.text.font_size, Vars.text.box.width-Vars.text.font_size);
    if(last > text.length){
      self.pub_vars.text.done = true;
    }
  };

  self.happiness = function(){
    fill_text("Happiness:"+Game.stats.happiness, Vars.text.font_size/2, Vars.text.font_size*1.5*(68/91));

    for(let i = 0; i < Game.stats.cqueue.length; i++){
    fill_text(Game.stats.cqueue[i], Vars.text.font_size/2, Vars.text.font_size*1.5*(68/91)*(i/2+2), null, Vars.text.font_size/2);
    }
  };

  self.options = function(){
    self.pub_vars.text.done = true;
    let lastpos = Game.text.pos.pop()
    let gp = ActionList.get_pos()[lastpos-1];
    self.text(gp);
    Game.text.pos.push(lastpos);
    let a = 0;

    let positions = [
      [(Window.width*Window.zoom-Vars.text.box.width/2)/2,Window.height*Window.zoom-Vars.text.box.bottom_margin-Vars.text.box.height/3],
      [(Window.width*Window.zoom+Vars.text.box.width/2)/2,Window.height*Window.zoom-Vars.text.box.bottom_margin-Vars.text.box.height/3],
      [Window.width*Window.zoom/2,Window.height*Window.zoom-Vars.text.box.bottom_margin-Vars.text.box.height*7/12],
      [Window.width*Window.zoom/2,Window.height*Window.zoom-Vars.text.box.bottom_margin-Vars.text.box.height/12]
    ];

    Object.keys(Game.text.options).forEach(key => {
      let theight = Vars.text.font_size*(68/91);
      let twidth = context.measureText(key).width;
      context.fillText(key, positions[a][0]-twidth/2,positions[a][1]);
      if (Game.text.chosen === a){
        Game.text.chosenKey=key;
        context.drawImage(MC_DATA.cursor, positions[a][0]-twidth/2-MC_DATA.cursor.width*Window.zoom-Vars.text.font_size/4, positions[a][1]-MC_DATA.cursor.height*Window.zoom, MC_DATA.cursor.width*Window.zoom,MC_DATA.cursor.height*Window.zoom);
      }

      a++;
    });
  };

  function list_text(x, y, l, spacing){
    context.fillStyle = "white";
    context.font = Vars.text.font_size.toString()+"px VT323";
    for(let i = 0; i < l.length; i++){
      if(typeof l[i] === 'string'){
        context.fillText(l[i], x, y+spacing*i);
      }
    }
  }

  self.inventory = function(){
    draw_bounded_box(Window.width*Window.zoom/2, Vars.inventory.box.margin, Vars.inventory.box.width, Window.height*Window.zoom-2*Vars.inventory.box.margin);

    let x = Window.width*Window.zoom/2+Vars.text.font_size;
    let y = Vars.inventory.box.margin;
    let spacing = Vars.text.font_size*1.5*(68/91);
    list_text(x, y+spacing, mc.inventory, spacing);
    if (Game.inventory.chosen === null) return;
    context.drawImage(MC_DATA.cursor, x-MC_DATA.cursor.width*Window.zoom-Vars.text.font_size/4,
      y+spacing*(Game.inventory.chosen+1)-MC_DATA.cursor.height*Window.zoom,
      MC_DATA.cursor.width*Window.zoom, MC_DATA.cursor.height*Window.zoom);

    let action_list = ["USE", "INFO", "DROP"];
    context.textAlign="left";
    for(let i = 0; i < 3; i++){
      let twidth = context.measureText(action_list[i]).width;
      if (i === Game.inventory.chosen_action){
        context.drawImage(MC_DATA.cursor, Window.width*Window.zoom/2+Vars.inventory.box.width*(2*i+1)/6-twidth/2-MC_DATA.cursor.width*Window.zoom-Vars.text.font_size/4,
          Window.height*Window.zoom-Vars.inventory.box.margin-Vars.text.font_size/2-MC_DATA.cursor.height*Window.zoom,
          MC_DATA.cursor.width*Window.zoom, MC_DATA.cursor.height*Window.zoom)
      }
      context.fillText(action_list[i], Window.width*Window.zoom/2+Vars.inventory.box.width*(2*i+1)/6-twidth/2, Window.height*Window.zoom-Vars.inventory.box.margin-Vars.text.font_size/2);
    }
    context.textAlign="left";
  };

  self.displaytime = function(){
    context.textAlign = "right";
    context.font = Vars.text.font_size.toString()+"px VT323";
    let t = secs2time(mc.time);
    context.fillStyle="white";
    context.fillText(`${t.h}:${t.m}:${t.s}`, Window.width*Window.zoom-Vars.text.font_size/2, Vars.text.font_size*1.5*(68/91));
    context.textAlign = "left";
  }

  self.container = function(){
    draw_bounded_box(Window.width*Window.zoom/2-Vars.inventory.box.width, Vars.inventory.box.margin, Vars.inventory.box.width*2, Window.height*Window.zoom-2*Vars.inventory.box.margin);
    context.beginPath();
    context.fillStyle = "white";
    context.lineWidth = Window.zoom/2;
    context.moveTo(Window.width*Window.zoom/2, Vars.inventory.box.margin*1.5);
    context.lineTo(Window.width*Window.zoom/2,  Window.height*Window.zoom-Vars.inventory.box.margin*1.5)
    context.stroke();

    let x = Window.width*Window.zoom/2+Vars.text.font_size;
    let y = Vars.inventory.box.margin;
    let spacing = Vars.text.font_size*1.5*(68/91);
    list_text(x, y+spacing, mc.inventory, spacing);
    if (Game.inventory.chosen != null){
      context.drawImage(MC_DATA.cursor, x-MC_DATA.cursor.width*Window.zoom-Vars.text.font_size/4,
        y+spacing*(Game.inventory.chosen+1)-MC_DATA.cursor.height*Window.zoom,
        MC_DATA.cursor.width*Window.zoom, MC_DATA.cursor.height*Window.zoom)
    }
    x-=Vars.inventory.box.width;
    list_text(x, y+spacing, lmd[mc.map].containers[Game.container.id], spacing);
    if (Game.container.chosen != null){
      context.drawImage(MC_DATA.cursor, x-MC_DATA.cursor.width*Window.zoom-Vars.text.font_size/4,
        y+spacing*(Game.container.chosen+1)-MC_DATA.cursor.height*Window.zoom,
        MC_DATA.cursor.width*Window.zoom, MC_DATA.cursor.height*Window.zoom)
    }
  };

  return self;
}());
