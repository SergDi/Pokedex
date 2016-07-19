import pokemonDetail from '../pokemon-detail/pokemon-detail';

interface IPokemon {
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
        this.next = 'api/v1/pokemon/?limit=12';
        this.loadMore();
    }

    loadMore() {
        this.load(this.next);
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

    private load(param) {
        this.$http.get<any>(`http://pokeapi.co/${param}`).then(response => {
            this.next = response.data.meta.next;
            this.pokemons.push(...response.data.objects);
        });
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