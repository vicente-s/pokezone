import React from "react";
import PokemonCard from "./PokemonCard";
import PokemonModal from "./PokemonModal";

class AllPokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPokemon: [],
      selectedPokemon: null,
      showPokemonModal: false,
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.selectPokemon = this.selectPokemon.bind(this);
  }

  getKhantoPokemon = async () => {
    let results = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=150/");
    let allPokemon = await results.json();
    allPokemon.results.forEach((pokemon) => {
      fetch(pokemon.url)
        .then((resp) => resp.json())
        .then((pokemon) => {
          let allPokemonCopy = this.state.allPokemon;
          allPokemonCopy.push(pokemon);
          this.setState({ allPokemon: allPokemonCopy });
        });
    });
  };

  selectPokemon(e, pokemon) {
    this.setState({ selectedPokemon: pokemon });
    this.handleShow();
  }

  handleShow() {
    this.setState({ showPokemonModal: true });
  }

  handleHide() {
    this.setState({ showPokemonModal: false });
  }

  componentDidMount() {
    this.getKhantoPokemon();
  }

  render() {
    // Pokemon Cards
    let pokemonCards = this.state.allPokemon.map((pokemon) => (
      <PokemonCard
        key={pokemon.id}
        pokemon={pokemon}
        selectPokemon={this.selectPokemon}
      />
    ));

    // Create Modal

    const modal = this.state.showPokemonModal ? (
      <PokemonModal selectedPokemon={this.state.selectedPokemon}>
        <div className="pokemon-modal">
          <p>You've selected {this.state.selectedPokemon.name}</p>
          <button onClick={this.handleHide}>Hide Modal</button>
        </div>
      </PokemonModal>
    ) : null;

    return (
      <div>
        <div id="pokemon-container">{pokemonCards}</div>
        {modal}
      </div>
    );
  }
}

export default AllPokemon;
