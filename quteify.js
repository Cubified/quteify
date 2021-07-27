/*
 * quteify.js: qutebrowser features for Chrom{e,ium}
 */

/*
 * GLOBALS
 */
const quteify_globals = {
  key_timeout: 250,
  min_size: 10,
  commands: {
    'open': {
      takes_arguments: true,
      desc: 'navigates to a webpage or query',
      args_string: '&lt;url_or_query&gt;',
      exec: (args)=>{
        let regex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

        if(args.indexOf('://') > -1){
          location.href = args;
        } else if(args.match(regex)){
          location.href = 'https://' + args;
        } else {
          location.href = quteify_globals.search_engine_url + args;
        }
      }
    },
    'back': {
      takes_arguments: false,
      desc: 'navigates back in this tab\'s history',
      args_string: '',
      exec: ()=>{history.back();}
    },
    'forward': {
      takes_arguments: false,
      desc: 'navigates forward in this tab\'s history',
      args_string: '',
      exec: ()=>{history.forward();}
    },
    'close': {
      takes_arguments: false,
      desc: 'closes the current tab',
      args_string: '',
      exec: ()=>{window.close();},
    },
    'new': {
      takes_arguments: false,
      desc: 'opens a new tab',
      args_string: '',
      exec: ()=>{window.open(quteify_globals.new_tab_page);}
    }
  },
  modes: {
    none: 0,
    hint: 1,
    cmd:  2
  },
  search_engine_url: 'https://duckduckgo.com/?q=',
//  search_engine_url: 'https://google.com/search?q=',
  new_tab_page: 'https://start.duckduckgo.com'
};

let mode = quteify_globals.modes.none;

/*
 * HELPER FUNCTIONS
 */
function cumulative_offset(element){
  var top = 0, left = 0;
  do {
    top += element.offsetTop  || 0;
    left += element.offsetLeft || 0;
    element = element.offsetParent;
  } while(element);

  return {
    top: top,
    left: left
  };
}

/*
 * HINTS
 */
let combos = {};
const combo_array = ['a','b','c','d','e',/*no f*/'g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','aa','ab','ac','ad','ae','af','ag','ah','ai','aj','ak','al','am','an','ao','ap','aq','ar','as','at','au','av','aw','ax','ay','az','ba','bb','bc','bd','be','bf','bg','bh','bi','bj','bk','bl','bm','bn','bo','bp','bq','br','bs','bt','bu','bv','bw','bx','by','bz','ca','cb','cc','cd','ce','cf','cg','ch','ci','cj','ck','cl','cm','cn','co','cp','cq','cr','cs','ct','cu','cv','cw','cx','cy','cz','da','db','dc','dd','de','df','dg','dh','di','dj','dk','dl','dm','dn','do','dp','dq','dr','ds','dt','du','dv','dw','dx','dy','dz','ea','eb','ec','ed','ee','ef','eg','eh','ei','ej','ek','el','em','en','eo','ep','eq','er','es','et','eu','ev','ew','ex','ey','ez','fa','fb','fc','fd','fe','ff','fg','fh','fi','fj','fk','fl','fm','fn','fo','fp','fq','fr','fs','ft','fu','fv','fw','fx','fy','fz','ga','gb','gc','gd','ge','gf','gg','gh','gi','gj','gk','gl','gm','gn','go','gp','gq','gr','gs','gt','gu','gv','gw','gx','gy','gz','ha','hb','hc','hd','he','hf','hg','hh','hi','hj','hk','hl','hm','hn','ho','hp','hq','hr','hs','ht','hu','hv','hw','hx','hy','hz','ia','ib','ic','id','ie','if','ig','ih','ii','ij','ik','il','im','in','io','ip','iq','ir','is','it','iu','iv','iw','ix','iy','iz','ja','jb','jc','jd','je','jf','jg','jh','ji','jj','jk','jl','jm','jn','jo','jp','jq','jr','js','jt','ju','jv','jw','jx','jy','jz','ka','kb','kc','kd','ke','kf','kg','kh','ki','kj','kk','kl','km','kn','ko','kp','kq','kr','ks','kt','ku','kv','kw','kx','ky','kz','la','lb','lc','ld','le','lf','lg','lh','li','lj','lk','ll','lm','ln','lo','lp','lq','lr','ls','lt','lu','lv','lw','lx','ly','lz','ma','mb','mc','md','me','mf','mg','mh','mi','mj','mk','ml','mm','mn','mo','mp','mq','mr','ms','mt','mu','mv','mw','mx','my','mz','na','nb','nc','nd','ne','nf','ng','nh','ni','nj','nk','nl','nm','nn','no','np','nq','nr','ns','nt','nu','nv','nw','nx','ny','nz','oa','ob','oc','od','oe','of','og','oh','oi','oj','ok','ol','om','on','oo','op','oq','or','os','ot','ou','ov','ow','ox','oy','oz','pa','pb','pc','pd','pe','pf','pg','ph','pi','pj','pk','pl','pm','pn','po','pp','pq','pr','ps','pt','pu','pv','pw','px','py','pz','qa','qb','qc','qd','qe','qf','qg','qh','qi','qj','qk','ql','qm','qn','qo','qp','qq','qr','qs','qt','qu','qv','qw','qx','qy','qz','ra','rb','rc','rd','re','rf','rg','rh','ri','rj','rk','rl','rm','rn','ro','rp','rq','rr','rs','rt','ru','rv','rw','rx','ry','rz','sa','sb','sc','sd','se','sf','sg','sh','si','sj','sk','sl','sm','sn','so','sp','sq','sr','ss','st','su','sv','sw','sx','sy','sz','ta','tb','tc','td','te','tf','tg','th','ti','tj','tk','tl','tm','tn','to','tp','tq','tr','ts','tt','tu','tv','tw','tx','ty','tz','ua','ub','uc','ud','ue','uf','ug','uh','ui','uj','uk','ul','um','un','uo','up','uq','ur','us','ut','uu','uv','uw','ux','uy','uz','va','vb','vc','vd','ve','vf','vg','vh','vi','vj','vk','vl','vm','vn','vo','vp','vq','vr','vs','vt','vu','vv','vw','vx','vy','vz','wa','wb','wc','wd','we','wf','wg','wh','wi','wj','wk','wl','wm','wn','wo','wp','wq','wr','ws','wt','wu','wv','ww','wx','wy','wz','xa','xb','xc','xd','xe','xf','xg','xh','xi','xj','xk','xl','xm','xn','xo','xp','xq','xr','xs','xt','xu','xv','xw','xx','xy','xz','ya','yb','yc','yd','ye','yf','yg','yh','yi','yj','yk','yl','ym','yn','yo','yp','yq','yr','ys','yt','yu','yv','yw','yx','yy','yz','za','zb','zc','zd','ze','zf','zg','zh','zi','zj','zk','zl','zm','zn','zo','zp','zq','zr','zs','zt','zu','zv','zw','zx','zy','zz'];
/*
 * Array is precomputed because
 * this function is prohibitively slow
 * at runtime
 *
function hints_combo(ind){
  let tmp = ind,
      out = '';
  while(tmp >= 0){
    out += String.fromCharCode(97 + (tmp % 26));
    tmp = Math.floor(tmp / 26);
  }
  return out.split('').reverse().join('');
}
*/
function hints_toggle(){
  if(mode === quteify_globals.modes.none) mode = quteify_globals.modes.hint;
  else if(mode === quteify_globals.modes.hint) mode = quteify_globals.modes.none;

  if(mode === quteify_globals.modes.hint){
    combos = {};

    let arr = [
      ...document.querySelectorAll('a'),
      ...document.querySelectorAll('button'),
      ...document.querySelectorAll('input'),
      ...document.querySelectorAll('div[role="button"]')
    ], ind = 0;
    arr.forEach((parent)=>{
      let comp = getComputedStyle(parent);
      if(comp.visibility === 'hidden' ||
         comp.display    === 'none'   ||
         comp.opacity    === '0'      ||
         comp.clip       === 'rect(1px, 1px, 1px, 1px)' ||
         parent.offsetWidth < quteify_globals.min_size ||
         parent.offsetHeight < quteify_globals.min_size) return;

      let combo = combo_array[ind++];
      if(combo === undefined) return;
      combos[combo] = parent;

      let off = cumulative_offset(parent);
      let child = document.createElement('div');
      child.classList.add('quteify-hint');
      child.style.display = 'block';
      child.style.minWidth = '20px';
      child.style.textAlign = 'center';
      child.style.background = 'yellow';
      child.style.color = 'black';
      child.style.transform = 'scale(0.7)';
      child.style.padding = '2px';
      child.style.position = 'absolute';
      child.style.zIndex = '2147483647';
      child.style.top = `${off.top}px`;
      child.style.left = `${off.left}px`;
      child.innerText = combo;
      document.body.appendChild(child);
    });
  } else if(mode === quteify_globals.modes.none){
    [].forEach.call(document.querySelectorAll('.quteify-hint'), (el)=>{
      el.parentNode.removeChild(el);
    });
  }
}

/*
 * COMMANDS
 */
let container;
function cmd_toggle(){
  if(mode === quteify_globals.modes.none){
    mode = quteify_globals.modes.cmd;

    container = document.createElement('div');
    container.classList.add('quteify-commandline');
    container.style.width = '100vw';
    container.style.position = 'fixed';
    container.style.bottom = '0';
    container.style.left = '0';
    container.style.background = '#333';
    container.style.zIndex = '2147483647';
    document.body.appendChild(container);

    let autocomplete = document.createElement('div');
    autocomplete.style.borderTop = '1px solid grey';
    autocomplete.style.width = '100vw';
    autocomplete.style.display = 'flex';
    autocomplete.style.alignItems = 'center';
    autocomplete.style.justifyContent = 'center';
    autocomplete.style.flexDirection = 'column-reverse';
    container.appendChild(autocomplete);

    let input = document.createElement('input');
    input.type = 'text';
    input.style.width = '100vw';
    container.appendChild(input);
    input.focus();
    input.addEventListener('keyup', cmd_render);
    input.addEventListener('blur', ()=>{
      mode = quteify_globals.modes.none;
      container.parentNode.removeChild(container);
    });
  }
}
function cmd_execute(cmd){
  let split = cmd.split(' ');
  for(let key in quteify_globals.commands){
    if(split[1] === key){
      quteify_globals.commands[key].exec(cmd.substring(key.length+3));
      return;
    }
  }
}
function cmd_render(e){
  if(e.keyCode === 27){
    e.target.blur();
    return;
  } else if(e.keyCode === 13){
    cmd_execute(e.target.value);
    e.target.blur();
    return;
  }

  if(e.target.value.length < 2) e.target.value = ': ';

  container.children[0].innerHTML = '';
  let ind = 0;
  for(let key in quteify_globals.commands){
    if(key.indexOf(e.target.value.substring(2, key.length+2)) > -1){
      let el = document.createElement('div');
      el.style.width = '100vw';
      el.style.background = (ind++ % 2 === 0 ? '#333' : 'grey');
      el.style.textIndent = '5px';
      el.style.columns = '10px 2';
      el.innerHTML = `<div>${key} ${quteify_globals.commands[key].args_string}</div><div>${quteify_globals.commands[key].desc}</div>`;
      container.children[0].appendChild(el);
    }
  }
  if(ind === 0) e.target.style.background = '#cc1111';
  else e.target.style.background = 'unset';
}

/*
 * EVENT LISTENER
 */
let timeout = null,
    current_combo = '';
document.addEventListener('keydown', (e)=>{
  let tar = e.target.nodeName.toLowerCase();
  switch(tar){
    case 'input':
    case 'textarea':
      return;
    default:
      if(e.target.contentEditable === 'true') return;
      break;
  }

  if(e.key === 'f' && current_combo === ''){
    if(!e.metaKey && !e.ctrlKey){
      hints_toggle();
    }
  } else if(e.key === ':'){
    cmd_toggle();
  } else if(mode === quteify_globals.modes.hint){
    current_combo += e.key;
    if(timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(()=>{
      for(let key in combos){
        if(current_combo === key){
          hints_toggle();
          combos[key].click();
        }
      }
      current_combo = '';
    }, quteify_globals.key_timeout);
    e.preventDefault();
  }
});
