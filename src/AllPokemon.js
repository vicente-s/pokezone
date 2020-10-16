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
          <div className="pokemon-modal-container">
            <h2>{this.state.selectedPokemon.name}</h2>
            <div className="pokemon-info">
              <div className="pokemon-info-left-column">
                {/*<img
                  src={
                    this.state.selectedPokemon.sprites.other["official-artwork"]
                      .front_default
                  }
                  alt={this.state.selectedPokemon.name + " Sprite"}
                />*/}
                <p>Types: {this.state.selectedPokemon.types[0].type.name}</p>
              </div>
              <div className="pokemon-info-right-column">
                <ul className="height-weight-list">
                  <li>
                    Height: {this.state.selectedPokemon.height} decimeters
                  </li>
                  <li>
                    Weight: {this.state.selectedPokemon.weight} hectograms
                  </li>
                </ul>
                <dl>
                  <dt>Stats</dt>
                  <dd className="percentage percentage-10">
                    <span className="text">HP</span>
                  </dd>
                  <dd className="percentage percentage-20">
                    <span className="text">Attack</span>
                  </dd>
                  <dd className="percentage percentage-30">
                    <span className="text">Defense</span>
                  </dd>
                  <dd className="percentage percentage-40">
                    <span className="text">Special Attack</span>
                  </dd>
                  <dd className="percentage percentage-50">
                    <span className="text">Special Defense</span>
                  </dd>
                  <dd className="percentage percentage-60">
                    <span className="text">Speed</span>
                  </dd>
                </dl>
              </div>
            </div>
            {/* <p>Abilities: </p> */}
            <button onClick={this.handleHide}>Hide Modal</button>
          </div>
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
