import pokemonDetail from '../pokemon-detail/pokemon-detail';

export interface IPokemon {
    attack: number;
    defense: number;
    hp: number;
    sp_atk: number;
    sp_def: number;
    speed: number;
    weight: number;
}

class PokemonListController {

    public pokemons: IPokemon[];
    public pokemon: IPokemon;
    public next: string;
    public search: string;

    static $inject = ['$http'];

    constructor(public $http: ng.IHttpService) {
        this.pokemons = [];

    }

    $onInit() {
        this.$http.get('http://pokeapi.co/api/v1/pokemon/?limit=12').then(this.load);
    }

    loadMore() {
        this.$http.get(`http://pokeapi.co/${this.next}`).then(this.load);
    }

    setPokemon(pokemon: IPokemon) {
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