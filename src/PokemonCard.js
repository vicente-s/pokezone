import React from "react";

class PokemonCard extends React.Component {
  render() {
    return (
      <div
        className="pokemon-card"
        onClick={(e) => this.props.selectPokemon(e, this.props.pokemon)}
      >
        <div className="pokemon-card-header">{this.props.pokemon.id}</div>
        <img
          src={
            this.props.pokemon.sprites.other["official-artwork"].front_default
          }
          alt={this.props.pokemon.name + " Image"}
        />
        <div className="pokemon-card-footer">{this.props.pokemon.name}</div>
      </div>
    );
  }
}

export default PokemonCard;
