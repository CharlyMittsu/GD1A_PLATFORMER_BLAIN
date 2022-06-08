class endScreen extends Phaser.Scene{
    constructor(){
        super("endScreen");
    }
    init(data){
        this.volume = data.volume;
        this.maxChrono = data.maxChrono;

        this.choix1 = data.choix1;
        this.choix2 = data.choix2;
        this.pointsJ1=data.pointsJ1;
        
        this.pointsJ2=data.pointsJ2;
        
        
    }

    preload(){
        
        
    }

    create(){

        var B = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        B.on('down', function () {this.skip()}, this);


        //___________________________________ANIMATION DE FIN_____________________________________
        

        
        //obtenir le plus petit
        if(this.pointsJ1 < this.pointsJ2){this.smallest = Math.trunc(this.pointsJ1*0.7)}
        else {this.smallest = Math.trunc(this.pointsJ2*0.7)}

        this.startDecompte = false; //Le decompte ne commence pas tout de suite
        if (this.smallest != 0){
            this.timedEvent = this.time.addEvent({ delay: 3000/this.smallest, callback: this.onEvent, callbackScope: this, loop: true });
        }

        //au bout d'un certain temps le decompte se fait
        setTimeout(function(){
            this.startDecompte = true;
        }.bind(this), 1000);
        
        
        
        this.score1 = 0
        this.score2 = 0

        

        
        
        //________________________________________________________________________________________
        

        this.background=this.add.image(this.sys.canvas.width/2, this.sys.canvas.height/2, 'background').setAlpha(0.3);

        //plateforme invisible____________________________________________
        this.sol = this.physics.add.group({
            allowGravity : false,
            immovable : true,
        })
        this.sol.create(this.sys.canvas.width/2,this.sys.canvas.height/2+70,"invisible").setOrigin(0.5).setSize(1280,50);

        //placement des joueurs___________________________________________
        //J1
        if(this.choix1==1){this.joueur1 = new Perso(this,this.sys.canvas.width/2-200,this.sys.canvas.height/2-20)}
        if(this.choix1==2){this.joueur1 = new Roger(this,this.sys.canvas.width/2-200,this.sys.canvas.height/2-20)}
        if(this.choix1==3){this.joueur1 = new Kiwi(this,this.sys.canvas.width/2-200,this.sys.canvas.height/2-20)}

        //J2
        if(this.choix2==1){this.joueur2 = new Perso(this,this.sys.canvas.width/2+200,this.sys.canvas.height/2-20)}
        if(this.choix2==2){this.joueur2 = new Roger(this,this.sys.canvas.width/2+200,this.sys.canvas.height/2-20)}
        if(this.choix2==3){this.joueur2 = new Kiwi(this,this.sys.canvas.width/2+200,this.sys.canvas.height/2-20)}
        
        //collider
        this.physics.add.collider(this.joueur1,this.sol);
        this.physics.add.collider(this.joueur2,this.sol);

        //Confettis
        

        this.particlesB = this.add.particles('confetBleu');

            this.particlesB.createEmitter({
                
                alpha: { min: 0.5, max: 1 },
                scale: 0.3,
                
                speed: { min: 100, max: 400 },
                gravityY: 200,
                angle: { min: 160, max: 20 },
                rotate: { min: -180, max: 180 },
                lifespan: 2500,
                
                frequency: 1,
                quantity: 4,
                
                x: this.sys.canvas.width/2,
                y: -300
            });
            this.particlesB.setVisible(false)

        this.particlesR = this.add.particles('confetRouge');

            this.particlesR.createEmitter({
                
                alpha: { min: 0.5, max: 1 },
                scale: 0.3,
                
                speed: { min: 100, max: 400 },
                
                gravityY: 200,
                angle: { min: 160, max: 20 },
                rotate: { min: -180, max: 180 },
                lifespan: 2500,
                
                frequency: 1,
                quantity: 4,
                
                x: this.sys.canvas.width/2,
                y: -300
            });
            this.particlesR.setVisible(false)
        
        
        
        
        
        

        //texte score
        this.display1=this.add.text(this.sys.canvas.width/2-70,this.sys.canvas.height/2,this.score1,{ fontSize: '128px', fontFamily: 'MS UI Gothic', fill: "#0bf" }).setOrigin(0.5).setStroke('#fff', 5);
        
        this.display2=this.add.text(this.sys.canvas.width/2+70,this.sys.canvas.height/2,this.score2,{ fontSize: '128px', fontFamily: 'MS UI Gothic', fill: "#f55" }).setOrigin(0.5).setStroke('#fff', 5);
        
        //texte victoire
        this.textWin =this.add.text(this.sys.canvas.width/2, this.sys.canvas.height/2-120," ",{ fontSize: '40px', fontFamily: 'MS UI Gothic' }).setOrigin(0.5).setStroke('#fff', 4).setVisible(false);
        
        this.tweens.add({

            targets: this.textWin,
            scaleX: 0.95,
            scaleY: 0.95,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
    
        });

        this.back=this.add.text(this.sys.canvas.width/2, this.sys.canvas.height/2+150,"   B ► ",{ fontSize: '32px', fontFamily: 'MS UI Gothic' }).setOrigin(0.5).setAlpha(0.8).setVisible(false);
        this.tweens.add({

            targets: this.back,
            alpha :0.3,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
    
        });
        this.back.setShadow(4, 2.5, "#111111", 3, true, true);
        
        //this.display.setShadow(2, 2, "#333333", 2, true, true);
        this.cameras.main.zoom=2;
        
        this.rectHaut = this.add.rectangle(this.sys.canvas.width/2, this.sys.canvas.height/2-180, 1280, 130, 0x000000).setAlpha(1);
        this.rectBas = this.add.rectangle(this.sys.canvas.width/2, this.sys.canvas.height/2+180, 1280, 130, 0x000000).setAlpha(1);

        this.endCalled = true
        this.cinematic = true;
    }

    update(time,delta){
        var pointer = this.input.activePointer;//définir la souris comme l'objet pointer

        //update l'affichage du score
        this.display1.setText(this.score1);
        if(this.score1>9&&this.endCalled)this.display1.setScale(0.8);
        this.display2.setText(this.score2);
        if(this.score2>9&&this.endCalled)this.display2.setScale(0.8);
        

        if(this.startDecompte &&this.score1 >= this.smallest&&this.endCalled){
            this.endCalled = false
            setTimeout(function(){
                this.reveal()
            }.bind(this), 1500);
        }

        //update joueurs
        this.joueur1.update(this,time,delta)
        
        this.joueur2.update(this,time,delta)
        
        
        

        
    }

    //__________________
    //_____FUNCTION_____
    //__________________

    onEvent(){
        if (this.startDecompte && this.score1 <this.smallest){
            this.score1 +=1
            this.score2 +=1
        }
    }
    reveal(){
        this.score1 = this.pointsJ1
        this.score2 = this.pointsJ2
        
        this.rectBas.setVisible(false)
        this.rectHaut.setVisible(false)
        this.background.setAlpha(0.7)

        if(this.pointsJ1>this.pointsJ2){//si le J1 (bleu) à gagner
            this.particlesB.setVisible(true)
            this.display1.setScale(1.1);
            this.display2.setScale(0.6);
            this.textWin.setText("Le joueur 1 remporte la partie !").setFill("#0bf")
            
        }else if(this.pointsJ1<this.pointsJ2){//si le J2 (rouge) à gagner
            this.particlesR.setVisible(true)
            this.display1.setScale(0.6);
            this.display2.setScale(1.1);
            this.textWin.setText("Le joueur 2 remporte la partie !").setFill("#f55")

        }else if(this.pointsJ1 == this.pointsJ2){//si égalité
            this.textWin.setText("Egalité !").setFill("#999")
        }
        setTimeout(function(){
            this.textWin.setVisible(true)
        }.bind(this), 1000);
        setTimeout(function(){
            this.cinematic=false
            this.back.setVisible(true)
            
        }.bind(this), 3000);
    }
    
    skip (){
        
        if(this.cinematic==true){
            if (this.score1<this.smallest){
                this.score1 = this.smallest
                this.score2 = this.smallest
            }
            
        }
        if(this.cinematic==false){
            
            this.scene.start('selectingScreen',{
                volume:this.volume,
                maxChrono:this.maxChrono,
            });
        }
        
        
    }

};