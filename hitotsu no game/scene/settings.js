class settings extends Phaser.Scene{//parametres
    constructor(){
        super("settings");
    }

    init(data){
        this.volume = data.volume;
        this.maxChrono = data.maxChrono;
    }

    preload(){
        
        
    }

    create(){
        console.log(this.volume)

        //variables
        
        this.clickOnVolume=false;
        
        //background
        this.add.image(this.sys.canvas.width/2, this.sys.canvas.height/2, 'background2');
        
        //bouton Plein ecran
        this.buttonFullscreen = this.add.image(this.sys.canvas.width*0.02, this.sys.canvas.height*0.28, 'buttonFullscreen').setOrigin(0,0.5).setInteractive();

        this.buttonFullscreen.on('pointerup', function () {
            if (this.scale.isFullscreen)
            {this.scale.stopFullscreen();}
            else
            {this.scale.startFullscreen();}    

        }, this);

        //barre de volume
        this.add.image(45, this.sys.canvas.height*0.7, 'bar').setOrigin(0,0.5)
        this.volumeBar = this.add.image(45, this.sys.canvas.height*0.7, 'barBlanc').setOrigin(0,0.5).setInteractive();
        //mask de barre de volume
        this.barMask = this.make.graphics();
        this.volumeBar.mask = new Phaser.Display.Masks.GeometryMask(this, this.barMask);

        this.volumeBar.on('pointerdown', function () {
            this.clickOnVolume=true 

        }, this);

        
        this.volumeCursor = this.add.image(this.volumeBar.x+(this.volumeBar.width)*this.volume, this.volumeBar.y, 'cursorBar').setOrigin(0.5,0.5).setInteractive();
        this.volumeCursor.on('pointerdown', function () {
            this.clickOnVolume=true 

        }, this);
        //pourcentage volume%
        this.volumeText = this.add.text(this.volumeBar.x+this.volumeBar.width+30,this.volumeBar.y,'100 %',{ fontSize: '32px', fontFamily: 'MS UI Gothic' }).setOrigin(0,0.5);
        
        //bouton back
        var buttonBack = this.add.image(this.sys.canvas.width*0.9, this.sys.canvas.height*0.9, 'buttonBack').setOrigin(0.5).setInteractive();
        
        buttonBack.on('pointerover', function () {
            
            buttonBack.setFrame(1);
            
        }, this);
        buttonBack.on('pointerout', function () {
            
            buttonBack.setFrame(0);
            
        }, this);
        
        buttonBack.on('pointerup', function () {this.backToTitle()}, this);
        
        var B = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        B.on('down', function () {this.backToTitle()}, this);
            
            

        
        
        

        
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
        

        if (this.scale.isFullscreen){this.buttonFullscreen.setFrame(1);}else{this.buttonFullscreen.setFrame(0);}   
        if(!pointer.isDown){//si on relache le click on ne controle plus les curseur etc
            this.clickOnVolume=false;
        }
        
        if(this.clickOnVolume){//si on click sur la barre de volume
            //on controle avec la souris le curseur du volume (seulement horizontalement et il ne dépasse pas les limite de sa barre)
            if(pointer.x>this.volumeBar.x){
                if(pointer.x<this.volumeBar.x+this.volumeBar.width){
                   this.volumeCursor.x=pointer.x 
                }else{this.volumeCursor.x=this.volumeBar.x+this.volumeBar.width}
            }else{this.volumeCursor.x=this.volumeBar.x}   
        }
        this.percentage=Math.trunc(((this.volumeCursor.x-this.volumeBar.x)/(this.volumeBar.width))*100)//set le pourcentage en fonction de la position du curseur sur la barre et arrondir le tout
        this.volumeText.setText(this.percentage+' %');//afficher le pourcentage

        this.volume=this.percentage/100//set le volume en fonction du pourcentage
        

        this.barMask.clear();//réinitialisation du calque en permanence :
        this.barMask.fillRect(
            this.volumeBar.x,//le point d'origine du calque (en haut de la barre)
            this.volumeBar.y-this.volumeBar.height/2,//(en haut à gauche)
            this.volumeCursor.x-this.volumeBar.x,//la longueur du claque(la distance entre le curseur et la gauche de la barre)
            this.volumeBar.height,//la largeur du calque(largeur de la barre)
        );
        
        
        
        
            

    }          
            
        
    //__________________
    //_____FUNCTION_____
    //__________________

    backToTitle (){
        this.scene.start('titleScreen',{
            volume:this.volume,
            maxChrono:this.maxChrono,
        });
    }

    

};