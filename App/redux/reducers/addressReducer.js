let defaultState = {
    address: {}
  };
let addressReducer = (state = defaultState, action) => {
    switch(action.type) {
        case "ADD_ADDRESS": {
            let newState = { ...state };
            newState.address = {
                ...action.payload.userAddress
            }
            // console.log(newState, "👉");
            return newState;
        }
        case "CLEAR_ADDRESS": {
            return defaultState;
        }
        default:
        return state;
    }
};
export default addressReducer;