let defaultState = {
    total: 0
};
let totalReducer = (state = defaultState, action) => {
    switch(action.type) {
        case "ADD_TOTAL": {
            let newState = { ...state };
            newState.total = 
                action.payload.newTotal
            
            // console.log(newState, "👉");
            return newState;
        }
        case "CLEAR_TOTAL": {
            return defaultState;
        }
        default:
        return state;
    }
};
export default totalReducer;