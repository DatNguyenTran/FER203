import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import PropTypes from "prop-types";

const DishesList = ({ dishes, searchTerm }) => {
  const { addToCart } = useContext(CartContext);

  const filteredDishes = dishes.filter(
    (dish) =>
      dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Danh sách món ăn</h2>
      <div className="dishes">
        {filteredDishes.map((dish) => (
          <div
            key={dish.id}
            className="dish-item"
          >
            <img
              src={dish.image}
              alt={dish.name}
            />
            <h3>{dish.name}</h3>
            <p>{dish.description}</p>
            <p>{`Price: $${parseFloat(dish.price).toFixed(2)}`}</p>
            <button onClick={() => addToCart(dish)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

DishesList.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  searchTerm: PropTypes.string.isRequired,
};

export default DishesList;
