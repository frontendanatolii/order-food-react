import classes from './CartItem.module.css';

interface Props {
  price: number,
  name: string,
  amount: number,
  onRemove: () => void,
  onAdd: () => void,
};

export const CartItem: React.FC<Props> = ({ price, name, amount, onAdd, onRemove }) => {
  const fixedPrice = `$${price.toFixed(2)}`;

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{fixedPrice}</span>
          <span className={classes.amount}>x {amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={onRemove}>−</button>
        <button onClick={onAdd}>+</button>
      </div>
    </li>
  );
};
