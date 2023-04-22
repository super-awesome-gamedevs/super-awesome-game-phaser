import 'phaser';

import bgUrl from '../assets/bg_layer1.png';
import platformUrl from '../assets/ground_grass.png';
import playerUrl from '../assets/bunny1_stand.png';

export const menuSceneKey = 'MenuScene';

export function menu(): Phaser.Types.Scenes.SettingsConfig | Phaser.Types.Scenes.CreateSceneFromObjectConfig {
  return {
    key: menuSceneKey,
    preload() {
      this.load.image('background', bgUrl);
      this.load.image('platform', platformUrl)
      this.load.image('bunny_stand', playerUrl)
    },
    create() {
      this.add.image(240, 320, 'background')
      const platforms = this.physics.add.staticGroup()

      for (let i = 0; i < 5; ++i) {
              const x = Phaser.Math.Between(80, 400)
              const y = 150 * i

              const platform: Phaser.Physics.Arcade.Sprite = platforms.create(x, y, 'platform')
              platform.scale = 0.5

              const body: Phaser.Physics.Arcade.StaticBody|Phaser.Physics.Arcade.Body = platform.body!
              body.updateFromGameObject()
      }

      const player = this.physics.add.sprite(240, 320, 'bunny_stand')
      .setScale(0.5)

      this.physics.add.collider(platforms, player)
    },
    update() {
      
    },
  }
}