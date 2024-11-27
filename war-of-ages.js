meleeNummer = 0;
rangeNummer = 0;
heavyNummer = 0;
vijandMeleeNummer = 0;
vijandRangeNummer = 0;
vijandHeavyNummer = 0;
hoeveelWachtrij = 0;
vijandHoeveelWachtrij = 0;
Geld = 500;
meleeLopen = null; 
rangeLopen = null; 
vijandRangeLopen = null; 
heavyLopen = null; 

class Basis {
	constructor() {
		this.vechten = false;
		this.rangePijn = false;
		this.hp = 100;
		this.x = 200;
		this.verlies = false;
		this.win = false;
	}

	pijn = () => {
		if (this.vechten || this.rangePijn) { //Als de speler zijn basis aangevallen wordt gaat de hp steeds met 10 eraf
			this.hp -= 10;
		}
		if (this.hp <= 0) { //Als de spelers zijn basis hp onder de 0 is verliest de speler
			this.verlies = true;
		}
	}

	aanraken() {
		let raken = false;
		this.vechten = false;
		this.rangePijn = false;
		for (let i = 0; i < 999; i++) {
			if ((melee[i].x >= this.x && this !== melee[i] && melee[i].zichtbaar && blokkenRakenElkaar(this, melee[i])) || //Dit controleerd of de blokken van hetzelfde team elkaar aanraken
				(range[i].x >= this.x && this !== range[i] && range[i].zichtbaar && blokkenRakenElkaar(this, range[i])) ||
				(heavy[i].x >= this.x && this !== heavy[i] && heavy[i].zichtbaar && blokkenRakenElkaar(this, heavy[i]))) {
				raken = true;
			} else if ((this !== vijandMelee[i] && vijandMelee[i].zichtbaar && blokkenRakenElkaar(this, vijandMelee[i])) || //Dit controleerd of de blokken van de vijand die van de speler aanraken    
				(this !== vijandRange[i] && vijandRange[i].zichtbaar && blokkenRakenElkaar(this, vijandRange[i])) ||
				(this !== vijandHeavy[i] && vijandHeavy[i].zichtbaar && blokkenRakenElkaar(this, vijandHeavy[i]))) {
				this.vechten = true; //Als jouw blok en die van de vijand elkaar raken gaan ze vechten
				raken = true
			}
			if (vijandRange[i].zichtbaar && blokkenRakenElkaarRange(this, vijandRange[i])) { //Dit controleerd of sperlers zijn blok in de aanval van vijandRange is
				this.rangePijn = true;
			}
		}
		return raken;
	}

	basisHitbox() { //Maakt een kleiner vierkant in basis zodat aanval nogsteeds werkt
		fill('black');
		rect(this.x, 550, 100, 100);
	}

	plaatsBasis() {    //Maakt een groot blok dat de spelers basis is
		fill('black');
		rect(0, 350, 300, 300);
	}
}

class VijandBasis extends Basis { //Zelfde als Basis maar dan een paar dingen omgedraaid(zoals spawn plekken en wie de vijand is)
	constructor() {
		super();
		this.x = 2480;
	}

	pijn = () => {
		if (this.vechten || this.rangePijn) {
			this.hp -= 10;
		}
		if (this.hp <= 0) { //Als de vijand zijn basis hp onder de 0 is wint de speler
			this.win = true;
		}
	}

	aanraken() {
		let raken = false;
		this.vechten = false;
		this.rangePijn = false;
		for (let i = 0; i < 999; i++) {
			if ((melee[i].x >= this.x && this !== melee[i] && melee[i].zichtbaar && blokkenRakenElkaar(this, melee[i])) ||
				(range[i].x >= this.x && this !== range[i] && range[i].zichtbaar && blokkenRakenElkaar(this, range[i])) ||
				(heavy[i].x >= this.x && this !== heavy[i] && heavy[i].zichtbaar && blokkenRakenElkaar(this, heavy[i]))) {
				this.vechten = true;
				raken = true;
			} else if ((this !== vijandMelee[i] && vijandMelee[i].zichtbaar && blokkenRakenElkaar(this, vijandMelee[i])) ||
				(this !== vijandRange[i] && vijandRange[i].zichtbaar && blokkenRakenElkaar(this, vijandRange[i])) ||
				(this !== vijandHeavy[i] && vijandHeavy[i].zichtbaar && blokkenRakenElkaar(this, vijandHeavy[i]))) {
				raken = true
			}
			if (range[i].zichtbaar && blokkenRakenElkaarRange(this, range[i])) {
				{
					this.rangePijn = true;
				}
			}
			return raken;
		}
	}

	basisHitbox() {
		fill('white');
		rect(this.x, 550, 100, 100);
	}

	plaatsBasis() {
		fill('white');
		rect(2480, 350, 300, 300);
	}
}

class Melee {
	constructor() {
		this.zichtbaar = false;
		this.vechten = false;
		this.rangePijn = false;
		this.hp = 30;
		this.x = 300;
		this.y = 0;
		this.menux = 0;
		this.menuy = 0;
	}

	pijn = () => {
		if (this.vechten || this.rangePijn) {   //Als de speler zijn blok aangevallen wordt gaat de hp steeds met 10 eraf
			this.hp -= 10;
		}
		if (this.hp <= 0) {                     //Als de hp onder de 0 is verdwijnt het blokje
			this.zichtbaar = false;
		}
	}

	lopen(dx, dy) {         //Begint by 300, 0 en doet er steeds een hoeveelheid bij (later wordt de hoeveelheid bepaald)
		if (this.loopt) {
			this.x += dx;
			this.y += dy;
		}
	}

	aanraken() {
		let raken = false;
		this.vechten = false;
		this.laatRangePijn = false;
		this.rangePijn = false;
		let vriendRaken = false;
		for (let i = 0; i < 999; i++) {
			if ((blokkenRakenElkaar(vijandBasis, this)) ||
				(melee[i].x >= this.x && this !== melee[i] && melee[i].zichtbaar && blokkenRakenElkaar(this, melee[i])) ||
				(range[i].x >= this.x && this !== range[i] && range[i].zichtbaar && blokkenRakenElkaar(this, range[i])) ||
				(heavy[i].x >= this.x && this !== heavy[i] && heavy[i].zichtbaar && blokkenRakenElkaar(this, heavy[i]))) {
				raken = true;
			} else if ((this !== vijandMelee[i] && vijandMelee[i].zichtbaar && blokkenRakenElkaar(this, vijandMelee[i])) ||
				(this !== vijandRange[i] && vijandRange[i].zichtbaar && blokkenRakenElkaar(this, vijandRange[i])) ||
				(this !== vijandHeavy[i] && vijandHeavy[i].zichtbaar && blokkenRakenElkaar(this, vijandHeavy[i]))) {
				this.vechten = true;
				raken = true
				vriendRaken = true;
			}

			if (vijandRange[i].zichtbaar && blokkenRakenElkaarRange(this, vijandRange[i]))
				this.laatRangePijn = true;
		}
		if (this.laatRangePijn && !vriendRaken) {
			this.rangePijn = true;
		}
		return raken;
	}

	plaatsMelee() { //Plaats een rood blok op het veld
		image(meleeLopen, this.x, this.y + 550, 100, 100);
		if (mouseX > this.x && mouseX < this.x + 100 && mouseY > this.y + 550 && mouseY < this.y + 650) {
			fill('black');
			rect(this.x, this.y + 510, 100, 20);
			fill('red');
			rect(this.x, this.y + 510, 3.33 * this.hp, 20);
		}
	}

	plaatsMeleeMenu() { //Plaats een rood blokje op het veld dat gebruikt wordt om melee te plaatsen
		fill('red');
		rect(this.menux, this.menuy, 100, 50);
		this.zichtbaarM = true;
		return (mouseX > this.menux && mouseX < this.menux + 100 && mouseY > this.menuy && mouseY < this.menuy + 50);   //Kijkt of de muis coordinaten in die van menu zitten
	}
}

class VijandMelee extends Melee { //Zelfde als Melee maar dan een paar dingen omgedraaid(zoals spawn plekken en wie de vijand is)
	constructor() {
		super();
		this.x = 2380;
	}

	pijn = () => {
		if (this.vechten || this.rangePijn) //Als de vijand zijn blok aangevallen wordt gaat de hp steeds met 10 eraf
			this.hp -= 10;
		if (this.hp <= 0) {                 //Als de hp onder 0 is verdwijnt het blokje en krijgt de speler geld
			this.zichtbaar = false;
			Geld += 30;
		}
	}

	aanraken() {
		let raken = false;
		this.vechten = false;
		this.laatRangePijn = false;
		this.rangePijn = false;
		let vriendRaken = false;
		for (let i = 0; i < 999; i++) {
			if ((this !== melee[i] && melee[i].zichtbaar && blokkenRakenElkaar(this, melee[i])) ||
				(this !== range[i] && range[i].zichtbaar && blokkenRakenElkaar(this, range[i])) ||
				(this !== heavy[i] && heavy[i].zichtbaar && blokkenRakenElkaar(this, heavy[i]))) {
				raken = true;
				this.vechten = true;
			} else if ((blokkenRakenElkaar(basis, this)) ||
				(vijandMelee[i].x <= this.x && this !== vijandMelee[i] && vijandMelee[i].zichtbaar && blokkenRakenElkaar(this, vijandMelee[i])) ||
				(vijandRange[i].x <= this.x && this !== vijandRange[i] && vijandRange[i].zichtbaar && blokkenRakenElkaar(this, vijandRange[i])) ||
				(vijandHeavy[i].x <= this.x && this !== vijandHeavy[i] && vijandHeavy[i].zichtbaar && blokkenRakenElkaar(this, vijandHeavy[i]))) {
				raken = true
				vriendRaken = true;
			}
			if (range[i].zichtbaar && blokkenRakenElkaarRange(this, range[i]))
				this.laatRangePijn = true;
		}
		if (this.laatRangePijn && !vriendRaken) {
			this.rangePijn = true;
		}
		return raken;
	}

	plaatsMelee() {
		fill('red');
		rect(this.x, this.y + 550, 100, 100);
		if (mouseX > this.x && mouseX < this.x + 100 && mouseY > this.y + 550 && mouseY < this.y + 650) {
			fill('black');
			rect(this.x, this.y + 510, 100, 20);
			fill('red');
			rect(this.x, this.y + 510, 3.33 * this.hp, 20)
		}
	}
}

class Range { //Zelfde als Melee maar dan een paar hoeveelheden ander(zoals hp)
	constructor() {
		this.x = 300;
		this.y = 0;
		this.menux = 0;
		this.menuy = 0;
		this.zichtbaar = false;
		this.hp = 20;
		this.vechten = false;
		this.rangePijn = false;
	}

	pijn = () => {
		if (this.vechten || this.rangePijn)
			this.hp -= 10;
		if (this.hp <= 0)
			this.zichtbaar = false;
	}
	lopen(dx, dy) {
		if (this.loopt) {
			this.x += dx;
			this.y += dy;
		}
	}

	aanraken() {
		let raken = false;
		this.vechten = false;
		this.laatRangePijn = false;
		this.rangePijn = false;
		let vriendRaken = false;
		for (let i = 0; i < 999; i++) {
			if ((blokkenRakenElkaar(vijandBasis, this)) ||
				(melee[i].x >= this.x && this !== melee[i] && melee[i].zichtbaar && blokkenRakenElkaar(this, melee[i])) ||
				(range[i].x >= this.x && this !== range[i] && range[i].zichtbaar && blokkenRakenElkaar(this, range[i])) ||
				(heavy[i].x >= this.x && this !== heavy[i] && heavy[i].zichtbaar && blokkenRakenElkaar(this, heavy[i]))) {
				raken = true;
			} else if ((this !== vijandMelee[i] && vijandMelee[i].zichtbaar && blokkenRakenElkaar(this, vijandMelee[i])) ||
				(this !== vijandRange[i] && vijandRange[i].zichtbaar && blokkenRakenElkaar(this, vijandRange[i])) ||
				(this !== vijandHeavy[i] && vijandHeavy[i].zichtbaar && blokkenRakenElkaar(this, vijandHeavy[i]))) {
				this.vechten = true;
				raken = true;
				vriendRaken = true;
			}

			if (vijandRange[i].zichtbaar && blokkenRakenElkaarRange(this, vijandRange[i]))
				this.laatRangePijn = true;
		}
		if (this.laatRangePijn && !vriendRaken) {
			this.rangePijn = true;
		}
		return raken;
	}

	plaatsRange() {
		image(rangeLopen, this.x, this.y + 550, 100, 100); //
		if (mouseX > this.x && mouseX < this.x + 100 && mouseY > this.y + 550 && mouseY < this.y + 650) {
			fill('black');
			rect(this.x, this.y + 510, 100, 20);
			fill('red');
			rect(this.x, this.y + 510, 5 * this.hp, 20)
		}
	}

	plaatsRangeMenu() {
		fill('green');
		rect(this.menux + 100, this.menuy, 100, 50);
		this.zichtbaarR = true;
		return (mouseX > this.menux + 100 && mouseX < this.menux + 200 && mouseY > this.menuy && mouseY < this.menuy + 50);
	}
}

class VijandRange extends Range { //Zelfde als Range maar dan een paar dingen omgedraaid(zoals spawn plekken en wie de vijand is)
	constructor() {
		super();
		this.x = 2380;
	}
	pijn = () => {
		if (this.vechten || this.rangePijn)
			this.hp -= 10;
		if (this.hp <= 0) {
			this.zichtbaar = false;
			Geld += 45;
		}
	}

	plaatsRange() {
		image(vijandRangeLopen, this.x, this.y + 550, 100, 100); //
		if (mouseX > this.x && mouseX < this.x + 100 && mouseY > this.y + 550 && mouseY < this.y + 650) {
			fill('black');
			rect(this.x, this.y + 510, 100, 20);
			fill('red');
			rect(this.x, this.y + 510, 5 * this.hp, 20)
		}
	}

	aanraken() {
		let raken = false;
		this.vechten = false;
		this.laatRangePijn = false;
		this.rangePijn = false;
		let vriendRaken = false;
		for (let i = 0; i < 999; i++) {
			if ((this !== melee[i] && melee[i].zichtbaar && blokkenRakenElkaar(this, melee[i])) ||
				(this !== range[i] && range[i].zichtbaar && blokkenRakenElkaar(this, range[i])) ||
				(this !== heavy[i] && heavy[i].zichtbaar && blokkenRakenElkaar(this, heavy[i]))) {
				raken = true;
				this.vechten = true;
			} else if ((blokkenRakenElkaar(basis, this)) ||
				(vijandMelee[i].x <= this.x && this !== vijandMelee[i] && vijandMelee[i].zichtbaar && blokkenRakenElkaar(this, vijandMelee[i])) ||
				(vijandRange[i].x <= this.x && this !== vijandRange[i] && vijandRange[i].zichtbaar && blokkenRakenElkaar(this, vijandRange[i])) ||
				(vijandHeavy[i].x <= this.x && this !== vijandHeavy[i] && vijandHeavy[i].zichtbaar && blokkenRakenElkaar(this, vijandHeavy[i]))) {
				raken = true
				vriendRaken = true;
			}

			if (range[i].zichtbaar && blokkenRakenElkaarRange(this, range[i]))
				this.laatRangePijn = true;

		}
		if (this.laatRangePijn && !vriendRaken) {
			this.rangePijn = true;
		}
		return raken;
	}
}

class Heavy { //Zelfde als Melee maar dan een paar hoeveelheden ander(zoals hp)
	constructor() {
		this.x = 300;
		this.y = 0;
		this.menux = 0;
		this.menuy = 0;
		this.zichtbaar = false;
		this.loopt = true;
		this.hp = 50;
		this.vechten = false;
		this.rangePijn = false;
	}

	pijn = () => {
		if (this.vechten || this.rangePijn)
			this.hp -= 10;
		if (this.hp <= 0)
			this.zichtbaar = false;
	}

	lopen(dx, dy) {
		if (this.loopt) {
			this.x += dx;
			this.y += dy;
		}
	}

	aanraken() {
		let raken = false;
		this.vechten = false;
		this.laatRangePijn = false;
		this.rangePijn = false;
		let vriendRaken = false;
		for (let i = 0; i < 999; i++) {
			if ((blokkenRakenElkaar(vijandBasis, this)) ||
				(melee[i].x >= this.x && this !== melee[i] && melee[i].zichtbaar && blokkenRakenElkaar(this, melee[i])) ||
				(range[i].x >= this.x && this !== range[i] && range[i].zichtbaar && blokkenRakenElkaar(this, range[i])) ||
				(heavy[i].x >= this.x && this !== heavy[i] && heavy[i].zichtbaar && blokkenRakenElkaar(this, heavy[i]))) {
				raken = true;
			} else if ((this !== vijandMelee[i] && vijandMelee[i].zichtbaar && blokkenRakenElkaar(this, vijandMelee[i])) ||
				(this !== vijandRange[i] && vijandRange[i].zichtbaar && blokkenRakenElkaar(this, vijandRange[i])) ||
				(this !== vijandHeavy[i] && vijandHeavy[i].zichtbaar && blokkenRakenElkaar(this, vijandHeavy[i]))) {
				this.vechten = true;
				raken = true
				vriendRaken = true;
			}

			if (vijandRange[i].zichtbaar && blokkenRakenElkaarRange(this, vijandRange[i]))
				this.laatRangePijn = true;
		}
		if (this.laatRangePijn && !vriendRaken) {
			this.rangePijn = true;
		}
		return raken;
	}



	plaatsHeavy() {
		image(heavyLopen, this.x, this.y + 550, 100, 100);	
		if (mouseX > this.x && mouseX < this.x + 100 && mouseY > this.y + 550 && mouseY < this.y + 650) {
			fill('black');
			rect(this.x, this.y + 510, 100, 20);
			fill('red');
			rect(this.x, this.y + 510, 2 * this.hp, 20);

		}
	}


	plaatsHeavyMenu() {
		fill('purple');
		rect(this.menux + 200, this.menuy, 100, 50);
		this.zichtbaarH = true;
		return (mouseX > this.menux + 200 && mouseX < this.menux + 300 && mouseY > this.menuy && mouseY < this.menuy + 50);
	}
}

class VijandHeavy extends Heavy { //Zelfde als Heavy maar dan een paar dingen omgedraaid(zoals spawn plekken en wie de vijand is)
	constructor() {
		super(200 + 100);
		this.x = 2380;
	}

	plaatsHeavy() {
		fill('purple');
		rect(this.x, this.y + 550, 100, 100);
		fill('black');
		if (mouseX > this.x && mouseX < this.x + 100 && mouseY > this.y + 550 && mouseY < this.y + 650) {
			rect(this.x, this.y + 510, 100, 20);
			fill('red');
			rect(this.x, this.y + 510, 2 * this.hp, 20)
		}
	}
	pijn = () => {
		if (this.vechten || this.rangePijn)
			this.hp -= 10;
		if (this.hp <= 0) {
			this.zichtbaar = false;
			Geld += 85;
		}
	}
	aanraken() {
		let raken = false;
		this.vechten = false;
		this.laatRangePijn = false;
		this.rangePijn = false;
		let vriendRaken = false;
		for (let i = 0; i < 999; i++) {
			if ((this !== melee[i] && melee[i].zichtbaar && blokkenRakenElkaar(this, melee[i])) ||
				(this !== range[i] && range[i].zichtbaar && blokkenRakenElkaar(this, range[i])) ||
				(this !== heavy[i] && heavy[i].zichtbaar && blokkenRakenElkaar(this, heavy[i]))) {
				raken = true;
				this.vechten = true;
			} else if ((blokkenRakenElkaar(basis, this)) ||
				(vijandMelee[i].x <= this.x && this !== vijandMelee[i] && vijandMelee[i].zichtbaar && blokkenRakenElkaar(this, vijandMelee[i])) ||
				(vijandRange[i].x <= this.x && this !== vijandRange[i] && vijandRange[i].zichtbaar && blokkenRakenElkaar(this, vijandRange[i])) ||
				(vijandHeavy[i].x <= this.x && this !== vijandHeavy[i] && vijandHeavy[i].zichtbaar && blokkenRakenElkaar(this, vijandHeavy[i]))) {
				raken = true
				vriendRaken = true;
			}

			if (range[i].zichtbaar && blokkenRakenElkaarRange(this, range[i]))
				this.laatRangePijn = true;
		}
		if (this.laatRangePijn && !vriendRaken) {
			this.rangePijn = true;
		}
		return raken;
	}
}

let melee = [];
let range = [];
let heavy = [];
let basis = new Basis();
let vijandMelee = [];
let vijandRange = [];
let vijandHeavy = [];
let vijandBasis = new VijandBasis();
let spawnWachtrij = [];


function setup() {
	meleeLopen = loadImage('melee.gif'); 
	rangeLopen = loadImage('ranged.gif'); 
	vijandRangeLopen = loadImage('vijandRanged.gif'); 
	heavyLopen = loadImage('heavy.gif');
	canvas = createCanvas(2780, 1300);
	canvas.parent('processing');

	frameRate(10);

	for (let i = 0; i < 999; i++) {
		melee.push(new Melee());
		range.push(new Range());
		heavy.push(new Heavy());
		vijandMelee.push(new VijandMelee());
		vijandRange.push(new VijandRange());
		vijandHeavy.push(new VijandHeavy());
	}
	setInterval(vechten, 1000);             //Zet een klok voor vechten waardoor vechten elke seconde wordt uitgevoerd
	setInterval(vijandMousePressed, 1000);  //Zet een klok zodat elke seconde de vijand een kans heeft om een blok te spawnen
}

function vechten() {                        //Als er gevochten wordt gebreurt pijn bij de blok in gevecht
	for (let i = 0; i < 999; i++) {
		if (melee[i].zichtbaar) melee[i].pijn();
		if (range[i].zichtbaar) range[i].pijn();
		if (heavy[i].zichtbaar) heavy[i].pijn();
		if (vijandMelee[i].zichtbaar) vijandMelee[i].pijn();
		if (vijandRange[i].zichtbaar) vijandRange[i].pijn();
		if (vijandHeavy[i].zichtbaar) vijandHeavy[i].pijn();
	}
	basis.pijn();                          //Als de basis aangevallen wordt krijgt de basis pijn
	vijandBasis.pijn();
}

function blokkenRakenElkaar(blok1, blok2) {                       //Dit zet een afstand van 105 als 2 blokken daarin zitten raken ze elkaar aan
	return (blok1.x + 105 >= blok2.x && blok1.x <= blok2.x) ||
		(blok2.x + 105 >= blok1.x && blok2.x <= blok1.x);
}

function blokkenRakenElkaarRange(blok1, blok2) {                 //Dit doe hetzelfde maar met een groter afstand, zodat range van afstand kan vechten
	return (blok1.x + 295 >= blok2.x && blok1.x <= blok2.x) ||
		(blok2.x + 295 >= blok1.x && blok2.x <= blok1.x);
}


function draw() {
	background('blue');
	let blokInSpawn = false;
	let vijandBlokInSpawn = false;
	fill('black');                  //Dit maakt de tekst die laat zien hoeveel geld de speler heeft
	textSize(50);
	text('$' + Geld, 2550, 100);
	fill('red');                    //Dit laat zien hoeveel hp de basis van de speler heeft
	textSize(50);
	text('Health: ' + basis.hp, 2500, 175);

	basis.basisHitbox();            //Plaatst de basissen en hun hitboxen
	basis.plaatsBasis();
	vijandBasis.basisHitbox();
	vijandBasis.plaatsBasis();
	basis.aanraken();
	vijandBasis.aanraken();

	for (let i = 0; i < hoeveelWachtrij; i++) {    //Dit tekent een rood blokje voor ieder blokje in de wachtrij
		fill('red');
		rect(350 + i * 50, 20, 20, 20);
	}

	for (let i = 0; i < 1; i++) {               //Tekent de menu's op het scherm
		melee[i].plaatsMeleeMenu();
		range[i].plaatsRangeMenu();
		heavy[i].plaatsHeavyMenu();
	}

	for (let i = 0; i < 999; i++) {
		if (melee[i].zichtbaar) {               //Dit maakt een Melee blok zichtbaar
			melee[i].plaatsMelee();             //Dit plaatst de nu zichtbare Melee
			melee[i].lopen(5, 0);               //Dit zorgt dat het blok steeds 5 pixels naar rechts gaat

			if (melee[i].x < 400)               //Dit zorgt ervoor dat de blokken in de wachtrij niet over elkaar getekent worden
				blokInSpawn = true;

			melee[i].loopt = !melee[i].aanraken(); //Dit zorgt ervoor dat de blokken stoppen met lopen als de iets aanraken
		}
		if (range[i].zichtbaar) {
			range[i].plaatsRange();
			range[i].lopen(5, 0);

			if (range[i].x < 400)
				blokInSpawn = true;

			range[i].loopt = !range[i].aanraken();
		}

		if (heavy[i].zichtbaar) {
			heavy[i].plaatsHeavy();
			heavy[i].lopen(5, 0);

			if (heavy[i].x < 400)
				blokInSpawn = true;

			heavy[i].loopt = !heavy[i].aanraken();
		}

		if (vijandMelee[i].zichtbaar) {
			vijandMelee[i].plaatsMelee();
			vijandMelee[i].lopen(-5, 0);    //Dit zorgt ervoor dat het blok steeds 5 pixels naar links gaat

			if (vijandMelee[i].x > 2280)
				vijandBlokInSpawn = true;

			vijandMelee[i].loopt = !vijandMelee[i].aanraken();
		}

		if (vijandRange[i].zichtbaar) {
			vijandRange[i].plaatsRange();
			vijandRange[i].lopen(-5, 0);

			if (vijandRange[i].x > 2280)
				vijandBlokInSpawn = true;

			vijandRange[i].loopt = !vijandRange[i].aanraken();
		}
		if (vijandHeavy[i].zichtbaar) {
			vijandHeavy[i].plaatsHeavy();
			vijandHeavy[i].lopen(-5, 0);

			if (vijandHeavy[i].x > 2280)
				vijandBlokInSpawn = true;

			vijandHeavy[i].loopt = !vijandHeavy[i].aanraken();
		}
	}

	if (!blokInSpawn && spawnWachtrij.length) {
		spawnWachtrij[spawnWachtrij.length - 1].zichtbaar = true;
		spawnWachtrij.pop();
		hoeveelWachtrij--;  //Als er een blok wordt gespawned dan zit er 1 minder in de wachtrij
	}

	if (!vijandBlokInSpawn) {   //Zelfde als hiervoor maar dan voor vijand
		for (let i = 0; i < 999; i++) {
			if (vijandMelee[i].wordtZichtbaar) {
				vijandMelee[i].wordtZichtbaar = false;
				vijandMelee[i].zichtbaar = true;

				vijandHoeveelWachtrij--;

				break;
			} else if (vijandRange[i].wordtZichtbaar) {
				vijandRange[i].wordtZichtbaar = false;
				vijandRange[i].zichtbaar = true;

				vijandHoeveelWachtrij--;

				break;
			} else if (vijandHeavy[i].wordtZichtbaar) {
				vijandHeavy[i].wordtZichtbaar = false;
				vijandHeavy[i].zichtbaar = true;

				vijandHoeveelWachtrij--;

				break;
			}
		}
	}

	if (basis.verlies === true) {   //Als de spelers zijn basis hp onder 0 is komt er een scherm met Game Over 
		background('black');
		fill('red');
		textSize(100);
		text('Game Over', 1200, 650);
	}
	if (vijandBasis.win === true) { //als de vijand zijn basis hp onder 0 is komt er een scherm met You Win
		background('black');
		fill('green');
		textSize(100);
		text('You Win', 1200, 650);
	}
}

function mousePressed() {
	if (hoeveelWachtrij < 5) {
		if (meleeNummer < melee.length && melee[meleeNummer].plaatsMeleeMenu() && Geld >= 25) { //Als de speler op menu klikt voor Melee en meer dan 25 geld heeft spawned er een Melee blok
			// melee[meleeNummer].wordtZichtbaar = true;
			spawnWachtrij.unshift(melee[meleeNummer]);
			meleeNummer++;
			Geld -= 25; //Er wordt geld weg genomen na de spawn
			hoeveelWachtrij++;
		} else if (rangeNummer < range.length && range[rangeNummer].plaatsRangeMenu() && Geld >= 40) {
			// range[rangeNummer].wordtZichtbaar = true;
			spawnWachtrij.unshift(range[rangeNummer]);
			rangeNummer++;
			Geld -= 40
			hoeveelWachtrij++;
		} else if (heavyNummer < heavy.length && heavy[heavyNummer].plaatsHeavyMenu() && Geld >= 80) {
			// heavy[heavyNummer].wordtZichtbaar = true;
			spawnWachtrij.unshift(heavy[heavyNummer]);
			heavyNummer++;
			Geld -= 80
			hoeveelWachtrij++;
		}
	}
}

function vijandMousePressed() {
	if (vijandHoeveelWachtrij < 5 && Math.round(Math.random() * 100) <= 30) {  //Elke seconde is er een 30% kans dat er een vijand wordt gemaakt
		if (vijandMeleeNummer < vijandMelee.length && Math.round(Math.random() * 100) <= 20) { //Dan is er een 50% kans dat het een Melee vijand is
			vijandMelee[vijandMeleeNummer].wordtZichtbaar = true;
			vijandMeleeNummer++;

			vijandHoeveelWachtrij++;   //Voegt een blok toe aan de wachtrij van de vijand
		} else if (vijandRangeNummer < vijandRange.length && Math.round(Math.random() * 100) <= 50) { //Daarna is er weer 50% kas dat het een Range vijand is (25% intotaal)
			vijandRange[vijandRangeNummer].wordtZichtbaar = true;
			vijandRangeNummer++;

			vijandHoeveelWachtrij++;
		} else if (vijandHeavyNummer < vijandHeavy.length) {    //Als het niet een Melee of Range vijand is, is het een Heavy vijand (25%)
			vijandHeavy[vijandHeavyNummer].wordtZichtbaar = true;
			vijandHeavyNummer++;

			vijandHoeveelWachtrij++;
		}
	}
}
