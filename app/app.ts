import 'angular';
import 'bootstrap/dist/css/bootstrap.css'

import pokemonList from './pokemon-list/pokemon-list';
import spinner from './spinner/spinner'

var AppComponent = {
    template: `
        <spinner></spinner>        
        <pokemon-list></pokemon-list>          
        `,
};

angular.module('app',
    [pokemonList, spinner])
    .component('app', AppComponent)

angular.bootstrap(document, ['app']);