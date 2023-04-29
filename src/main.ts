import './style.css'

// const app = document.querySelector<HTMLDivElement>('#app')!

// app.innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
//   <div id="game"></div>
// `;

import 'phaser';
import GameScene from './game-scene';
import Death from './death';

const IS_PRODUCTION = true

const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'AwesomeSuperCoolPenis',
  url: '',
  version: '2.0',
  width: 480,
  height: 640,
  type: Phaser.AUTO,
  parent: 'app',
  scene: [GameScene, Death],
  input: {
    keyboard: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
      debug: !IS_PRODUCTION
    }
  },
  backgroundColor: '#300000',
  render: { pixelArt: false, antialias: true },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    // `fullscreenTarget` must be defined for phones to not have
    // a small margin during fullscreen.
    fullscreenTarget: 'app',
    expandParent: false,
  },
};


export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener('load', () => {
  // Expose `_game` to allow debugging, mute button and fullscreen button
  (window as any)._game = new Game(GameConfig);
});
