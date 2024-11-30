meleeNummer = 0;
rangeNummer = 0;
heavyNummer = 0;
vijandMeleeNummer = 0;
vijandRangeNummer = 0;
vijandHeavyNummer = 0;
hoeveelWachtrij = 0;
vijandHoeveelWachtrij = 0;
geld = 500;
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
        if (this.vechten || this.rangePijn) {
            this.hp -= 10;
        }
        if (this.hp <= 0) {
            this.verlies = true;
        }
    }

    aanraken() {
        let raken = false;
        this.vechten = false;
        this.rangePijn = false;
        for (let i = 0; i < 999; i++) {
            if ((melee[i].x >= this.x && this !== melee[i] && melee[i].zichtbaar && closeMelee(this, melee[i])) ||
                (range[i].x >= this.x && this !== range[i] && range[i].zichtbaar && closeMelee(this, range[i])) ||
                (heavy[i].x >= this.x && this !== heavy[i] && heavy[i].zichtbaar && closeMelee(this, heavy[i]))) {
                raken = true;
            } else if ((this !== vijandMelee[i] && vijandMelee[i].zichtbaar && closeMelee(this, vijandMelee[i])) ||   
                (this !== vijandRange[i] && vijandRange[i].zichtbaar && closeMelee(this, vijandRange[i])) ||
                (this !== vijandHeavy[i] && vijandHeavy[i].zichtbaar && closeMelee(this, vijandHeavy[i]))) {
                this.vechten = true;
                raken = true
            }
            if (vijandRange[i].zichtbaar && closeRange(this, vijandRange[i])) {
                this.rangePijn = true;
            }
        }
        return raken;
    }

    basisHitbox() {
        fill('black');
        rect(this.x, 550, 100, 100);
    }

    plaatsBasis() {
        fill('black');
        rect(0, 350, 300, 300);
    }
}

class VijandBasis extends Basis {
    constructor() {
        super();
        this.x = 2480;
    }

    pijn = () => {
        if (this.vechten || this.rangePijn) {
            this.hp -= 10;
        }
        if (this.hp <= 0) {
            this.win = true;
        }
    }

    aanraken() {
        let raken = false;
        this.vechten = false;
        this.rangePijn = false;
        for (let i = 0; i < 999; i++) {
            if ((melee[i].x >= this.x && this !== melee[i] && melee[i].zichtbaar && closeMelee(this, melee[i])) ||
                (range[i].x >= this.x && this !== range[i] && range[i].zichtbaar && closeMelee(this, range[i])) ||
                (heavy[i].x >= this.x && this !== heavy[i] && heavy[i].zichtbaar && closeMelee(this, heavy[i]))) {
                this.vechten = true;
                raken = true;
            } else if ((this !== vijandMelee[i] && vijandMelee[i].zichtbaar && closeMelee(this, vijandMelee[i])) ||
                (this !== vijandRange[i] && vijandRange[i].zichtbaar && closeMelee(this, vijandRange[i])) ||
                (this !== vijandHeavy[i] && vijandHeavy[i].zichtbaar && closeMelee(this, vijandHeavy[i]))) {
                raken = true
            }
            if (range[i].zichtbaar && closeRange(this, range[i])) {
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
        if (this.vechten || this.rangePijn) {
            this.hp -= 10;
        }
        if (this.hp <= 0) {
            this.zichtbaar = false;
        }
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
            if ((closeMelee(vijandBasis, this)) ||
                (melee[i].x >= this.x && this !== melee[i] && melee[i].zichtbaar && closeMelee(this, melee[i])) ||
                (range[i].x >= this.x && this !== range[i] && range[i].zichtbaar && closeMelee(this, range[i])) ||
                (heavy[i].x >= this.x && this !== heavy[i] && heavy[i].zichtbaar && closeMelee(this, heavy[i]))) {
                raken = true;
            } else if ((this !== vijandMelee[i] && vijandMelee[i].zichtbaar && closeMelee(this, vijandMelee[i])) ||
                (this !== vijandRange[i] && vijandRange[i].zichtbaar && closeMelee(this, vijandRange[i])) ||
                (this !== vijandHeavy[i] && vijandHeavy[i].zichtbaar && closeMelee(this, vijandHeavy[i]))) {
                this.vechten = true;
                raken = true
                vriendRaken = true;
            }

            if (vijandRange[i].zichtbaar && closeRange(this, vijandRange[i]))
                this.laatRangePijn = true;
        }
        if (this.laatRangePijn && !vriendRaken) {
            this.rangePijn = true;
        }
        return raken;
    }

    plaatsMelee() {
        image(meleeLopen, this.x, this.y + 550, 100, 100);
        if (mouseX > this.x && mouseX < this.x + 100 && mouseY > this.y + 550 && mouseY < this.y + 650) {
            fill('black');
            rect(this.x, this.y + 510, 100, 20);
            fill('red');
            rect(this.x, this.y + 510, 3.33 * this.hp, 20);
        }
    }

    plaatsMeleeMenu() {
        fill('red');
        rect(this.menux, this.menuy, 100, 50);
        this.zichtbaarM = true;
        return (mouseX > this.menux && mouseX < this.menux + 100 && mouseY > this.menuy && mouseY < this.menuy + 50);
    }
}

class VijandMelee extends Melee {
    constructor() {
        super();
        this.x = 2380;
    }

    pijn = () => {
        if (this.vechten || this.rangePijn)
            this.hp -= 10;
        if (this.hp <= 0) {
            this.zichtbaar = false;
            geld += 30;
        }
    }

    aanraken() {
        let raken = false;
        this.vechten = false;
        this.laatRangePijn = false;
        this.rangePijn = false;
        let vriendRaken = false;
        for (let i = 0; i < 999; i++) {
            if ((this !== melee[i] && melee[i].zichtbaar && closeMelee(this, melee[i])) ||
                (this !== range[i] && range[i].zichtbaar && closeMelee(this, range[i])) ||
                (this !== heavy[i] && heavy[i].zichtbaar && closeMelee(this, heavy[i]))) {
                raken = true;
                this.vechten = true;
            } else if ((closeMelee(basis, this)) ||
                (vijandMelee[i].x <= this.x && this !== vijandMelee[i] && vijandMelee[i].zichtbaar && closeMelee(this, vijandMelee[i])) ||
                (vijandRange[i].x <= this.x && this !== vijandRange[i] && vijandRange[i].zichtbaar && closeMelee(this, vijandRange[i])) ||
                (vijandHeavy[i].x <= this.x && this !== vijandHeavy[i] && vijandHeavy[i].zichtbaar && closeMelee(this, vijandHeavy[i]))) {
                raken = true
                vriendRaken = true;
            }
            if (range[i].zichtbaar && closeRange(this, range[i]))
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

class Range {
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
            if ((closeMelee(vijandBasis, this)) ||
                (melee[i].x >= this.x && this !== melee[i] && melee[i].zichtbaar && closeMelee(this, melee[i])) ||
                (range[i].x >= this.x && this !== range[i] && range[i].zichtbaar && closeMelee(this, range[i])) ||
                (heavy[i].x >= this.x && this !== heavy[i] && heavy[i].zichtbaar && closeMelee(this, heavy[i]))) {
                raken = true;
            } else if ((this !== vijandMelee[i] && vijandMelee[i].zichtbaar && closeMelee(this, vijandMelee[i])) ||
                (this !== vijandRange[i] && vijandRange[i].zichtbaar && closeMelee(this, vijandRange[i])) ||
                (this !== vijandHeavy[i] && vijandHeavy[i].zichtbaar && closeMelee(this, vijandHeavy[i]))) {
                this.vechten = true;
                raken = true;
                vriendRaken = true;
            }

            if (vijandRange[i].zichtbaar && closeRange(this, vijandRange[i]))
                this.laatRangePijn = true;
        }
        if (this.laatRangePijn && !vriendRaken) {
            this.rangePijn = true;
        }
        return raken;
    }

    plaatsRange() {
        image(rangeLopen, this.x, this.y + 550, 100, 100);
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

class VijandRange extends Range {
    constructor() {
        super();
        this.x = 2380;
    }
    pijn = () => {
        if (this.vechten || this.rangePijn)
            this.hp -= 10;
        if (this.hp <= 0) {
            this.zichtbaar = false;
            geld += 45;
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
            if ((this !== melee[i] && melee[i].zichtbaar && closeMelee(this, melee[i])) ||
                (this !== range[i] && range[i].zichtbaar && closeMelee(this, range[i])) ||
                (this !== heavy[i] && heavy[i].zichtbaar && closeMelee(this, heavy[i]))) {
                raken = true;
                this.vechten = true;
            } else if ((closeMelee(basis, this)) ||
                (vijandMelee[i].x <= this.x && this !== vijandMelee[i] && vijandMelee[i].zichtbaar && closeMelee(this, vijandMelee[i])) ||
                (vijandRange[i].x <= this.x && this !== vijandRange[i] && vijandRange[i].zichtbaar && closeMelee(this, vijandRange[i])) ||
                (vijandHeavy[i].x <= this.x && this !== vijandHeavy[i] && vijandHeavy[i].zichtbaar && closeMelee(this, vijandHeavy[i]))) {
                raken = true
                vriendRaken = true;
            }

            if (range[i].zichtbaar && closeRange(this, range[i]))
                this.laatRangePijn = true;

        }
        if (this.laatRangePijn && !vriendRaken) {
            this.rangePijn = true;
        }
        return raken;
    }
}

class Heavy {
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
        let vriendRaken = false;
        let raken = false;
        this.vechten = false;
        this.laatRangePijn = false;
        this.rangePijn = false;
        for (let i = 0; i < 999; i++) {
            if ((closeMelee(vijandBasis, this)) ||
                (melee[i].x >= this.x && this !== melee[i] && melee[i].zichtbaar && closeMelee(this, melee[i])) ||
                (range[i].x >= this.x && this !== range[i] && range[i].zichtbaar && closeMelee(this, range[i])) ||
                (heavy[i].x >= this.x && this !== heavy[i] && heavy[i].zichtbaar && closeMelee(this, heavy[i]))) {
                raken = true;
            } else if ((this !== vijandMelee[i] && vijandMelee[i].zichtbaar && closeMelee(this, vijandMelee[i])) ||
                (this !== vijandRange[i] && vijandRange[i].zichtbaar && closeMelee(this, vijandRange[i])) ||
                (this !== vijandHeavy[i] && vijandHeavy[i].zichtbaar && closeMelee(this, vijandHeavy[i]))) {
                this.vechten = true;
                vriendRaken = true;
            }

            if (vijandRange[i].zichtbaar && rangeCombat(this, vijandRange[i]))
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

class VijandHeavy extends Heavy {
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
            geld += 85;
        }
    }
    aanraken() {
        let raken = false;
        this.vechten = false;
        this.laatRangePijn = false;
        this.rangePijn = false;
        let vriendRaken = false;
        for (let i = 0; i < 999; i++) {
            if ((this !== melee[i] && melee[i].zichtbaar && closeMelee(this, melee[i])) ||
                (this !== range[i] && range[i].zichtbaar && closeMelee(this, range[i])) ||
                (this !== heavy[i] && heavy[i].zichtbaar && closeMelee(this, heavy[i]))) {
                raken = true;
                this.vechten = true;
            } else if ((closeMelee(basis, this)) ||
                (vijandMelee[i].x <= this.x && this !== vijandMelee[i] && vijandMelee[i].zichtbaar && closeMelee(this, vijandMelee[i])) ||
                (vijandRange[i].x <= this.x && this !== vijandRange[i] && vijandRange[i].zichtbaar && closeMelee(this, vijandRange[i])) ||
                (vijandHeavy[i].x <= this.x && this !== vijandHeavy[i] && vijandHeavy[i].zichtbaar && closeMelee(this, vijandHeavy[i]))) {
                raken = true
                vriendRaken = true;
            }

            if (range[i].zichtbaar && closeRange(this, range[i]))
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
    setInterval(vechten, 1000);
    setInterval(vijandMousePressed, 1000);
}

function vechten() {
    for (let i = 0; i < 999; i++) {
        if (melee[i].zichtbaar) melee[i].pijn();
        if (range[i].zichtbaar) range[i].pijn();
        if (heavy[i].zichtbaar) heavy[i].pijn();
        if (vijandMelee[i].zichtbaar) vijandMelee[i].pijn();
        if (vijandRange[i].zichtbaar) vijandRange[i].pijn();
        if (vijandHeavy[i].zichtbaar) vijandHeavy[i].pijn();
    }
    basis.pijn();
    vijandBasis.pijn();
}

function closeMelee(blok1, blok2) {
    return (blok1.x + 100 >= blok2.x && blok1.x <= blok2.x) ||
        (blok2.x + 100 >= blok1.x && blok2.x <= blok1.x);
}

function closeRange(blok1, blok2) {
    return (blok1.x + 100 >= blok2.x && blok1.x <= blok2.x) ||
        (blok2.x + 100 >= blok1.x && blok2.x <= blok1.x);
}

function rangeCombat(blok1, blok2) {
    return (blok1.x + 200 >= blok2.x && blok1.x <= blok2.x) ||
        (blok2.x + 200 >= blok1.x && blok2.x <= blok1.x);
}


function draw() {
    background('blue');
    let blokInSpawn = false;
    let vijandBlokInSpawn = false;
    fill('black');
    textSize(50);
    text('$' + geld, 2550, 100);
    fill('red');
    textSize(50);
    text('Health: ' + basis.hp, 2500, 175);

    basis.basisHitbox();
    basis.plaatsBasis();
    vijandBasis.basisHitbox();
    vijandBasis.plaatsBasis();
    basis.aanraken();
    vijandBasis.aanraken();

    for (let i = 0; i < hoeveelWachtrij; i++) {
        fill('red');
        rect(350 + i * 50, 20, 20, 20);
    }

    for (let i = 0; i < 1; i++) {
        melee[i].plaatsMeleeMenu();
        range[i].plaatsRangeMenu();
        heavy[i].plaatsHeavyMenu();
    }

    for (let i = 0; i < 999; i++) {
        if (melee[i].zichtbaar) {
            melee[i].plaatsMelee();
            melee[i].lopen(5, 0);

            if (melee[i].x < 400)
                blokInSpawn = true;

            melee[i].loopt = !melee[i].aanraken();
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
            vijandMelee[i].lopen(-5, 0);

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
        hoeveelWachtrij--;
    }

    if (!vijandBlokInSpawn) {
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

    if (basis.verlies === true) {
        background('black');
        fill('red');
        textSize(100);
        text('Game Over', 1200, 650);
    }
    if (vijandBasis.win === true) {
        background('black');
        fill('green');
        textSize(100);
        text('You Win', 1200, 650);
    }
}

function mousePressed() {
    if (hoeveelWachtrij < 5) {
        if (meleeNummer < melee.length && melee[meleeNummer].plaatsMeleeMenu() && geld >= 25) {
            spawnWachtrij.unshift(melee[meleeNummer]);
            meleeNummer++;
            geld -= 25;
            hoeveelWachtrij++;
        } else if (rangeNummer < range.length && range[rangeNummer].plaatsRangeMenu() && geld >= 40) {
            spawnWachtrij.unshift(range[rangeNummer]);
            rangeNummer++;
            geld -= 40
            hoeveelWachtrij++;
        } else if (heavyNummer < heavy.length && heavy[heavyNummer].plaatsHeavyMenu() && geld >= 80) {
            spawnWachtrij.unshift(heavy[heavyNummer]);
            heavyNummer++;
            geld -= 80
            hoeveelWachtrij++;
        }
    }
}

function vijandMousePressed() {
    if (vijandHoeveelWachtrij < 5 && Math.round(Math.random() * 100) <= 30) {
        if (vijandMeleeNummer < vijandMelee.length && Math.round(Math.random() * 100) <= 20) {
            vijandMelee[vijandMeleeNummer].wordtZichtbaar = true;
            vijandMeleeNummer++;

            vijandHoeveelWachtrij++;
        } else if (vijandRangeNummer < vijandRange.length && Math.round(Math.random() * 100) <= 50) {
            vijandRange[vijandRangeNummer].wordtZichtbaar = true;
            vijandRangeNummer++;

            vijandHoeveelWachtrij++;
        } else if (vijandHeavyNummer < vijandHeavy.length) {
            vijandHeavy[vijandHeavyNummer].wordtZichtbaar = true;
            vijandHeavyNummer++;

            vijandHoeveelWachtrij++;
        }
    }
}
