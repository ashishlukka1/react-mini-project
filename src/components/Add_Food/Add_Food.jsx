import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Add_Food.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCart } from '../context/CartContext';

function AddFood() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cart, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    fetchRestaurant();
    // eslint-disable-next-line
  }, [id]);

  const fetchRestaurant = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/restaurants-list/${id}`);
      setRestaurant(response.data);
      setMenu(response.data.food_items || []);
    } catch (error) {
      setRestaurant(null);
      setMenu([]);
    }
    setLoading(false);
  };

  return (
    <>
      <div className=" d-flex flex-column align-items-center justify-content-center ">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 200 }}>
            <div className="spinner-border text-warning" role="status" style={{ width: 60, height: 60 }}>
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : restaurant ? (
          <>
            <div className="banner mb-5 p-3">
              <div className="d-flex align-items-center">
                <img
                  src={restaurant.image_url}
                  alt={restaurant.name}
                  className="rounded me-5"
                  style={{ width: 200, height: 140, objectFit: 'cover' }}
                />
                <div>
                  <h4 className="mb-1 fs-2">{restaurant.name}</h4>
                  <p className="mb-1 fs-4">{restaurant.cuisine}</p>
                  <p className="mb-1">{restaurant.location}</p>
                </div>
              </div>
            </div>
            <div className="row container ms-5">
              {menu.map(item => (
                <div className="col-md-6 mb-3" key={item.id}>
                  <div className="h-100 p-2 d-flex flex-row align-items-center">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="rounded me-3"
                      style={{ width: 200, height: 170, objectFit: 'cover' }}
                    />
                    <div className="">
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{item.name}</h6>
                        <p className="mb-1">₹{item.cost}</p>
                        <p className="mb-3">Rating: {item.rating} ⭐</p>
                      </div>
                      <div>
                        {cart[item.id]?.quantity ? (
                          <div className="d-flex align-items-center">
                            <button className="btn btn-outline-secondary btn-sm px-2" onClick={() => removeFromCart(item.id)}>-</button>
                            <span className="mx-2">{cart[item.id].quantity}</span>
                            <button className="btn btn-outline-secondary btn-sm px-2" onClick={() => addToCart(item)}>+</button>
                          </div>
                        ) : (
                          <button className="btn btn-sm cart-btn" onClick={() => addToCart(item)}>
                            ADD
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {menu.length === 0 && (
                <div className="col-12 text-center text-muted">No menu items found.</div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center text-danger">Restaurant not found.</div>
        )}
      </div>
    </>
  );
}

export default AddFood;