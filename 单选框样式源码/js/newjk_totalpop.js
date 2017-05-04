(function() {
	$.MsgBox = {
		Alert: function(title, msg) {
			GenerateHtml("alert", title, msg);
			btnOk(); //alert只是弹出消息，因此没必要用到回调函数callback
			btnNo();
		},
		Confirm: function(title, msg, callback) {
			GenerateHtml("confirm", title, msg);
			btnOk(callback);
			btnNo();
		},
		Prompt: function(title, callback) {
			GenerateHtml("Prompt", title);
			btnOk(callback);
			btnNo();
		}
	}
	//生成Html
	var GenerateHtml = function(type, title, msg) {
		var _html = "";
		_html += '<div id="mb_box"></div><div id="mb_con">';
		
		if (type == "alert") {
			_html += '<div id="mb_msg">' + msg + '</div><div id="mb_btnbox">';
			_html += '<input id="mb_btn_ok" type="button" value="确定" />';
		}
		if (type == "confirm") {
			_html += '<div id="mb_msg">' + msg + '</div><div id="mb_btnbox">';
			_html += '<input id="mb_btn_no" type="button" value="取消" />';
			_html += '<input id="mb_btn_ok" type="button" value="确定" />';
		}
		if (type == "Prompt") {
			/*_html += '<a id="mb_ico">x</a><div id="mb_msg">' + msg + '</div><div id="mb_btnbox">';*/
			_html +='<a id="mb_ico">x</a><div id="mb_msg"><input id="mb_prompt_text" type="text" value="请填写您的姓名" /></div><div id="mb_btnbox">'
			_html += '<input id="mb_btn_no" type="button" value="取消" />';
			_html += '<input id="mb_btn_ok" type="button" value="确定" />';
		}
		_html += '</div></div>';
		//必须先将_html添加到body，再设置Css样式
		$("body").append(_html);
		GenerateCss();
	}
	//生成Css
	var GenerateCss = function() {
		$("#mb_prompt_text").css({
			width: '90%',
			display: 'block',
			margin: '0 auto',
			padding: '5px 5px'
		})
		$("#mb_box").css({
			width: '100%',
			height: '100%',
			zIndex: '99999',
			position: 'fixed',
			filter: 'Alpha(opacity=60)',
			backgroundColor: 'black',
			top: '0',
			left: '0',
			opacity: '0.6'
		});
		$("#mb_con").css({
			zIndex: '999999',
			width: '80%',
			position: 'fixed',
			backgroundColor: 'White',
		});
		$("#mb_tit").css({
			display: 'block',
			fontSize: '14px',
			color: '#444',
			padding: '10px 15px',
			backgroundColor: '#DDD',
			borderBottom: '3px solid #009BFE',
			fontWeight: 'bold'
		});
		$("#mb_msg").css({
			padding: '20px',
			lineHeight: '20px',
			fontSize: '1em',
			textIndent: '2em',
			color: '#444444',
			lineHeight: '1.5em'
		});
		$("#mb_ico").css({
			display: 'block',
			position: 'absolute',
			right: '10px',
			top: '9px',
			border: '1px solid Gray',
			width: '18px',
			height: '18px',
			textAlign: 'center',
			lineHeight: '16px',
			cursor: 'pointer',
			fontFamily: '微软雅黑'
		});
		$("#mb_btnbox").css({
			margin: '15px 0 10px 0',
			textAlign: 'center'
		});
		$("#mb_btn_ok,#mb_btn_no").css({
			width: '50%',
			display: 'block',
			float: 'left',
			height: '30px',
			border: 'none',
			margin: '10px auto',
			textAlign: 'center',
			fontSize: '1.3em'
		});
		$("#mb_btn_ok").css({

		});
		$("#mb_btn_no").css({
			color: '#FA373B'
		});
		//右上角关闭按钮hover样式
		$("#mb_ico").hover(function() {
			$(this).css({
				backgroundColor: 'Red',
				color: 'White'
			});
		},
		function() {
			$(this).css({
				backgroundColor: '#DDD',
				color: 'black'
			});
		});
		var _widht = document.documentElement.clientWidth; //屏幕宽
		var _height = document.documentElement.clientHeight; //屏幕高
		var boxWidth = $("#mb_con").width();
		var boxHeight = $("#mb_con").height();
		//让提示框居中
		$("#mb_con").css({
			top: (_height - boxHeight) / 2 + "px",
			left: (_widht - boxWidth) / 2 + "px"
		});
	}
	//确定按钮事件
	var btnOk = function(callback) {
		$("#mb_btn_ok").click(function() {
			$("#mb_box,#mb_con").remove();
			if (typeof(callback) == 'function') {
				callback();
			}
		});
	}
	//取消按钮事件
	var btnNo = function() {
		$("#mb_btn_no,#mb_ico").click(function() {
			$("#mb_box,#mb_con").remove();
		});
	}
})();