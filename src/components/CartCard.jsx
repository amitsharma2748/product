import { useDispatch } from "react-redux";

import "../Styles/Cart.css";
import { cartActions } from "../Redux/cartSlice";

const CartCard = (props) => {
  const dispatch = useDispatch();

  const { name, quantity, totalPrice, price, id } = props.item;
  console.log(props.item);
  const removeItemHandler = () => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  const addItemHandler = () => {
    dispatch(cartActions.addItemToCart(props.item));
  };

  return (
    <li className="item">
      <header>
        <h3>{name}</h3>
        <div className="price">
          ${totalPrice} <span className="itemprice">(${price}/item)</span>
        </div>
      </header>
      <div className="details">
        <div className="quantity">
          x <span>{quantity}</span>
        </div>
        <div className="actions">
          <button onClick={removeItemHandler}>-</button>
          <button onClick={addItemHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartCard;
