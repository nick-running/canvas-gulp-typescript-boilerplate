export default abstract class Group{
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D // canvas context

    groupId: number
    constructor(canvas: HTMLCanvasElement){
        this.ctx = canvas.getContext('2d')
    }
}