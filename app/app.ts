import 'angular';
import 'bootstrap/dist/css/bootstrap.css'

import pokemonList from './pokemon-list/pokemon-list';
import pokemonDetail from './pokemon-detail/pokemon-detail';
import spinner from './spinner/spinner'

function App() {
    return {
        restrict: 'E',
        template: `
        <spinner></spinner>        
        <pokemon-list></pokemon-list>          
        `,
        controller: AppController,
        controllerAs: 'App'
    }
}

class AppController {

    constructor() {
    }
}
angular.module('app',
    [pokemonList, pokemonDetail, spinner])
    .directive('app', App);

angular.bootstrap(document, ['app']);