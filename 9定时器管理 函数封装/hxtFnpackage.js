// 移动函数封装  


function doMove(obj, attr, dir, time, target, endFn) {

	clearInterval(obj.movetimer);

	dir = parseInt(obj.css(attr)) < target ? dir : -dir;

	obj.movetimer = setInterval(function () {

		var speed = parseInt(obj.css(attr)) + dir;

		if (speed > target && dir > 0 || speed < target && dir < 0) {

			speed = target;
		}

		obj.css(attr, speed + 'px');

		if (speed == target) {

			clearInterval(obj.movetimer);

			endFn && endFn();
		}

	}, time);

}


//抖函数封装

function shake(obj, attr, time, endFn) {

	var num = 0;
	var arr = [];
	var $pos = parseInt(obj.css(attr))

	for (var i = 20; i > 0; i -= 2) {

		arr.push(i, -i);

	}
	arr.push(0);

	clearInterval(obj.shakeTinmer);

	obj.shakeTinmer = setInterval(function () {

		obj.css(attr, $pos + arr[num]);

		num++;

		if (num == arr.length) {

			clearInterval(obj.shakeTinmer);

			endFn && endFn();


		}

	}, time)



}



// $(function(){
// 	$.fn.extend ( {
// jq 拖拽插件  $('#xxx').drag()

//拖拽函数封装
function drag() {

	var disX = 0;
	var disY = 0;
	var This = this;

	this.mousedown(function (ev) {


		disX = ev.pageX - $(this).offset().left; // 鼠标按下时距离左边屏幕的距离减去当前元素距离左边屏幕的距离 得到鼠标距离元素左边的距离
		disY = ev.pageY - $(this).offset().top;

		$(document).mousemove(function (ev) {

			This.css('left', ev.pageX - disX);
			This.css('top', ev.pageY - disY);

		});

		$(document).mouseup(function () {

			$(this).off();

		});

		return false;
	});
}



// 	});
// })(jQuery);
