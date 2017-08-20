uiApp.directive('modal',['modalService',function(modalService){
    return {
        restrict : 'E',
        link : function(scope,element,attrs){
            $(element).appendTo('body');        
            
            modalService.add({
                open: open,
                close: close
            });
            
            function open() {
                $(element).show();
                $('body').addClass('modal-open');
            }

            function close() {
                $(element).hide();
                $('body').removeClass('modal-open');
            }
        }
    }
}]);