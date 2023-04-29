import 'phaser';

export default class GameOver extends Phaser.Scene{
    constructor(){
        super('game-over')
    }

    create(){
        const width = this.scale.width
        const height = this.scale.height

        this.add.text(width * 0.5, height * 0.5, 'Game over', {
            fontSize: 48
        })
        .setOrigin(0.5)

        this.add.text(width * 0.5, height * 0.6, 'Press SPACE to play again.', {
            fontSize: 32,
            wordWrap: {
                width: 400,
                useAdvancedWrap: true
            }
        })
            .setOrigin(0.5)

        this.input.keyboard?.once('keydown-SPACE', ()  => {
            this.scene.start('game')
        })
    }


}