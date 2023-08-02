import { useRef } from "react";
import { Input } from "../../UI/Input/Input";
import classes from './MealItemForm.module.css';

interface Props {
  mealId: string,
  onAdd: (amount: number) => void,
}

export const MealItemForm: React.FC<Props> = ({ mealId, onAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputRef.current) {
      onAdd(+inputRef.current.value);
      inputRef.current.value = '1';
    }
  };

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <Input
        ref={inputRef}
        label="Amount"
        id={"amount_" + mealId}
        input={{
          type: 'number',
          min: '1',
          max: '10',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button type="submit">+ Add</button>
    </form>
  )
}