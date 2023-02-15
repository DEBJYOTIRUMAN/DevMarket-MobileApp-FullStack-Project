let defaultState = {
    payment: {}
  };
let paymentReducer = (state = defaultState, action) => {
    switch(action.type) {
        case "ADD_PAYMENT": {
            let newState = { ...state };
            newState.payment = {
                ...action.payload.userPayment
            }
            // console.log(newState, "👉");
            return newState;
        }
        case "CLEAR_PAYMENT": {
            return defaultState;
        }
        default:
        return state;
    }
};
export default paymentReducer;