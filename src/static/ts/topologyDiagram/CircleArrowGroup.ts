import Group from "./Group";
import Arrow from "./Arrow";
import Circle from "./Circle";
class Color{
    lightBlue: string = '#6BC4CC'
}
export class CircleArrowGroup extends Group{
    id: number
    linkToObj: any
    topPointX: number
    topPointY: number
    bottomPointPointX: number
    bottomPointPointY: number

    outlineCircle: Circle
    leftArrow: Arrow
    rightArrow: Arrow
    topArrow: Arrow
    bottomArrow: Arrow

    circleR: number
    arrowWidth: number
    arrowHeight: number

    // styles
    color: Color
    constructor(canvas: HTMLCanvasElement, id: number, circleR: number, arrowWidth:number, arrowHeight:number) {
        super(canvas)
        this.groupId = new Date().getTime()
        // let color = {
        //     lightBlue: '#6BC4CC' // 圆圈、箭头、连接线的颜色
        // }
        let color = new Color().lightBlue
        if(id) this.id = id
        if(circleR) this.circleR = circleR
        if(arrowWidth) this.arrowWidth = arrowWidth
        if(arrowHeight) this.arrowHeight = arrowHeight
        this.outlineCircle = new Circle(canvas, 300, 160, this.circleR, 0, 2*Math.PI, color, color)
        this.topPointX = 300
        this.topPointY = 160-this.circleR
        this.bottomPointPointX = 300
        this.bottomPointPointY = 160+this.circleR

        this.leftArrow = new Arrow(canvas, 207, 160, this.arrowWidth, this.arrowHeight, color, color)
        this.rightArrow = new Arrow(canvas, 390, 160, this.arrowWidth, this.arrowHeight, color, color, 180)
        this.topArrow = new Arrow(canvas, 300, 60, this.arrowWidth, this.arrowHeight, color, color, 270)
        this.bottomArrow = new Arrow(canvas, 300, 260, this.arrowWidth, this.arrowHeight, color, color, 90)

        // this.color.lightBlue = 'red'
    }

    update(x: number, y: number){
        const padding = (this.circleR-this.arrowWidth/2)-5
        this.outlineCircle.update(x, y)
        this.topPointX = x
        this.topPointY = y-this.circleR
        this.bottomPointPointX = x
        this.bottomPointPointY = y+this.circleR

        this.leftArrow.update(x-padding, y)
        this.rightArrow.update(x+padding, y)
        this.topArrow.update(x, y-padding)
        this.bottomArrow.update(x, y+padding)
    }
    setLinkToObj(linkToObj: any){
        // console.log('setLinkToObj is')
        // console.log(linkToObj)
        this.linkToObj = linkToObj
    }

    render(){
        this.leftArrow.render()
        this.rightArrow.render()
        this.bottomArrow.render()
        this.topArrow.render()
        this.outlineCircle.render()

        if(this.linkToObj) {
            this.ctx.save()

            console.log('start render linkto obj')

            // console.log(this.linkToObj.topPointX)
            let color = new Color().lightBlue


            this.ctx.beginPath()
            this.ctx.moveTo(this.bottomPointPointX, this.bottomPointPointY)
            this.ctx.lineTo(this.linkToObj.topPointX, this.linkToObj.topPointY)
            // this.ctx.arc(0, 0, 20, 0, 2*Math.PI)
            console.log('Color.lightBlue is')
            console.log(color)
            this.ctx.strokeStyle = color
            this.ctx.stroke()


            // this.ctx.moveTo(20, 20)
            // this.ctx.lineTo(80, 80)
            // this.ctx.strokeStyle = 'red'
            // this.ctx.stroke()

            this.ctx.restore()
        }
    }
}