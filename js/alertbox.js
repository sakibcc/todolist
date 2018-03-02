//自定义弹出框
//利用template
;(function ($) {
	//自定义模板引擎
	function templateChange(temId,type,content) {
		var html_tpl = '',
			html_index = 0,
			//去除HTML标签之间的空白、换行
			rxp_trim = /[\s]+(?=\<)/ig,
			//匹配<% %>中间不包含%>的字符串
			rxp_tpl = /<%([^%>]+)?%>/g,

			tpl = document.getElementById(temId).innerHTML.replace(rxp_trim,'');
			while(true) {
				var match = rxp_tpl.exec(tpl);
				if(!match) break;
				if(html_index == match.index) {
					html_tpl += '“'+content+'”'+tpl.slice(html_index+match[0].length);
				}else {
					html_tpl += tpl.slice(html_index,match.index)+type;
				}
				html_index = match.index + match[0].length;
				}
		return html_tpl;
	}

	$.extend({
		//配置自定义弹框的各个类名
		//container : 弹出框整体
		//alertsure : 确认按钮
		//alertclose : 关闭按钮 
		//background : 蒙版/背景
		myAlertconfig : function (config) {
			 this._def = $.extend({
				container : 'alert-container',
				alertsure : 'alertsure',
				alertclose : 'alertclose',
				background : 'alert-bg'
			},config);

		},

		myAlert : function (temId,type,content) {
			var alert_template = templateChange(temId,type,content);
			$('body').append(alert_template);
			return this;
		},
		
		removeAlert : function () {
			var _this = this;
			$('.'+ _this._def.container).remove();
		},

		comfirmAlert : function (callback) {
			var confirmed,
				_this = this,
				dfd = $.Deferred();
			$('.'+ _this._def.alertsure).click(function(event) {
				confirmed = true;
			});
			$('.'+ _this._def.alertclose).click(function(event) {
				confirmed = false;
			});
			$('.'+ _this._def.background).click(function(event) {
				confirmed = false;
			});
			var timer = setInterval(function () {
				if(confirmed !== undefined) {
					dfd.resolve(confirmed);
					clearInterval(timer);
				}
			},100)
			//then传递一个参数给callback，参数值为resolve所传递的参数；
			return dfd.promise().then(callback);
		}
	});
}(jQuery))
