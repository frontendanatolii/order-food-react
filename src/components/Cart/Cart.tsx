import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../contexts/cart-context';
import { Modal } from '../UI/Modal/Modal';
import classes from './Cart.module.css';
import { CartItem } from './CartItem/CartItem';
import { CartMeal } from '../../contexts/CartProvider';
import { CheckoutForm } from './Checkout/Checkout';

interface Props {
  onHideCart: () => void,
}

export const Cart: React.FC<Props> = ({ onHideCart }) => {
  const context = useContext(CartContext);
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [isCartIsEmpty, setIsCartIsEmpty] = useState(true);

  useEffect(() => {
    if (context.items.length !== 0) {
      setIsCartIsEmpty(false);
    } else {
      setIsCartIsEmpty(true);
    }
  }, [context.items])

  const cartItemRemoveHandler = (id: string) => {
    context.removeItem(id);
    
    if (context.items.length === 0) {
      setIsCartIsEmpty(true);
    }
  };

  const cartItemAddHandler = (item: CartMeal) => {
    context.addItem({
      ...item,
      amount: 1,
    });
  };

  const onOrder = () => {
    if (!isCartIsEmpty) {
      setFormIsOpen(true);
    }
  };

  const onConfirmOrder = (userData: {name: string, street: string, postalCode: string, city: string}) => {
    fetch('https://order-food-7984f-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        items: context.items
      })
    });

    setFormIsOpen(false);

    context.clearCart();
  };

  const onCancelOrder = () => {
    setFormIsOpen(false);
  };

  return (
    <Modal onClose={onHideCart}>
      {
        formIsOpen
          ? <CheckoutForm onCancel={onCancelOrder} onConfirm={onConfirmOrder} />
          : null
      }
      {
        isCartIsEmpty
          ? <h1>Please, add some meal to your cart</h1>
          : null
      }
      {
        !formIsOpen && !isCartIsEmpty
          ? (
              <ul className={classes['cart-items']}>
                {context.items.map((item) => (
                  <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={() => cartItemRemoveHandler(item.id)}
                    onAdd={() => cartItemAddHandler(item)}
                  />
                ))}
              </ul>
            )
          : null
      }
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{context.totalAmount.toFixed(2)}</span>
      </div>
      {!formIsOpen ? (
        <div className={classes.actions}>
          <button className={classes['button-alt']} onClick={onHideCart} >Close</button>
          <button className={classes.button} onClick={onOrder}>Order</button>
        </div>
      ) : null}
    </Modal>
  )
}