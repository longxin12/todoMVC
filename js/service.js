(function(angular){
	var app = angular.module('todos.service', []);
	app.service('Todos', ['$window', function($window){
		var storage = $window.localStorage;
		var str = storage.getItem('todos');
		var tasks = JSON.parse(str);
		//获取数据
		this.get = function (){
			return tasks;
		};
		//添加数据
		this.add = function(newTask){
			var id = -1;
			if(tasks.length === 0){
				id = 0;
			} else {
				for (var i = 0; i < tasks.length; i++) {
					if(tasks[i].id > id){
						id = tasks[i].id;
					}
				}
			}
			tasks.push({id: id + 1, name: newTask, completed: false});
			this.save();
		};
		this.save = function(){
			storage.setItem('todos', JSON.stringify(tasks));
		};
		//删除数据
		this.remove = function(id){
			for (var i = 0; i < tasks.length; i++) {
				if(tasks[i].id === id){
					tasks.splice(i, 1);
					// this.save();
					storage.setItem('todos', JSON.stringify(tasks));
					return;
				}
			}
		};
		//全选/全不选
		this.toggleAll = function(isSelected){
			for (var i = 0; i < tasks.length; i++) {
				tasks[i].completed = isSelected;
			}
		};
		//列表项全部选中时，全选框选中
		this.isSelectedAll = function(){
			for (var i = 0; i < tasks.length; i++) {
				if(!tasks[i].completed){
					return false;
				}
			}
			return true;
		};
		//清除所有完成项
		this.clearCompleted = function(){
			var tmp = [];
			for (var i = 0; i < tasks.length; i++) {
				if(!tasks[i].completed){
					tmp.push(tasks[i]);
				}
			}
			tasks.length = 0;
			Array.prototype.push.apply(tasks, tmp);
			this.save();
		};
		//清除所有选择框是否显示
		this.isShow = function(){
			for (var i = 0; i < tasks.length; i++) {
				if(tasks[i].completed){
					return true;
				}
			}
			return false;
		};
		//显示为未完成项数目
		this.unCompleted = function(){
			var count = 0;
			for (var i = 0; i < tasks.length; i++) {
				if(!tasks[i].completed){
					count++;
				}
			}
			return count;
		};
	}]);
})(angular);