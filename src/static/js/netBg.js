var CanvasContainer = /** @class */ (function () {
    function CanvasContainer() {
    }
    CanvasContainer.width = 400;
    CanvasContainer.height = 300;
    return CanvasContainer;
}());
var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 5;
var Ball = /** @class */ (function () {
    function Ball(canvas, x, y, r, g, vx, vy, color) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (r === void 0) { r = 0; }
        if (g === void 0) { g = 2; }
        if (vx === void 0) { vx = 2; }
        if (vy === void 0) { vy = 2; }
        this.x = 0;
        this.y = 0;
        this.r = 0;
        this.g = 2;
        this.vx = 2;
        this.vy = 4;
        this.friction = 0.99;
        this.xFriction = 0.99;
        this.fillStyle = 'red';
        this.strokeStyle = 'black';
        this.canvas = canvas;
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.canvasCtx = canvas.getContext('2d');
        this.x = x;
        this.y = y;
        this.r = r;
        this.g = g;
        this.vx = vx;
        this.vy = vy;
        this.fillStyle = color;
        this.strokeStyle = color;
    }
    Ball.prototype.render = function () {
        this.canvasCtx.beginPath();
        this.canvasCtx.fillStyle = this.fillStyle;
        this.canvasCtx.strokeStyle = this.strokeStyle;
        this.canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.canvasCtx.fill();
        this.canvasCtx.stroke();
        this.canvasCtx.closePath();
    };
    Ball.prototype.update = function () {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.g;
        if (this.y + this.r >= this.canvasHeight) {
            console.log('到底了');
            console.log('this.y+this.r is:');
            console.log(this.y + this.r);
            console.log('this.canvasHeight is:');
            console.log(this.canvasHeight);
            this.y = this.canvasHeight - this.r;
            this.vy = -this.vy * this.friction;
            this.vx = this.vx * this.xFriction;
        }
        if (this.x + this.r >= this.canvasWidth) {
            this.x = this.canvasWidth - this.r;
            this.vx = -this.vx;
        }
        if (this.x - this.r <= 0) {
            // console.log('到左边了……')
            this.x = this.r;
            this.vx = -this.vx * this.xFriction;
        }
    };
    return Ball;
}());
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.valueFromRange = function (min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    };
    return Util;
}());
var ctx = canvas.getContext('2d');
var balls = [], colors = 
// ['red', 'blue', 'green', 'grey', '#fff']
// ['#008744', '#0057e7', '#d62d20', '#ffa700', '#fff']
['#ffa700'];
var r = 5, ballNum = 200;
for (var i = 0; i < ballNum; i++) {
    // const r = Math.floor(Math.random()*25+3)
    // const colorIndex = Math.floor(Math.random()*5)
    var color = colors[0];
    // console.log('color is:'+colorIndex)
    // console.log(color)
    // Math.sqrt(Math.pow(3,2)+Math.pow(4,2))
    // 计算到每个小球的距离
    var count = 0;
    var ballPosition = makePosition();
    while (isCollision(ballPosition.x, ballPosition.y) && count <= 10) {
        count++;
        console.log('touched');
        ballPosition = makePosition();
    }
    if (count >= 10)
        break;
    console.log("count is: " + count);
    // console.log('距离：x: '+x+'  y: '+y+' 计算了：'+count+' 次')
    var ball = new Ball(canvas, ballPosition.x, ballPosition.y, r, 0.3, Util.valueFromRange(-8, 8), 0.1, color);
    // ball.render()
    balls.push(ball);
}
console.log("\u76EE\u6807\u6E32\u67D3\u4E2A\u6570\uFF1A" + ballNum + ", \u5B9E\u9645\u6E32\u67D3\u4E2A\u6570\uFF1A" + balls.length);
function makePosition() {
    var x = Util.valueFromRange(r, canvas.width - r);
    var y = Util.valueFromRange(r, canvas.height - r);
    return { x: x, y: y };
}
function isCollision(x, y) {
    var gap = 20;
    for (var _i = 0, balls_1 = balls; _i < balls_1.length; _i++) {
        ball = balls_1[_i];
        var distance = Math.sqrt(Math.pow(x - ball.x, 2) + Math.pow(y - ball.y, 2));
        if (distance - r * 2 - gap <= 0) {
            // console.log(`重叠了x: ${x},y: ${y}`)
            // console.log(`ball x: ${ball.x}, y: ${ball.y}`)
            return true;
        }
    }
    return false;
}
function step() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var _i = 0, balls_2 = balls; _i < balls_2.length; _i++) {
        var ball = balls_2[_i];
        ball.render();
        ball.update();
    }
    // requestAnimationFrame(step)
}
requestAnimationFrame(step);
// ball.x = 3
