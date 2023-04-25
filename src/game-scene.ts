import 'phaser';

import bgUrl from '../assets/bg_layer1.png';
import platformUrl from '../assets/ground_grass.png';
import playerUrl from '../assets/bunny1_stand.png';
import carrotUrl from '../assets/carrot.png';
import Carrot from './game/carrot';
/*ToDo: Page 42 */
export const sceneKey = 'GameScene';

export default class GameScene extends Phaser.Scene {
  player!: Phaser.Physics.Arcade.Sprite
  platforms!: Phaser.Physics.Arcade.StaticGroup
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  carrots!: Phaser.Physics.Arcade.Group

  constructor() {
    super(sceneKey)
  }

  preload() {
    this.load.image('background', bgUrl);
    this.load.image('platform', platformUrl)
    this.load.image('bunny_stand', playerUrl)
    this.load.image('carrot', carrotUrl)
    this.cursors = this.input.keyboard!.createCursorKeys()
  }

  create() {
    this.add.image(240, 320, 'background')
      .setScrollFactor(1, 0)

    this.platforms = this.physics.add.staticGroup()

    for (let i = 0; i < 5; ++i) {
            const x = Phaser.Math.Between(80, 400)
            const y = 150 * i

            const platform: Phaser.Physics.Arcade.Sprite = this.platforms.create(x, y, 'platform')
            platform.scale = 0.5

            const body: Phaser.Physics.Arcade.StaticBody|Phaser.Physics.Arcade.Body = platform.body!
            body.updateFromGameObject()
    }

    this.player = this.physics.add.sprite(240, 320, 'bunny_stand')
    .setScale(0.5)

    this.physics.add.collider(this.platforms, this.player)

    this.player.body!.checkCollision.up = false
    this.player.body!.checkCollision.left = false
    this.player.body!.checkCollision.right = false

    this.cameras.main.startFollow(this.player)

    this.cameras.main.setDeadzone(this.scale.width * 1.5)

    this.carrots = this.physics.add.group({
      classType: Carrot
    })
    this.physics.add.collider(this.platforms, this.carrots)
  }

  update() {
    // @ts-ignore
    this.platforms.children.iterate((child: any) => {
      const platform: Phaser.Physics.Arcade.Sprite = child

      const scrollY = this.cameras.main.scrollY
      if (platform.y >= scrollY + 700) {
        platform.y = scrollY - Phaser.Math.Between(50, 100)
        platform.body!.updateFromGameObject()

        this.addCarrotAbove(platform)
      }
    })

    const touchingDown = this.player.body?.touching.down

    if(touchingDown){
      this.player.setVelocityY(-300)
    }

    if(this.cursors.left.isDown && !touchingDown) {
      this.player.setVelocityX(-200)
    }else if(this.cursors.right.isDown && !touchingDown){
      this.player.setVelocityX(200)
    }else{
      this.player.setVelocityX(0)
    }

    this.horizontalWrap(this.player)
  }

  horizontalWrap(sprite: Phaser.GameObjects.Sprite) {
    const halfWidth = sprite.displayWidth * 0.5
    const gameWidth = this.scale.width
    if (sprite.x < - halfWidth) {
      sprite.x = gameWidth + halfWidth
    } else if (sprite.x > gameWidth + halfWidth) {
      sprite.x = -halfWidth
    }
  }

  addCarrotAbove(sprite: Phaser.GameObjects.Sprite){
    const y = sprite.y - sprite.displayHeight
    const carrot = this.carrots.get(sprite.x, y, 'carrot')

    this.add.existing(carrot)
    carrot.body.setSize(carrot.width, carrot.height)

    return carrot
  }
}