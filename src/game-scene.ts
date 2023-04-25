import 'phaser';

import bgUrl from '../assets/bg_layer1.png';
import platformUrl from '../assets/ground_grass.png';
import playerUrl from '../assets/bunny1_stand.png';

export const sceneKey = 'GameScene';

export default class GameScene extends Phaser.Scene {
  player!: Phaser.Physics.Arcade.Sprite
  platforms!: Phaser.Physics.Arcade.StaticGroup

  constructor() {
    super(sceneKey)
  }

  preload() {
    this.load.image('background', bgUrl);
    this.load.image('platform', platformUrl)
    this.load.image('bunny_stand', playerUrl)
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
  }

  update() {
    // @ts-ignore
    this.platforms.children.iterate((child: any) => {
      const platform: Phaser.Physics.Arcade.Sprite = child

      const scrollY = this.cameras.main.scrollY
      if (platform.y >= scrollY + 700) {
        platform.y = scrollY - Phaser.Math.Between(50, 100)
        platform.body!.updateFromGameObject()
      }
    })

    const touchingDown = this.player.body?.touching.down

    if(touchingDown){
      this.player.setVelocityY(-300)
    }
  }
}