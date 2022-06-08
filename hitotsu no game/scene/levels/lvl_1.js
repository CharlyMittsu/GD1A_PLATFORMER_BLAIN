class lvl1 extends Phaser.Scene{
    constructor(){
        super("lvl1");
    }
    init(data){
        this.volume = data.volume;
        this.chrono = data.chrono;
        this.maxChrono = data.maxChrono;
        this.choix1 = data.choix1;
        this.choix2 = data.choix2;
        this.pointsJ1=data.pointsJ1;
        this.pointsJ2=data.pointsJ2;
        this.confet = data.confet;
        
    }
    preload(){
        

        
    }

    create(){
        console.log(this.pointsJ1,"",this.pointsJ2)
        

        this.areaKill = this.physics.add.group({
            allowGravity : false,
            immovable : true,
        })
        this.areaWin = this.physics.add.group({
            allowGravity : false,
            immovable : true,
        })
        //this.chrono = 240;

        //COMANDES
        var B = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        B.on('down', function () {this.partyEnd()}, this);

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
        
        const carteDuNiveau = this.make.tilemap({key:"niveau1"});
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
        const decorLayer = carteDuNiveau.createLayer(
            "decor",
            tileset
            );

        //un des claques a des tuiles solide
        terrainLayer.setCollisionByProperty({ estSolide: true }); 
        
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
        carteDuNiveau.getObjectLayer('death').objects.forEach((rect)=>{
            this.kill = this.areaKill.create(rect.x+rect.width/2,rect.y+rect.height/2,"invisible").setOrigin(0);
            this.kill.setSize(rect.width,rect.height,true);
        });
        carteDuNiveau.getObjectLayer('win').objects.forEach((rect)=>{
            this.win = this.areaWin.create(rect.x+rect.width/2,rect.y+rect.height/2,"invisible").setOrigin(0);
            this.win.setSize(rect.width,rect.height,true);
        });
        
        
        

        
        //_____________________________________
        //________création des joueur__________
        //_____________________________________

        

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
       
        
        
        

        var rectangle2 = this.add.rectangle(this.cameraX, this.cameraY+653, 2560, 130, 0x000000).setAlpha(0.5);
        var consigne=this.add.text(this.cameraX, this.cameraY+653,"Atteint l'arrivée !",{ fontSize: '72px', fontFamily: 'MS UI Gothic' }).setOrigin(0.5);
        
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
        //this.physics.add.collider(this.joueur1,this.joueur2);
        this.physics.add.collider(this.joueur2,terrainLayer);

        this.physics.add.overlap(this.joueur1,this.areaWin,this.nextLvl1,null,this);
        this.physics.add.overlap(this.joueur2,this.areaWin,this.nextLvl2,null,this);
        
        //_________________________________
        //__________Timer event____________
        //_________________________________
        
        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });

        //_________________________________
        //___________Confettis_____________
        //_________________________________
        
        if (this.confet == "bleu"){
            
            //confettis bleus

                this.particlesBG = this.add.particles('confetBleu');

                this.particlesBG.createEmitter({
                    alpha: { start: 1, end: 0 },
                    scale: 1,
                    //tint: { start: 0xff945e, end: 0xff945e },
                    speed: { min: 400, max: 3500 },
                    gravityY: 800,
                    angle: { min: -90, max: -20 },
                    rotate: { min: -180, max: 180 },
                    lifespan: 1000,
                    
                    frequency: 1,
                    quantity: 16,
                    maxParticles: 250,
                    x: this.cameraX-1300,
                    y: this.cameraY+800
                });
                this.particlesBD = this.add.particles('confetBleu');

                this.particlesBD.createEmitter({
                    alpha: { start: 1, end: 0 },
                    scale: 1,
                    //tint: { start: 0xff945e, end: 0xff945e },
                    speed: { min: 400, max: 3500 },
                    gravityY: 800,
                    angle: { min: -160, max: -90 },
                    rotate: { min: -180, max: 180 },
                    lifespan: 1000,
                    
                    frequency: 1,
                    quantity: 16,
                    maxParticles: 250,
                    x: this.cameraX+1300,
                    y: this.cameraY+800
                });
        }else if(this.confet == "rouge"){
            //confettis rouges

                this.particlesRG = this.add.particles('confetRouge');

                this.particlesRG.createEmitter({
                    alpha: { start: 1, end: 0 },
                    scale: 1,
                    //tint: { start: 0xff945e, end: 0xff945e },
                    speed: { min: 400, max: 3500 },
                    gravityY: 800,
                    angle: { min: -90, max: -20 },
                    rotate: { min: -180, max: 180 },
                    lifespan: 1000,
                    
                    frequency: 1,
                    quantity: 16,
                    maxParticles: 250,
                    x: this.cameraX-1300,
                    y: this.cameraY+800
                });
                this.particlesRD = this.add.particles('confetRouge');

                this.particlesRD.createEmitter({
                    alpha: { start: 1, end: 0 },
                    scale: 1,
                    //tint: { start: 0xff945e, end: 0xff945e },
                    speed: { min: 400, max: 3500 },
                    gravityY: 800,
                    angle: { min: -160, max: -90 },
                    rotate: { min: -180, max: 180 },
                    lifespan: 1000,
                    
                    frequency: 1,
                    quantity: 16,
                    maxParticles: 250,
                    x: this.cameraX+1300,
                    y: this.cameraY+800
                });
        }
        

        
        
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
        
        
        if (this.chrono<=0){this.partyEnd()}
        
        

        
    }
    respawn(player){
        player.respawn()
        this.cameras.main.shake(200,0.1)
    }
    startSelecting (){
        this.scene.start('selectingScreen',{
            volume:this.volume,
            
            maxChrono: this.maxChrono,
        });
    }
    onEvent(){
        this.chrono-=1;
    }
    nextLvl1 (){
        this.pointsJ1 +=1
        
        let randomiser= 'lvl'+`${(Phaser.Math.Between(1,5))}`
        console.log(randomiser)
        
        this.scene.start(randomiser,{
            volume:this.volume,
            chrono:this.chrono,
            maxChrono: this.maxChrono,
            choix1: this.choix1,
            choix2: this.choix2,
            pointsJ1 :this.pointsJ1,
            pointsJ2 : this.pointsJ2,
            confet:"bleu",
        });
    }

    nextLvl2 (){
        this.pointsJ2 +=1
        
        let randomiser= 'lvl'+`${(Phaser.Math.Between(1,5))}`
        console.log(randomiser)
        
        this.scene.start(randomiser,{
            volume:this.volume,
            chrono:this.chrono,
            maxChrono: this.maxChrono,
            choix1: this.choix1,
            choix2: this.choix2,
            pointsJ1 :this.pointsJ1,
            pointsJ2 : this.pointsJ2,
            confet:"rouge",
        });
    }
    partyEnd(){
        this.scene.start("endScreen",{
            volume:this.volume,
            
            maxChrono: this.maxChrono,
            choix1: this.choix1,
            choix2: this.choix2,
            pointsJ1 :this.pointsJ1,
            pointsJ2 : this.pointsJ2,
            
        });

    }
    
}