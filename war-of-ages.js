meleeNummer = 0;
rangeNummer = 0;
heavyNummer = 0;
vijandMeleeNummer = 0;
vijandRangeNummer = 0;
vijandHeavyNummer = 0;
hoeveelQueue = 0;
vijandHoeveelQueue = 0;
Geld = 5000;
SpelerRangedLopen = null;

class Basis {
    constructor() {
        this.win = false;
        this.lose = false;
        this.hp = 100;
        this.vechten = false;
        this.x = 200;
    }

    attack = () => {
        if (this.hp <= 0) this.lose = true;
    };

    aanraken() {
        let touching = false;
        this.vechten = false;
        for (let i = 0; i < 999; i++) {
            if (
                (melee[i].x >= this.x &&
                    this !== melee[i] &&
                    melee[i].zichtbaar &&
                    bloksAreTouching(this, melee[i])) ||
                (range[i].x >= this.x &&
                    this !== range[i] &&
                    range[i].zichtbaar &&
                    bloksAreTouching(this, range[i])) ||
                (heavy[i].x >= this.x &&
                    this !== heavy[i] &&
                    heavy[i].zichtbaar &&
                    bloksAreTouching(this, heavy[i]))
            ) {
                touching = true;
            } else if (
                (this !== vijandMelee[i] &&
                    vijandMelee[i].zichtbaar &&
                    bloksAreTouching(this, vijandMelee[i])) ||
                (this !== vijandRange[i] &&
                    vijandRange[i].zichtbaar &&
                    bloksAreTouching(this, vijandRange[i])) ||
                (this !== vijandHeavy[i] &&
                    vijandHeavy[i].zichtbaar &&
                    bloksAreTouching(this, vijandHeavy[i]))
            ) {
                this.vechten = true;
                touching = true;
            }
        }
        return touching;
    }
    plaats_basis_slaandoos() {
        fill("black");
        rect(this.x, 550, 100, 100);
    }

    plaats_basis() {
        fill("black");
        rect(0, 350, 300, 300);
    }
}

class VijandBasis extends Basis {
    constructor() {
        super();
        this.x = 2480;
    }

    attack = () => {
        if (this.hp <= 0) this.win = true;
    };

    aanraken() {
        let touching = false;
        this.vechten = false;
        for (let i = 0; i < 999; i++) {
            if (
                (this !== melee[i] &&
                    melee[i].zichtbaar &&
                    bloksAreTouching(this, melee[i])) ||
                (this !== range[i] &&
                    range[i].zichtbaar &&
                    bloksAreTouching(this, range[i])) ||
                (this !== heavy[i] &&
                    heavy[i].zichtbaar &&
                    bloksAreTouching(this, heavy[i]))
            ) {
                touching = true;
                this.vechten = true;
            } else if (
                (vijandMelee[i].x <= this.x &&
                    this !== vijandMelee[i] &&
                    vijandMelee[i].zichtbaar &&
                    bloksAreTouching(this, vijandMelee[i])) ||
                (vijandRange[i].x <= this.x &&
                    this !== vijandRange[i] &&
                    vijandRange[i].zichtbaar &&
                    bloksAreTouching(this, vijandRange[i])) ||
                (vijandHeavy[i].x <= this.x &&
                    this !== vijandHeavy[i] &&
                    vijandHeavy[i].zichtbaar &&
                    bloksAreTouching(this, vijandHeavy[i]))
            ) {
                touching = true;
            }
        }
        return touching;
    }

    plaats_basis_slaandoos() {
        fill("white");
        rect(this.x, 550, 100, 100);
    }

    plaats_basis() {
        fill("white");
        rect(2480, 350, 300, 300);
    }
}

class Melee {
    constructor() {
        this.x = 300;
        this.y = 0;
        this.menux = 0;
        this.menuy = 0;
        this.zichtbaar = false;
        this.hp = 30;
        this.vechten = false;
        this.closestBlok = {x: 99999};
        this.rangeLength = 0;
    }

    attack = () => {
        if(!this.closestBlok.zichtbaar)
            this.closestBlok.x = 99999;

        for(let i = 0; i < 999; i++) {
            if(vijandMelee[i].zichtbaar && Math.abs(vijandMelee[i].x - this.x) < Math.abs(this.closestBlok.x - this.x))
                this.closestBlok = vijandMelee[i];
            if(vijandRange[i].zichtbaar && Math.abs(vijandRange[i].x - this.x) < Math.abs(this.closestBlok.x - this.x))
                this.closestBlok = vijandRange[i];
            if(vijandHeavy[i].zichtbaar && Math.abs(vijandHeavy[i].x - this.x) < Math.abs(this.closestBlok.x - this.x))
                this.closestBlok = vijandHeavy[i];
            if(vijandBasis.x < this.closestBlok.x)
                this.closestBlok = vijandBasis;
        }

        if(this.closestBlok.x <= this.x + this.rangeLength + 105)
            this.closestBlok.hp -= 10;

        if (this.hp <= 0) this.zichtbaar = false;
    };

    lopen(dx, dy) {
        if (this.loopt) {
            this.x += dx;
            this.y += dy;
        }
    }

    aanraken() {
        let touching = false;
        this.vechten = false;
        for (let i = 0; i < 999; i++) {
            if (
                bloksAreTouching(vijandBasis, this) ||
                (melee[i].x >= this.x &&
                    this !== melee[i] &&
                    melee[i].zichtbaar &&
                    bloksAreTouching(this, melee[i])) ||
                (range[i].x >= this.x &&
                    this !== range[i] &&
                    range[i].zichtbaar &&
                    bloksAreTouching(this, range[i])) ||
                (heavy[i].x >= this.x &&
                    this !== heavy[i] &&
                    heavy[i].zichtbaar &&
                    bloksAreTouching(this, heavy[i]))
            ) {
                touching = true;
            } else if (
                (this !== vijandMelee[i] &&
                    vijandMelee[i].zichtbaar &&
                    bloksAreTouching(this, vijandMelee[i])) ||
                (this !== vijandRange[i] &&
                    vijandRange[i].zichtbaar &&
                    bloksAreTouching(this, vijandRange[i])) ||
                (this !== vijandHeavy[i] &&
                    vijandHeavy[i].zichtbaar &&
                    bloksAreTouching(this, vijandHeavy[i]))
            ) {
                this.vechten = true;
                touching = true;
            }
        }
        return touching;
    }

    plaats_melee() {
        fill("red");
        rect(this.x, this.y + 550, 100, 100);
        if (
            mouseX > this.x &&
            mouseX < this.x + 100 &&
            mouseY > this.y + 550 &&
            mouseY < this.y + 650
        ) {
            fill("black");
            rect(this.x, this.y + 510, 100, 20);
            fill("red");
            rect(this.x, this.y + 510, 3.33 * this.hp, 20);
        }
    }

    plaats_mm() {
        fill("red");
        rect(this.menux, this.menuy, 100, 50);
        this.zichtbaarM = true;
        return (
            mouseX > this.menux &&
            mouseX < this.menux + 100 &&
            mouseY > this.menuy &&
            mouseY < this.menuy + 50
        );
    }
}

class VijandMelee extends Melee {
    constructor() {
        super();
        this.x = 2380;
        this.closestBlok.x = -99999;
    }

    attack = () => {
        if(!this.closestBlok.zichtbaar)
            this.closestBlok.x = -99999;

        for(let i = 0; i < 999; i++) {
            if(melee[i].zichtbaar && Math.abs(melee[i].x - this.x) < Math.abs(this.closestBlok.x - this.x))
                this.closestBlok = melee[i];
            if(range[i].zichtbaar && Math.abs(range[i].x - this.x) < Math.abs(this.closestBlok.x - this.x))
                this.closestBlok = range[i];
            if(heavy[i].zichtbaar && Math.abs(heavy[i].x - this.x) < Math.abs(this.closestBlok.x - this.x))
                this.closestBlok = heavy[i];
            if(basis.x > this.closestBlok.x)
                this.closestBlok = basis;
        }

        if(this.closestBlok.x >= this.x - this.rangeLength - 105)
            this.closestBlok.hp -= 10;

        if (this.hp <= 0) {
            this.zichtbaar = false;
            Geld += 30;
        }
    };

    aanraken() {
        let touching = false;
        this.vechten = false;
        for (let i = 0; i < 999; i++) {
            if (
                (this !== melee[i] &&
                    melee[i].zichtbaar &&
                    bloksAreTouching(this, melee[i])) ||
                (this !== range[i] &&
                    range[i].zichtbaar &&
                    bloksAreTouching(this, range[i])) ||
                (this !== heavy[i] &&
                    heavy[i].zichtbaar &&
                    bloksAreTouching(this, heavy[i]))
            ) {
                touching = true;
                this.vechten = true;
            } else if (
                bloksAreTouching(basis, this) ||
                (vijandMelee[i].x <= this.x &&
                    this !== vijandMelee[i] &&
                    vijandMelee[i].zichtbaar &&
                    bloksAreTouching(this, vijandMelee[i])) ||
                (vijandRange[i].x <= this.x &&
                    this !== vijandRange[i] &&
                    vijandRange[i].zichtbaar &&
                    bloksAreTouching(this, vijandRange[i])) ||
                (vijandHeavy[i].x <= this.x &&
                    this !== vijandHeavy[i] &&
                    vijandHeavy[i].zichtbaar &&
                    bloksAreTouching(this, vijandHeavy[i]))
            ) {
                touching = true;
            }
        }
        return touching;
    }

    plaats_melee() {
        fill("red");
        rect(this.x, this.y + 550, 100, 100);
        if (
            mouseX > this.x &&
            mouseX < this.x + 100 &&
            mouseY > this.y + 550 &&
            mouseY < this.y + 650
        ) {
            fill("black");
            rect(this.x, this.y + 510, 100, 20);
            fill("red");
            rect(this.x, this.y + 510, 3.33 * this.hp, 20);
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
        this.closestBlok = {x: 99999};
        this.rangeLength = 500;
    }

    attack = () => {
        if(!this.closestBlok.zichtbaar)
            this.closestBlok.x = 99999;

        for(let i = 0; i < 999; i++) {
            if(vijandMelee[i].zichtbaar && Math.abs(vijandMelee[i].x - this.x) < Math.abs(this.closestBlok.x - this.x))
                this.closestBlok = vijandMelee[i];
            if(vijandRange[i].zichtbaar && Math.abs(vijandRange[i].x - this.x) < Math.abs(this.closestBlok.x - this.x))
                this.closestBlok = vijandRange[i];
            if(vijandHeavy[i].zichtbaar && Math.abs(vijandHeavy[i].x - this.x) < Math.abs(this.closestBlok.x - this.x))
                this.closestBlok = vijandHeavy[i];
            if(vijandBasis.x < this.closestBlok.x)
                this.closestBlok = vijandBasis;
        }

        if(this.closestBlok.x <= this.x + this.rangeLength + 105)
            this.closestBlok.hp -= 10;

        if (this.hp <= 0) this.zichtbaar = false;
    };

    lopen(dx, dy) {
        if (this.loopt) {
            this.x += dx;
            this.y += dy;
        }
    }

    aanraken() {
        let touching = false;
        this.vechten = false;
        for (let i = 0; i < 999; i++) {
            if (
                bloksAreTouching(vijandBasis, this) ||
                (melee[i].x >= this.x &&
                    this !== melee[i] &&
                    melee[i].zichtbaar &&
                    bloksAreTouching(this, melee[i])) ||
                (range[i].x >= this.x &&
                    this !== range[i] &&
                    range[i].zichtbaar &&
                    bloksAreTouching(this, range[i])) ||
                (heavy[i].x >= this.x &&
                    this !== heavy[i] &&
                    heavy[i].zichtbaar &&
                    bloksAreTouching(this, heavy[i]))
            ) {
                touching = true;
            } else if (
                (this !== vijandMelee[i] &&
                    vijandMelee[i].zichtbaar &&
                    bloksAreTouching(this, vijandMelee[i])) ||
                (this !== vijandRange[i] &&
                    vijandRange[i].zichtbaar &&
                    bloksAreTouching(this, vijandRange[i])) ||
                (this !== vijandHeavy[i] &&
                    vijandHeavy[i].zichtbaar &&
                    bloksAreTouching(this, vijandHeavy[i]))
            ) {
                this.vechten = true;
                touching = true;
            }
        }
        return touching;
    }

    plaats_range() {
    image(spelerRangedLopen, this.x, this.y + 550, 100, 100);

        if (
            mouseX > this.x &&
            mouseX < this.x + 100 &&
            mouseY > this.y + 550 &&
            mouseY < this.y + 650
        ) {
            fill("black");
            rect(this.x, this.y + 510, 100, 20);
            fill("red");
            rect(this.x, this.y + 510, 5 * this.hp, 20);
        }
    }

    plaats_rm() {
        fill("green");
        rect(this.menux + 100, this.menuy, 100, 50);
        this.zichtbaarR = true;
        return (
            mouseX > this.menux + 100 &&
            mouseX < this.menux + 200 &&
            mouseY > this.menuy &&
            mouseY < this.menuy + 50
        );
    }
}

class VijandRange extends Range {
    constructor() {
        super();
        this.x = 2380;
    }

    attack = () => {
        if(!this.closestBlok.zichtbaar)
            this.closestBlok.x = -99999;

        for(let i = 0; i < 999; i++) {
            if(melee[i].zichtbaar && Math.abs(melee[i].x - this.x) < Math.abs(this.closestBlok.x - this.x))
                this.closestBlok = melee[i];
            if(range[i].zichtbaar && Math.abs(range[i].x - this.x) < Math.abs(this.closestBlok.x - this.x))
                this.closestBlok = range[i];
            if(heavy[i].zichtbaar && Math.abs(heavy[i].x - this.x) < Math.abs(this.closestBlok.x - this.x))
                this.closestBlok = heavy[i];
            if(basis.x > this.closestBlok.x)
                this.closestBlok = basis;
        }

        if(this.closestBlok.x >= this.x - this.rangeLength - 105)
            this.closestBlok.hp -= 10;

        if (this.hp <= 0) {
            this.zichtbaar = false;
            Geld += 30;
        }
    };

    plaats_range() {
        fill("green");
        rect(this.x, this.y + 550, 100, 100);
        if (
            mouseX > this.x &&
            mouseX < this.x + 100 &&
            mouseY > this.y + 550 &&
            mouseY < this.y + 650
        ) {
            fill("black");
            rect(this.x, this.y + 510, 100, 20);
            fill("red");
            rect(this.x, this.y + 510, 5 * this.hp, 20);
        }
    }
    aanraken() {
        let touching = false;
        this.vechten = false;
        for (let i = 0; i < 999; i++) {
            if (
                (this !== melee[i] &&
                    melee[i].zichtbaar &&
                    bloksAreTouching(this, melee[i])) ||
                (this !== range[i] &&
                    range[i].zichtbaar &&
                    bloksAreTouching(this, range[i])) ||
                (this !== heavy[i] &&
                    heavy[i].zichtbaar &&
                    bloksAreTouching(this, heavy[i]))
            ) {
                touching = true;
                this.vechten = true;
            } else if (
                bloksAreTouching(basis, this) ||
                (vijandMelee[i].x <= this.x &&
                    this !== vijandMelee[i] &&
                    vijandMelee[i].zichtbaar &&
                    bloksAreTouching(this, vijandMelee[i])) ||
                (vijandRange[i].x <= this.x &&
                    this !== vijandRange[i] &&
                    vijandRange[i].zichtbaar &&
                    bloksAreTouching(this, vijandRange[i])) ||
                (vijandHeavy[i].x <= this.x &&
                    this !== vijandHeavy[i] &&
                    vijandHeavy[i].zichtbaar &&
                    bloksAreTouching(this, vijandHeavy[i]))
            ) {
                touching = true;
            }
        }
        return touching;
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
        this.closestBlok = {x: 99999};
        this.rangeLength = 0;
    }

    attack = () => {
        if(!this.closestBlok.zichtbaar)
            this.closestBlok.x = 99999;

        for(let i = 0; i < 999; i++) {
            if(vijandMelee[i].zichtbaar && Math.abs(vijandMelee[i].x - this.x) < Math.abs(this.closestBlok.x - this.x))
                this.closestBlok = vijandMelee[i];
            if(vijandRange[i].zichtbaar && Math.abs(vijandRange[i].x - this.x) < Math.abs(this.closestBlok.x - this.x))
                this.closestBlok = vijandRange[i];
            if(vijandHeavy[i].zichtbaar && Math.abs(vijandHeavy[i].x - this.x) < Math.abs(this.closestBlok.x - this.x))
                this.closestBlok = vijandHeavy[i];
            if(vijandBasis.x < this.closestBlok.x)
                this.closestBlok = vijandBasis;
        }

        if(this.closestBlok.x <= this.x + this.rangeLength + 105)
            this.closestBlok.hp -= 10;

        if (this.hp <= 0) this.zichtbaar = false;
    };

    lopen(dx, dy) {
        if (this.loopt) {
            this.x += dx;
            this.y += dy;
        }
    }

    aanraken() {
        let touching = false;
        this.vechten = false;
        for (let i = 0; i < 999; i++) {
            if (
                bloksAreTouching(vijandBasis, this) ||
                (melee[i].x >= this.x &&
                    this !== melee[i] &&
                    melee[i].zichtbaar &&
                    bloksAreTouching(this, melee[i])) ||
                (range[i].x >= this.x &&
                    this !== range[i] &&
                    range[i].zichtbaar &&
                    bloksAreTouching(this, range[i])) ||
                (heavy[i].x >= this.x &&
                    this !== heavy[i] &&
                    heavy[i].zichtbaar &&
                    bloksAreTouching(this, heavy[i]))
            ) {
                touching = true;
            } else if (
                (this !== vijandMelee[i] &&
                    vijandMelee[i].zichtbaar &&
                    bloksAreTouching(this, vijandMelee[i])) ||
                (this !== vijandRange[i] &&
                    vijandRange[i].zichtbaar &&
                    bloksAreTouching(this, vijandRange[i])) ||
                (this !== vijandHeavy[i] &&
                    vijandHeavy[i].zichtbaar &&
                    bloksAreTouching(this, vijandHeavy[i]))
            ) {
                this.vechten = true;
                touching = true;
            }
        }
        return touching;
    }

    plaats_heavy() {
        fill("purple");
        rect(this.x, this.y + 550, 100, 100);
        if (
            mouseX > this.x &&
            mouseX < this.x + 100 &&
            mouseY > this.y + 550 &&
            mouseY < this.y + 650
        ) {
            fill("black");
            rect(this.x, this.y + 510, 100, 20);
            fill("red");
            rect(this.x, this.y + 510, 2 * this.hp, 20);
        }
    }

    plaats_hm() {
        fill("purple");
        rect(this.menux + 200, this.menuy, 100, 50);
        this.zichtbaarH = true;
        return (
            mouseX > this.menux + 200 &&
            mouseX < this.menux + 300 &&
            mouseY > this.menuy &&
            mouseY < this.menuy + 50
        );
    }
}

class VijandHeavy extends Heavy {
    constructor() {
        super(200 + 100);
        this.x = 2380;
    }

    plaats_heavy() {
        fill("purple");
        rect(this.x, this.y + 550, 100, 100);
        if (
            mouseX > this.x &&
            mouseX < this.x + 100 &&
            mouseY > this.y + 550 &&
            mouseY < this.y + 650
        ) {
            fill("black");
            rect(this.x, this.y + 510, 100, 20);
            fill("red");
            rect(this.x, this.y + 510, 2 * this.hp, 20);
        }
    }

    attack = () => {
        if(!this.closestBlok.zichtbaar)
            this.closestBlok.x = -99999;

        for(let i = 0; i < 999; i++) {
            if(melee[i].zichtbaar && Math.abs(melee[i].x - this.x) < Math.abs(this.closestBlok.x - this.x))
                this.closestBlok = melee[i];
            if(range[i].zichtbaar && Math.abs(range[i].x - this.x) < Math.abs(this.closestBlok.x - this.x))
                this.closestBlok = range[i];
            if(heavy[i].zichtbaar && Math.abs(heavy[i].x - this.x) < Math.abs(this.closestBlok.x - this.x))
                this.closestBlok = heavy[i];
            if(basis.x > this.closestBlok.x)
                this.closestBlok = basis;
        }

        if(this.closestBlok.x >= this.x - this.rangeLength - 105)
            this.closestBlok.hp -= 10;

        if (this.hp <= 0) {
            this.zichtbaar = false;
            Geld += 30;
        }
    };

    aanraken() {
        let touching = false;
        this.vechten = false;
        for (let i = 0; i < 999; i++) {
            if (
                (this !== melee[i] &&
                    melee[i].zichtbaar &&
                    bloksAreTouching(this, melee[i])) ||
                (this !== range[i] &&
                    range[i].zichtbaar &&
                    bloksAreTouching(this, range[i])) ||
                (this !== heavy[i] &&
                    heavy[i].zichtbaar &&
                    bloksAreTouching(this, heavy[i]))
            ) {
                touching = true;
                this.vechten = true;
            } else if (
                bloksAreTouching(basis, this) ||
                (vijandMelee[i].x <= this.x &&
                    this !== vijandMelee[i] &&
                    vijandMelee[i].zichtbaar &&
                    bloksAreTouching(this, vijandMelee[i])) ||
                (vijandRange[i].x <= this.x &&
                    this !== vijandRange[i] &&
                    vijandRange[i].zichtbaar &&
                    bloksAreTouching(this, vijandRange[i])) ||
                (vijandHeavy[i].x <= this.x &&
                    this !== vijandHeavy[i] &&
                    vijandHeavy[i].zichtbaar &&
                    bloksAreTouching(this, vijandHeavy[i]))
            ) {
                touching = true;
            }
        }
        return touching;
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
let spawnQueue = [];

function setup() {
    spelerRangedLopen = loadImage('SpelerRangedLopen.gif');
    canvas = createCanvas(2780, 1300);
    canvas.parent("processing");

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
        if (melee[i].zichtbaar) melee[i].attack();
        if (range[i].zichtbaar) range[i].attack();
        if (heavy[i].zichtbaar) heavy[i].attack();
        if (vijandMelee[i].zichtbaar) vijandMelee[i].attack();
        if (vijandRange[i].zichtbaar) vijandRange[i].attack();
        if (vijandHeavy[i].zichtbaar) vijandHeavy[i].attack();
    }
    basis.attack();
    vijandBasis.attack();
}

function bloksAreTouching(blok1, blok2) {
    return (
        (blok1.x + 105 >= blok2.x && blok1.x <= blok2.x) ||
        (blok2.x + 105 >= blok1.x && blok2.x <= blok1.x)
    );
}

function bloksAreTouchingRange(blok1, blok2) {
    return (
        (blok1.x + 220 >= blok2.x && blok1.x <= blok2.x) ||
        (blok2.x + 220 >= blok1.x && blok2.x <= blok1.x)
    );
}

function draw() {
    background("blue");
    let blokInSpawn = false;
    let vijandBlokInSpawn = false;
    fill("black");
    textSize(50);
    text("$" + Geld, 2550, 100);
    fill("red");
    textSize(50);
    text("Health: " + basis.hp, 2500, 175);

    basis.plaats_basis_slaandoos();
    basis.plaats_basis();
    vijandBasis.plaats_basis_slaandoos();
    vijandBasis.plaats_basis();

    basis.aanraken();
    vijandBasis.aanraken();

    for (let i = 0; i < hoeveelQueue; i++) {
        fill("red");
        rect(350 + i * 50, 20, 20, 20);
    }

    for (let i = 0; i < 1; i++) {
        melee[i].plaats_mm();
        range[i].plaats_rm();
        heavy[i].plaats_hm();
    }

    for (let i = 0; i < 999; i++) {
        if (melee[i].zichtbaar) {
            melee[i].plaats_melee();
            melee[i].lopen(5, 0);

            if (melee[i].x < 400) blokInSpawn = true;

            melee[i].loopt = !melee[i].aanraken();
        }
        if (range[i].zichtbaar) {
            range[i].plaats_range();
            range[i].lopen(5, 0);

            if (range[i].x < 400) blokInSpawn = true;

            range[i].loopt = !range[i].aanraken();
        }

        if (heavy[i].zichtbaar) {
            heavy[i].plaats_heavy();
            heavy[i].lopen(5, 0);

            if (heavy[i].x < 400) blokInSpawn = true;

            heavy[i].loopt = !heavy[i].aanraken();
        }

        if (vijandMelee[i].zichtbaar) {
            vijandMelee[i].plaats_melee();
            vijandMelee[i].lopen(-5, 0);

            if (vijandMelee[i].x > 2280) vijandBlokInSpawn = true;

            vijandMelee[i].loopt = !vijandMelee[i].aanraken();
        }

        if (vijandRange[i].zichtbaar) {
            vijandRange[i].plaats_range();
            vijandRange[i].lopen(-5, 0);

            if (vijandRange[i].x > 2280) vijandBlokInSpawn = true;

            vijandRange[i].loopt = !vijandRange[i].aanraken();
        }
        if (vijandHeavy[i].zichtbaar) {
            vijandHeavy[i].plaats_heavy();
            vijandHeavy[i].lopen(-5, 0);

            if (vijandHeavy[i].x > 2280) vijandBlokInSpawn = true;

            vijandHeavy[i].loopt = !vijandHeavy[i].aanraken();
        }
    }

    if (!blokInSpawn && spawnQueue.length) {
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

    if (basis.lose == true) {
        background("black");
        fill("red");
        textSize(100);
        text("Game Over", 1200, 650);
    }
    if (vijandBasis.win == true) {
        background("black");
        fill("green");
        textSize(100);
        text("You Win", 1200, 650);
    }
}

function mousePressed() {
    if (hoeveelQueue < 5) {
        if (
            meleeNummer < melee.length &&
            melee[meleeNummer].plaats_mm() &&
            Geld >= 25
        ) {
            // melee[meleeNummer].wordtZichtbaar = true;
            spawnQueue.unshift(melee[meleeNummer]);
            meleeNummer++;
            Geld -= 25;
            hoeveelQueue++;
        } else if (
            rangeNummer < range.length &&
            range[rangeNummer].plaats_rm() &&
            Geld >= 40
        ) {
            // range[rangeNummer].wordtZichtbaar = true;
            spawnQueue.unshift(range[rangeNummer]);
            rangeNummer++;
            Geld -= 40;
            hoeveelQueue++;
        } else if (
            heavyNummer < heavy.length &&
            heavy[heavyNummer].plaats_hm() &&
            Geld >= 80
        ) {
            // heavy[heavyNummer].wordtZichtbaar = true;
            spawnQueue.unshift(heavy[heavyNummer]);
            heavyNummer++;
            Geld -= 80;
            hoeveelQueue++;
        }
    }
}

function vijandMousePressed() {
    if (vijandHoeveelQueue < 5 && Math.round(Math.random() * 100) <= 30) {
        if (
            vijandMeleeNummer < vijandMelee.length &&
            Math.round(Math.random() * 100) <= 50
        ) {
            vijandMelee[vijandMeleeNummer].wordtZichtbaar = true;
            vijandMeleeNummer++;

            vijandHoeveelQueue++;
        } else if (
            vijandRangeNummer < vijandRange.length &&
            Math.round(Math.random() * 100) <= 50
        ) {
            vijandRange[vijandRangeNummer].wordtZichtbaar = true;
            vijandRangeNummer++;

            vijandHoeveelQueue++;
        } else if (vijandHeavyNummer < vijandHeavy.length) {
            vijandHeavy[vijandHeavyNummer].wordtZichtbaar = true;
            vijandHeavyNummer++;

            vijandHoeveelQueue++;
        }
    }
}
