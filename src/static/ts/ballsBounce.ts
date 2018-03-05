class CanvasContainer{
    static width: number = 400
    static height: number = 300
}
let canvas = <HTMLCanvasElement>document.getElementById('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

class Ball{
    canvas: HTMLCanvasElement
    canvasCtx: CanvasRenderingContext2D
    canvasWidth: number
    canvasHeight: number

    x: number = 0
    y: number = 0
    r: number = 0
    g: number = 2
    vx: number = 2
    vy: number = 4
    friction: number = 0.99
    xFriction: number = 0.99

    fillStyle: string = 'red'
    strokeStyle: string = 'black'

    constructor(canvas: HTMLCanvasElement, x: number = 0, y: number = 0, r: number = 0,
                g: number = 2, vx: number = 2, vy: number = 2, color: string) {
        this.canvas = canvas
        this.canvasWidth = canvas.width
        this.canvasHeight = canvas.height

        this.canvasCtx = canvas.getContext('2d')
        this.x = x
        this.y = y
        this.r = r
        this.g = g
        this.vx = vx
        this.vy = vy

        this.fillStyle = color
        this.strokeStyle = color
    }
    render(){
        this.canvasCtx.beginPath()
        this.canvasCtx.fillStyle = this.fillStyle
        this.canvasCtx.strokeStyle = this.strokeStyle
        this.canvasCtx.arc(this.x, this.y, this.r, 0, 2*Math.PI)
        this.canvasCtx.fill()
        this.canvasCtx.stroke()
        this.canvasCtx.closePath()
    }
    update(){
        this.x += this.vx
        this.y += this.vy
        this.vy += this.g
        if(this.y+this.r>=this.canvasHeight) {
            console.log('到底了')
            console.log('this.y+this.r is:')
            console.log(this.y+this.r)
            console.log('this.canvasHeight is:')
            console.log(this.canvasHeight)
            this.y = this.canvasHeight-this.r
            this.vy = -this.vy*this.friction
            this.vx = this.vx*this.xFriction
        }
        if(this.x+this.r>=this.canvasWidth) {
            this.x = this.canvasWidth-this.r
            this.vx = -this.vx
        }
        if(this.x-this.r<=0) {
            // console.log('到左边了……')
            this.x = this.r
            this.vx = -this.vx*this.xFriction
        }

    }
}
class Util{
    static valueFromRange(min: number, max: number){
        return min + Math.floor(Math.random() * (max - min + 1))
    }
}

let ctx = canvas.getContext('2d')
let balls = [], colors =
    // ['red', 'blue', 'green', 'grey', '#fff']
    ['#008744', '#0057e7', '#d62d20', '#ffa700', '#fff']
for(let i=0;i < 250;i++) {
    const r = Math.floor(Math.random()*25+3)
    const x = Math.random()*canvas.width+r
    const y = Math.random()*canvas.height-r
    const colorIndex = Math.floor(Math.random()*5)
    const color = colors[colorIndex]
    // console.log('color is:'+colorIndex)
    // console.log(color)
    let ball = new Ball(canvas, x, y, r, 0.3, Util.valueFromRange(-8, 8), 0.1, color)
    // ball.render()
    balls.push(ball)
}
// setInterval(function () {
//     ctx.clearRect(0,0, canvas.width, canvas.height)
//     for(let ball of balls) {
//         ball.render()
//         ball.update()
//     }
// }, 50)
function step(){
    ctx.clearRect(0,0, canvas.width, canvas.height)
    for(let ball of balls) {
        ball.render()
        ball.update()
    }
    requestAnimationFrame(step)
}

requestAnimationFrame(step)
    
ball.x = 3
