import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../../contexts/cart-context";
import { CartIcon } from "../../../Cart/CartIcon/CartIcon";
import classes from './HeaderCartButton.module.css';

interface Props {
  onClick: () => void,
};

export const HeaderCartButton: React.FC<Props> = ({ onClick }) => {
  const context = useContext(CartContext);
  const [buttonHasAnimate, setButtonHasAnimate] = useState(false);
  const btnClasses = `${classes.button} ${buttonHasAnimate ? classes.bump : ''}`;
  
  const itemsInCart = context.items.reduce((amount, item) => amount + item.amount, 0);

  useEffect(() => {
    if (itemsInCart === 0) {
      return;
    }
    setButtonHasAnimate(true);

    const timer = setTimeout(() => {
      setButtonHasAnimate(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    }
  }, [itemsInCart])

  return (
    <button className={btnClasses} onClick={onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{itemsInCart}</span>
    </button>
  )
}