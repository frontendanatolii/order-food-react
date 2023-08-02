import mealsImage from '../../../assets/meals.jpg';
import { HeaderCartButton } from './HeaderCartButton/HeaderCartButton';
import classes from './Header.module.css';

interface Props {
  onShowCart: () => void,
}

export const Header: React.FC<Props> = ({ onShowCart }) => {
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="A table full of delicious meals" />
      </div>
    </>
  )
}