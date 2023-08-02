import { useState } from 'react';
import { Cart } from './components/Cart/Cart';
import { Header } from './components/Layout/Header/Header';
import { Meals } from './components/Meals/Meals/Meals';
import { CartProvider } from './contexts/CartProvider';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const onHideCart = () => {
    setIsCartOpen(false);
  };

  const onShowCart = () => {
    setIsCartOpen(true);
  };
 
  return (
    <CartProvider>
      {
        isCartOpen ? <Cart onHideCart={onHideCart} /> : null
      }
      <Header onShowCart={onShowCart} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
