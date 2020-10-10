import React from "react";
import PokemonCard from "./PokemonCard";
// import PokemonCard from "./PokemonCard.js";

class AllPokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPokemon: [],
    };
  }

  componentDidMount() {
    this.getKhantoPokemon();
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

  render() {
    let pokemonCards = this.state.allPokemon.map((pokemon) => (
      <PokemonCard
        key={pokemon.id}
        id={pokemon.id}
        name={pokemon.name}
        img={pokemon.sprites.front_default}
      />
    ));
    return <div className="pokemon-container">{pokemonCards}</div>;
  }
}

export default AllPokemon;
