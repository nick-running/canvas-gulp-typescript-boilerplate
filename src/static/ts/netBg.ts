class CanvasContainer{
    static width: number = 400
    static height: number = 300
}
let canvas = <HTMLCanvasElement>document.getElementById('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight - 5

class Ball{
    canvas: HTMLCanvasElement
    canvasCtx: Canvas2DContextAttributes
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
    // ['#008744', '#0057e7', '#d62d20', '#ffa700', '#fff']
    ['#ffa700']
const r = 5, ballNum = 200
for(let i=0;i < ballNum;i++) {
    // const r = Math.floor(Math.random()*25+3)
    // const colorIndex = Math.floor(Math.random()*5)
    const color = colors[0]
    // console.log('color is:'+colorIndex)
    // console.log(color)
    // Math.sqrt(Math.pow(3,2)+Math.pow(4,2))
    // 计算到每个小球的距离
    let count = 0
    let ballPosition = makePosition()
    while(isCollision(ballPosition.x, ballPosition.y)&&count<=10) {
        count++
        console.log('touched')
        ballPosition = makePosition()
    }
    if(count>=10) break
    console.log(`count is: ${count}`)
    // console.log('距离：x: '+x+'  y: '+y+' 计算了：'+count+' 次')


    let ball = new Ball(canvas, ballPosition.x, ballPosition.y, r, 0.3, Util.valueFromRange(-8, 8), 0.1, color)
    // ball.render()
    balls.push(ball)
}
console.log(`目标渲染个数：${ballNum}, 实际渲染个数：${balls.length}`)
function makePosition(){
    const x = Util.valueFromRange(r, canvas.width-r)
    const y = Util.valueFromRange(r, canvas.height-r)
    return {x: x, y: y}
}
function isCollision(x, y){
    const gap = 20
    for(ball of balls) {
        const distance = Math.sqrt(Math.pow(x-ball.x,2)+Math.pow(y-ball.y,2))
        if(distance-r*2-gap<=0){
            // console.log(`重叠了x: ${x},y: ${y}`)
            // console.log(`ball x: ${ball.x}, y: ${ball.y}`)
            return true
        }
    }
    return false
}
function step(){
    ctx.clearRect(0,0, canvas.width, canvas.height)
    for(let ball of balls) {
        ball.render()
        ball.update()
    }
    // requestAnimationFrame(step)
}

requestAnimationFrame(step)

// ball.x = 3
