import pokemonDetail from '../pokemon-detail/pokemon-detail';

class PokemonListController {

    public pokemons: any[];
    public next: string;
    public pokemon;
    public search;

    static $inject = ['$http'];

    constructor(public $http) {
        this.pokemons = [];
        this.init();
    }

    init() {
        this.$http.get('http://pokeapi.co/api/v1/pokemon/?limit=12').then(this.load);
    }

    loadMore() {
        this.$http.get(`http://pokeapi.co/${this.next}`).then(this.load);
    }

    setPokemon(pokemon) {
        this.pokemon = pokemon;
    }

    filterByType = (item) => {
        if (this.search)
            return item.types.some(f => f.name.includes(this.search));
        else
            return true;
    }

    private load = (response) => {
        this.next = response.data.meta.next;
        this.pokemons.push(...response.data.objects);
    }

}

var PokemonListComponent = {
    controller: PokemonListController,
    controllerAs: 'vm',
    template: require('./pokemon-list.html')
};

export default angular.module('pokemon-list', [pokemonDetail])
    .component('pokemonList', PokemonListComponent)
    .name;