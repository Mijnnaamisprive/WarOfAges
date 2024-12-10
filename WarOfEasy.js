Skip to content
Navigation Menu
Mijnnaamisprive
WarOfAges

Type / to search
Code
Issues
Pull requests
Actions
Projects
Security
Insights
Settings
Creating a new file in WarOfAges
BreadcrumbsWarOfAges
/
WarOfEasy.js
in
main

Edit

Preview
Indent mode

Spaces
Indent size

2
Line wrap mode

No wrap
Editing WarOfEasy.js file contents
465
466
467
468
469
470
471
472
473
474
475
476
477
478
479
480
481
482
483
484
485
486
487
488
489
490
491
492
493
494
495
496
497
498
499
500
501
502
503
504
505
506
507
508
509
510
511
512
513
514
515
516
517
518
519
520
521
522
523
524
525
526
527
528
529
530
531
532
533
534
535
536
537
538
539
540
541
542
543
544
545
546
547
548
549
550
551
552
553
554
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
      Geld += 90;
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
Use Control + Shift + m to toggle the tab key moving focus. Alternatively, use esc then tab to move to the next interactive element on the page.
New File at / · Mijnnaamisprive/WarOfAges
