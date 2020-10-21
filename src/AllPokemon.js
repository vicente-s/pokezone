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
    let results = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=151/");
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
            {/* POKEMON NAME */}
            <div className="pokemon-modal-header">
              <h2>{this.state.selectedPokemon.name}</h2>
              <button onClick={this.handleHide}>Hide this modal</button>
            </div>
            <div className="pokemon-info">
              <div className="pokemon-info-left-column">
                <p>No. {this.state.selectedPokemon.id}</p>
                <img
                  src={
                    this.state.selectedPokemon.sprites.other["official-artwork"]
                      .front_default
                  }
                  alt={this.state.selectedPokemon.name + " Sprite"}
                />
                <ul className="pokemon-types">
                  {this.state.selectedPokemon.types.map((type) => (
                    <li>{type.type.name}</li>
                  ))}
                </ul>
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
                  <dd
                    className={
                      "percentage percentage-" +
                      this.state.selectedPokemon.stats[0].base_stat
                    }
                  >
                    <span className="text">HP</span>
                  </dd>
                  <dd
                    className={
                      "percentage percentage-" +
                      this.state.selectedPokemon.stats[1].base_stat
                    }
                  >
                    <span className="text">Attack</span>
                  </dd>
                  <dd
                    className={
                      "percentage percentage-" +
                      this.state.selectedPokemon.stats[2].base_stat
                    }
                  >
                    <span className="text">Defense</span>
                  </dd>
                  <dd
                    className={
                      "percentage percentage-" +
                      this.state.selectedPokemon.stats[3].base_stat
                    }
                  >
                    <span className="text">Special Attack</span>
                  </dd>
                  <dd
                    className={
                      "percentage percentage-" +
                      this.state.selectedPokemon.stats[4].base_stat
                    }
                  >
                    <span className="text">Special Defense</span>
                  </dd>
                  <dd
                    className={
                      "percentage percentage-" +
                      this.state.selectedPokemon.stats[5].base_stat
                    }
                  >
                    <span className="text">Speed</span>
                  </dd>
                </dl>
                <ul>
                  <li>
                    <img
                      src={this.state.selectedPokemon.sprites.front_default}
                    />
                  </li>
                </ul>
              </div>
            </div>
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
