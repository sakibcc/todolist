//自定义弹出框
;(function ($) {
	$.extend({
		myAlert : function (title) {
			var alert_template = '<div class="alert-container">'+
									'<div class="alert-bg"></div>'+
									'<div class="alert-wrap">'+
									'<div class="alert-content">确认删除"'+title+'"吗?</div>'+
									'<div class="alertbtn"><button class="alertsure">确认</button><button class="alertclose">关闭</button></div></div></div>';
			$('body').append(alert_template);
			return this;
		},

		removeAlert : function () {
			$('.alert-container').remove();
		},

		comfirmAlert : function () {
			var confirmed,
				dfd = $.Deferred();
			$('.alertsure').click(function(event) {
				confirmed = true;
			});
			$('.alertclose').click(function(event) {
				confirmed = false;
			});
			$('.alert-bg').click(function(event) {
				confirmed = false;
			});
			var timer = setInterval(function () {
				if(confirmed !== undefined) {
					dfd.resolve(confirmed);
					clearInterval(timer);
				}
			},100)
			return dfd.promise();
		}
	});
}(jQuery))