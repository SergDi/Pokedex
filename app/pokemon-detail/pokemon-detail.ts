var PokemonDetailComponent = {
    controllerAs: 'vm',
    template: require('./pokemon-detail.html'),
    bindings: {
       pokemon: '='
    }
};

export default angular.module('pokemon-detail', [])
    .component('pokemonDetail', PokemonDetailComponent)
    .name;