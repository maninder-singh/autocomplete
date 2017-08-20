uiApp.controller('UICtrl',['$scope','uiService','modalService',function($scope,uiService,modalService){
    
    var _teamWiseData = {},
        constants = {
            "teamsId" : "teamsId",
            "employeesId":"employeeId"
        };

    $scope.teams = [];
    $scope.teamWiseEmployees = [];
    $scope.isFormValid = true;
    $scope.errorMsg = "";
    $scope.selectedTeam = "";
    $scope.selectedEmployee = "";
    $scope.showConfirmationBox = false;
    
    function resets(){
        $scope.isFormValid = true;
        $scope.errorMsg = "";
        $scope.selectedTeam = "";
        $scope.selectedEmployee = "";
    }

    function parseResponse(input){
        return input.reduce(function(o,i){
            o.teamWiseEmployees[i.team] = i.employees;
            o.teams.push(i.team);
            return o;
        },{"teams":[],"teamWiseEmployees":{}});
    }
    
    function fetchTeamData(){
        var promise = uiService.getTeamWiseData();
        promise.then(function(response){
            var data = parseResponse(response);
            $scope.teams = data.teams;
            _teamWiseData = data.teamWiseEmployees;    
        },function(error){});
    }

    function init(){
        fetchTeamData();
    }

    function isFormDataValid(isValid,isEmployeeInvalid){
        if(isValid){
            $scope.errorMsg = "";
            $scope.isFormValid = true;
            $scope.confirmationPrompt();
        }else{
            $scope.isFormValid = false;
            $scope.errorMsg = isEmployeeInvalid ? 
                "Selected Employee does not exists in employee data" :
                "Selected team does not exists in data";
        }
    }

    $scope.openModal = function(){
        resets();
        $scope.showConfirmationBox = false;
        modalService.open();
        $scope.$broadcast('ResetStateEvent',{});
    }

    $scope.closeModal = function(){
        modalService.close();
    }

    $scope.confirmationPrompt = function(){
        if($scope.selectedTeam.length === 0 && $scope.selectedEmployee.length === 0){
            $scope.showConfirmationBox = false;
            $scope.closeModal();    
        }
        $scope.showConfirmationBox = true;
    }

    $scope.yes = function(){
        $scope.closeModal();
    }

    $scope.no = function(){
        $scope.showConfirmationBox = false;
    }

    $scope.save = function(){
        if(!_teamWiseData.hasOwnProperty($scope.selectedTeam)){
            isFormDataValid(false,false);
            return;
        }

        if($scope.selectedEmployee.length === 0){
            isFormDataValid(false,true);
            return;
        }

        var teamData = _teamWiseData[$scope.selectedTeam];
        for(let index = 0; index < teamData.length ; index++){
            if(teamData[index].localeCompare($scope.selectedEmployee) === 0){
                isFormDataValid(true,true);
                return;
            }
        }
        isFormDataValid(false,true);
    }

    $scope.$on('AfterRecordSelection',function(event,data){
        if(_teamWiseData.hasOwnProperty(data.value) && data.id.localeCompare(constants.teamsId) === 0){
            $scope.selectedTeam = data.value;
            $scope.teamWiseEmployees = _teamWiseData[data.value];
        }
    });

    $scope.$on('OnChangeValue',function(event,data){
        if(data.id.localeCompare(constants.teamsId) === 0){
            $scope.selectedTeam = data.value;
            if(!_teamWiseData.hasOwnProperty($scope.selectedTeam)){
                $scope.teamWiseEmployees = [];
                $scope.selectedEmployee = "";
            }
        }else{
            $scope.selectedEmployee = data.value;
        }
    });
    
    init();

}]);