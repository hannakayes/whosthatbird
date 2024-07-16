// src/hooks/useWeapons.js
import { useState } from "react";

const useWeapons = () => {
  const [weapons, setWeapons] = useState([]);

  const addWeapon = (newWeapon) => {
    setWeapons((prev) => [...prev, newWeapon]);
  };

  const removeWeapon = (weaponId) => {
    setWeapons((prev) => prev.filter((w) => w.id !== weaponId));
  };

  return {
    weapons,
    addWeapon,
    removeWeapon,
  };
};

export default useWeapons;
