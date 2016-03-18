import './spinner.css';

class SpinnerServiceController {

    static $inject = ['spinnerService'];

    public state;

    constructor(public spinnerService) {

        this.state = this.spinnerService.getState();
    }
}

var SpinnerServiceComponent = {
    controller: SpinnerServiceController,
    controllerAs: 'vm',
    template:
    `<div ng-show="vm.state.visible" class="ajax-loader">
        <div class="spinner"> </div>
    </div>`
};

export default angular.module('spinner', [])
    .component('spinner', SpinnerServiceComponent)
    .service('spinnerService', function() {

        var state = {
            visible: false
        };

        return {
            getState: function() {
                return state;
            },
            show: function() {
                state.visible = true;
            },
            hide: function() {
                state.visible = false;
            }
        };
    })
    .factory('httpInterceptor', ['spinnerService', function(spinnerService) {

        return {
            request: function(request) {
                spinnerService.show();
                return request;
            },
            response: function(response) {
                spinnerService.hide();
                return response;
            }
        }
    }])
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
    }])
    .name