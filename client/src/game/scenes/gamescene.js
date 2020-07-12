import Phaser from 'phaser';
import io from 'socket.io-client';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameScene'
        });
    }

    preload() {

    }

    create() {
        this.socket = io('http://localhost:3000');

        this.socket.on('struct create', (width, height) => {
            let token = this.add.rectangle(300, 300, width, height, 0x00ffff).setInteractive();
            this.input.setDraggable(token);
        });

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
    }

    update() {

    }
}