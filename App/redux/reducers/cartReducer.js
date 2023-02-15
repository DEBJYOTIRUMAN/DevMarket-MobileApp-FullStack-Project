let defaultState = {
  cart: {items: {}}
};

let cartReducer = (state = defaultState, action) => {
        let newState = { ...state };
        let { items } = newState.cart; 
  switch (action.type) {
    case "ADD_TO_CART":
        
      {
        let _items = {...items}; 
        let newQty = 1;
        if (_items[action.payload.id]) {
          if(action.payload.isModal){
            newQty = action.payload.qty;
          }
          else{
          if(!action.payload.qty){
            newQty = _items[action.payload.id] += 1;
          }
          else{
            newQty = _items[action.payload.id] + action.payload.qty;
          }
          if(newQty > 10){
            newQty = 10;
          }
          }
        } 
        else {
          newQty = action.payload.qty;
        }

          newState.cart = {
            items: {...newState.cart.items, [action.payload.id]: newQty}

        };
        // console.log(newState, "👉");
        return newState;
      }
    case "SUBTRACT_TO_CART": {
      let _items = {...items}; 
      let newQty = 0;
        if (_items[action.payload.id]) {

          if(action.payload.isModal){
            newQty = action.payload.qty;
          }
          else{
          newQty = _items[action.payload.id] -= 1;
          }
        } 
        else {
          newQty = action.payload.qty;
        }

          newState.cart = {
            items: {...newState.cart.items, [action.payload.id]: newQty}

        };
        // console.log(newState, "👉");
        return newState;
    }
    case "DELETE_TO_CART":
      {
      if(items[action.payload.id]){
        delete items[action.payload.id]
      }
      newState.cart = {
        items: {...newState.cart.items}
  }
      return newState;
}
    case "CLEAR_CART": {
        return defaultState;
    }

    default:
      return state;
  }
};

export default cartReducer;
