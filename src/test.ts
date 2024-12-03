import { Sprite, Application, Texture } from "pixi.js"

export class Test {

    protected app: Application
    protected sprite: Sprite

    // Constructor \\

    constructor() {
        this.app = new Application()
        this.sprite = new Sprite()
    }

    // Methods \\

    async load() {
        await this.app.init({
            width: 1190,
            height: 600
        })
        globalThis.__PIXI_APP__ = this.app
        document.body.appendChild(this.app.canvas)
        this.app.stage.addChild(this.sprite)
        this.sprite.texture = Texture.WHITE
        this.sprite.width = 50
        this.sprite.height = 50
    }

    moveToMiddle() {
        this.sprite.position.x = this.app.renderer.width / 2
        this.sprite.position.y = this.app.renderer.height / 2
    }

}