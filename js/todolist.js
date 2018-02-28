//负责界面的DOM操作模块
//在全局中直接使用todolist调用
;(function () {
	"use strict"
	var _global;

	//对象合并
	function _extend(obj,opt,cover) {
		for(var key in opt) {
			if(opt.hasOwnProperty(key) && !obj.hasOwnProperty(key) || cover){
				obj[key] = opt[key];
			}
		}
		return obj;
	}

	//组件内容
	function HtmlModify(config) {
		this.initial(config);
	}

	HtmlModify.prototype =  {
		 constructor : this,
		//参数初始化
		 initial : function (config) {
		 	var def = {
		 		detailBody : null,
		 		detailTitle : null,
		 		detailContent : null,
		 		updateBtn : null,
		 		datas : null
		 	}
		 	this.def = _extend(def,config,true);
		 },

		//添加到HTML
		//elem ：添加HTML结构的母元素
		addToHtml : function (elem) {
			var template = ' ',
				template_done = ' ',
				_this = this,
				data = _this.def.datas,
				_checkbox;
			elem.innerHTML = ' ';
			for(var i = 0 ,lens = data.datalist.length; i < lens ; i++) {
				if(data.datalist[i] !== null && data.datalist[i].completed !== true) {
					template += '<div class="todo-item" data-index='+i+'>'+
						   '<span class="btn"><input type="checkbox"></span>'+
						   '<span class="todo-content">'+data.datalist[i].content+'</span>'+
						   '<span class="fr"><span class="delete-btn">删除</span><span class="detail-btn">详情</span></span></div>'; 
				} else if (data.datalist[i] !== null && data.datalist[i].completed === true) {
					template_done += '<div class="todo-item done" data-index='+i+'>'+
						   '<span class="btn"><input type="checkbox" checked="true"></span>'+
						   '<span class="todo-content">'+data.datalist[i].content+'</span>'+
						   '<span class="fr"><span class="delete-btn">删除</span><span class="detail-btn">详情</span></span></div>'; 
				}
			}
			elem.innerHTML += (template+template_done);
			_checkbox = elem.querySelectorAll('input[type="checkbox"]');
			this.hadDone(_checkbox,data);
			return this;
		},

		//绑定删除按钮事件
		delFromHtml : function () {
			var _this = this,
				data = this.def.datas;
			var deleteBtn  = document.querySelectorAll('.delete-btn');
			for (var i = 0 ,lens = deleteBtn.length; i < lens; i++) {
				deleteBtn[i].addEventListener('click',function (e) {
					var _parent = this.parentNode.parentNode,
						//通过data-index属性的值获取对应的datalist对象索引
						_index = _parent.getAttribute('data-index');
					//添加自定义弹出框
					$.myAlert(data.datalist[_index].content).comfirmAlert().then(function (result) {
						if(result){
							data.delItem(_index);
							_parent.remove();
							$.removeAlert();
						}else {
							$.removeAlert();
						}
					})
					
				},false)
			}
			return this;
		},


		//是否完成（非删除）
		hadDone : function (elems,data) {
			var _elems = elems,
				_tempItem,
				_this = this;
			for(var i = 0,lens = _elems.length; i < lens; i++){
				_elems[i].addEventListener('click',function (event) {
					var _parent = this.parentNode.parentNode,
						//通过data-index属性的值获取对应的datalist对象索引
						_index = _parent.getAttribute('data-index');
					//已完成
					if(this.checked == true) {
					 	_parent.className += ' done';
						_parent.parentNode.appendChild(_parent);
						data.update(_index,'completed',true);
					//撤销已完成
					}else {
						_parent.setAttribute('class','todo-item');
						data.update(_index,'completed',false);
						//去除复选按钮后，重新渲染一次列表
						_this.addToHtml(_parent.parentNode).delFromHtml().getDetail();
					}
				})
			}
			return this;
		},

		//细节按钮功能，点击后显示详细信息
		getDetail : function () {
			var _this = this,
				data = _this.def.datas;
				//获取详情按钮和todolist项目的DOM
			var _detailBtn = document.querySelectorAll('.detail-btn'),
				_todoItem = document.querySelectorAll('.todo-item');

			for(var i = 0,lens = _detailBtn.length; i < lens ; i++){
				//绑定详情按钮
				_detailBtn[i].addEventListener('click',function (event) {
					event.stopPropagation();
					var _parent = this.parentNode.parentNode,
						//通过data-index属性的值获取对应的datalist对象索引
						_index = _parent.getAttribute('data-index');
					_this.def.detailBody.style.display = "inline-block";
					_this.def.detailTitle.innerHTML = data.datalist[_index].content;
					_this.def.detailContent.value = data.datalist[_index].detail;
					_this.def.detailTitle.parentNode.setAttribute('active',_index);
				},false);
				//绑定双击
				_todoItem[i].addEventListener('dblclick',function (event) {
					var _index = this.getAttribute('data-index');
					_this.def.detailBody.style.display = "inline-block";
					_this.def.detailTitle.innerHTML = data.datalist[_index].content;
					_this.def.detailContent.value = data.datalist[_index].detail;
					_this.def.detailTitle.parentNode.setAttribute('active',_index);
				},false);
			}
		},
		//获取细节模块中的信息，返回到todolist数据中
		setDetail : function () {
			var _this = this,
				data = _this.def.datas;
			_this.def.updateBtn.addEventListener('click',function (event) {
				var _index = this.parentNode.parentNode.getAttribute('active');
				data.update(_index,'detail',_this.def.detailContent.value).update(_index,'content',_this.def.detailTitle.innerHTML);
			},false)
		},
	}

	_global = (function () {return this || (0,eval)('this');}());
	! ('todolist' in _global) && (_global.ToDoList = HtmlModify);

}())