import { Row, Col, Button } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

import { useContext, useMemo } from 'react';
import { CartContext } from '../../../context/context';

import { CartBook } from './cart-book/Cart-book';
import data from '../../../fixtures/books.json';

import './Book-price.scss';

export const BookPrice = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useContext(CartContext);
  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => {
      const { price } = data.books.find((b) => b.id === item.id);
      return acc + price * item.amount;
    }, 0);
  }, [cart]);

  const handleClearCart = () => setCart([]);
  const handlePurchase = () => {
    handleClearCart();
    alert('Success');
    navigate('/books');
  };

  return (
    <>
      <Row>
        <Col className="cart-bt-col">
          <Button
            variant="outline-dark"
            className="cart-bt"
            onClick={handlePurchase}
          >
            Purchase
          </Button>
          <Button
            variant="outline-dark"
            className="cart-bt-clear"
            onClick={handleClearCart}
          >
            Clear Cart
          </Button>
        </Col>
      </Row>
      {cart.map((item) => {
        return <CartBook key={item.id} {...item} />;
      })}
      <Row className="price">
        <Col md={3}>Total price: </Col>
        <Col md={2}>${totalPrice.toFixed(2)}</Col>
      </Row>
    </>
  );
};
