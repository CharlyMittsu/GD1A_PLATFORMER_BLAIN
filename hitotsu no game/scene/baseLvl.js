class baseLvl extends Phaser.Scene{
    constructor(){
        super("baseLvl");
    }
    init(data){
        this.volume = data.volume;
        
        this.maxChrono = data.maxChrono;
        this.choix1 = data.choix1;
        this.choix2 = data.choix2;
        
    }
    preload(){
        

        
    }

    create(){
        this.chrono = this.maxChrono;

        this.areaKill = this.physics.add.group({
            allowGravity : false,
            immovable : true,
        })
        this.pointsJ1 = 0;
        this.pointsJ2 = 0;

        //COMANDES
        var B = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        B.on('down', function () {this.startSelecting()}, this);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        

        this.key0 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO);
        
          
        //____________________________
        //____création de la carte____
        //____________________________
        
        const carteDuNiveau = this.make.tilemap({key:"niveauEssai"});
        const tileset = carteDuNiveau.addTilesetImage(
            "tuiles_de_jeu",
            "tuileDeJeu"
            );  
        const backgroundLayer = carteDuNiveau.createLayer(
            "background",
            tileset
            );
        const terrainLayer = carteDuNiveau.createLayer(
            "terrain",
            tileset
            );
        const bounceLayer = carteDuNiveau.createLayer(
            "bounce",
            tileset
            );
        const decorLayer = carteDuNiveau.createLayer(
            "decor",
            tileset
            );

        //un des claques a des tuiles solide
        terrainLayer.setCollisionByProperty({ estSolide: true }); 
        bounceLayer.setCollisionByProperty({ estSolide: true }); 
        
        //obtenir les coordonnées de la position de la camera
        this.cameras.main.zoom=0.5;
        this.physics.world.setBounds(0, 0, 3200, 3200);
        this.cameras.main.setBounds(0, 0, 3200, 3200);
        carteDuNiveau.getObjectLayer('camera').objects.forEach((camera)=>{
            //positioner les check par rapport à la cam
            this.cameraX=camera.x
            this.cameraY=camera.y
            
            this.cameras.main.startFollow(camera);
        });
        //creer les zones de mort
        carteDuNiveau.getObjectLayer('death').objects.forEach((spawn)=>{
            this.kill = this.areaKill.create(spawn.x+spawn.width/2,spawn.y+spawn.height/2,"invisible").setOrigin(0);
            this.kill.setSize(spawn.width,spawn.height,true);
        });
        
        
        

        //________________________________________________
        //___________Remplissage du panneaux______________
        //________________________________________________
        this.checkJ1 = this.add.image(this.cameraX-100, this.cameraY-290, 'checkIcon').setOrigin(0.5).setFrame(1).setScale(0.75);
        this.checkJ2 = this.add.image(this.cameraX+100, this.cameraY-290, 'checkIcon').setOrigin(0.5).setFrame(2).setScale(0.75);

        this.bigChrono = this.add.text(this.cameraX, this.cameraY-290,"0",{ fontSize: '128px', fontFamily: 'MS UI Gothic', fill: "#000" }).setOrigin(0.5).setAlpha(0.8);
        this.bigChrono.setStroke('#fff', 16);
        this.bigChrono.setShadow(2, 2, "#333333", 2, true, true).setVisible(false);
        //_____________________________________
        //________création des joueur__________
        //_____________________________________

        console.log(this.choix1,"",this.choix2)

        //J1_________________
        carteDuNiveau.getObjectLayer('spawnJ1').objects.forEach((spawn)=>{
            this.spawnX = spawn.x
            this.spawnY = spawn.y
        });
        let particles1 = this.add.particles('particleBlue');

        this.emitter1 = particles1.createEmitter({
            x: this.spawnX,
            y: this.spawnY,
            scale: { start: 1.2, end: 0 },
            alpha: { start: .5, end: 0 },
            
            //blendMode: 'SCREEN',
            quantity: 1,
            frequency: 0.1,
            speed: { min: 0, max: 50 },
            angle: { min: 0, max: 360 },
            gravityY: -50,
            
            
            lifespan: 1350,
            
        });
        if(this.choix1==1){this.joueur1 = new Perso(this,this.spawnX,this.spawnY)}
        if(this.choix1==2){this.joueur1 = new Roger(this,this.spawnX,this.spawnY)}
        if(this.choix1==3){this.joueur1 = new Kiwi(this,this.spawnX,this.spawnY)}
        
        //beacon
        carteDuNiveau.getObjectLayer('beaconJ1').objects.forEach((beacon)=>{
            this.joueur1.beaconX = beacon.x
            this.joueur1.beaconY = beacon.y
            this.joueur1.beaconWidth = beacon.width
            this.joueur1.beaconHeight = beacon.height
        });
        
        

        //J2_________________
        carteDuNiveau.getObjectLayer('spawnJ2').objects.forEach((spawn)=>{
            this.spawnX = spawn.x
            this.spawnY = spawn.y
        });
        let particles2 = this.add.particles('particleRed');

        this.emitter2 = particles2.createEmitter({
            x: this.spawnX,
            y: this.spawnY,
            scale: { start: 1.2, end: 0 },
            alpha: { start: .5, end: 0 },
            
            //blendMode: 'SCREEN',
            quantity: 1,
            frequency: 0.1,
            speed: { min: 0, max: 50 },
            angle: { min: 0, max: 360 },
            gravityY: -50,
            
            
            lifespan: 1350,
            
        });
        if(this.choix2==1){this.joueur2 = new Perso(this,this.spawnX,this.spawnY)}
        if(this.choix2==2){this.joueur2 = new Roger(this,this.spawnX,this.spawnY)}
        if(this.choix2==3){this.joueur2 = new Kiwi(this,this.spawnX,this.spawnY)}
        
        //beacon
        carteDuNiveau.getObjectLayer('beaconJ2').objects.forEach((beacon)=>{
            this.joueur2.beaconX = beacon.x
            this.joueur2.beaconY = beacon.y
            this.joueur2.beaconWidth = beacon.width
            this.joueur2.beaconHeight = beacon.height
        });
        
        //ui __________________________________
        //_____________________________________
        //x:45 y : 36
        var back=this.add.text(this.cameraX-1190, this.cameraY-648,"◄ B ",{ fontSize: '64px', fontFamily: 'MS UI Gothic' }).setOrigin(0.5).setAlpha(0.8);
        this.tweens.add({

            targets: back,
            alpha :0.3,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
    
        });
        back.setShadow(6, 2.5, "#111111", 4, true, true);

        var rectangle2 = this.add.rectangle(this.cameraX, this.cameraY+653, 2560, 130, 0x000000).setAlpha(0.5);
        var consigne=this.add.text(this.cameraX, this.cameraY+653,"Entrez dans le faisceau lumineux pour commencer la partie !",{ fontSize: '72px', fontFamily: 'MS UI Gothic' }).setOrigin(0.5);
        
        
        this.tweens.add({

            targets: consigne,
            scaleX: 0.95,
            scaleY: 0.95,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
    
        });
        
        this.rectangle3 = this.add.rectangle(this.cameraX, this.cameraY-648, 400, 130, 0x334233).setAlpha(1);
        this.rectangle3.setStrokeStyle(10, 0x000000);
        
        this.minutes=this.add.text(this.cameraX-70, this.cameraY-648,"00 :",{ fontSize: '104px', fontFamily: 'MS UI Gothic',fill:"#0f0" }).setOrigin(0.5).setAlpha(1);
        this.minutes.setStroke('#000', 8);
        this.secondes=this.add.text(this.cameraX+80, this.cameraY-648," 00",{ fontSize: '104px', fontFamily: 'MS UI Gothic',fill:"#0f0" }).setOrigin(0.5).setAlpha(1);
        this.secondes.setStroke('#000', 8);



        //_________________________________
        //_______Collider & overlap________
        //_________________________________
        this.physics.add.collider(this.joueur1,this.areaKill,this.respawn,null,this);
        this.physics.add.collider(this.joueur2,this.areaKill,this.respawn,null,this);

        this.physics.add.collider(this.joueur1,terrainLayer);
        this.physics.add.collider(this.joueur1,bounceLayer,this.bounce,null,this);
        //this.physics.add.collider(this.joueur1,this.joueur2);
        this.physics.add.collider(this.joueur2,terrainLayer);
        this.physics.add.collider(this.joueur2,bounceLayer,this.bounce,null,this);
        
        //_________________________________
        //__________Timer event____________
        //_________________________________
        
        //this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
        
        
    }
    update(time,delta){

        //timer_____________________________
        //__________________________________
        
        if(this.chrono>=600){
            this.minutes.setText(Math.trunc(this.chrono/60)+' :')
        }else{this.minutes.setText('0'+Math.trunc(this.chrono/60)+' :')}
        
        if(this.chrono%60>=10){
            this.secondes.setText(" "+this.chrono%60)
        }else{this.secondes.setText(" 0"+this.chrono%60)}
        
        
        if(this.chrono<60){
            this.minutes.setFill("#f00")
            this.secondes.setFill("#f00")
            this.rectangle3.setFillStyle("0x423333")
        }
        else{
            this.minutes.setFill("#0f0")
            this.secondes.setFill("#0f0")
            this.rectangle3.setFillStyle("0x334233")
        }
        
        //Check de touches________________________________
        //________________________________________________

        //J1
        this.joueur1.leftDown=(this.keyQ.isDown)
        this.joueur1.leftJustDown= Phaser.Input.Keyboard.JustDown(this.keyQ)
        this.joueur1.rightDown=(this.keyD.isDown)
        this.joueur1.rightJustDown= Phaser.Input.Keyboard.JustDown(this.keyD)
        this.joueur1.upDown=(this.keyZ.isDown)
        this.joueur1.upJustDown= Phaser.Input.Keyboard.JustDown(this.keyZ)
        this.joueur1.downDown=(this.keyS.isDown)
        this.joueur1.downJustDown= Phaser.Input.Keyboard.JustDown(this.keyS)

        this.joueur1.powerDown=(this.input.keyboard.checkDown(this.spacebar,200)==true)
        this.joueur1.powerJustDown= Phaser.Input.Keyboard.JustDown(this.spacebar)
        
        
        
        //J2

        this.joueur2.leftDown=this.cursors.left.isDown
        this.joueur2.leftJustDown= Phaser.Input.Keyboard.JustDown(this.cursors.left)
        this.joueur2.rightDown=(this.cursors.right.isDown)
        this.joueur2.rightJustDown= Phaser.Input.Keyboard.JustDown(this.cursors.right)
        this.joueur2.upDown=(this.cursors.up.isDown)
        this.joueur2.upJustDown= Phaser.Input.Keyboard.JustDown(this.cursors.up)
        this.joueur2.downDown=(this.cursors.down.isDown)
        this.joueur2.downJustDown= Phaser.Input.Keyboard.JustDown(this.cursors.down)

        this.joueur2.powerDown=(this.input.keyboard.checkDown(this.key0,200)==true)
        this.joueur2.powerJustDown= Phaser.Input.Keyboard.JustDown(this.key0)

        //update joueurs
        this.joueur1.update(this,time,delta)
        
        this.emitter1.x.propertyValue=this.joueur1.x
        this.emitter1.y.propertyValue=this.joueur1.y
        
        this.joueur2.update(this,time,delta)

        this.emitter2.x.propertyValue=this.joueur2.x
        this.emitter2.y.propertyValue=this.joueur2.y


        //_____________________________
        //_____________________________
        
        //detecter si le joueur1 est dans son beacon
        if (((this.joueur1.x<this.joueur1.beaconX+this.joueur1.beaconWidth && this.joueur1.x>this.joueur1.beaconX)
        &&
        (this.joueur1.y<this.joueur1.beaconY+this.joueur1.beaconHeight && this.joueur1.y>this.joueur1.beaconY))){
            this.checkJ1.setFrame(1)
            this.ready1=true;
        }else{this.checkJ1.setFrame(0);this.ready1=false;}
        //detecter si le joueur2 est dans son beacon
        if (((this.joueur2.x<this.joueur2.beaconX+this.joueur2.beaconWidth && this.joueur2.x>this.joueur2.beaconX)
        &&
        (this.joueur2.y<this.joueur2.beaconY+this.joueur2.beaconHeight && this.joueur2.y>this.joueur2.beaconY))){
            this.checkJ2.setFrame(2)
            this.ready2=true;
        }else{this.checkJ2.setFrame(0);this.ready2=false;}

        
        

        //lancer la partie au bout d'un moment
        if(this.ready1==true&&this.ready2==true){
            let decompteAffichage = 6-Math.trunc((time-this.decompte)/1000)
            if ((6-(time-this.decompte)/1000)<0.1)this.nextLvl()
            this.bigChrono.setText(decompteAffichage)
            if(decompteAffichage<6){
                this.checkJ1.setVisible(false);
                this.checkJ2.setVisible(false);
                this.bigChrono.setVisible(true);
            }
            
        }else{
            
            this.bigChrono.setVisible(false);
            this.decompte=time;
            this.checkJ1.setVisible(true);
            this.checkJ2.setVisible(true);
        }
    }
    onEvent(){
        this.chrono-=1;
    }
    respawn(player){
        player.respawn()
        this.cameras.main.shake(200,0.1)
    }
    bounce(player){
        if(player.body.blocked.down)player.body.setVelocityY(-player.jump*2)
        if(player.body.blocked.up)player.body.setVelocityY(player.jump*2)
        
        
    }
    startSelecting (){
        console.log("press B")
        this.scene.start('selectingScreen',{
            volume:this.volume,
            maxChrono:this.maxChrono,
        });
    }
    nextLvl (){
        let randomiser= 'lvl'+`${(Phaser.Math.Between(5,5))}`
        console.log(randomiser)
        
        this.scene.start(randomiser,{
            volume:this.volume,
            chrono:this.chrono,
            maxChrono: this.maxChrono,
            choix1: this.choix1,
            choix2: this.choix2,
            pointsJ1 :this.pointsJ1,
            pointsJ2 : this.pointsJ2,
            confet: "false",
        });
        
    }
    
}