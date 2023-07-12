//script before everything was rewritten in break infinity

"use strict";

// name, description, cost (catalysts), upgrade line id, prereq (0 means default-unlocked)

let normalupgrades = {
  "default": [
    "Divergence I", "2x multiplier to First fusion cores", '3', 1, 0,
    "Divergence II", "2x multiplier to Second fusion cores", '4', 1, 1,
    "Divergence III", "2x multiplier to Third fusion cores", '30', 1, 2,
    "Divergence IV", "Fourth fusion cores receive a multiplier based on unspent catalysts", '200', 1, 3,
    "Overclock I", "First fusion cores receive a multiplier based on the exponent of the amount of essence you own", '50', 2, 0,
    "Overclock II", "Second fusion cores receive a multiplier based on the exponent of the amount of essence you own", '100', 2, 5,
    "Overclock III", "Third fusion cores receive a multiplier based on the exponent of the amount of First fusion cores you own", '150', 2, 6,
    "Overclock IV", "Fourth fusion cores receive a multiplier based on the 10th root of the amount of Second fusion cores you own", '275', 2, 7,
    "Absorption", "Unlock Assimilation", '500', 3, 8
  ],
  "defaultupgmax": [
    4,
    8,
    9
  ],
  "postsing": [
    "Divergence V", "Fifth fusion cores receive a multiplier based on Singularities", '1000', 1, 4,
    "Overclock V", "Fifth fusion cores receive a multiplier based on the fifth root of the multiplier of Third fusion cores", '1500', 2, 8,
    "Coalescence <span id=coalescencebought></span>", "Increase fusion core upgrade multiplier to <span id=nextcoalescencemult></span>x<p>(Currently <span id=coalescencemult></span>x)</p>", '4000', 4, 0,
    "Metastasis I", "Each fusion core upgrade gives a multiplicative 5% bonus to the previous tier", '100000', 5, 0
  ],
  "postsingupgmax": [
    10,
    11,
    9,
    0,
    13
  ],
  "omega2": [
    "Divergence VI", "Sixth fusion cores receive a multiplier equal to catalyst count", '100000', 1, 10,
    "Divergence VII", "Seventh fusion cores receive a multiplier equal to catalyst count", '200000', 1, 14,
    "Divergence VIII", "Eighth fusion cores receive a multiplier equal to catalyst count", '400000', 1, 15,
    "Divergence IX", "Ninth fusion cores receive a multiplier equal to catalyst count", '800000', 1, 16,
    "Divergence X", "Tenth fusion cores receive a multiplier equal to catalyst count", '1600000', 1, 17,
    "Overclock VI", "Sixth fusion cores receive a decaying x1e6 multiplier which resets when any fusion core is upgraded", '1000000', 2, 11,
    "Overclock VII", "Seventh fusion cores receive a decaying x1e7 multiplier which resets when any fusion core is upgraded", '2000000', 2, 19,
    "Overclock VIII", "Eighth fusion cores receive a decaying x1e8 multiplier which resets when any fusion core is upgraded", '4000000', 2, 20,
    "Overclock IX", "Ninth fusion cores receive a decaying x1e9 multiplier which resets when any fusion core is upgraded", '8000000', 2, 21,
    "Overclock X", "Tenth fusion cores receive a decaying x1e10 multiplier which resets when any fusion core is upgraded", '16000000', 2, 22
  ],
  "omega2singupgmax": [
    18,
    23,
    9,
    0,
    13
  ],
  "omega3": [
    "Metastasis II", "Each fusion core upgrade gives a multiplicative 15% bonus to the previous tier, overrides Metastasis I", '1e7', 5, 13,
    "Metastasis III", "Each fusion core upgrade gives a multiplicative 30% bonus to the previous tier, overrides previous upgrades", '1e8', 5, 24,
    "Metastasis IV", "Each fusion core upgrade gives a multiplicative 50% bonus to the previous tier, overrides previous upgrades", '1e9', 5, 25,
  ],
  "omega3singupgmax": [
    18,
    23,
    9,
    0,
    26
  ]
};

// designation, name, description, cost (vortexes), upgrade line, prereq (0 means default-unlocked)

let singupgrades = {
  "default": [
    "α-0", "ALPHA-NAUGHT", "Gain twice as many vortexes when creating a singularity", '1', 1, 0,
    "Ɛ-1", "EPSILON-1", "Multiplier to all fusion cores based on Vortexes", '4', 2, 1,
    "Δ-1", "DELTA-1", "Increase all fusion core multipliers (n → n^1.05)", '4', 3, 1,
    "Ω-1", "OMEGA-1", "Decrease Singularity requirement (1e45*(1e30)^n → 1e45*(1e29)^n)", '4', 4, 1,
    "Ɛ-2", "EPSILON-2", "Multiplier to all Ichor flow cores based on Vortexes", '8', 2, 2,
    "Ɛ-3", "EPSILON-3", "Assimilation multiplier is squared", '24', 2, 5,
    "Ɛ-4", "EPSILON-4", "Unlock the Catalyzer and gain more vortexes upon singularity based on catalyst count past 486124)", '128', 2, 6,
    "Δ-2", "DELTA-2", "Increase effectiveness of diffusion core (1.1^n → 1.15^n)", '30', 3, 3,
    "Δ-3", "DELTA-3", "Increase Ichor flow core upgrade multiplier (x2 → x2.2)", '110', 3, 8,
    "Δ-4", "DELTA-4", "Increase singularity's essence production multiplier (x3 → x3.3)", '256', 3, 9,
    "Ω-2", "OMEGA-2", "Unlock Divergence 6-10 and Overclock 6-10", '1000', 4, 4,
    "Ω-3", "OMEGA-3", "Unlock Metastasis 2-4", '2500', 4, 11,
    "Ω-4", "OMEGA-4", "Unlock Turbulence 1-3", '7500', 4, 12,
    "α-1", "ALPHA-1", "Research no longer resets upon singularity", '100', 1, 1,
    "α-2", "ALPHA-2", "You can empower two fusion core tiers at once", '1500', 1, 14,
    "α-3", "ALPHA-3", "Unlock the Singularity Array", '100000', 1, 15,
    "ℵ-0", "ALEPH-NAUGHT", "Unlock Fractured Realities", '10000000', 1, 16,
    "ℵ-1", "ALEPH-1", "Passively generate vortexes based on vortexes gained on last Singularity", '1e9', 1, 17,
    "ℵ-2", "ALEPH-2", "Unlock Trials", '1e11', 1, 18,
    "ℵ-3", "ALEPH-3", "Unlock the Shardtree", '1e15', 1, 19,
    "ℵ-4", "ALEPH-4", "Unlock Overclock 11", '1e30', 1, 20
  ],
  "defaultbranches": [
    "α", 0, "Ɛ", 1, "Δ", 1, "Ω", 1, "ℵ", 16
  ],
  "defaultupgmax": [
    16,
    7,
    10,
    13
  ]
};

let singmult = 1;
let multipliers = [];
let ifcmultipliers = [];
let singavailable = false;
let fcmachinecds = [];
for (let i = 0; i < 10; i++) {
  fcmachinecds[i] = 0;
}

export function lssi(local, value) { 
  localStorage.setItem(local, value);
}
export function lsgi(local) {
  return localStorage.getItem(local);
}

//POPUP BOX
export function popup(dialogue){
  document.getElementById("notiftext").innerHTML=dialogue;
  document.getElementById("absolutecentre").style.display="flex";
}

//FUSION CORE COST
export function computecost(t, ah) {
  let tier = t;
  let alreadyhave = ah;
  let cost = 10 ** (tier * (tier + 1) / 2 - 1 + 2 * alreadyhave);
  if (tier > 3) {
    cost *= (10 ** ((tier - 3)));
  }
  if (alreadyhave > 3) {
    cost *= 10 ** Math.floor((alreadyhave - 3) ** Math.sqrt(tier) - 1);
  }
  return cost;
}

//ICHOR FLOW CORE COST
export function computeichorcost(tier, alreadyhave) {
  return 100 * (3 ** (tier - 1)) * (2 ** (alreadyhave));
}

//COMPUTE ASSIMILATION MULT
export function computeassim(fc1s) {
  let assimmult = Math.log10(Number(fc1s)) ** 3;
  if (lsgi("singupgrade6") == 1) {
    assimmult **= 2;
  }
  return assimmult;
}

//WRITE NUMBER IN NOTATION
export function expnumber(n) {
  if (n >= 1000000000) {
    return (Math.floor(Number(n))).toExponential(2);
  }
  else if (n < 1) {
    return Math.floor(Number(n) * 100) / 100;
  }
  else {
    return Math.floor(Number(n));
  }
}

export function expnumberwithdecimal(n) {
  if (n >= 1000000000) {
    return (Math.floor(Number(n))).toExponential(2);
  }
  else {
    return Math.floor(Number(n) * 100) / 100;
  }
}

//TWO DECIMAL PLACES
export function twodeepee(n) {
  return (Math.floor(Number(n) * 100) / 100).toFixed(2);
}

//SECONDS TO HOUR/MIN/SEC

export function str_pad_left(string, pad, length) {
  return (new Array(length + 1).join(pad) + string).slice(-length);
}

export function sectotime(seconds) {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let sec = Math.floor(seconds % 60);
  return hours + ":" + str_pad_left(minutes, '0', 2) + ':' + str_pad_left(sec, '0', 2);

}

//SINGULARITY COST
export function computesingularitycost() {
  return expnumber(Math.min(1e45 * ((1e30 - (Number(lsgi("singupgrade4"))) * 9e29) ** Number(lsgi("singularities"))), 1e300));
}

//CATALYZER DESYNCHRONIZATION
export function calccatadesync(){
  let directdesync = Math.abs(Number(lsgi("catalyzerassonance"))-Number(lsgi("catalyzerdissonance")));
    let roundaboutdesync = 1;
    if (Number(lsgi("catalyzerassonance"))>Number(lsgi("catalyzerdissonance"))){
      roundaboutdesync = (1-Number(lsgi("catalyzerassonance")))+Number(lsgi("catalyzerdissonance"));
    }
    else{
      roundaboutdesync = (1-Number(lsgi("catalyzerdissonance")))+Number(lsgi("catalyzerassonance"));
    }
    let desync;
    if (directdesync<roundaboutdesync){
      desync = directdesync;
    }
    else{
      desync = roundaboutdesync;
    }
    return desync;
}

//CATALYZER PRODUCTION RATE
export function calccatarate(){
  let catarate=1*(2**Number(lsgi("catalyzerrebuyable1")))**(1+Number(lsgi("catalyzerrebuyable2"))*0.1);
  document.getElementById("bonuscatagain").innerHTML="Bonus Catalyst Gain from Synchronisation: +0%";
  if (calccatadesync()<0.03){
    document.getElementById("bonuscatagain").innerHTML="Bonus Catalyst Gain from Synchronisation: +"+expnumberwithdecimal(2**Number(lsgi("catalyzerrebuyable5"))*(0.04/(calccatadesync()+0.005)-1)*100)+"%";
    catarate*=1+(0.04/(calccatadesync()+0.005)-1)*2**Number(lsgi("catalyzerrebuyable5"));
  }
  return catarate;
}

//CATALYZER ENTROPY
export function calcentropy(){
  let entropy=0.004*(1+Math.log10(calccatarate())/Math.log10(2));
  entropy*=0.83**Number(lsgi("catalyzerrebuyable3"));
  return entropy;
}

//UPGRADE FORMAT: NAME(STRING), DESC(STRING), COST(IN CATALYSTS/VORTEXES, INT), SEQUENCE ID(INT), PREREQUISITE(INT; 0 MEANS AVAILABLE BY DEFAULT)
//initial upgrades

let upgs = [];
let upgmax = [];
let supgs = [];
let supgmax = [];
let supgbranches = [];

let fcmachinecooldowns = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let dcmachinecooldown = 0;
let catalyzerspin = 0;
let catalyzerspin2 = 0;
let catalyzerspin3 = 0;

export function check() {
  upgs = normalupgrades.default;
  upgmax = normalupgrades.defaultupgmax;
  supgs = [];
  supgmax = [];
  supgbranches = [];

  //additional upgrades
  if (lsgi("singularities") > 0) {
    upgs = upgs.concat(normalupgrades.postsing);
    upgmax = normalupgrades.postsingupgmax;
    supgs = singupgrades.default;
    supgmax = singupgrades.defaultupgmax;
    supgbranches = singupgrades.defaultbranches;
  }
  if (lsgi("gensunlocked") < 4) {
    lssi("gensunlocked", 4);
  }
  if (lsgi("essence") == null) {
    lssi("essence", 1);
  }
  if (Number(lsgi("essence")) > 1e300) {
    lssi("essence", 1e300);
  }
  if (lsgi("catalyst") == null) {
    lssi("catalyst", 0);
  }
  if (lsgi("ichorflow") == null) {
    lssi("ichorflow", 0);
  }
  if (lsgi("assimilation") == null) {
    lssi("assimilation", 1);
  }
  if (lsgi("singularities") == null) {
    lssi("singularities", 0);
  }
  if (lsgi("firsttimesingularity") == null) {
    lssi("firsttimesingularity", 0);
  }
  if (lsgi("vortex") == null) {
    lssi("vortex", 0);
  }
  for (let i = 1; i <= Number(lsgi("gensunlocked")); i++) {
    if (lsgi("fusionupgrade" + i) == null) {
      lssi("fusionupgrade" + i, 0);
    }
    if (lsgi("fusioncore" + i) == null) {
      lssi("fusioncore" + i, 0);
    }
    if (lsgi("flowupgrade" + i) == null) {
      lssi("flowupgrade" + i, 0);
    }
    if (lsgi("ifc" + i) == null) {
      lssi("ifc" + i, 0);
    }
    if (lsgi("fcmachineup" + i) == null) {
      lssi("fcmachineup" + i, 0);
    }
  }
  if (lsgi("empowered") == null) {
    lssi("empowered", 0);
  }
  if (lsgi("overheattime") == null) {
    lssi("overheattime", 0);
  }
  if (lsgi("currentichor") == null) {
    lssi("currentichor", 0);
  }
  if (lsgi("diffusioncore") == null) {
    lssi("diffusioncore", 0);
  }
  for (let i = 0; i < (upgs.length / 5); i++) {
    if (lsgi("upgrade" + (i + 1)) == null) {
      lssi("upgrade" + (i + 1), 0);
    }
  }
  for (let i = 0; i < (supgs.length / 6); i++) {
    if (lsgi("singupgrade" + (i + 1)) == null) {
      lssi("singupgrade" + (i + 1), 0);
    }
  }
  if (lsgi("catalyzerdisabled") == null) {
    lssi("catalyzerdisabled", "no");
  }
  if (lsgi("catalyzerdisabledonsingularity") == null) {
    lssi("catalyzerdisabledonsingularity", "no");
  }
  if (lsgi("catalyzerintegrity") == null) {
    lssi("catalyzerintegrity", 100);
  }
  if (lsgi("catalyzerdissonance") == null) {
    lssi("catalyzerdissonance", 0.5);
  }
  if (lsgi("catalyzerassonance") == null) {
    lssi("catalyzerassonance", 0.5);
  }
  if (lsgi("catalyzerdanger") == null) {
    lssi("catalyzerdanger", 0);
  }
  for (let i = 1; i <= 5; i++) {
    if (lsgi("catalyzerrebuyable" + i) == null) {
      lssi("catalyzerrebuyable" + i, 0);
    }
  }
}

//render elements
let fcsrendered = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let ifcsrendered = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let fcmachinesrendered = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let dcmachinerendered = 0;
export function rendertabs() {
  let tabs = ['fusion', 'research', 'automation'];
  let tabNames = ["Fusion", "Research", "Automation"];
  if (Number(lsgi("firsttimesingularity")) > 0) {
    tabs[3] = 'singularityresearch';
    tabNames[3] = "Singularity";
  }

  //render tab links
  document.getElementById("tabs").innerHTML = "";
  for (let i = 0; i < tabs.length; i++) {
    document.getElementById("tabs").innerHTML += "<button class=\"tablinks\" onclick=\"opentab(event, '" + tabs[i] + "')\" id=\"tab" + tabs[i] + "\">" + tabNames[i] + "</button>";
  }
}
export function render() {
  //render conditional subtab links
  if (Number(lsgi("singupgrade7")) >= 1) {
    document.getElementById("subtabcatalyzertab").style.display = "inline";
  }
  else {
    document.getElementById("subtabcatalyzertab").style.display = "none";
  }

  document.getElementById("empower").innerHTML = "";
  document.getElementById("upgrades1").innerHTML = "";
  //render fcs, fc machines, empowerment selection
  for (let i = 1; i <= 10; i++) {
    if (i <= Number(lsgi("gensunlocked"))) {
      if (fcsrendered[i - 1] == 0) {
        document.getElementById("generators1").innerHTML += "<div id=fc" + i + "><p>Fusion Core " + i + " (<i id=\"genmultiplier" + i + "\"></i>) | <b id=\"generatorcount" + i + "\"></b> <button class=fcbutton onclick=\"buyfc(" + i + ")\">Upgrade once (<span id=\"boughtfc" + i + "\"></span>) Cost: <span id=\"fccost" + i + "\"></span></button></div>";
        fcsrendered[i - 1] = 1;
      }
      if (fcmachinesrendered[i - 1] == 0) {
        document.getElementById("fcmachines").innerHTML += "<div id=fcmachine" + i + " class=fcmachine><p><button class=machinebuy id=\"fcmachinebuy" + i + "\" onclick=\"buyfcmachine(" + i + ")\"></button></p></div>";
        fcmachinesrendered[i - 1] = 1;
      }
      if (fcmachinesrendered[i - 1] == 1) {
        if (lsgi("fcmachineup" + i) > 0) {
          document.getElementById("fcmachine" + i).innerHTML = "<p><span class=machinelabel>Fusion Core " + i + "</span>| Cooldown: <span class=machinecd id=\"fcmachinecd" + i + "\"></span>| Bulk: <span class=machinebulk id=\"fcmachinebulk" + i + "\"></span></p><p><button class=machinebuy id=\"fcmachinebuy" + i + "\" onclick=\"buyfcmachine(" + i + ")\"></button></p>";
        }
      }

      document.getElementById("empower").innerHTML += "<button class=empowerbutton id=empowerbutton" + i + " onclick=empower(" + i + ")>FC " + i + "</button>"

      document.getElementById("fc" + i).style.display = "block";
      document.getElementById("fcmachine" + i).style.display = "block";
      document.getElementById("empowerbutton" + i).style.display = "inline";

    }
    else {
      if (fcsrendered[i - 1] == 1) {
        document.getElementById("fc" + i).style.display = "none";
        document.getElementById("fcmachine" + i).style.display = "none";
        document.getElementById("empowerbutton" + i).style.display = "none";
      }
    }

  }

  //render ifcs
  for (let i = 1; i <= 10; i++) {
    if (i <= Number(lsgi("gensunlocked"))) {
      if (ifcsrendered[i - 1] == 0) {
        document.getElementById("generators2").innerHTML += "<div id=ifc" + i + "><p>Ichor Flow Core " + i + " (<i id=\"ifcgenmultiplier" + i + "\"></i>) | <b id=\"ifccount" + i + "\"></b> <button class=ifcbutton onclick=\"buyifc(" + i + ")\">Upgrade once (<span id=\"boughtifc" + i + "\"></span>) Cost: <span id=\"ifccost" + i + "\"></span></button></div>";
        ifcsrendered[i - 1] = 1;
      }
      document.getElementById("ifc" + i).style.display = "block";
    }
    else {
      if (ifcsrendered[i - 1] == 1) {
        document.getElementById("ifc" + i).style.display = "none";
        document.getElementById("ifcmachine" + i).style.display = "none";
      }
    }
  }

  if (Number(lsgi("empowered")) > 0) {
    document.getElementById("empoweredfc").innerHTML = "Ichor accumulated: <span id=currentichor></span> (Time elapsed: <span id=overheattime></span>/<span id=overheattimelimit></span>)<p>Fusion Core <span id=empoweredfctext></span> is currently being empowered, gaining a <span id=empoweredbonus></span></p><p>Effective Ichor Flow: <span id=effectiveflow></span> (being divided by <span id=flowdivider></span>)</p>";
  }


  //render diffusion core
  if (lsgi("fusioncore" + lsgi("gensunlocked")) > 0) {
    document.getElementById("diffusion").innerHTML = "<p>Upgrade Diffusion Core (Current multiplier to all fusion cores: <span class=diffusionmult id=diffusionmult></span>x) <button class=dcbutton onclick=buydiffusion()>Upgrade once (<span class=diffusionupgraded id=diffusionupgraded></span>) Cost: <span class=diffusioncost id=diffusioncost></span></button></p>";
  }
  else {
    document.getElementById("diffusion").innerHTML = "Own at least one Fusion Core " + lsgi("gensunlocked") + " to unlock Diffusion.";
  }

  //render dc machine
  if (lsgi("singularities") > 0) {
    if (dcmachinerendered == 0) {
      document.getElementById("dcmachines").innerHTML += "<div id=dcmachine class=dcmachine><p><button class=dcmachinebuy id=\"dcmachinebuy\" onclick=\"buydcmachine()\"></button></p></div>";
      dcmachinerendered = 1;
    }
    if (dcmachinerendered == 1) {
      if (lsgi("dcmachineup") > 0) {
        document.getElementById("dcmachine").innerHTML = "<p><span class=dcmachinelabel>Diffusion Core</span> | Cooldown: <span class=dcmachinecd id=\"dcmachinecd\"></span>| Bulk: <span class=dcmachinebulk id=\"dcmachinebulk\"></span></p><p><button class=dcmachinebuy id=\"dcmachinebuy\" onclick=\"buydcmachine()\"></button></p>";
      }
    }
  }
  else {
    document.getElementById("dcmachines").style.display = "none";
  }

  //render upgrades
  for (let i = 0; i < (upgs.length / 20); i++) {
    document.getElementById("upgrades1").innerHTML += "<div class=upgraderow id=\"upgrow" + i + "\"></div>"
  }
  let upgradesshown = 0;
  for (let i = 0; i < (upgs.length / 5); i++) {
    if (lsgi("upgrade" + (i + 1)) == 1 && upgmax[upgs[i * 5 + 3] - 1] != 0) {
      upgradesshown += 1;
      document.getElementById("upgrow" + Math.floor((upgradesshown - 1) / 4)).innerHTML += "<div class=upgrade><b>" + upgs[i * 5] + ": </b> " + upgs[i * 5 + 1] + " <p><button class=maxedupgbutton>Max purchased</button></p></div>";
    }
    else if (((lsgi("upgrade" + (i + 1)) == 0 && (lsgi("upgrade" + upgs[i * 5 + 4]) == 1 || upgs[i * 5 + 4] == 0)) || upgmax[upgs[i * 5 + 3] - 1] == 0) && (i != 11)) {
      upgradesshown += 1;
      document.getElementById("upgrow" + Math.floor((upgradesshown - 1) / 4)).innerHTML += "<div class=upgrade><b>" + upgs[i * 5] + ": </b> " + upgs[i * 5 + 1] + " <p><button class=upgbutton onclick=\"buyupg(" + (i + 1) + ")\">Costs: " + expnumber(upgs[i * 5 + 2]) + " catalysts</button></p></div>";
    }
    //coalescence special case
    else if (i == 11) {
      upgradesshown += 1;
      document.getElementById("upgrow" + Math.floor((upgradesshown - 1) / 4)).innerHTML += "<div class=upgrade><b>" + upgs[i * 5] + ": </b> " + upgs[i * 5 + 1] + " <p><button class=upgbutton onclick=\"buyupg(" + (i + 1) + ")\">Costs: " + expnumber(upgs[i * 5 + 2] * 8 ** (Number(lsgi("upgrade12")))) + " catalysts</button></p></div>";
    }
  }
  //render sing upgrades
  if (lsgi("firsttimesingularity") == 1) {
    document.getElementById("upgrades2").innerHTML = "<h2>Singularity Research</h2>";
    for (let i = 0; i < (supgbranches.length / 2); i++) {
      if (lsgi("singupgrade" + supgbranches[i * 2 + 1]) == 1 || supgbranches[i * 2 + 1] == 0) {
        document.getElementById("upgrades2").innerHTML += "<div class=supgbranch id=\"singupgrades" + supgbranches[i * 2] + "\"></div>";
        document.getElementById("singupgrades" + supgbranches[i * 2]).innerHTML += "<div class=\"supgbranchletter supgbranchletter" + supgbranches[i * 2] + "\">" + supgbranches[i * 2] + "</div><div class=upgradecontainer id=\"upgradecontainer" + supgbranches[i * 2] + "\"></div>";
      }
    }
    for (let i = 0; i < (supgs.length / 6); i++) {
      if (lsgi("singupgrade" + (i + 1)) == 1 && supgmax[supgs[i * 6 + 4] - 1] != 0) {
        document.getElementById("upgradecontainer" + supgs[i * 6][0]).innerHTML += "<div class=\"singupgrade maxedsingupgrade " + supgs[i * 6][0] + "\"><div class=maxedsingupgsymbol>" + supgs[i * 6] + "</div><b>" + supgs[i * 6 + 1] + ": </b> " + supgs[i * 6 + 2] + " <p><button class=maxedsingupgbutton>Max purchased</button></p></div>";
      }
      else if ((lsgi("singupgrade" + (i + 1)) == 0 && (lsgi("singupgrade" + supgs[i * 6 + 5]) == 1 || supgs[i * 6 + 5] == 0)) || supgmax[supgs[i * 6 + 4] - 1] == 0) {
        document.getElementById("upgradecontainer" + supgs[i * 6][0]).innerHTML += "<div class=singupgrade><div class=singupgsymbol>" + supgs[i * 6] + "</div><b>" + supgs[i * 6 + 1] + ": </b> " + supgs[i * 6 + 2] + " <p><button class=singupgbutton onclick=\"buysupg(" + (i + 1) + ")\">Costs: " + expnumber(supgs[i * 6 + 3]) + " vortexes</button></p></div>";
      }
    }
  }
  //ASSIMILATION
  if (lsgi("upgrade9") == "1") {
    document.getElementById("assimilation").innerHTML = "<p>Assimilate fusion cores (Tier " + lsgi("gensunlocked") + " fusion core multiplier: <span id=currassimmult></span>x) <button class=assimbutton id=assimbutton onclick=assimilate()></button></p><p style=\"font-size:10px;width:50%;margin:auto;\">Assimilation will destroy all fusion cores besides your highest tier, in exchange for a multiplier to your highest tier of cores based on the exponent of how many first fusion cores you have when you assimilate.</p>";
  }

  //render the catalyzer
  if (lsgi("singupgrade7") == "1") {
    document.getElementById("catalystgainpersecond").innerHTML="You are gaining <span id=catalystgainvalue></span> catalysts per second.";
    document.getElementById("catalyzerdisplay").innerHTML="<p id=catalyzerintegrity>Catalyzer Integrity: <span id=catalyzercurrentintegrity></span></p><div id=catalyzervisual></div>";
    document.getElementById("catalyzerdisplay").innerHTML="<h2>Catalyzer Integrity:</h2><div id=catalyzerintegrity><div id=catalyzerintegritybar></div><span id=catalyzercurrentintegrity></span></div><div id=catalyzervisual><div class=imagecentre><img id=catalyzervisualimage src=\"images/catalyzersigil.png\"></div><div class=imagecentre><img id=catalyzervisualimage2 src=\"images/catalyzersigil.png\"></div><div class=imagecentre><img id=catalyzervisualimage3 src=\"images/catalyzersigil.png\"></div><div class=imagecentre><img id=catalyzervisualimage4 src=\"images/catalyzersigil.png\"></div></div>";
    document.getElementById("entropy").innerHTML="<p>Entropy: <span id=catalyzercurrententropy></span>%</p>";
    document.getElementById("attunement").innerHTML="<p class=assonancenumber>Assonance: <span id=assonancevalue></span></p><input type=\"range\" min=\"0\" max=\"10000\" value=\""+Number(lsgi("catalyzerassonance"))*10000+"\" class=\"assonanceslider slider\" id=assonanceattunement><p class=dissonancenumber>Dissonance: <span id=dissonancevalue></span></p><input type=\"range\" min=\"0\" max=\"10000\" disabled=\"true\" class=\"dissonanceslider slider\" id=dissonanceattunement><div id=bonuscatagain></div><div id=catalyzerdangerlevel><div id=catalyzerdangerlevelbar></div>DANGER LEVEL<p id=catalyzerdangervalue></p></div>";

    let catalyzerupgrades=["Unstable Acceleration","Multiply base Catalyst gain by 2","Chaos Momentum","Increase the power to which base gain is raised to by 0.1","Oscillating Stabilisation","Reduce entropy by 17%","Crystallite Structure","Multiply Max Integrity by 1.5","Overloading Symphony","Multiply bonus Catalyst gain from synchronisation by 2"];
    document.getElementById("upgrades3").innerHTML="";
    for (let i=0;i < (catalyzerupgrades.length / 2); i++){
      document.getElementById("upgrades3").innerHTML+="<button class=cataupgrade id=cataupgrade"+(i+1)+" onclick=\"buycataupg(" + (i + 1) + ")\"></button>"
      document.getElementById("cataupgrade"+(i+1)).innerHTML+="<b class=cataupgradename>" + catalyzerupgrades[i * 2] + " <span id=cataupgradebought"+(i+1)+"></span></b><p> " + catalyzerupgrades[i * 2 + 1] + "</p><p>Currently: <span id=cataupgradeeffect"+(i+1)+"></span></p><p>Costs: <span id=cataupgradeprice"+(i+1)+"></span> catalysts</p>";
    }

  }
}
check();
render();

//tick actions
export function tick() {
  check();

  //production from fusion cores
  for (let i = 1; i <= Number(lsgi("gensunlocked")); i++) {
    let gain = 0;
    let multiplier = ((3 + Number(lsgi("singupgrade10")) * .3) ** Number(lsgi("singularities"))) * ((1.1 + 0.05 * Number(lsgi("singupgrade8"))) ** Number(lsgi("diffusioncore")));
    if (Number(lsgi("fusionupgrade" + i)) > 0) {
      gain += ((Number(lsgi("fusioncore" + i))) / (10 * (2 ** (i - 1))));
      multiplier *= (2 * (1.1 ** Number(lsgi("upgrade12")))) ** Number(lsgi("fusionupgrade" + i));

      //ASSIMILATION MULTIPLIER
      if (i == lsgi("gensunlocked")) {
        if (Number(lsgi("assimilation")) > 1) {
          multiplier *= Number(lsgi("assimilation"));
        }
      }

      //EMPOWER
      if (i == lsgi("empowered")) {
        if (Number(lsgi("overheattime")) <= 10 * (3 ** (Number(lsgi("empowered")) - 1))) {
          multiplier *= (1 + Math.log10(Number(lsgi("currentichor")) + 1) ** 2.5);
        }
      }

      //UPGRADE: DIVERGENCE 1
      if (lsgi("upgrade1") == 1) {
        if (i == 1) {
          multiplier *= 2;
        }
      }
      //UPGRADE: DIVERGENCE 2
      if (lsgi("upgrade2") == 1) {
        if (i == 2) {
          multiplier *= 2;
        }
      }
      //UPGRADE: DIVERGENCE 3
      if (lsgi("upgrade3") == 1) {
        if (i == 3) {
          multiplier *= 2;
        }
      }
      //UPGRADE: DIVERGENCE 4
      if (lsgi("upgrade4") == 1) {
        if (i == 4) {
          multiplier *= 1 + (Number(lsgi("catalyst")) / 50);
        }
      }
      //UPGRADE: DIVERGENCE 5
      if (lsgi("upgrade9") == 1) {
        if (i == 5) {
          multiplier *= 1 + (Number(lsgi("singularities")));
        }
      }
      //UPGRADE: OVERCLOCK 1
      if (lsgi("upgrade5") == 1) {
        if (i == 1) {
          multiplier *= 1 + Math.log10(Number(lsgi("essence")) + 1) / 3;
        }
      }
      //UPGRADE: OVERCLOCK 2
      if (lsgi("upgrade6") == 1) {
        if (i == 2) {
          multiplier *= 1 + Math.log10(Number(lsgi("essence")) + 1) / 3;
        }
      }
      //UPGRADE: OVERCLOCK 3
      if (lsgi("upgrade7") == 1) {
        if (i == 3) {
          multiplier *= 1 + Math.log10(Number(lsgi("fusioncore1")) + 1) / 3;
        }
      }
      //UPGRADE: OVERCLOCK 4
      if (lsgi("upgrade8") == 1) {
        if (i == 4) {
          multiplier *= 1 + Number(lsgi("fusioncore2")) ** 0.1;
        }
      }
      //UPGRADE: OVERCLOCK 5
      if (lsgi("upgrade10") == 1) {
        if (i == 5) {
          multiplier *= 1 + multipliers[3] ** 0.2;
        }
      }
      //UPGRADE: METASTASIS 1
      if (lsgi("upgrade13") == 1) {
        multiplier *= 1.05 ** (Number(lsgi("fusionupgrade" + (i + 1))));
      }
      //SINGULARITY UPGRADE: EPSILON 1
      if (lsgi("singupgrade2") == 1) {
        multiplier *= 1 + (Number(lsgi("vortex"))) / 2;
      }
      //SINGULARITY UPGRADE: DELTA 1
      if (lsgi("singupgrade3") == 1) {
        multiplier **= 1.05;
      }

      //OVERHEAT
      document.getElementById("genmultiplier" + i).style.color = "black";
      document.getElementById("genmultiplier" + i).style.fontWeight = "";
      if (i == lsgi("empowered")) {
        if (Number(lsgi("overheattime")) > 10 * (3 ** (Number(lsgi("empowered")) - 1))) {
          multiplier **= 0.5;
          document.getElementById("genmultiplier" + i).style.color = "red";
          document.getElementById("genmultiplier" + i).style.fontWeight = "bold";
        }
      }

      //HARDCAP
      let projectedgain = gain * multiplier;
      if (i > 1) {
        if (Number(lsgi("fusioncore" + (i - 1))) + projectedgain > 1e300) {
          multiplier = 0;
          lssi("fusioncore" + (i - 1), 1e300);
        }
      }
      else {
        if (Number(lsgi("essence" + (i - 1))) + projectedgain > 1e300) {
          multiplier = 0;
          lssi("essence", 1e300);
        }
      }

      multipliers[i] = multiplier;
      gain *= multiplier;
      if (i > 1) {
        lssi("fusioncore" + (i - 1), Number(lsgi("fusioncore" + (i - 1))) + gain);
      }
      else {
        lssi("essence", Number(lsgi("essence")) + gain);
      }
    }

    //fcmachine operations
    if (Number(lsgi("fcmachineup" + i)) > 0) {
      fcmachinecooldowns[i - 1] += 1;
      if ((4 + .5 * i) * (0.7 ** Number(lsgi("fcmachineup" + i))) > 0.1) {
        document.getElementById("fcmachinebuy" + i).innerHTML = "Reduce interval by 30% for " + expnumber(50 * 1.5 ** (i - 1) * 1.1 ** (Number(lsgi("fcmachineup" + i)))) + " Catalysts";
        document.getElementById("fcmachinecd" + i).innerHTML = twodeepee((4 + .5 * i) * (0.7 ** Number(lsgi("fcmachineup" + i)))) + " seconds";
        document.getElementById("fcmachinebulk" + i).innerHTML = "1x";
        if (fcmachinecooldowns[i - 1] >= (4 + .5 * i) * (0.7 ** Number(lsgi("fcmachineup" + i))) * 20) {
          buyfc(i);
          fcmachinecooldowns[i - 1] = 0;
        }
      }
      else if (2 ** Math.floor((lsgi("fcmachineup" + i)) - Math.log(0.1 / (4 + .5 * i)) / Math.log(0.7)) < 64) {
        document.getElementById("fcmachinebuy" + i).innerHTML = "Double bulk amount for " + expnumber(50 * 1.5 ** (i - 1) * 1.1 ** (Number(lsgi("fcmachineup" + i)))) + " Catalysts";
        document.getElementById("fcmachinecd" + i).innerHTML = "0.1 seconds";
        document.getElementById("fcmachinebulk" + i).innerHTML = 2 ** Math.floor((lsgi("fcmachineup" + i)) - Math.log(0.1 / (4 + .5 * i)) / Math.log(0.7)) + "x";
        if (fcmachinecooldowns[i - 1] >= 2) {
          for (let a = 1; a <= 64; a++) {
            buyfc(i);
            fcmachinecooldowns[i - 1] = 0;
          }
        }
      }
      else {
        document.getElementById("fcmachinebuy" + i).innerHTML = "Bulk and Cooldown Maxed!";
        document.getElementById("fcmachinecd" + i).innerHTML = "0.1 seconds";
        document.getElementById("fcmachinebulk" + i).innerHTML = "64x";
        if (fcmachinecooldowns[i - 1] >= 2) {
          for (let a = 1; a <= 64; a++) {
            buyfc(i);
            fcmachinecooldowns[i - 1] = 0;
          }
        }
      }
    }
    else {
      document.getElementById("fcmachinebuy" + i).innerHTML = "Unlock SYNTHESIS ARRAY for FC " + i + " for " + expnumber(150 * 1.5 ** (i - 1)) + " Catalysts";
    }

    //IFC production
    let ichorgain = lsgi("ifc" + i) / 20;
    let ichormult = (2 + Number(lsgi("singupgrade9")) * 0.2) ** (Number(lsgi("flowupgrade" + i)));

    //SINGULARITY UPGRADE: EPSILON 2
    if (lsgi("singupgrade5") == 1) {
      ichormult *= 1 + (Number(lsgi("vortex"))) ** 0.5;
    }

    //IFC HARDCAP
    let projectedichorgain = ichorgain * ichormult;
    if (i > 1) {
      if (Number(lsgi("ifc" + (i - 1))) + projectedichorgain > 1e300) {
        ichormult = 0;
        lssi("ifc" + (i - 1), 1e300);
      }
    }
    else {
      if (projectedichorgain > 1e300) {
        ichormult = 0;
        lssi("ichorflow", 1e300);
      }
    }

    ifcmultipliers[i] = ichormult;
    ichorgain *= ichormult;
    if (i > 1) {
      lssi("ifc" + (i - 1), Number(lsgi("ifc" + (i - 1))) + ichorgain);
    }
    else {
      lssi("ichorflow", ichorgain);
    }

    //UPDATE FC DISPLAY
    document.getElementById("generatorcount" + i).innerHTML = expnumber(lsgi("fusioncore" + i));
    document.getElementById("genmultiplier" + i).innerHTML = expnumberwithdecimal(multiplier) + "x";
    document.getElementById("boughtfc" + i).innerHTML = expnumber(lsgi("fusionupgrade" + i));
    document.getElementById("fccost" + i).innerHTML = expnumber(computecost(i, Number(lsgi("fusionupgrade" + i))));

    //UPDATE IFC DISPLAY
    document.getElementById("ifccount" + i).innerHTML = expnumber(lsgi("ifc" + i));
    document.getElementById("ifcgenmultiplier" + i).innerHTML = expnumber(ichormult) + "x";
    document.getElementById("boughtifc" + i).innerHTML = expnumber(lsgi("flowupgrade" + i));
    document.getElementById("ifccost" + i).innerHTML = expnumber(computeichorcost(i, Number(lsgi("flowupgrade" + i)))) + " catalysts";

    if (Number(lsgi("ichorflow")) == 0) {
      document.getElementById("empower").style.display = "none";
      document.getElementById("empowerheading").style.display = "none";
    }
    else {
      document.getElementById("empower").style.display = "block";
      document.getElementById("empowerheading").style.display = "block";
    }
    document.getElementById("genmultiplier" + i).style.color = "black";
    document.getElementById("genmultiplier" + i).style.fontWeight = "";
    if (Number(lsgi("empowered")) > 0) {
      document.getElementById("genmultiplier" + lsgi("empowered")).style.color = "#10c400";
      document.getElementById("genmultiplier" + lsgi("empowered")).style.fontWeight = "bold";
      document.getElementById("empowerbutton" + lsgi("empowered")).style.backgroundColor = "#95ff13";
      document.getElementById("empoweredfc").style.display = "block";
    }
    else {
      document.getElementById("empoweredfc").style.display = "none";
    }
  }

  //EMPOWER OPERATIONS
  if (Number(lsgi("empowered")) > 0) {
    lssi("overheattime", Number(lsgi("overheattime")) + .05);
    if (Number(lsgi("currentichor")) + Number(lsgi("ichorflow")) / 2 ** (Number(lsgi("empowered")) - 1) < 1e300) {
      lssi("currentichor", Number(lsgi("currentichor")) + Number(lsgi("ichorflow")) / 2 ** (Number(lsgi("empowered")) - 1));
    }
    else {
      lssi("currentichor", 1e300)
    }
  }
  else {
    lssi("overheattime", 0);
    lssi("currentichor", 0);
  }

  //EMPOWER DISPLAY
  document.getElementById("overheatwarning").style.display = "none";
  if (Number(lsgi("empowered")) > 0) {
    document.getElementById("currentichor").innerHTML = expnumber(lsgi("currentichor"));
    document.getElementById("overheattimelimit").innerHTML = sectotime(10 * (3 ** (Number(lsgi("empowered")) - 1)));
    document.getElementById("overheattime").innerHTML = sectotime(lsgi("overheattime"));
    document.getElementById("empoweredfctext").innerHTML = lsgi("empowered");
    document.getElementById("empoweredbonus").innerHTML = expnumberwithdecimal((Math.log10(Number(lsgi("currentichor")) + 1) ** 2.5 + 1)) + "x multiplier.";
    document.getElementById("effectiveflow").innerHTML = expnumberwithdecimal(Number(lsgi("ichorflow")) / 2 ** (Number(lsgi("empowered")) - 1) * 20);
    document.getElementById("flowdivider").innerHTML = 2 ** (Number(lsgi("empowered")) - 1);
    if (Number(lsgi("overheattime")) > 10 * (3 ** (Number(lsgi("empowered")) - 1))) {
      document.getElementById("overheatwarning").style.display = "block";
      document.getElementById("genmultiplier" + lsgi("empowered")).style.color = "#960a00";
      document.getElementById("genmultiplier" + lsgi("empowered")).style.fontWeight = "bold";
      document.getElementById("empoweredbonus").innerHTML = "SQUARE ROOT PENALTY";
      document.getElementById("empoweredbonus").style.textShadow = "0px 0px 3px #ff000088"
      document.getElementById("empoweredbonus").style.color = "red";
      document.getElementById("overheattime").style.color = "red";
    }
    else {
      document.getElementById("overheattime").style.color = "black";
      document.getElementById("empoweredbonus").style.textShadow = "0px 0px 3px #95ff13"
    }
  }


  //dcmachine operations
  if (lsgi("firsttimesingularity") == 1) {
    if (Number(lsgi("dcmachineup")) > 0) {
      dcmachinecooldown += 1;
      if (10 * (0.5 ** Number(lsgi("dcmachineup"))) > 0.1) {
        document.getElementById("dcmachinebuy").innerHTML = "Reduce interval by 50% for " + expnumber(300000 * 1.1 ** (Number(lsgi("dcmachineup")))) + " Catalysts";
        document.getElementById("dcmachinecd").innerHTML = twodeepee(10 * (0.5 ** Number(lsgi("dcmachineup")))) + " seconds";
        document.getElementById("dcmachinebulk").innerHTML = "1x";
        if (dcmachinecooldown >= 10 * (0.5 ** Number(lsgi("dcmachineup"))) * 20) {
          buydiffusion();
          dcmachinecooldown = 0;
        }
      }
      else if (2 ** Math.floor((lsgi("dcmachineup")) - Math.log(0.01) / Math.log(0.5)) < 64) {
        document.getElementById("dcmachinebuy").innerHTML = "Double bulk amount for " + expnumber(300000 * 1.1 ** (Number(lsgi("dcmachineup")))) + " Catalysts";
        document.getElementById("dcmachinecd").innerHTML = "0.1 seconds";
        document.getElementById("dcmachinebulk").innerHTML = 2 ** Math.floor((lsgi("dcmachineup")) - Math.log(0.01) / Math.log(0.5)) + "x";
        if (dcmachinecooldown >= 2) {
          for (let a = 1; a <= 64; a++) {
            buydiffusion();
            dcmachinecooldown = 0;
          }
        }
      }
      else {
        document.getElementById("dcmachinebuy").innerHTML = "Bulk and Cooldown Maxed!";
        document.getElementById("dcmachinecd").innerHTML = "0.1 seconds";
        document.getElementById("dcmachinebulk").innerHTML = "64x";
        if (dcmachinecooldown >= 2) {
          for (let a = 1; a <= 64; a++) {
            buydiffusion();
            dcmachinecooldown = 0;
          }
        }
      }
    }
    else {
      document.getElementById("dcmachinebuy").innerHTML = "Unlock SYNTHESIS ARRAY for DIFFUSION CORE for 1000000 Catalysts";
    }
  }

  //catalyzer operations
  if (lsgi("singupgrade7")=="1"){
    let cataupgradesavailable=5;
    let maxintegrity=100*(1.5**Number(lsgi("catalyzerrebuyable4")));
    lssi("catalyzerassonance",document.getElementById("assonanceattunement").value/10000);
    if (lsgi("catalyzerdisabled")=="no"){
      lssi("catalyst",Number(lsgi("catalyst"))+calccatarate()/20);
      lssi("catalyzerdissonance",Number(lsgi("catalyzerdissonance"))+calcentropy()*(Math.random()*2-1));
      if (Number(lsgi("catalyzerdissonance"))>1){
        lssi("catalyzerdissonance",0);
      }
      if (Number(lsgi("catalyzerdissonance"))<0){
        lssi("catalyzerdissonance",1);
      }
      if (calccatadesync()>0.05){
        lssi("catalyzerdanger",Number(lsgi("catalyzerdanger"))+10*calccatadesync()**2);
      }
      else{
        lssi("catalyzerdanger",Number(lsgi("catalyzerdanger"))-0.2);
        lssi("catalyzerintegrity",Number(lsgi("catalyzerintegrity"))+((maxintegrity-Number(lsgi("catalyzerintegrity")))/1000+maxintegrity/500));
      }
      if (Number(lsgi("catalyzerdanger"))<0){
        lssi("catalyzerdanger",0);
      }
      if (Number(lsgi("catalyzerdanger"))>100){
        lssi("catalyzerdanger",100);
      }
      if (Number(lsgi("catalyzerdanger"))==100){
        lssi("catalyzerintegrity",Number(lsgi("catalyzerintegrity"))-(500*Math.log10(calccatarate()+1)*calcentropy()));
      }
      if (Number(lsgi("catalyzerintegrity"))<0){
        lssi("catalyzerintegrity", 100);
        lssi("catalyzerdissonance", Number(lsgi("catalyzerassonance")));
        lssi("catalyzerdanger", 0);
        for (let i = 1; i <= 5; i++) {
          lssi("catalyzerrebuyable" + i, 0);
        }
        popup("<p>The Catalyzer has destroyed itself due to its Integrity reaching zero. It and all its Upgrades have been reset to their initial state.</p><p>Be careful with how many Catalyst production rate upgrades you purchase for it.</p>")
      }
      if (Number(lsgi("catalyzerintegrity"))>maxintegrity){
        lssi("catalyzerintegrity",maxintegrity);
      }
      catalyzerspin+=(calcentropy()*100)**5;
      catalyzerspin2+=(calcentropy()*100)**6;
      catalyzerspin3+=(calcentropy()*100)**7;
    }
    else{
      catalyzerspin2=catalyzerspin
      catalyzerspin3=catalyzerspin
    }

    //catalyzer display
    document.getElementById("catalyzervisualimage").style.rotate=catalyzerspin+"deg";
    document.getElementById("catalyzervisualimage2").style.rotate=catalyzerspin2+"deg";
    document.getElementById("catalyzervisualimage3").style.rotate=catalyzerspin3+"deg";
    document.getElementById("catalyzervisualimage4").style.rotate=catalyzerspin+"deg";
    if (lsgi("catalyzerdisabled")=="no"){
      document.getElementById("disablecatalyzer").innerHTML="DISABLE CATALYZER UNTIL SINGULARITY";
    }
    else{
      document.getElementById("disablecatalyzer").innerHTML="CATALYZER DISABLED";
    }
    if (lsgi("catalyzerdisabledonsingularity")=="no"){
      document.getElementById("togglecatalyzeronsingularity").innerHTML="DISABLE CATALYZER NEXT SINGULARITY: ✘";
    }
    else{
      document.getElementById("togglecatalyzeronsingularity").innerHTML="DISABLE CATALYZER NEXT SINGULARITY: ✔";
    }
    document.getElementById("dissonanceattunement").value=Number(lsgi("catalyzerdissonance"))*10000;
    document.getElementById("catalystgainvalue").innerHTML = expnumber(calccatarate());
    if (lsgi("catalyzerdisabled")!="no"){
      document.getElementById("catalystgainvalue").innerHTML += " (DISABLED)";
    }
    document.getElementById("catalyzercurrentintegrity").innerHTML = expnumber(lsgi("catalyzerintegrity"))+" / " + expnumber(maxintegrity);
    document.getElementById("catalyzercurrententropy").innerHTML = expnumberwithdecimal(calcentropy()*20);
    document.getElementById("assonancevalue").innerHTML = expnumberwithdecimal(Number(lsgi("catalyzerassonance"))*100)+"%";
    document.getElementById("dissonancevalue").innerHTML = expnumberwithdecimal(Number(lsgi("catalyzerdissonance"))*100)+"%";
    document.getElementById("catalyzerdangervalue").innerHTML="Danger: "+expnumberwithdecimal(Number(lsgi("catalyzerdanger")))+"%";
    document.getElementById("catalyzerdangerlevelbar").style.width=Number(lsgi("catalyzerdanger"))+"%";
    document.getElementById("catalyzerintegritybar").style.width=Number(lsgi("catalyzerintegrity"))/maxintegrity*100+"%";
    for (let i=1;i<=cataupgradesavailable;i++){
      document.getElementById("cataupgradebought"+i).innerHTML=expnumber(Number(lsgi("catalyzerrebuyable"+i))+1);
      document.getElementById("cataupgradeprice"+i).innerHTML=expnumber(10*(10**Number(lsgi("catalyzerrebuyable"+i))));
    }
    document.getElementById("cataupgradeeffect1").innerHTML=expnumber(2**Number(lsgi("catalyzerrebuyable1")))+"x";
    document.getElementById("cataupgradeeffect2").innerHTML="^"+expnumberwithdecimal(1+0.1*Number(lsgi("catalyzerrebuyable2")));
    document.getElementById("cataupgradeeffect3").innerHTML="divided by "+expnumberwithdecimal((100/83)**Number(lsgi("catalyzerrebuyable3")));
    document.getElementById("cataupgradeeffect4").innerHTML=expnumberwithdecimal(1.5**Number(lsgi("catalyzerrebuyable4")))+"x";
    document.getElementById("cataupgradeeffect5").innerHTML=expnumber(2**Number(lsgi("catalyzerrebuyable5")))+"x";
  }


  //SINGULARITY BONUSES

  //SING. UPGRADE: ALPHA-0
  singmult = 1;
  if (lsgi("singupgrade1") == 1) {
    singmult *= 2;
  }
  if (lsgi("singupgrade7") == 1&&Number(lsgi("catalyst"))>486124) {
    singmult *= 1 + Math.log10(Number(lsgi("catalyst"))-486124)/Math.log10(2)/5;
  }

  //RESOURCE DISPLAY
  document.getElementById("resources").innerHTML = "<p>You have <span class=nukes>" + expnumber(lsgi("essence")) + "</span> nuclear essence.</p>";
  document.getElementById("resources").innerHTML += "<p>You have <span class=catas>" + expnumber(lsgi("catalyst")) + "</span> fusion catalysts.</p>";
  document.getElementById("ichorgainpersecond").innerHTML = "<p>You are producing <span class=ichor>" + expnumber(Number(lsgi("ichorflow")) * 20) + "</span> ichor every second.</p>";
  document.getElementById("singularity").innerHTML = "Reach " + computesingularitycost() + " essence to create a singularity."

  //SINGULARITY DISPLAY
  if (Number(lsgi("essence")) >= computesingularitycost() && !singavailable || lsgi("essence") == 'NaN' && !singavailable) {
    document.getElementById("singularitybutton").innerHTML = "<button class=singbutton onclick=\"singularity()\"><h1>CREATE SINGULARITY</h1><p>Creating a singularity will erase all essence, catalysts, fusion cores, ichor flow cores and normal upgrades, in return for a 3x mult to essence generation, more upgrades, and one more fusion core and ichor flow core tier (up to 10).</p>";
    singavailable = true;
  }

  //DIFFUSION DISPLAY
  if (lsgi("fusionupgrade" + lsgi("gensunlocked")) > 0) {
    document.getElementById("diffusionmult").innerHTML = expnumberwithdecimal((1.1 + 0.05 * Number(lsgi("singupgrade8"))) ** Number(lsgi("diffusioncore")));
    document.getElementById("diffusionupgraded").innerHTML = lsgi("diffusioncore");
    document.getElementById("diffusioncost").innerHTML = expnumber(computecost(Number(lsgi("gensunlocked")), 0) * (10 ** Number(lsgi("diffusioncore"))));
  }

  //ASSIMILATION DISPLAY
  if (lsgi("upgrade9") == "1") {
    document.getElementById("assimilation").style.display = "block";
    if (Number(lsgi("fusioncore" + lsgi("gensunlocked"))) > 0) {
      if (computeassim(Number(lsgi("fusioncore1"))) >= Number(lsgi("assimilation"))) {
        document.getElementById("assimbutton").innerHTML = "ASSIMILATE FOR A <span id=assimmult></span>x MULT";
      }
      else {
        document.getElementById("assimbutton").innerHTML = "CANNOT ASSIMILATE UNTIL 1x MULT (<span id=assimmult></span>x MULT)";
      }
      document.getElementById("currassimmult").innerHTML = expnumber(lsgi("assimilation"));
      document.getElementById("assimmult").innerHTML = expnumberwithdecimal(computeassim(lsgi("fusioncore1")) / Number(lsgi("assimilation")));
    }
    else {
      document.getElementById("assimbutton").innerHTML = "CANNOT ASSIMILATE UNTIL TIER " + lsgi("gensunlocked") + " BOUGHT";
    }
  }
  else {
    lssi("assimilation", 1);
    document.getElementById("assimilation").style.display = "none";
  }

  //singularity-vortex display
  if (lsgi("singularities") > 0) {
    document.getElementById("singularity").innerHTML += "<p>You have created " + lsgi("singularities") + " singularities. your next singularity will grant <b id=\"singularityreward\"></b> vortexes.</p>"
  }
  if (lsgi("firsttimesingularity") == 1) {
    document.getElementById("singularityreward").innerHTML = expnumber(Math.round((Number(lsgi("singularities")) + 1) * singmult));
    document.getElementById("resources").innerHTML += "<p><span class=vortexes>" + expnumber(lsgi("vortex")) + "</span> vortexes have been accumulated.</p>";
    document.getElementById("coalescencebought").innerHTML = Number(lsgi("upgrade12")) + 1;
    document.getElementById("nextcoalescencemult").innerHTML = Math.floor(2 * (1.1 ** (Number(lsgi("upgrade12")) + 1)) * 100) / 100;
    document.getElementById("coalescencemult").innerHTML = Math.floor(2 * (1.1 ** Number(lsgi("upgrade12"))) * 100) / 100;
  }
}

//BUY FUSION CORE
export function buyfc(core) {
  let corecost = computecost(core, Number(lsgi("fusionupgrade" + core)));
  if (lsgi("essence") >= corecost) {
    lssi("fusionupgrade" + core, Number(lsgi("fusionupgrade" + core)) + 1);
    lssi("fusioncore" + core, Number(lsgi("fusioncore" + core)) + 1);
    lssi("essence", Number(lsgi("essence")) - corecost);
    lssi("catalyst", Number(lsgi("catalyst")) + (core * (Number(lsgi("fusionupgrade" + core)) ** 2)));
  }
  if (lsgi("fusionupgrade" + core) == 1 && core == lsgi("gensunlocked")) {
    render();
  }
}
buyfc(1);

//BUY ICHOR FLOW CORE
export function buyifc(core) {
  let corecost = computeichorcost(core, Number(lsgi("flowupgrade" + core)));
  if (lsgi("catalyst") >= corecost) {
    lssi("flowupgrade" + core, Number(lsgi("flowupgrade" + core)) + 1);
    lssi("ifc" + core, Number(lsgi("ifc" + core)) + 1);
    lssi("catalyst", Number(lsgi("catalyst")) - corecost);
  }
}

//EMPOWER FC
export function empower(fc) {
  lssi("overheattime", 0);
  lssi("currentichor", 0);
  if (lsgi("empowered") == fc) {
    lssi("empowered", 0);
  }
  else {
    lssi("empowered", fc);
  }
  render();
}

//BUY DIFFUSION CORE
export function buydiffusion() {
  let corecost = computecost(Number(lsgi("gensunlocked")), 0) * (10 ** Number(lsgi("diffusioncore")));
  if (lsgi("essence") >= corecost) {
    lssi("diffusioncore", Number(lsgi("diffusioncore")) + 1);
    lssi("essence", Number(lsgi("essence")) - corecost);
  }
}

//BUY UPGRADE
export function buyupg(up) {
  let upgcost;
  if (up == 12) {
    upgcost = upgs[up * 5 - 3] * (8 ** Number(lsgi("upgrade12")));
  }
  else {
    upgcost = upgs[up * 5 - 3];
  }
  if ((Number(lsgi("catalyst")) >= upgcost)) {
    lssi("upgrade" + up, Number(lsgi("upgrade" + up)) + 1);
    lssi("catalyst", Number(lsgi("catalyst")) - upgcost);
    render();
  }
}

//BUY SYNTHESIS ARRAY MACHINE FOR FCS
export function buyfcmachine(core) {
  if (lsgi("fcmachineup" + core) == 0) {
    if (Number(lsgi("catalyst")) >= 150 * 1.5 ** (core - 1)) {
      lssi("fcmachineup" + core, 1);
      lssi("catalyst", Number(lsgi("catalyst")) - 150 * 1.5 ** (core - 1));
      render();
    }
  }
  else if (2 ** Math.floor((lsgi("fcmachineup" + core)) - Math.log(0.1 / (4 + .5 * core)) / Math.log(0.7)) < 64) {
    if (Number(lsgi("catalyst")) >= 50 * 1.5 ** (core - 1) * 1.1 ** (Number(lsgi("fcmachineup" + core)))) {
      lssi("fcmachineup" + core, Number(lsgi("fcmachineup" + core)) + 1);
      lssi("catalyst", Number(lsgi("catalyst")) - 50 * 1.5 ** (core - 1) * 1.1 ** (Number(lsgi("fcmachineup" + core))));
    }
  }
}

//BUY SYNTHESIS ARRAY MACHINE FOR DC
export function buydcmachine() {
  if (lsgi("dcmachineup") == 0) {
    if (Number(lsgi("catalyst")) >= 1000000) {
      lssi("dcmachineup", 1);
      lssi("catalyst", Number(lsgi("catalyst")) - 1000000);
      render();
    }
  }
  else if (2 ** Math.floor((lsgi("dcmachineup")) - Math.log(0.01) / Math.log(0.5)) < 64) {
    if (Number(lsgi("catalyst")) >= 300000 * 1.1 ** (Number(lsgi("dcmachineup")))) {
      lssi("dcmachineup", Number(lsgi("dcmachineup")) + 1);
      lssi("catalyst", Number(lsgi("catalyst")) - 300000 * 1.1 ** (Number(lsgi("dcmachineup"))));
      render();
    }
  }
}

//BUY SINGULARITY UPGRADE
export function buysupg(up) {
  if (Number(lsgi("vortex")) >= supgs[up * 6 - 3]) {
    lssi("singupgrade" + up, Number(lsgi("singupgrade" + up)) + 1);
    lssi("vortex", Number(lsgi("vortex")) - supgs[up * 6 - 3]);
    render();
  }
}

//SINGULARITY
export function singularity() {
  for (let i = 1; i <= lsgi("gensunlocked"); i++) {
    lssi("fusioncore" + i, 0);
    lssi("fusionupgrade" + i, 0);
    lssi("diffusioncore", 0);
    lssi("ifc" + i, 0);
    lssi("flowupgrade" + i, 0);
  }
  if (lsgi("singupgrade14") != "1") {
    for (let i = 1; i <= upgs.length; i++) {
      lssi("upgrade" + i, 0);
    }
  }
  lssi("catalyst", 0);
  lssi("essence", 1);
  lssi("empowered", 0);
  lssi("overheattime", 0);
  lssi("currentichor", 0);
  lssi("assimilation", 1);
  if (lsgi("firsttimesingularity")!="1"){
    popup("<p>You watch as your cores, still bubbling with fusing energy, are devoured by the void-black singularity. All turns to nothing in mere moments. The void shrinks into your palm, and you gaze into it, where boundless frontiers lie.</p><p>You have unlocked Singularity Research and additional upgrades, as well as one vortex and the fifth tier of fusion cores. A new tab has appeared.</p>");
  }
  lssi("firsttimesingularity", 1);
  lssi("singularities", Number(lsgi("singularities")) + 1);
  lssi("vortex", Math.round(Number(lsgi("vortex")) + singmult * Number(lsgi("singularities"))));
  lssi("gensunlocked", Number(lsgi("gensunlocked")) + 1);
  if (Number(lsgi("gensunlocked")) > 10) {
    lssi("gensunlocked", 10);
  }
  if (lsgi("catalyzerdisabledonsingularity")=="yes"){
    lssi("catalyzerdisabled","yes");
  }
  else{
    lssi("catalyzerdisabled","no");
  }
  document.getElementById("singularitybutton").innerHTML = "";
  singavailable = false;
  render();
  rendertabs();
  setTimeout(render, 60);

}

//ASSIMILATE
export function assimilate() {
  if (computeassim(Number(lsgi("fusioncore1"))) >= Number(lsgi("assimilation")) && Number(lsgi("fusioncore" + lsgi("gensunlocked"))) > 0) {
    lssi("assimilation", computeassim(lsgi("fusioncore1")));
    for (let i = 1; i < lsgi("gensunlocked"); i++) {
      lssi("fusioncore" + i, 0);
    }
    render();
  }
}

//BUY CATALYZER UPGRADE
export function buycataupg(up) {
  let upgcost;
  upgcost=10*(10**Number(lsgi("catalyzerrebuyable"+up)));
  if ((Number(lsgi("catalyst")) >= upgcost)) {
    lssi("catalyzerrebuyable" + up, Number(lsgi("catalyzerrebuyable" + up)) + 1);
    lssi("catalyst", Number(lsgi("catalyst")) - upgcost);
  }
}

//DISABLE CATALYZER
export function disablecatalyzer(){
  if (lsgi("catalyzerdisabled")=="no"){
    lssi("catalyzerdisabled","yes");
  }
}

export function togglecatalyzeronsingularity(){
  if (lsgi("catalyzerdisabledonsingularity")=="no"){
    lssi("catalyzerdisabledonsingularity","yes");
  }
  else{
    lssi("catalyzerdisabledonsingularity","no");
  }
}

export function dismissnotifs() {
  document.getElementById("notiftext").innerHTML = "";
  document.getElementById("absolutecentre").style.display="none";
}

rendertabs();
setInterval(tick, 50);
