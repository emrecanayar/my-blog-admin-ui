// DarkModeReducer.ts
export type State = {
    darkMode: boolean;
  };
  
  export type Action =
    | { type: "LIGHT" }
    | { type: "DARK" }
    | { type: "TOGGLE" };
  
  const DarkModeReducer = (state: State, action: Action): State => {
    switch (action.type) {
      case "LIGHT":
        return {
          darkMode: false,
        };
      case "DARK":
        return {
          darkMode: true,
        };
      case "TOGGLE":
        return {
          darkMode: !state.darkMode,
        };
      default:
        return state;
    }
  };
  
  export default DarkModeReducer;
  