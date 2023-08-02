import { useEffect, useState } from "react";
import { Card } from "../../UI/Card/Card";
import { MealItem } from "../MealItem/MealItem";
import classes from './AvailableMeals.module.css';
import { Meal } from "../../../types/meal";

export const AvailableMeals = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchMeals = async () => {
      const fetchData = await fetch('https://order-food-7984f-default-rtdb.firebaseio.com/meals.json');

      if (!fetchData.ok) {
        throw new Error();
      }

      const mealsFromServer = await fetchData.json();
      const mealsArray: Meal[] = [];

      for (const key in mealsFromServer) {
        mealsArray.push({
          id: key,
          name: mealsFromServer[key].name,
          description: mealsFromServer[key].description,
          price: mealsFromServer[key].price,
        })
      }

      setMeals(mealsArray);
    }

    fetchMeals()
      .then(() => setIsLoading(false))
      .catch(er => {
        setIsLoading(false);
        setHasError(true)
      });
  }, []);



  const mealsList = meals.map((meal) => <MealItem
    key={meal.id}
    meal={meal}
  />);

  return (
    <section className={classes.meals}>
      {isLoading
        ? <h1 className={classes.loading}>Wait a minute, we loading your meals</h1>
        : (
          <Card>
            {
              hasError
                ? <h1 className={classes.error}>We have some troubles. Please try again later</h1>
                : <ul>{mealsList}</ul>
            }
          </Card>
        )}
    </section>
  )
};