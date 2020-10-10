import React from "react";

class PokemonCard extends React.Component {
  render() {
    return (
      <div>
        <div className="pokemon-card-header">{this.props.id}</div>
        <img src={this.props.img} alt={this.props.name + " Image"} />
        <div className="pokemon-card-footer">{this.props.name}</div>
      </div>
    );
  }
}

export default PokemonCard;
