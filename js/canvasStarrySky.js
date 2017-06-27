window.onload = function(){
    //兼容浏览器
    window.requestAnimFrame = ( function() {
    	return window.requestAnimationFrame ||
    			window.webkitRequestAnimationFrame ||
    			window.mozRequestAnimationFrame ||
    			function( callback ) {
    				window.setTimeout( callback, 1000 / 60 );
    			};
    })();

    //获取画布
    var can = document.getElementById('starrySky'),
        canvasBg = document.getElementsByClassName('canvasBg')[0],
        cxt = can.getContext('2d'),
        cw = canvasBg.clientWidth,
        ch = canvasBg.clientHeight;


    //画布的宽高
    can.width = cw;
    can.height = ch;

    var circles = [];//圆形粒子集合

    var x = 0,
        y = 0,
        i = 0;

    //圆形粒子对象
    function Circle(x,y,r){//圆形粒子的中心点坐标(x,y),r是半径
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = randomColor();
        //速度：速度值 方向
		this.speed = Math.random()*0.5+0.1;
		this.direction = Math.random()*Math.PI*2;
    }

    //移动圆形粒子
    Circle.prototype.update = function(){
        this.x += Math.cos(this.direction)*this.speed;
		this.y += Math.sin(this.direction)*this.speed;
		if (this.x <= this.r){
			this.x = this.r;
			this.direction = Math.PI - this.direction;
		}else if (this.x >= cw-this.r){
			this.x = cw-this.r;
			this.direction = Math.PI - this.direction;
		}
		if (this.y <= this.r){
			this.y = this.r;
			this.direction = this.direction-Math.PI/2;
		}else if (this.y >= ch-this.r){
			this.y =  ch-this.r;
			this.direction = this.direction-Math.PI/2;
		}
    }
    //绘制圆形粒子
    var mark = false;
    Circle.prototype.draw = function(){
        cxt.beginPath();
        cxt.arc(this.x,this.y,this.r,0,360,false);
        cxt.closePath();
        cxt.fillStyle = this.color;
        if (mark){
			cxt.globalAlpha = 1;
		}else if (this.x >= x-50 && this.x <= x+50 && this.y >= y-50 && this.y <= y+50 ){
			cxt.globalAlpha = 1;
		}else{
			cxt.globalAlpha = 0.4;
		}
		cxt.fill();
    }

    //添加粒子个数
	function addParticles(){
		var counts = 100;
		while (counts--)
		{
			var w = Math.random()*cw;
			var h = Math.random()*ch;
			//添加圆形粒子对象
			circles.push(new Circle(w,h,5));
		}
	}
    //鼠标坐标位置
	document.onmousemove = function(ev){
		var ev = ev || window.event;
		x = ev.pageX;
		y = ev.pageY;
	}
	function loop(){
		requestAnimFrame(loop);
		//显示后面绘制的元素
		i++;
		if (i>10000)
		{
			i = 0;
		}
		cxt.globalCompositeOperation = 'destination-out';
		cxt.fillStyle = 'rgba(0, 0, 0, 1)';
		//透明度
		cxt.globalAlpha = 1;
		cxt.fillRect( 0, 0, cw, ch );
		//显示重叠部分
		cxt.globalCompositeOperation = 'lighter';
		var n = circles.length;
		while (n--){
			circles[n].draw();
			circles[n].update();
		}

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
    //函数调用
    addParticles();
    loop();
    //浏览器窗口改变是
    window.onresize = function(){
        cw = canvasBg.clientWidth;
        ch = canvasBg.clientHeight;
        console.log(ch);
        can.width = cw;
        can.height = ch;
        console.log(can.height);
        circles.length = 0;
        addParticles();
    }

}
