(function(angular){
	var app = angular.module('todos.controller', ['ngRoute']);
	app.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/:status?', {
			templateUrl: 'todoId',
			controller: 'myController'
		});
	}]);
	app.controller('myController', ['$scope','$routeParams', 'Todos', function ($scope, $routeParams, Todos){
		//获取数据
		$scope.tasks = Todos.get();
		//功能一：添加数据		
		$scope.add = function(){
			if(!$scope.newTask) {
				return;
			}
			Todos.add($scope.newTask);
			$scope.newTask = '';
		};
		//功能二：删除数据
		$scope.remove = Todos.remove;
		//功能三：编辑数据
		$scope.isEditingId = -1;
		$scope.edit = function(id){
			$scope.isEditingId = id;
		};
		$scope.save = function(){
			$scope.isEditingId = -1;
		};		
		//功能四：全选/全不选
		$scope.isSelected = false;
		$scope.toggleAll = function(){
			Todos.toggleAll($scope.isSelected);
		};
		//监视数组变化  true:深度监视 
		$scope.$watch('tasks', function(newValue, oldVAlue){
			$scope.isSelected = Todos.isSelectedAll();
			Todos.save();
		}, true);
		//功能五：清除所有完成项
		$scope.clearCompleted = Todos.clearCompleted;
		//功能5.1：清除所有选择框是否显示
		$scope.isShow = Todos.isShow;
		//功能六：显示为未完成项数目		
		$scope.unCompleted = Todos.unCompleted;
		//功能七：路由配置
		$scope.isCompleted = {};
		switch($routeParams.status) {
			case 'active':
				$scope.isCompleted = {completed: false};
				break;
			case 'completed':
				$scope.isCompleted = {completed: true};
				break;
			default :
				$scope.isCompleted = {};
				break;
		}
		
	}]);
})(angular);