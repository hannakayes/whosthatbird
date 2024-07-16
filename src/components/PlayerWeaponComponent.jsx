// src/components/PlayerWeaponComponent.jsx
import React from "react";
import WeaponComponent from "./WeaponComponent";

const PlayerWeaponComponent = ({ playerWeapon }) => {
  return <WeaponComponent weapon={playerWeapon} />;
};

export default PlayerWeaponComponent;
