
//兼容浏览器
window.requestAnimFrame = ( function() {
	return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			function( callback ) {
				window.setTimeout( callback, 1000 / 60 );
			};
})();
//获取元素,并规定画布的环境为2d
var starrySky = document.getElementById('starrySky'),
    ctx = starrySky.getContext('2d');
//声明变量记录小球的最小半径和最大半径
var min = 2,
    max = 5;

//首先定义构造函数,生成小球对象
function Ball(){
    //小圆球大小
    this.centerX = randomNumber(max, starrySky.width - max);
	this.centerY = randomNumber(max, starrySky.height - max);
	this.radius = randomNumber(min, max);
	this.color = randomColor();
	//水平方向的速度
	var speed1 = randomNumber(1, 3);
	this.speedX = randomNumber(0, 1) == 0 ? -speed1 : speed1;
	//竖直方向的速度
	var speed2 = randomNumber(1, 3);
	this.speedY = randomNumber(0, 1) == 0 ? -speed2 : speed2;
}
//添加绘制小球的方法
Ball.prototype.draw = function() {
	ctx.beginPath();
	ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2, false);
	ctx.closePath();
	ctx.fillStyle = this.color;
    ctx.globalAlpha = 0.8;
	ctx.fill();
}
	//给小球添加鼠移动的事件
Ball.prototype.move = function() {
	this.centerX += this.speedX;
	this.centerY += this.speedY;
}
Ball.prototype.onHover = function(){
    console.log(1)
    ctx.globalAlpha = 1;

}
Ball.prototype.onLeave = function(){
    console.log(2)
    ctx.globalAlpha = 0.8;

}

//生成随机数的函数
function randomNumber(x, y) {
	return Math.floor(Math.random() * (y - x + 1) + x);
}
//生成随机颜色的函数
function randomColor() {
	var red = randomNumber(0, 255);
	var green = randomNumber(0, 255);
	var blue = randomNumber(0, 255);
	return "rgb(" + red + "," + green + "," + blue + ")";
}
