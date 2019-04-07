import React from 'react';

export default function Sprite(props) {
  return (
    <div
      className={`circle ${props.isSearched ? 'highlight' : ""}`}
      key={props.name}
      onClick={() => props.setSpecificAndPokemon(true, props.fullName)}
    >
      <img
        src={`${process.env.PUBLIC_URL}/regular/${props.name}.png`}
        alt={props.fullName}
        title={props.fullName}
      />
    </div>
  );
}