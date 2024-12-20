meleeNummer = 0; //Dit zorgt dat soldaten gespawnd worden en in een queue zitten C
rangeNummer = 0;
heavyNummer = 0;
vijandMeleeNummer = 0;
vijandRangeNummer = 0;
vijandHeavyNummer = 0;
hoeveelQueue = 0;
vijandHoeveelQueue = 0;
Geld = 50;
spelerMeleeLopen = null; //hierdoor worden plaatjes geladen A
vijandMeleeLopen = null;
spelerRangedLopen = null;
vijandRangedLopen = null;
spelerHeavyLopen = null;
vijandHeavyLopen = null;
spelerBasisFoto = null;
vijandBasisFoto = null;
achtergrond = null;

function slaanDoos(vriendBlok, blok) { //Houdt bij of welke blok in range zit C
    if(vriendBlok instanceof VijandBasis ||
       vriendBlok instanceof VijandMelee ||
       vriendBlok instanceof VijandRange ||
       vriendBlok instanceof VijandHeavy)
        return vriendBlok != blok && blok.zichtbaar && vriendBlok.x > blok.x && vriendBlok.x <= blok.x + 100;

    return vriendBlok != blok && blok.zichtbaar && vriendBlok.x < blok.x && vriendBlok.x + 100 >= blok.x;
}

class Basis { 
  constructor() {
    this.win = false;
    this.lose = false;
    this.hp = 100;
    this.vechten = false;
    this.zichtbaar = true;
    this.x = 75;
  }

  attack = () => { //0 hp en je verliest C
    if (this.hp <= 0)
      this.lose = true;
  };

    aanraken() {
        let resultaat = false;
    
        for(let i = 0; i < 999; i++) { //Kijkt welke blok in range van bais is C
            if(slaanDoos(this, melee[i]) ||
               slaanDoos(this, range[i]) ||
               slaanDoos(this, heavy[i]) ||
               slaanDoos(this, vijandMelee[i]) ||
               slaanDoos(this, vijandRange[i]) ||
               slaanDoos(this, vijandHeavy[i])) {
                resultaat = true;
            }
        }

        if(slaanDoos(this, basis) ||
           slaanDoos(this, vijandBasis))
            resultaat = true;
        
        return resultaat;
    }
    
  plaats_basis_slaandoos() { //Zorgt dat de basis ook aangevallen kan worden C
    fill("black");
    rect(this.x, 775, 100, 100);
  }

  plaats_basis() { //laad het plaatje A
    image(spelerBasisFoto, 0, 700, 175, 175);
  }
}

class VijandBasis extends Basis {
  constructor() {
    super(); //Maakt een copie van de variable in basis C
    this.x = 1720;
  }

  attack = () => { //Als hp 0 is win je
    if (this.hp <= 0)
      this.win = true;
  };

    aanraken() {
        let resultaat = false;
    
        for(let i = 0; i < 999; i++) {
            if(slaanDoos(this, melee[i]) ||
               slaanDoos(this, range[i]) ||
               slaanDoos(this, heavy[i]) ||
               slaanDoos(this, vijandMelee[i]) ||
               slaanDoos(this, vijandRange[i]) ||
               slaanDoos(this, vijandHeavy[i])) {
                resultaat = true;
            }
        }

        if(slaanDoos(this, basis) ||
           slaanDoos(this, vijandBasis))
            resultaat = true;
        
        return resultaat;
    }


  plaats_basis_slaandoos() {
    fill("white");
    rect(this.x, 775, 100, 100);
  }

  plaats_basis() {
    image(vijandBasisFoto, 1725, 700, 175, 175);
  }
}

class Melee {
  constructor() {
    this.x = 180;
    this.loopt = true; //Zorgt ervoor dat een soldaat loopt C
    this.y = 0;
    this.menux = 0;
    this.menuy = 0;
    this.zichtbaar = false; //Houdt blokken ontzicht tot ze gespawnd worden C
    this.hp = 30;
    this.vechten = false; //Houdt bij of ze in een gevecht zijn C
    this.closestBlok = {x : 99999}; //Kijkt welk blok het dichtsbijzijnds is C
    this.rangeLength = 0; //Iedere soldaat houdt een range aanval bij, maar melee kan dat niet dus het is 0 C
  }

  attack = () => {
    if (!this.closestBlok.zichtbaar)
      this.closestBlok.x = 99999;

    for (let i = 0; i < 999; i++) {
      if (vijandMelee[i].zichtbaar && Math.abs(vijandMelee[i].x - this.x) < Math.abs(this.closestBlok.x - this.x)) 
//Als vijandMelee zichtbaar is en de afstand tussen vijandMelee en dit blok is kleiner dan die van dit blok en dichtbij, dan wordt vijandMelee de dichtbijzijnde C
        this.closestBlok = vijandMelee[i];
      if (vijandRange[i].zichtbaar && Math.abs(vijandRange[i].x - this.x) < Math.abs(this.closestBlok.x - this.x))
        this.closestBlok = vijandRange[i];
      if (vijandHeavy[i].zichtbaar && Math.abs(vijandHeavy[i].x - this.x) < Math.abs(this.closestBlok.x - this.x))
        this.closestBlok = vijandHeavy[i];
      if (vijandBasis.x < this.closestBlok.x)
        this.closestBlok = vijandBasis;
    }

    if (this.closestBlok.x <= this.x + this.rangeLength + 105) // Als het dichtbijzijnde blok in 105 pixels is krijgt het damage C
      this.closestBlok.hp -= 10;

    if (this.hp <= 0) // als de hp gelijk is aan 0 wordt het onzichtbaar/dood C
      this.zichtbaar = false;
  };

  lopen(dx, dy) { //Zorgt ervoor dat het blok beweegt C
    if (this.loopt) {
      this.x += dx;
      this.y += dy;
    }
  }

    aanraken() {
        let resultaat = false;
    
        for(let i = 0; i < 999; i++) {
            if(slaanDoos(this, melee[i]) ||
               slaanDoos(this, range[i]) ||
               slaanDoos(this, heavy[i]) ||
               slaanDoos(this, vijandMelee[i]) ||
               slaanDoos(this, vijandRange[i]) ||
               slaanDoos(this, vijandHeavy[i])) {
                resultaat = true;
            }
        }

        if(slaanDoos(this, basis) ||
           slaanDoos(this, vijandBasis))
            resultaat = true;
        
        return resultaat;
    }

  plaats_melee() {
    image(spelerMeleeLopen, this.x, this.y + 775, 100, 100);
    if (mouseX > this.x && mouseX < this.x + 100 && mouseY > this.y + 775 && mouseY < this.y + 875) {
      fill("black");
      rect(this.x, this.y + 730, 100, 20);
      fill("red");
      rect(this.x, this.y + 730, 3.33 * this.hp, 20);
    }
  }

  plaats_mm() { //Maakt een menu voor het spawnen van Melee soldaten C
    fill("red");
    rect(this.menux, this.menuy, 100, 50);
    this.zichtbaarM = true;
    return (mouseX > this.menux && mouseX < this.menux + 100 && mouseY > this.menuy && mouseY < this.menuy + 50); //Kijkt waar jouw muis is en als je klikt op de menu spawnd het een soldaat C
  }
}

class VijandMelee extends Melee {
  constructor() {
    super();
    this.x = 1615;
    this.closestBlok.x = -99999;
  }

  attack = () => {
    if (!this.closestBlok.zichtbaar)
      this.closestBlok.x = -99999;

    for (let i = 0; i < 999; i++) {
      if (melee[i].zichtbaar && Math.abs(melee[i].x - this.x) < Math.abs(this.closestBlok.x - this.x))
        this.closestBlok = melee[i];
      if (range[i].zichtbaar && Math.abs(range[i].x - this.x) < Math.abs(this.closestBlok.x - this.x))
        this.closestBlok = range[i];
      if (heavy[i].zichtbaar && Math.abs(heavy[i].x - this.x) < Math.abs(this.closestBlok.x - this.x))
        this.closestBlok = heavy[i];
      if (basis.x > this.closestBlok.x)
        this.closestBlok = basis;
    }

    if (this.closestBlok.x >= this.x - this.rangeLength - 105)
      this.closestBlok.hp -= 10;

    if (this.hp <= 0) { //Als je de vijand versla krijg je 30 geld erbij C
      this.zichtbaar = false;
      Geld += 30;
    }
  };

    aanraken() {
        let resultaat = false;
    
        for(let i = 0; i < 999; i++) {
            if(slaanDoos(this, melee[i]) ||
               slaanDoos(this, range[i]) ||
               slaanDoos(this, heavy[i]) ||
               slaanDoos(this, vijandMelee[i]) ||
               slaanDoos(this, vijandRange[i]) ||
               slaanDoos(this, vijandHeavy[i])) {
                resultaat = true;
            }
        }

        if(slaanDoos(this, basis) ||
           slaanDoos(this, vijandBasis))
            resultaat = true;
        
        return resultaat;
    }
  plaats_melee() {
  image(vijandMeleeLopen, this.x, this.y + 775, 100, 100);
    if (mouseX > this.x && mouseX < this.x + 100 && mouseY > this.y + 775 && mouseY < this.y + 875) {
      fill("black");
      rect(this.x, this.y + 730, 100, 20);
      fill("red");
      rect(this.x, this.y + 730, 3.33 * this.hp, 20);
    }
  }
}
class Range {
  constructor() {
    this.x = 180;
    this.loopt = true;
    this.y = 0;
    this.menux = 0;
    this.menuy = 0;
    this.zichtbaar = false;
    this.hp = 20;
    this.vechten = false;
    this.closestBlok = {x : 99999};
    this.rangeLength = 150; //kan 150 pixels ver schieten wat 2 blokken raakt C
  }

  attack = () => {
    if (!this.closestBlok.zichtbaar)
      this.closestBlok.x = 99999;

    for (let i = 0; i < 999; i++) {
      if (vijandMelee[i].zichtbaar && Math.abs(vijandMelee[i].x - this.x) < Math.abs(this.closestBlok.x - this.x))
        this.closestBlok = vijandMelee[i];
      if (vijandRange[i].zichtbaar && Math.abs(vijandRange[i].x - this.x) < Math.abs(this.closestBlok.x - this.x))
        this.closestBlok = vijandRange[i];
      if (vijandHeavy[i].zichtbaar && Math.abs(vijandHeavy[i].x - this.x) < Math.abs(this.closestBlok.x - this.x))
        this.closestBlok = vijandHeavy[i];
      if (vijandBasis.x < this.closestBlok.x)
        this.closestBlok = vijandBasis;
    }

    if (this.closestBlok.x <= this.x + this.rangeLength + 105)
      this.closestBlok.hp -= 10;

    if (this.hp <= 0)
      this.zichtbaar = false;
  };

  lopen(dx, dy) {
    if (this.loopt) {
      this.x += dx;
      this.y += dy;
    }
  }

    aanraken() {
        let resultaat = false;
    
        for(let i = 0; i < 999; i++) {
            if(slaanDoos(this, melee[i]) ||
               slaanDoos(this, range[i]) ||
               slaanDoos(this, heavy[i]) ||
               slaanDoos(this, vijandMelee[i]) ||
               slaanDoos(this, vijandRange[i]) ||
               slaanDoos(this, vijandHeavy[i])) {
                resultaat = true;
            }
        }

        if(slaanDoos(this, basis) ||
           slaanDoos(this, vijandBasis))
            resultaat = true;
        
        return resultaat;
    }

  plaats_range() {
    image(spelerRangedLopen, this.x, this.y + 775, 100, 100);
    if (mouseX > this.x && mouseX < this.x + 100 && mouseY > this.y + 775 && mouseY < this.y + 875) {
      fill("black");
      rect(this.x, this.y + 730, 100, 20);
      fill("red");
      rect(this.x, this.y + 730, 5 * this.hp, 20);
    }
  }

  plaats_rm() {
    fill("green");
    rect(this.menux + 100, this.menuy, 100, 50);
    this.zichtbaarR = true;
    return (mouseX > this.menux + 100 && mouseX < this.menux + 200 && mouseY > this.menuy && mouseY < this.menuy + 50);
  }
}

class VijandRange extends Range {
  constructor() {
    super();
    this.x = 1615;
  }

  attack = () => {
    if (!this.closestBlok.zichtbaar)
      this.closestBlok.x = -99999;

    for (let i = 0; i < 999; i++) {
      if (melee[i].zichtbaar && Math.abs(melee[i].x - this.x) < Math.abs(this.closestBlok.x - this.x))
        this.closestBlok = melee[i];
      if (range[i].zichtbaar && Math.abs(range[i].x - this.x) < Math.abs(this.closestBlok.x - this.x))
        this.closestBlok = range[i];
      if (heavy[i].zichtbaar && Math.abs(heavy[i].x - this.x) < Math.abs(this.closestBlok.x - this.x))
        this.closestBlok = heavy[i];
      if (basis.x > this.closestBlok.x)
        this.closestBlok = basis;
    }

    if (this.closestBlok.x >= this.x - this.rangeLength - 105)
      this.closestBlok.hp -= 10;

    if (this.hp <= 0) {
      this.zichtbaar = false;
      Geld += 45;
    }
  };

  plaats_range() {
    image(vijandRangedLopen, this.x, this.y + 775, 100, 100);
    if (mouseX > this.x && mouseX < this.x + 100 && mouseY > this.y + 775 && mouseY < this.y + 875) {
      fill("black");
      rect(this.x, this.y + 730, 100, 20);
      fill("red");
      rect(this.x, this.y + 730, 5 * this.hp, 20);
    }
  }
  
    aanraken() {
        let resultaat = false;
    
        for(let i = 0; i < 999; i++) {
            if(slaanDoos(this, melee[i]) ||
               slaanDoos(this, range[i]) ||
               slaanDoos(this, heavy[i]) ||
               slaanDoos(this, vijandMelee[i]) ||
               slaanDoos(this, vijandRange[i]) ||
               slaanDoos(this, vijandHeavy[i])) {
                resultaat = true;
            }
        }

        if(slaanDoos(this, basis) ||
           slaanDoos(this, vijandBasis))
            resultaat = true;
        
        return resultaat;
    }
}
class Heavy {
  constructor() {
    this.x = 180;
    this.y = 0;
    this.menux = 0;
    this.menuy = 0;
    this.zichtbaar = false;
    this.loopt = true;
    this.hp = 50;
    this.vechten = false;
    this.closestBlok = {x : 99999};
    this.rangeLength = 0;
  }

  attack = () => {
    if (!this.closestBlok.zichtbaar)
      this.closestBlok.x = 99999;

    for (let i = 0; i < 999; i++) {
      if (vijandMelee[i].zichtbaar && Math.abs(vijandMelee[i].x - this.x) < Math.abs(this.closestBlok.x - this.x))
        this.closestBlok = vijandMelee[i];
      if (vijandRange[i].zichtbaar && Math.abs(vijandRange[i].x - this.x) < Math.abs(this.closestBlok.x - this.x))
        this.closestBlok = vijandRange[i];
      if (vijandHeavy[i].zichtbaar && Math.abs(vijandHeavy[i].x - this.x) < Math.abs(this.closestBlok.x - this.x))
        this.closestBlok = vijandHeavy[i];
      if (vijandBasis.x < this.closestBlok.x)
        this.closestBlok = vijandBasis;
    }

    if (this.closestBlok.x <= this.x + this.rangeLength + 105)
      this.closestBlok.hp -= 10;

    if (this.hp <= 0)
      this.zichtbaar = false;
  };

  lopen(dx, dy) {
    if (this.loopt) {
      this.x += dx;
      this.y += dy;
    }
  }

    aanraken() {
        let resultaat = false;
    
        for(let i = 0; i < 999; i++) {
            if(slaanDoos(this, melee[i]) ||
               slaanDoos(this, range[i]) ||
               slaanDoos(this, heavy[i]) ||
               slaanDoos(this, vijandMelee[i]) ||
               slaanDoos(this, vijandRange[i]) ||
               slaanDoos(this, vijandHeavy[i])) {
                resultaat = true;
            }
        }

        if(slaanDoos(this, basis) ||
           slaanDoos(this, vijandBasis))
            resultaat = true;
        
        return resultaat;
    }

  plaats_heavy() {
    image(spelerHeavyLopen, this.x, this.y + 775, 100, 100);
    if (mouseX > this.x && mouseX < this.x + 100 && mouseY > this.y + 775 && mouseY < this.y + 875) {
      fill("black");
      rect(this.x, this.y + 730, 100, 20);
      fill("red");
      rect(this.x, this.y + 730, 2 * this.hp, 20);
    }
  }

  plaats_hm() {
    fill("purple");
    rect(this.menux + 200, this.menuy, 100, 50);
    this.zichtbaarH = true;
    return (mouseX > this.menux + 200 && mouseX < this.menux + 300 && mouseY > this.menuy && mouseY < this.menuy + 50);
  }
}

class VijandHeavy extends Heavy {
  constructor() {
    super();
    this.x = 1615;
  }

  plaats_heavy() {
  image(vijandHeavyLopen, this.x, this.y + 775, 100, 100);
    if (mouseX > this.x && mouseX < this.x + 100 && mouseY > this.y + 775 && mouseY < this.y + 875) {
      fill("black");
      rect(this.x, this.y + 730, 100, 20);
      fill("red");
      rect(this.x, this.y + 730, 2 * this.hp, 20);
    }
  }

  attack = () => {
    if (!this.closestBlok.zichtbaar)
      this.closestBlok.x = -99999;

    for (let i = 0; i < 999; i++) {
      if (melee[i].zichtbaar && Math.abs(melee[i].x - this.x) < Math.abs(this.closestBlok.x - this.x))
        this.closestBlok = melee[i];
      if (range[i].zichtbaar && Math.abs(range[i].x - this.x) < Math.abs(this.closestBlok.x - this.x))
        this.closestBlok = range[i];
      if (heavy[i].zichtbaar && Math.abs(heavy[i].x - this.x) < Math.abs(this.closestBlok.x - this.x))
        this.closestBlok = heavy[i];
      if (basis.x > this.closestBlok.x)
        this.closestBlok = basis;
    }

    if (this.closestBlok.x >= this.x - this.rangeLength - 105)
      this.closestBlok.hp -= 10;

    if (this.hp <= 0) {
      this.zichtbaar = false;
      Geld += 85;
    }
  };

    aanraken() {
        let resultaat = false;
    
        for(let i = 0; i < 999; i++) {
            if(slaanDoos(this, melee[i]) ||
               slaanDoos(this, range[i]) ||
               slaanDoos(this, heavy[i]) ||
               slaanDoos(this, vijandMelee[i]) ||
               slaanDoos(this, vijandRange[i]) ||
               slaanDoos(this, vijandHeavy[i])) {
                resultaat = true;
            }
        }

        if(slaanDoos(this, basis) ||
           slaanDoos(this, vijandBasis))
            resultaat = true;
        
        return resultaat;
    }
}

let melee = []; //Zorgt ervoor dat deze classes kunnen gebruikt kunnen worden C
let range = [];
let heavy = [];
let basis = new Basis();
let vijandMelee = [];
let vijandRange = [];
let vijandHeavy = [];
let vijandBasis = new VijandBasis();
let spawnQueue = [];

function setup() {
  spelerMeleeLopen = loadImage('spelerMeleeLopen.gif'); //laad de foto A
  vijandMeleeLopen = loadImage('vijandMeleeLopen.gif');
  spelerRangedLopen = loadImage('spelerRangedLopen.gif');
  vijandRangedLopen = loadImage('vijandRangedLopen.gif');
  spelerHeavyLopen = loadImage('spelerHeavyLopen.gif');
  vijandHeavyLopen = loadImage('vijandHeavyLopen.gif');
  spelerBasisFoto = loadImage('spelerBasis.png');
  vijandBasisFoto = loadImage('vijandBasis.png');
  achtergrond = loadImage('achtergrond.jpg');
  canvas = createCanvas(1895, 925);
  canvas.parent("processing");

  frameRate(10); //Zorgt dat alles kan veranderen en bewegen C

  for (let i = 0; i < 999; i++) { //Zorgt dat deze gebruikt kan worden C
    melee.push(new Melee());
    range.push(new Range());
    heavy.push(new Heavy());
    vijandMelee.push(new VijandMelee());
    vijandRange.push(new VijandRange());
    vijandHeavy.push(new VijandHeavy());
  }
  setInterval(vechten, 1000);  //Doet elke seconden kijken of soldaten damage krijgen en spawned een vijand soldaat C
  setInterval(vijandMousePressed, 1000);
}
function vechten() {  //Als een soldaat zichtbaar is kan het aanvallen C
  for (let i = 0; i < 999; i++) {
    if (melee[i].zichtbaar)
      melee[i].attack();
    if (range[i].zichtbaar)
      range[i].attack();
    if (heavy[i].zichtbaar)
      heavy[i].attack();
    if (vijandMelee[i].zichtbaar)
      vijandMelee[i].attack();
    if (vijandRange[i].zichtbaar)
      vijandRange[i].attack();
    if (vijandHeavy[i].zichtbaar)
      vijandHeavy[i].attack();
  }
  basis.attack();
  vijandBasis.attack();
}

function bloksAreTouching(blok1, blok2) { //Kijkt of blok 1 blok 2 raakt (wordt in aanraken spcifiek gemaakt) C
  return ((blok1.x + 105 >= blok2.x && blok1.x <= blok2.x) ||
          (blok2.x + 105 >= blok1.x && blok2.x <= blok1.x));
}

function draw() {
  basis.plaats_basis_slaandoos();
  vijandBasis.plaats_basis_slaandoos();
  image(achtergrond, 0, 0, 1895, 925);
  let blokInSpawn = false; //Wordt gebruikt om te kijken of er een blok in spawn zit C
  let vijandBlokInSpawn = false;
  fill("black"); //tekent geld en heath op scherm A
  textSize(50);
  text("$" + Geld, 1600, 100);
  fill("red");
  textSize(50);
  text("Health: " + basis.hp, 1600, 175);

  basis.plaats_basis(); //Maakt de basis
  vijandBasis.plaats_basis();
  basis.aanraken();
  vijandBasis.aanraken();

  for (let i = 0; i < hoeveelQueue; i++) { //Laat zien hoeveel er in queue zit C
    fill("red");
    rect(350 + i * 50, 20, 20, 20);
  }

  for (let i = 0; i < 1; i++) {
    melee[i].plaats_mm();
    range[i].plaats_rm();
    heavy[i].plaats_hm();
  }

  for (let i = 0; i < 999; i++) { //Als een soldaat zichtbaar wordt, wordt hij geplaatst en gaat hij lopen C
    if (melee[i].zichtbaar) {
      melee[i].plaats_melee();
      melee[i].lopen(5, 0);

      if (melee[i].x < 280) //Als er een soldaat in spawn zit kan er niet nog een gespawned C
        blokInSpawn = true;

      melee[i].loopt = !melee[i].aanraken(); //Als de Soldaat iets aanraakt stop het met lopen C
    }
    if (range[i].zichtbaar) {
      range[i].plaats_range();
      range[i].lopen(5, 0);

      if (range[i].x < 280)
        blokInSpawn = true;

      range[i].loopt = !range[i].aanraken();
    }

    if (heavy[i].zichtbaar) {
      heavy[i].plaats_heavy();
      heavy[i].lopen(5, 0);

      if (heavy[i].x < 280)
        blokInSpawn = true;

      heavy[i].loopt = !heavy[i].aanraken();
    }

    if (vijandMelee[i].zichtbaar) {
      vijandMelee[i].plaats_melee();
      vijandMelee[i].lopen(-5, 0);

      if (vijandMelee[i].x > 1515)
        vijandBlokInSpawn = true;

      vijandMelee[i].loopt = !vijandMelee[i].aanraken();
    }

    if (vijandRange[i].zichtbaar) {
      vijandRange[i].plaats_range();
      vijandRange[i].lopen(-5, 0);

      if (vijandRange[i].x > 1515)
        vijandBlokInSpawn = true;

      vijandRange[i].loopt = !vijandRange[i].aanraken();
    }
    if (vijandHeavy[i].zichtbaar) {
      vijandHeavy[i].plaats_heavy();
      vijandHeavy[i].lopen(-5, 0);

      if (vijandHeavy[i].x > 1515)
        vijandBlokInSpawn = true;

      vijandHeavy[i].loopt = !vijandHeavy[i].aanraken();
    }
  }

  if (!blokInSpawn && spawnQueue.length) { //Houdt bij hoeveel er in queue zit C
    spawnQueue[spawnQueue.length - 1].zichtbaar = true;
    spawnQueue.pop();
    hoeveelQueue--;
  }

  if (!vijandBlokInSpawn) {
    for (let i = 0; i < 999; i++) {
      if (vijandMelee[i].wordtZichtbaar) {
        vijandMelee[i].wordtZichtbaar = false;
        vijandMelee[i].zichtbaar = true;

        vijandHoeveelQueue--;

        break;
      } else if (vijandRange[i].wordtZichtbaar) {
        vijandRange[i].wordtZichtbaar = false;
        vijandRange[i].zichtbaar = true;

        vijandHoeveelQueue--;

        break;
      } else if (vijandHeavy[i].wordtZichtbaar) {
        vijandHeavy[i].wordtZichtbaar = false;
        vijandHeavy[i].zichtbaar = true;

        vijandHoeveelQueue--;

        break;
      }
    }
  }

  if (basis.lose == true) { //Als verlies waar wordt dan komt dit scherm C
    background("black");
    fill("red");
    textSize(100);
    text("Game Over", 800, 425);
  }
  if (vijandBasis.win == true) { //Als win waar wordt dan komt dit scherm C
    background("black");
    fill("green");
    textSize(100);
    text("You Win", 800, 425);
  }
}

function mousePressed() {
  if (hoeveelQueue < 5) {
    if (meleeNummer < melee.length && melee[meleeNummer].plaats_mm() && Geld >= 25) { //Als je genoeg geld hebt en je klikt op meleeMenu zet je die soldaat in queue en er wordt geld afgehaald C
      spawnQueue.unshift(melee[meleeNummer]);
      meleeNummer++;
      Geld -= 25;
      hoeveelQueue++;
    } else if (rangeNummer < range.length && range[rangeNummer].plaats_rm() && Geld >= 40) {
      spawnQueue.unshift(range[rangeNummer]);
      rangeNummer++;
      Geld -= 40;
      hoeveelQueue++;
    } else if (heavyNummer < heavy.length && heavy[heavyNummer].plaats_hm() && Geld >= 80) {
      spawnQueue.unshift(heavy[heavyNummer]);
      heavyNummer++;
      Geld -= 80;
      hoeveelQueue++;
    }
  }
}

function vijandMousePressed() {
  if (vijandHoeveelQueue < 5 && Math.round(Math.random() * 100) <= 20) { //Elke seconden is er 20% kans dat er een vijand spawned C
    if (vijandMeleeNummer < vijandMelee.length && Math.round(Math.random() * 100) <= 50) { //50% kans op melee C
      vijandMelee[vijandMeleeNummer].wordtZichtbaar = true;
      vijandMeleeNummer++;

      vijandHoeveelQueue++;
    } else if (vijandRangeNummer < vijandRange.length && Math.round(Math.random() * 100) <= 60) { // 30% kans op range C
      vijandRange[vijandRangeNummer].wordtZichtbaar = true;
      vijandRangeNummer++;

      vijandHoeveelQueue++;
    } else if (vijandHeavyNummer < vijandHeavy.length) { //20% kans op heavy C
      vijandHeavy[vijandHeavyNummer].wordtZichtbaar = true;
      vijandHeavyNummer++;

      vijandHoeveelQueue++;
    }
  }
}
