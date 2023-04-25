import 'phaser';

export default class Carrot extends Phaser.Physics.Arcade.Sprite{
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string){
        super(scene, x, y, texture)

        this.setScale(0.5)
    }
}