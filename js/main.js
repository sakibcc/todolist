$(function () {
	//读取localstorage数据
	var _litsData = loadData();
	//创建data实例，用于操作localstorage数据和todolist数据
	var data= new Data(_litsData);

	//定义DOM
	var formSubmit = document.getElementById('button'),
		listBody = document.querySelector('.todo-list'),
		_input = document.querySelector(".todo-add input"),
		//详情框的dom元素
		_closeBtn = document.querySelector('.close'),
		_updateBtn = document.querySelector('.update'),
		_detailContent = document.querySelector('.descript'),
		_detailTitle = document.querySelector('.detail-title'),
		_detailBody = document.querySelector('.detail-body'),
		//复选框
		_checkbox;

	//插件todolist操作实例
	var todolist = new TodoList({
			detailBody : _detailBody,
			detailTitle : _detailTitle,
			detailContent : _detailContent,
			updateBtn : _updateBtn,
			datas : data
		});

	//任务项目构造函数，配置3个属性
	//content : todolist标题内容
	//detail ： 详细内容
	//completed ：判断是否完成
	function NewItem() {
		this.content = '';
		this.detail = '';
		this.completed = false;
	}
	//读取localstorage的函数
	function loadData() {
		var history = localStorage.getItem('List');
		if(history && !JSON.parse(history).every(function (elem,index,arr) {return elem === null;})) {
			return JSON.parse(history);
		}else {
			localStorage.clear();
			return [];
		}
	}
	//初始化
	function init() {
		todolist.addToHtml(listBody).delFromHtml().getDetail();
		todolist.setDetail();
		//详情区域删除按钮绑定事件
		_closeBtn.addEventListener('click',function (event) {
			this.parentNode.parentNode.style.display = 'none';
		});
		//配置自定义弹框的各个类名
		$.myAlertconfig();
	}


	//初始化开始
	init();
	//绑定事件到提交按钮
	formSubmit.addEventListener('click',function (e) {
		var _newItem = new NewItem();
		e.preventDefault();
		//如果ipnut没内容，直接返回
		if(!_input.value) return;
		//将输入的内容复制到centent属性
		_newItem.content = _input.value;
		data.getItem(_newItem);
		todolist.addToHtml(listBody).delFromHtml().getDetail();
		//输入后清空输入框
		_input.value = '';
	},false);

})
