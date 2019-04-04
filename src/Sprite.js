import React from 'react';

export default function Sprite(props) {
  return (
    <img src={`${process.env.PUBLIC_URL}/regular/${props.name}.png`} />
  );
}