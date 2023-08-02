import { useContext } from 'react';
import { CartProvider } from '../../../contexts/CartProvider';
import { Meal } from '../../../types/meal';
import { MealItemForm } from '../MealItemForm/MealItemForm';
import classes from './MealItem.module.css';
import { CartContext } from '../../../contexts/cart-context';

interface Props {
  meal: Meal,
}

export const MealItem: React.FC<Props> = ({ meal }) => {
  const cartCtx = useContext(CartContext);
  const { id, name, description, price } = meal;

  const addToCartHandler = (amount: number) => {
    cartCtx.addItem({
      id: id,
      name: name,
      description: description,
      amount: amount,
      price: price,
    });
  };

  const fixedPrice = price.toFixed(2);

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{fixedPrice}</div>
      </div>
      <CartProvider>
        <MealItemForm mealId={id} onAdd={addToCartHandler} />
      </CartProvider>
    </li>
  )
}