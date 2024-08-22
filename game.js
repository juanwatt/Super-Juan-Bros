const config = {
    type: Phaser.AUTO, // webgl, canvas, or auto
    width: 256,
    height: 244,
    backgroundColor: '#049cd8',
    parent: 'game',
    scene:{
        preload, 
        create,
        update
    }
}

new Phaser.Game(config)

function preload(){
    // cargar imagenes  
    this.load.image(
        'cloud1',
        'assets/scenery/overworld/cloud1.png'
    )

    this.load.spritesheet(
        'mario',
        'assets/entities/mario.png',
        {frameWidth: 18, frameHeight: 16}
    )

    this.load.image(
        'floorbricks',
        'assets/scenery/overworld/floorbricks.png'
    )
}

function create(){
    // img (x, y, id)
    this.add.image(0, 0, 'cloud1')
    .setOrigin(0, 0) // Origen de donde inicia la imagen, 0.5 seria desde el medio
    .setScale(0.15) // tamaño

    this.add.tileSprite(0, config.height - 32, config.width, 32, 'floorbricks')
    .setOrigin(0, 0)

    this.mario = this.add.sprite(50, 210, 'mario')
    .setOrigin(0, 1)

    this.anims.create({
        key: 'mario-walk',
        frames: this.anims.generateFrameNumbers(
            'mario',
            {start: 1, end: 3}
        ),
        frameRate: 12,
        repeat: -1
    })

    this.anims.create({
        key: 'mario-idle',
        frames: [{key: 'mario', frame: 0}]
    })

    this.keys = this.input.keyboard.createCursorKeys()
}

function update(){
    if (this.keys.left.isDown){
        this.mario.x -= 2 
        this.mario.anims.play('mario-walk', true)
        this.mario.flipX = true
    }
    else if(this.keys.right.isDown){
        this.mario.x += 2
        this.mario.anims.play('mario-walk', true)
        this.mario.flipX = false
    }
    else{
        this.mario.anims.play('mario-idle', true)
    }
}