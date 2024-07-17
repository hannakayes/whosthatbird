import React, { createContext, useReducer } from "react";

// Create the context
const GameContext = createContext();

// Initial state for the game context
const initialState = {
  game: null,
  weapons: [],
};

// Reducer function to manage state transitions
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_GAME":
      return { ...state, game: action.payload };
    case "ADD_WEAPON":
      return { ...state, weapons: [...state.weapons, action.payload] };
    default:
      return state;
  }
};

// GameProvider component to provide the context to children
export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const startGame = () => {
    const newGame = { id: 1, name: "Sample Game" }; // Replace with actual game initialization
    dispatch({ type: "SET_GAME", payload: newGame });
  };

  return (
    <GameContext.Provider value={{ state, dispatch, startGame }}>
      {children}
    </GameContext.Provider>
  );
};

// Custom hook for accessing game context
export const useGame = () => React.useContext(GameContext);

// Export GameContext for use in other components
export { GameContext };
