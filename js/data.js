//负责数据操作

var Data = function (list){
	//保存todolist的数据
	this.datalist = list;
};

Data.prototype = {
	getItem : function (newItem) {
		this.datalist.push(newItem);
		this.saveData(this.datalist);
	},

	//index：数据的data-index
	delItem : function (index) {
		if(!index || !this.datalist[index]) return;
		this.datalist.splice(index,1,null);
		this.saveData(this.datalist);
	},

	//储存todolist数据到localstorage中
	saveData : function (data) {
		localStorage.setItem('List',JSON.stringify(data));
	},

	// 参数 i:数据索引，state：数据状态属性，value：状态属性的值（true/false）
	update : function (i,state,value) {
		this.datalist[i][state] = value;
		this.saveData(this.datalist);
		return this;
	},
	//清除localStorage数据
	dataClear : function () {
		localStorage.clear();
	}

};

