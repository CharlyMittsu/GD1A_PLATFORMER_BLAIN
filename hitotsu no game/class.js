//______________________________________________
//___________PERSONNAGE #1 : PHASER ____________
//______________________________________________


class Perso extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y){


        var sprite = "perso"

        


        //constructor
        super(scene,x,y,sprite);
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        
        this.body.setCollideWorldBounds(true);

        this.spawnX = x
        this.spawnY = y
        this.setOrigin(0.5)

        //stats
        
        this.speed = 500
        this.jump = 760
        this.fastFall=900
        //propriété

        this.body.setBounce(0.4);
        this.body.setSize(32,40);
        this.body.setOffset(0,8);
        this.body.setGravity(0,-200);
        this.body.setMaxSpeed(this.fastFall)

        this.setScale(1.8);
        
        
        
        
    }
    update(scene,time,delta){
            
        
            if (this.leftDown){//si la touche gauche est appuyée
            this.body.setVelocityX(-this.speed);//alors vitesse négative en X
            this.play('leftPhaser', true);//et animation => gauche
            
        }
        else if (this.rightDown){//si la touche droite est appuyée
            this.body.setVelocityX(this.speed);//alors vitesse positive en X
            this.play('rightPhaser', true);//et animation => gauche
            
        }
        else{ // sinon
            this.body.setVelocityX(0); //vitesse nulle
            this.play('turnPhaser',true);//animation fait face caméra
        }
        

        if (this.upDown && this.body.blocked.down){
            //si touche haut appuyée ET que le perso touche le sol
            this.body.setVelocityY(-this.jump);//alors vitesse verticale négative
            //(on saute)
        }
        
        if (this.downDown ){
            this.body.setBounce(0);
        }else{this.body.setBounce(0.4);}
        if (this.downJustDown && !this.body.blocked.down && this.body.velocity.y>(-this.jump*0.5)){
            
            this.body.setVelocityY(this.fastFall);
            
        }
        
        if (this.powerDown) {
            console.log("pouvoir")
        }
        
        
    }this;

    respawn(){
        this.body.setVelocityX(0);
        this.body.setVelocityY(0);
        this.x=this.spawnX
        this.y=this.spawnY
    }this;
        
}


//______________________________________________
//___________PERSONNAGE #2 : ROGER _____________
//______________________________________________


class Roger extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y){


        var sprite = "roger"

        

        //constructor
        super(scene,x,y,sprite);
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        
        this.body.setCollideWorldBounds(true);

        this.spawnX = x
        this.spawnY = y
        this.setOrigin(0.5)

        //stats
        
        this.speed = 350
        this.jump = 660
        this.fastFall=900

        //attribut spéciaux
        this.jumpBonus = false
        this.pouvoir= false
        this.lastLeft = 0
        this.lastRight = 0
        this.dash = -800
        //propriété

        this.body.setBounce(0);
        this.body.setSize(32,64);
        this.body.setOffset(16,0);
        this.body.setGravity(0,500);
        this.body.setMaxSpeed(this.fastFall)

        this.setScale(1.5);
        
        
        
        

    }
    update(scene,time,delta){

        if(this.pouvoir == true){//flip les commandes si la gravité est inversé
            var L = this.leftDown
            var justL = this.leftJustDown
            
            this.leftDown=this.rightDown
            this.leftJustDown=this.rightJustDown
        
            this.rightDown = L
            this.rightJustDown =justL
            

        }
        if(this.dash+400<time){
            if (this.leftDown){//si la touche gauche est appuyée
                this.body.setVelocityX(-this.speed);//alors vitesse négative en X
                this.play('leftRoger', true);//et animation => gauche
                
            }
            else if (this.rightDown){//si la touche droite est appuyée
                this.body.setVelocityX(this.speed);//alors vitesse positive en X
                this.play('rightRoger', true);//et animation => gauche
                
            }
            else{ // sinon
                this.body.setVelocityX(0); //vitesse nulle
                this.play('turnRoger',true);//animation fait face caméra
            }
            //dash ?
            if(this.leftJustDown){
                if (this.lastLeft>time-250){
                    this.dash=time
                    this.body.setVelocityX(-this.speed*2)
                }
                else{this.lastLeft=time}
            }
            if(this.rightJustDown){
                if (this.lastRight>time-250){
                    this.dash=time
                    this.body.setVelocityX(this.speed*2)
                }
                else{this.lastRight=time}
            }
    
            if (this.upJustDown){
                switch(this.pouvoir){
                    case false :
                        if(this.body.blocked.down)this.body.setVelocityY(-this.jump);
                        else if(this.jumpBonus==true)this.body.setVelocityY(-this.jump);this.jumpBonus = false;
                            
                        break;
                    case true :
                        if(this.body.blocked.up)this.body.setVelocityY(this.jump);
                        else if(this.jumpBonus==true)this.body.setVelocityY(this.jump);this.jumpBonus = false;
                        break;
                }
                
            
            }
            if (this.downJustDown ){

                switch(this.pouvoir){
                    case false :
                        if(!this.body.blocked.down)this.body.setVelocityY(this.fastFall);
                            
                        break;
                    case true :
                        if(!this.body.blocked.up)this.body.setVelocityY(-this.fastFall);
                        break;
                }
                
            }
        }else{this.body.setVelocityY(0)}
        
        
        if (this.powerJustDown) {
            if(this.pouvoir== false&&this.body.blocked.down){
                this.pouvoir= true
                this.body.setGravity(0,-2000);
                this.flipY=true
                
                
            }
            else if(this.pouvoir== true&&this.body.blocked.up){
                this.pouvoir= false
                this.body.setGravity(0,500);
                this.flipY=false
                
                
            }
        }
        //actualisation
        if((this.pouvoir==false&&this.body.blocked.down)||(this.pouvoir==true&&this.body.blocked.up)){this.jumpBonus=true}
        
        
        
        
        
        }this;
        respawn(){
            this.body.setVelocityX(0);
            this.body.setVelocityY(0);
            this.x=this.spawnX
            this.y=this.spawnY

            if(this.pouvoir== true){
                this.pouvoir= false
                this.body.setGravity(0,500);
                this.flipY=false
                this.fastFall=this.fastFall*-1
                this.jump=this.jump*-1
            }
        }this;


        
}
//______________________________________________
//___________PERSONNAGE #3 : KIWI ______________
//______________________________________________


class Kiwi extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y){


        var sprite = "kiwi"
        var x = x
        var y =y

        


        //constructor
        super(scene,x,y,sprite);
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        
        this.body.setCollideWorldBounds(true);

        this.spawnX = x
        this.spawnY = y
        this.setOrigin(0.5)

        //stats
        
        this.speed = 350
        this.jump = 800
        this.fastFall=900
        //attribut spéciaux
        this.pouvoir=false;
        this.direction="right"
        //propriété

        this.body.setBounce(0);
        this.body.setSize(100,100);
        this.body.setOffset(12,28);
        this.body.setGravity(0,200);
        this.body.setMaxSpeed(this.fastFall)

        this.setScale(0.8);
        
        
        
        
    }
    update(scene,time,delta){
            
        if(this.pouvoir==true){
            if(this.body.velocity.y<70){this.body.setBounce(0.1)}
            else{this.body.setBounce(0)}
            this.body.setGravity(0,-400);
             if(this.body.velocity.y>60&&(this.body.velocity.x<-100||this.body.velocity.x>100)){
            
                this.body.setVelocityY(60)
            
            }//else if(this.body.velocity.y>120)
        }else{
            this.body.setBounce(0)
            this.body.setGravity(0,200);
        }
       
            if (this.leftDown){//si la touche gauche est appuyée
            
            if(this.pouvoir==false){
                this.play('leftKiwi',true);
                this.body.setVelocityX(-this.speed);
            }
            else{
                this.play('leftPlane',true);
                this.body.velocity.x+=-this.speed*0.04
            }
            this.direction="left"
            
            
        }
        else if (this.rightDown){//si la touche droite est appuyée
            
            if(this.pouvoir==false){
                this.play('rightKiwi',true);
                this.body.setVelocityX(this.speed);
            }
            else{
                this.play('rightPlane',true);
                this.body.velocity.x+=this.speed*0.04
            }
            this.direction="right"
            
            
        }
        else{ // sinon
            
            
            if(this.pouvoir==false){
                this.body.setVelocityX(0); 
                this.play('turnKiwi',true);
            }
            else {
                this.body.velocity.x=this.body.velocity.x*0.95
                if(this.body.velocity.y>0&&(this.body.velocity.x<100&&this.body.velocity.x>-100)) {this.play('turnPlane',true);}
            else if(this.direction=="right"){this.play('rightPlane',true)}
            else if(this.direction=="left"){this.play('leftPlane',true)}
            } 
        }
        

        if (this.upJustDown && this.body.blocked.down){
            //si touche haut appuyée ET que le perso touche le sol
            this.body.setVelocityY(-this.jump);//alors vitesse verticale négative
            //(on saute)
        }
        
        
        if (this.downJustDown && !this.body.blocked.down && this.body.velocity.y>(-this.jump*0.5)){
            if(this.pouvoir==true&&(this.body.velocity.x>-100&&this.body.velocity.x<100)){
                this.body.setVelocityY(this.fastFall);
                
            }
            else if(this.pouvoir==false){this.body.setVelocityY(this.fastFall);}
            
            
        }
        if(this.body.blocked.down&&this.pouvoir== true){
            this.pouvoir= false
            
        }
        if (this.powerDown) {
            if(this.pouvoir== false){
                
                
                if(this.body.blocked.down){this.body.setVelocityY(-this.jump*0.45)}
                this.pouvoir= true
                
                
            }
        }
        
        
        }this;
        respawn(){
            this.pouvoir=false
            this.body.setVelocityX(0);
            this.body.setVelocityY(0);
            this.x=this.spawnX
            this.y=this.spawnY
        }this;
        
}




