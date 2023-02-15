let defaultState = {
    product: []
  };
let productReducer = (state = defaultState, action) => {
    let newState = { ...state };
    switch(action.type) {
        case "ADD_PRODUCT": {
            
            newState.product = action.payload.products;
            // console.log(newState, "👉");
            return newState;
        }
        case "DELETE_TO_PRODUCT": {
           if(newState.product[action.payload.index]){
               newState.product.splice(action.payload.index, 1);
           }
        //    console.log(newState, "👉");
           return newState;

        }
        case "CLEAR_PRODUCT": {
            return defaultState;
        }
        default:
        return state;
    }
};
export default productReducer;