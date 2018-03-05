export default class Shape {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D // canvas context

    x: number = 0
    y: number = 0

    fillStyle: string
    strokeStyle: string = '#6BC4CC'

    constructor(canvas: HTMLCanvasElement, x?: number, y?: number){
        this.ctx = canvas.getContext('2d')
        if(x) this.x = x
        if(y) this.y = y
    }
}