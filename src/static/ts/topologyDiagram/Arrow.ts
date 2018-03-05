import Shape from "./Shape";

export default class Arrow extends Shape{
    rectangleX: number = 120
    arrowHeadX: number = 40
    width: number = 200
    height: number = 40
    rotate: number = 0

    brushStartPoint = [0, 0]
    brushDrawPath: Array<{startX: number, endY: number}>

    constructor(canvas: HTMLCanvasElement,
                x?:number, y?: number,
                width?: number,
                // arrowHeadX?: number,
                height?: number,
                strokeStyle?: string, fillStyle?: string,
                rotate?:number) {
        super(canvas, x, y)
        // this.width = this.rectangleX+this.arrowHeadX
        this.width = width
        this.height = height
        this.arrowHeadX = this.width*.3
        this.rectangleX = this.width*.7
        if(strokeStyle) {
            this.strokeStyle = strokeStyle
        }
        if(fillStyle) {
            this.fillStyle = fillStyle
        }
        if(rotate) {
            this.rotate = rotate
        }
        this.init()
    }

    init(){
        // this.brushDrawPath = [
        //     {startX: this.rectangleX, endY: this.y}, // -
        //     {startX: this.rectangleX, endY: 20}, // |
        //     {startX: this.rectangleX+this.arrowHeadX, endY: 80}, // \
        //     {startX: this.rectangleX, endY: this.height}, // /
        //     {startX: this.rectangleX, endY: 100}, // |
        //     {startX: 20, endY: 100}, // -
        //     {startX: 20, endY: 60} // |
        // ]
        const oPointX = -this.width/2
        const oPointY = -this.height/2
        this.brushStartPoint[0] = oPointX
        this.brushStartPoint[1] = this.height/3+oPointY
        // console.log('this.rectangleX is:')
        // console.log(this.rectangleX)
        this.brushDrawPath = [
            {startX: this.rectangleX+oPointX, endY: this.height/3+oPointY}, // -
            {startX: this.rectangleX+oPointX, endY: +oPointY}, // |
            {startX: this.rectangleX+oPointX+this.arrowHeadX, endY: this.height/2+oPointY}, // \
            {startX: this.rectangleX+oPointX, endY: this.height+oPointY}, // /
            {startX: this.rectangleX+oPointX, endY: this.height-this.height/3+oPointY}, // |
            {startX: +oPointX, endY: this.height-this.height/3+oPointY}, // -
            {startX: +oPointX, endY: this.height/3+oPointY} // |
        ]
    }

    render(){
        // console.log('this.brushDrawPath is:')
        // console.log(this.brushDrawPath)
        this.ctx.save()

        this.ctx.beginPath()
        // 画箭头的好维护方法
        this.ctx.translate(this.x, this.y)
        this.ctx.rotate(this.rotate*Math.PI/180)
        // console.log('brushStartPoint is')
        // console.log(this.brushStartPoint)
        this.ctx.moveTo(...this.brushStartPoint)
        for (let point of this.brushDrawPath) {
            this.ctx.lineTo(point.startX, point.endY)
            // console.log('point.startX is:'+point.startX)
            // console.log('point.endY is:'+point.endY)
        }
        if(this.fillStyle) {
            this.ctx.fillStyle = this.fillStyle
            this.ctx.fill()
        }
        if(this.ctx.strokeStyle) {
            this.ctx.strokeStyle = this.strokeStyle
            this.ctx.stroke()
        }
        this.ctx.closePath()
        this.ctx.restore()
    }
    update(x: number, y: number){
        this.x = x
        this.y = y
    }
}