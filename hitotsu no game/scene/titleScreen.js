class titleScreen extends Phaser.Scene{
    constructor(){
        super("titleScreen");
    }
    init(data){
        this.volume = data.volume;
        this.maxChrono = data.maxChrono;
        
    }

    preload(){
        
        
    }

    create(){
        
        
        


        this.add.image(this.sys.canvas.width/2, this.sys.canvas.height/2, 'background');
        this.add.image(this.sys.canvas.width/2, this.sys.canvas.height/2.8, 'title').setScale(1.1);

        //BOUTON JOUER
        var boutonJouer = this.add.image(this.sys.canvas.width*0.5, this.sys.canvas.height*0.7, 'boutonJouer').setOrigin(0.5).setInteractive();
        
        boutonJouer.on('pointerup', function () {
            this.startSelecting()
            

        }, this);
        boutonJouer.on('pointerover', function () {
            
            boutonJouer.setFrame(1);
            
        }, this);
        boutonJouer.on('pointerout', function () {
            
            boutonJouer.setFrame(0);
            
        }, this);

        //BOUTON CREDITS
        var buttonCredits = this.add.image(this.sys.canvas.width*0.5, this.sys.canvas.height*0.83, 'boutonCredits').setOrigin(0.5).setInteractive();

        buttonCredits.on('pointerover', function () {
            
            buttonCredits.setFrame(1);
            
        }, this);
        buttonCredits.on('pointerout', function () {
            
            buttonCredits.setFrame(0);
            
        }, this);
        buttonCredits.on('pointerup', function () {
            this.startCredits()
            
        }, this);
        //BOUTON SETTINGS
        var buttonSettings = this.add.image(this.sys.canvas.width*0.9, this.sys.canvas.height*0.9, 'buttonSettings').setOrigin(0.5).setInteractive();

        buttonSettings.on('pointerover', function () {
            
            buttonSettings.setFrame(1);
            
        }, this);
        buttonSettings.on('pointerout', function () {
            
            buttonSettings.setFrame(0);
            
        }, this);
        buttonSettings.on('pointerup', function () {
            this.toSettings()
            

        }, this);
        

        
        //__________________
        //____ANIMATION_____
        //__________________

        /*
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('perso', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        */

        
        

        
    }

    update(){
        var pointer = this.input.activePointer;//définir la souris comme l'objet pointer
        
        //console.log(pointer.y)
        

        
    }

    //__________________
    //_____FUNCTION_____
    //__________________

    toSettings (){
        this.scene.start('settings',{volume:this.volume,maxChrono: this.maxChrono});
    }
    startCredits (){
        this.scene.start('credits',{volume:this.volume,maxChrono: this.maxChrono});
    }
    startSelecting (){
        this.scene.start('selectingScreen',{volume:this.volume,maxChrono: this.maxChrono});
    }

};