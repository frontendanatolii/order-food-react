import { ReactNode, Reducer, useReducer } from "react"
import { CartContext } from "./cart-context"
import { Meal } from "../types/meal";

export interface CartMeal extends Meal {
  amount: number,
};

type cartReducerInitialState = {
  items: CartMeal[],
  totalAmount: number
};

type PayloadType = {
  type: string,
  item?: CartMeal,
  id?: string,
}

const initialState: cartReducerInitialState = {
  items: [],
  totalAmount: 0,
};

const cartReducer: Reducer<cartReducerInitialState, PayloadType> = (state: cartReducerInitialState, action: PayloadType) => {
  if (action.type === 'ADD' && action.item) {
    let updatedItems: CartMeal[];

    if (state.items.map(item => item.id).includes(action.item?.id)) {
      const existingMealIndex = state.items.findIndex((item) => item.id === action.item?.id);
      const existingMeal = state.items[existingMealIndex];

      const updateItem = {
        ...existingMeal,
        amount: existingMeal.amount + action.item.amount
      };

      updatedItems = [...state.items];
      updatedItems[existingMealIndex] = updateItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    const updatedTotal = state.totalAmount + +action.item.price * action.item.amount;
    
    return {
      items: updatedItems,
      totalAmount: updatedTotal,
    }
  }

  if (action.type === 'REMOVE' && action.id) {
    let updatedItems: CartMeal[];
    
    const existingMealIndex = state.items.findIndex((item) => item.id === action.id);
    const existingMeal = state.items[existingMealIndex];

    if (existingMeal.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else if (existingMeal.amount > 1) {
      const updateItem = {
        ...existingMeal,
        amount: existingMeal.amount - 1,
      }
      updatedItems = [...state.items];
      updatedItems[existingMealIndex] = updateItem;
    } else {
      updatedItems = state.items;
    }

    const updatedTotal = state.totalAmount - existingMeal.price;
    
    return {
      items: updatedItems,
      totalAmount: updatedTotal,
    }
  }

  if (action.type === 'CLEAR') {
    return initialState;
  }

  return initialState;
}

interface Props {
  children: ReactNode,
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, initialState);

  const onAddItem = (item: CartMeal) => {
    cartDispatch({type: 'ADD', item: item});
  };

  const onRemoveItem = (id: string) => {
    cartDispatch({type: 'REMOVE', id: id});
  };

  const onClearCart = () => {
    cartDispatch({type: 'CLEAR'});
  }

  return (
    <CartContext.Provider value={{
      items: cartState.items,
      totalAmount: cartState.totalAmount,
      addItem: onAddItem,
      removeItem: onRemoveItem,
      clearCart: onClearCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}