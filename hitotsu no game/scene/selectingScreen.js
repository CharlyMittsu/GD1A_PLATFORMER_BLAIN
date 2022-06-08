class selectingScreen extends Phaser.Scene{
    constructor(){
        super("selectingScreen");
    }

    init(data){
        this.volume = data.volume;
        this.maxChrono = data.maxChrono;
    }

    preload(){
        
        
        
        
        
    }

    create(){

        

        this.playerCursor = this.physics.add.group({allowGravity : false})//les object physique non affécté par la gravité
        this.icon = this.physics.add.group({allowGravity : false})

        this.lastClicked = 0

        //COMANDES
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.key0 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO);

        //AFFICHAGE
        this.add.image(this.sys.canvas.width/2, this.sys.canvas.height/2, 'background');
        //entre le fond de l'ecran et la couche noir transparante
        this.add.image(this.sys.canvas.width/2, this.sys.canvas.height/2, 'selectingScreen');
        this.textPret=this.add.text(this.sys.canvas.width/2, this.sys.canvas.height/1.4,"La partie va bientot commencer...",{ fontSize: '32px', fontFamily: 'MS UI Gothic' }).setOrigin(0.5).setDepth(2).setAlpha(0);
        
        var B = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        B.on('down', function () {this.backToTitle()}, this);
        //musique   
            /*
            this.musicLagtrain = this.sound.add('lagtrain');

            var musicConfig = {
                mute:false,
                volume:this.volume,
                rate:1,
                detune:0,
                seek: 0,
                loop: false,
                delay: 0,
            }
            
            this.musicLagtrain.play(musicConfig);
        */
        //curseur
        this.cursor1 = this.playerCursor.create(this.sys.canvas.width/2.8, this.sys.canvas.height/1.5, 'cursorJ1').setOrigin(0).setSize(1 ,1).setOffset(29,0).setCollideWorldBounds(true).setDepth(1);
        this.cursor1.boundCheck
        this.cursor1.lock = false;
        this.cursor1.choice = 0
        
        this.cursor2 = this.playerCursor.create(this.sys.canvas.width/1.65, this.sys.canvas.height/1.5, 'cursorJ2').setOrigin(0).setSize(1 ,1).setOffset(29,0).setCollideWorldBounds(true).setDepth(1);
        this.cursor2.boundCheck
        this.cursor2.lock = false;
        this.cursor2.choice = 0
        
        this.cursorSpeed = 310
        
        //icon de perso
        this.icon1 = this.icon.create(401, 47, 'iconPerso').setOrigin(0).setFrame(1);
        this.icon1.perso = 1;
        this.icon2 = this.icon.create(521, 47, 'iconPerso').setOrigin(0).setFrame(2);
        this.icon2.perso = 2;
        this.icon3 = this.icon.create(641, 47, 'iconPerso').setOrigin(0).setFrame(3);
        this.icon3.perso = 3;


        //fiche de perso
        this.ficheJ1 = this.add.image(0, 0, 'fichePerso').setOrigin(0).setFrame(0);
        this.pretJ1 = this.add.image(0, 0, 'pret').setOrigin(0).setAlpha(0);
        this.ficheJ2 = this.add.image(890, 0, 'fichePerso').setOrigin(0).setFrame(0);
        this.pretJ2 = this.add.image(890, 0, 'pret').setOrigin(0).setAlpha(0);


        //ui____________
        var back=this.add.text(this.sys.canvas.width/2, this.sys.canvas.height-50,"◄ B ",{ fontSize: '32px', fontFamily: 'MS UI Gothic' }).setOrigin(0.5).setAlpha(0.8);
        this.tweens.add({

            targets: back,
            alpha :0.3,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
    
        });
        back.setShadow(6, 2.5, "#111111", 4, true, true);

        //__________________
        //____COLISION_____
        //__________________

        this.physics.add.overlap(this.playerCursor, this.icon,this.getChoice,null,this);

        
        
    }

    update(time,delta){
        

        //if(this.musicLagtrain.isPlaying){console.log(this.musicLagtrain.seek)}//le seek : obtenir le moment où on est dans la musique (en sec)


        //__________________
        //_____AFICHAGE_____
        //__________________
        this.ficheJ1.setFrame(this.cursor1.choice)
        if(this.cursor1.choice!=0&&this.cursor1.lock==false) {
            if(!this.checkOverlap(this.cursor1))this.cursor1.choice=0
        }
        if(this.cursor1.lock==true){this.pretJ1.setAlpha(1)}else{this.pretJ1.setAlpha(0)}
            
        this.ficheJ2.setFrame(this.cursor2.choice)
        if(this.cursor2.choice!=0&&this.cursor2.lock==false) {
            if(!this.checkOverlap(this.cursor2))this.cursor2.choice=0
        }
        if(this.cursor2.lock==true){this.pretJ2.setAlpha(1)}else{this.pretJ2.setAlpha(0)}



        //__________________
        //____MOUVEMENT_____
        //__________________
            //Cursor joueur 1
        if (this.keyQ.isDown)//si la touche gauche est appuyée
        {
            if (this.cursor1.body.velocity.y!=0){
                this.cursor1.setVelocityX(-this.cursorSpeed/1.5);
            }else{this.cursor1.setVelocityX(-this.cursorSpeed);}
            
            
        }else if (this.keyD.isDown)//sinon si la touche droite est appuyée
        {
            if (this.cursor1.body.velocity.y!=0){
                this.cursor1.setVelocityX(this.cursorSpeed/1.5);
            }else{this.cursor1.setVelocityX(this.cursorSpeed);}
            
            
        }else{this.cursor1.setVelocityX(0);}
        
        if (this.keyZ.isDown){//si touche haut appuyée 
            if (this.cursor1.body.velocity.x!=0){
                this.cursor1.setVelocityY(-this.cursorSpeed/1.5);
            }else{this.cursor1.setVelocityY(-this.cursorSpeed);}
            
        }else if(this.keyS.isDown){//sinon si la touche bas est appuyée
            if (this.cursor1.body.velocity.x!=0){
                this.cursor1.setVelocityY(this.cursorSpeed/1.5);
            }else{this.cursor1.setVelocityY(this.cursorSpeed);}
        }else{this.cursor1.setVelocityY(0);}

        if (Phaser.Input.Keyboard.JustDown(this.spacebar) ){
            this.lastClicked = time
            if(this.cursor1.choice!=0){
                
                     if(this.cursor1.lock==false) {this.cursor1.lock = true} else {this.cursor1.lock=false}
                

                
                
            }

            
        };

            //Cursor joueur 2
            
        if (this.cursors.left.isDown)//si la touche gauche est appuyée
        {
            if (this.cursor2.body.velocity.y!=0){
                this.cursor2.setVelocityX(-this.cursorSpeed/1.5);
            }else{this.cursor2.setVelocityX(-this.cursorSpeed);}
            
            
        }else if (this.cursors.right.isDown)//sinon si la touche droite est appuyée
        {
            if (this.cursor2.body.velocity.y!=0){
                this.cursor2.setVelocityX(this.cursorSpeed/1.5);
            }else{this.cursor2.setVelocityX(this.cursorSpeed);}
            
            
        }else{this.cursor2.setVelocityX(0);}
        
        if (this.cursors.up.isDown){//si touche haut appuyée 
            if (this.cursor2.body.velocity.x!=0){
                this.cursor2.setVelocityY(-this.cursorSpeed/1.5);
            }else{this.cursor2.setVelocityY(-this.cursorSpeed);}
            
        }else if(this.cursors.down.isDown){//sinon si la touche bas est appuyée
            if (this.cursor2.body.velocity.x!=0){
                this.cursor2.setVelocityY(this.cursorSpeed/1.5);
            }else{this.cursor2.setVelocityY(this.cursorSpeed);}
        }else{this.cursor2.setVelocityY(0);}
        if (Phaser.Input.Keyboard.JustDown(this.key0) ){
            this.lastClicked = time
            if(this.cursor2.choice!=0){
                
                    if(this.cursor2.lock==false) {this.cursor2.lock = true} else {this.cursor2.lock=false}
                
                 
                
            }
            
        };
        
        //console.log(this.cursor1.lock," ",this.cursor2.lock,'',this.lastClicked,'',this.time.now)
        if(this.cursor1.lock==true&&this.cursor2.lock==true){this.textPret.setAlpha(1)}else{this.textPret.setAlpha(0)}
        if(this.cursor1.lock==true&&this.cursor2.lock==true&&this.time.now>this.lastClicked+2500){//le jeu se lance au bout d'un certain temps après que les joueur 
            
            this.startLoading();
        }
    }

    //__________________
    //_____FUNCTION_____
    //__________________

    backToTitle (){
        //this.musicLagtrain.stop()
        this.scene.start('titleScreen',{
            volume:this.volume,
            maxChrono:this.maxChrono,
        });
        
    }
    getChoice(curseur,icon){
        if(curseur.lock==false){
            curseur.choice=icon.perso
            curseur.boundCheck=icon.getBounds(); 
        }
        
    }
     checkOverlap(spriteA) {

        var boundsA = spriteA.getBounds();
        
        var boundsB = spriteA.boundCheck
        
    
        return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
    
    }
    startLoading (){
        this.scene.start('loading',{
            volume:this.volume,
            maxChrono:this.maxChrono,
            choix1: this.cursor1.choice,
            choix2: this.cursor2.choice,
        });
    }

    

};