class credits extends Phaser.Scene{
    constructor(){
        super("credits");
    }
    init(data){
        this.volume = data.volume;
        this.maxChrono = data.maxChrono;
        
    }
    preload(){
        

        
        
    }

    create(){

        this.add.image(this.sys.canvas.width/2, this.sys.canvas.height/2, 'background').setAlpha(0.5);
        
        this.cosmo = this.add.sprite(this.sys.canvas.width/3.4, this.sys.canvas.height/3,'perso').setScale(1.5)
        this.cosmo.anims.play('rightPhaser', true);
        this.add.text(this.cosmo.x+80, this.cosmo.y,"COSMO par Charles-[JV1A]",{ fontSize: '32px', fontFamily: 'MS UI Gothic' });

        this.roger = this.add.sprite(this.sys.canvas.width/10, this.sys.canvas.height/1.8,'roger').setScale(1.5)
        this.roger.anims.play('rightRoger', true);
        this.add.text(this.roger.x+80, this.roger.y,"ROGER par Alexian-[JV1A]",{ fontSize: '32px', fontFamily: 'MS UI Gothic' });

        this.kiwi = this.add.sprite(this.sys.canvas.width/1.8, this.sys.canvas.height/1.8,'kiwi').setScale(0.8)
        this.kiwi.anims.play('rightKiwi', true);
        this.add.text(this.kiwi.x+100, this.kiwi.y,"KIWI par Sébastien-[JV1A]",{ fontSize: '32px', fontFamily: 'MS UI Gothic' });
        



        //_________________
        //__bouton back____
        var buttonBack = this.add.image(this.sys.canvas.width*0.9, this.sys.canvas.height*0.9, 'buttonBack').setOrigin(0.5).setInteractive();
        
        buttonBack.on('pointerover', function () {
            
            buttonBack.setFrame(1);
            
        }, this);
        buttonBack.on('pointerout', function () {
            
            buttonBack.setFrame(0);
            
        }, this);
        
        buttonBack.on('pointerup', function () {this.backToTitle()}, this);
        
    }
    update(){
        
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
}