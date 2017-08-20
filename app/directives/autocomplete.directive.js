uiApp.directive('autocomplete', function () {
    return {
        restrict: 'EA',
        scope: {
            "id": "@",
            "placeholder": "@",
            "selected": "=",
            "debounce": "@",
            "records": "=",
            "minLength": "@",
        },
        templateUrl: 'app/partials/autocomplete.html',

        link: function(scope, elem, attrs) {
            scope.filterStr = "";
            scope.isOptionsAvaiable = false;
            scope.property = {
                id : attrs.id + "_id",
                placeholder : attrs.placeholder,
                optionId : attrs.id + "_options"
            };

            scope.filterRecords = function() {
                var regex,
                    input = scope.records,
                    filterStr = scope.filterStr;

                scope.results = [];
                if(input && input.length === 0){
                    return;
                }

                if(filterStr.length === 0){
                    scope.isOptionsAvaiable = false;
                    return;
                }

                regex = new RegExp(filterStr,"i");
                input.reduce(function(o,i){
                    if(regex.test(i)){
                        o.push(i);
                    }
                    return o;
                },scope.results);

                if(scope.results.length > 0){
                    scope.isOptionsAvaiable = true;
                }else{
                    scope.isOptionsAvaiable = false;
                }
            }

            scope.selectedRecord = function(result) {
                scope.filterStr = result;
                scope.selected = result;
                scope.isOptionsAvaiable = false;
                scope.results = [];
                scope.$emit('AfterRecordSelection',{value:result,id:attrs.id});
            }

            scope.$watch('filterStr',function(newValue,oldValue){
                if(newValue !== oldValue){
                    scope.$emit('OnChangeValue',{value:newValue,id:attrs.id});
                }
            });  

            scope.$watchCollection('records',function(newValue,oldValue){
                if(oldValue !== undefined  &&newValue !== undefined){
                    scope.records = newValue;
                    scope.filterStr = "";
                }
            });

            scope.$on('ResetStateEvent',function(event,data){
                scope.filterStr = "";
            });
        }
    };
});
