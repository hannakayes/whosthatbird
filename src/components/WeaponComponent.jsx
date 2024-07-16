// src/components/WeaponComponent.jsx
import React from "react";

const WeaponComponent = ({ weapon }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: weapon.position.x,
        top: weapon.position.y,
      }}
    >
      {/* Render weapon based on type */}
      <img src={weapon.imageSrc} alt="Weapon" />
    </div>
  );
};

export default WeaponComponent;
