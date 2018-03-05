import Shape from "./Shape";
export default class Circle extends Shape{
    r: number = 10
    sAngle: number = 0
    eAngle: number = 2*Math.PI
    constructor(canvas: HTMLCanvasElement, x: number, y: number, r: number, sAngle: number, eAngle?: number,
                strokeStyle?: string, fillStyle?: string){
        super(canvas, x, y)
        this.sAngle = sAngle
        this.eAngle = eAngle
        this.r = r
    }
    update(x: number, y: number){
        this.x = x
        this.y = y
    }
    render(){
        this.ctx.save()
        // console.log('Circle info is:')
        // console.log(this.x)
        // console.log(this.y)
        // console.log(this.r)
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.r, this.sAngle, this.eAngle)
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
        // this.ctx.closePath()
    }
}