import Arrow from "./Arrow";
import Circle from "./Circle";
import {CircleArrowGroup} from "./CircleArrowGroup";

let color = {
    lightBlue: '#6BC4CC' // 圆圈、箭头、连接线的颜色
}
let canvas = <HTMLCanvasElement>document.getElementById('canvas')
let ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
// ctx.save()
// let a = new Arrow(canvas, 207, 160, 90, 80, color.lightBlue, color.lightBlue)
// a.render()
// let a2 = new Arrow(canvas, 390, 160, 90, 80, color.lightBlue, color.lightBlue, 180)
// a2.render()
// let a3 = new Arrow(canvas, 300, 260, 90, 80, color.lightBlue, color.lightBlue, 90)
// a3.render()
// let a4 = new Arrow(canvas, 300, 60, 90, 80, color.lightBlue, color.lightBlue, 270)
// a4.render()
// let a1 = new Arrow(canvas, 120, 120, 120, 40, 120, color.lightBlue, color.lightBlue)
// a1.render()
// ctx.restore()
// let c = new Circle(canvas, 300, 160, 160, 0, 2*Math.PI, color.lightBlue, color.lightBlue)
// c.render()

// 表单输入例子 https://mermaidjs.github.io/
// A-->B;
// A-->C;
// B-->D;
// C-->D;
let topology = [
    {id: 1, type: 'circleArrow', linkTo: 2},
    {id: 2, type: 'circleArrow', linkTo: 3},
    {id: 3, type: 'circleArrow'}
]

let ca1 = new CircleArrowGroup(canvas, 1, 25, 13, 15)
ca1.update(100, 100)
let ca2 = new CircleArrowGroup(canvas, 2, 25, 13, 15)
ca2.update(700, 200)
let ca3 = new CircleArrowGroup(canvas, 3, 25, 13, 15)
ca3.update(400, 400)
let ca4 = new CircleArrowGroup(canvas, 3, 25, 13, 15)
ca4.update(500, 500)

let eleList = []
eleList.push(ca1)
eleList.push(ca2)
eleList.push(ca3)
eleList.push(ca4)
let eleListMap = {
    1: ca2,
    2: ca3,
    3: ca4
}
// for(let n of eleList) {
//     eleListMap[n.id] = n
// }
console.log('eleListMap is')
console.log(eleListMap)

function render(){
    for(let obj of eleList) {
        obj.setLinkToObj(eleListMap[obj.id])
        obj.render()
    }
}
render()

canvas.addEventListener('mousemove',function (event) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const x = event.clientX
    const y = event.clientY
    console.log(`x: ${x} - y: ${y}`)
    ca1.update(x, y)
    render()
})

canvas.addEventListener('click', function (event) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const x = event.clientX
    const y = event.clientY
    // console.log(`x: ${x} - y: ${y}`)
    ca2.update(x, y)
    render()
})