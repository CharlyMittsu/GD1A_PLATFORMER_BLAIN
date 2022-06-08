class boot extends Phaser.Scene{
    constructor(){
        super("bootGame");
    }
    preload(){
        this.add.text(this.sys.canvas.width/1.2, this.sys.canvas.height/1.1,"chargement...");

        //titleScreen

        this.load.image('background', 'assets/titleScreenBackground.png');
        
        
        this.load.image('title', 'assets/title.png');
        this.load.spritesheet('boutonJouer', 'assets/boutonJouer.png',
        { frameWidth: 340, frameHeight: 100 });
        this.load.spritesheet('boutonCredits', 'assets/boutonCredits.png',
        { frameWidth: 340, frameHeight: 100 });
        this.load.spritesheet('buttonSettings', 'assets/boutonSettings.png',
        { frameWidth: 100, frameHeight: 100 });
        //this.load.audio('lagtrain','audio/lagtrain.mp3');

        //settings
        this.load.image('background2', 'assets/settingsScreenHD.png');
        
        this.load.spritesheet('buttonBack', 'assets/boutonRetour.png',
        { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('buttonFullscreen', 'assets/fullscreenSwitch.png', { frameWidth: 384, frameHeight: 64 });
        this.load.image('bar', 'assets/bar.png');
        this.load.image('barBlanc', 'assets/barBlanc.png');
        this.load.image('cursorBar', 'assets/cursorBar.png');

        

        
        //Selecting screen
        this.load.image('selectingScreen', 'assets/selectingScreen.png');
        this.load.image('cursorJ1', 'assets/cursorJ1.png');
        this.load.image('cursorJ2', 'assets/cursorJ2.png');
        this.load.spritesheet('iconPerso', 'assets/iconPerso.png', { frameWidth: 118, frameHeight: 78 });
        this.load.spritesheet('fichePerso', 'assets/fichePerso.png', { frameWidth: 391, frameHeight: 720 });
        this.load.image('pret', 'assets/fichePersoPret.png');


        
        //_____Personnages && credits_________
        //____________________________________
        this.load.spritesheet('perso', 'assets/perso.png', { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('roger', 'assets/roger.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('kiwi', 'assets/kiwi.png', { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('plane', 'assets/plane.png', { frameWidth: 128, frameHeight: 128 });
    }

    create(){

        //___________________
        //____ANIMATION_____
        //___________________
        
        //#1 ___________________________________________________________________________________________________
        this.anims.create({
            key: 'leftPhaser',
            frames: this.anims.generateFrameNumbers('perso', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turnPhaser',
            frames: [ { key: 'perso', frame: 4 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'rightPhaser',
            frames: this.anims.generateFrameNumbers('perso', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        //#2 ___________________________________________________________________________________________________
        this.anims.create({
            key: 'leftRoger',
            frames: this.anims.generateFrameNumbers('roger', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turnRoger',
            frames: [ { key: 'roger', frame: 4 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'rightRoger',
            frames: this.anims.generateFrameNumbers('roger', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        //#3 ___________________________________________________________________________________________________
        this.anims.create({
            key: 'leftKiwi',
            frames: this.anims.generateFrameNumbers('kiwi', {start:0,end:7}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'turnKiwi',
            frames: this.anims.generateFrameNumbers('kiwi', {start:8,end:14}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'rightKiwi',
            frames: this.anims.generateFrameNumbers('kiwi', {start:15,end:22}),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'leftPlane',
            frames: this.anims.generateFrameNumbers('plane', { start: 10, end: 13 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'turnPlane',
            frames: this.anims.generateFrameNumbers('plane', { start: 4, end: 9 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'rightPlane',
            frames: this.anims.generateFrameNumbers('plane', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        });

        //# ___________________________________________________________________________________________________

        this.volume=1;//volume musique à 100%
        this.maxChrono=240;//chrono mit à 4min de base
        this.scene.start("titleScreen",{volume:this.volume,maxChrono: this.maxChrono,});
        
    }
}