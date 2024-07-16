// src/components/EnemyWeaponComponent.jsx
import React from "react";
import WeaponComponent from "./WeaponComponent";

const EnemyWeaponComponent = ({ enemyWeapon }) => {
  return <WeaponComponent weapon={enemyWeapon} />;
};

export default EnemyWeaponComponent;
