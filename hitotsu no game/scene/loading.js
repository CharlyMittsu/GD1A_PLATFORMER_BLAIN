class loading extends Phaser.Scene{
    constructor(){
        super("loading");
    }
    init(data){
        this.volume = data.volume;
        this.maxChrono = data.maxChrono;
        this.choix1 = data.choix1;
        this.choix2 = data.choix2;
        
    }
    preload(){
        this.add.text(this.sys.canvas.width/1.2, this.sys.canvas.height/1.1,"chargement...");

        this.load.image('invisible', 'assets/invisible.png');
        //MAPs______________
        //__________________
        this.load.image('tuileDeJeu', 'assets/tileSetBase.png');
        this.load.tilemapTiledJSON("niveauEssai", "map/mapBase.json");  
        this.load.tilemapTiledJSON("niveau1", "map/mapLvl1.json");  
        this.load.tilemapTiledJSON("niveau2", "map/mapLvl2.json");  
        this.load.tilemapTiledJSON("niveau3", "map/mapLvl3.json");  
        this.load.tilemapTiledJSON("niveau4", "map/mapLvl4.json");  
        this.load.tilemapTiledJSON("niveau5.1", "map/mapLvl5.1.json");  
        this.load.tilemapTiledJSON("niveau5.2", "map/mapLvl5.2.json"); 

        this.load.image('particleBlue', 'assets/particleBlue.png');
        this.load.image('particleRed', 'assets/particleRed.png');
        this.load.image('confetBleu', 'assets/confetBleu.png');
        this.load.image('confetRouge', 'assets/confetRouge.png');
        this.load.spritesheet('checkIcon', 'assets/checkIcon.png', { frameWidth: 200, frameHeight: 200 });
        this.load.spritesheet('bluffBouton', 'assets/bluffBouton.png', { frameWidth: 240, frameHeight: 270 });

        

        
    }

    create(){

        
        
        console.log("loading done")
        this.scene.start("baseLvl",{
            volume:this.volume,
            maxChrono:this.maxChrono,
            choix1: this.choix1,
            choix2: this.choix2,
        });
        
    }
}