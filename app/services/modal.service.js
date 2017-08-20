uiApp.service('modalService',[function(){

    var modal = {};
    
    this.open = function(){
        modal.open();
    }

    this.add = function(_modal){
        modal = _modal;
    }

    this.close = function(){
        modal.close();
    }
}]);