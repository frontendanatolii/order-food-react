import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

interface Props {
  onConfirm: (userData : {name: string, street: string, postalCode: string, city: string}) => void,
  onCancel: () => void,
};

const isEmpty = (text: string) => text.trim() === '';

export const CheckoutForm: React.FC<Props> = ({ onConfirm, onCancel }) => {
  const nameInput = useRef<HTMLInputElement | null>(null);
  const postalInput = useRef<HTMLInputElement | null>(null);
  const streetInput = useRef<HTMLInputElement | null>(null);
  const cityInput = useRef<HTMLInputElement | null>(null);
  const [nameIsValid, setNameIsValid] = useState(true);
  const [streetIsValid, setStreetIsValid] = useState(true);
  const [postalIsValid, setPostalIsValid] = useState(true);
  const [cityIsValid, setCityIsValid] = useState(true);

  const onOrder = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (nameInput.current && postalInput.current && streetInput.current && cityInput.current) {
      setNameIsValid(!isEmpty(nameInput.current.value));
      setStreetIsValid(!isEmpty(streetInput.current.value));
      setPostalIsValid(postalInput.current.value.trim().length === 5);
      setCityIsValid(!isEmpty(cityInput.current.value));
      const allInputsIsValid = nameIsValid && streetIsValid && postalIsValid && cityIsValid;

      if (allInputsIsValid) {
        const userData = {
          name: nameInput.current.value,
          street: streetInput.current.value,
          postalCode: postalInput.current.value,
          city: cityInput.current.value,
        }

        onConfirm(userData);

        nameInput.current.value = '';
        streetInput.current.value = '';
        postalInput.current.value = '';
        cityInput.current.value = '';
      }
    }
  };

  return (
    <form className={classes.form} onSubmit={onOrder} onReset={onCancel}>
      <div className={classes.control}>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" ref={nameInput} />
        {!nameIsValid ? <h4 className={classes.invalid}>Please, enter your name</h4> : null}
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInput} />
        {!streetIsValid
          ? <h4 className={classes.invalid}>Please, enter your street</h4>: null
        }
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal code</label>
        <input type="text" id="postal" ref={postalInput} />
        {!postalIsValid 
          ? <h4 className={classes.invalid}>Please, enter your postal code(5 numbers)</h4>: null
        }
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInput} />
        {!cityIsValid
          ? <h4 className={classes.invalid}>Please, enter your city</h4>: null
        }
      </div>
      <div className={classes.actions}>
        <button type='reset'>Cancel</button>
        <button type='submit' className={classes.submit}>Confirm</button>
      </div>
    </form>
  )
}
