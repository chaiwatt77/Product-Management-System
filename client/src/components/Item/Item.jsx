import "./Item.css";
import { Link } from "react-router-dom";

const Item = (props) => {
  return (
    <div className="item">
      <img src="https://placehold.co/600x400" alt="" />

      <h2>name: {props.name}</h2>
      <p>category: {props.category}</p>
      <p>price: {props.price}</p>
      <p>stock: {props.stock}</p>
      <div>
        <Link to={`/edit-product/${props.id}`}>
          <button>edit</button>
        </Link>
        <button onClick={() => props.deleteProduct(props.id)}>delete</button>
      </div>
    </div>
  );
};

export default Item;
