import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import axios from 'axios';
import '../../styles/Home.css';

const LIMIT = 9;

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [sortBy, setSortBy] = useState('Lowest');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalRestaurants, setTotalRestaurants] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRestaurants();
    // eslint-disable-next-line
  }, [sortBy, page]);

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const offset = (page - 1) * LIMIT;
      const response = await axios.get(
        `/api/restaurants-list?offset=${offset}&limit=${LIMIT}&sort_by_rating=${sortBy}`
      );
      setRestaurants(response.data.restaurants || []);
      setTotalRestaurants(response.data.total || 0);
    } catch (error) {
      setRestaurants([]);
      setTotalRestaurants(0);
    }
    setLoading(false);
  };

  const totalPages = Math.ceil(totalRestaurants / LIMIT);

  return (
    <div className='home-container'>
      <h1 className="popular-restraunts fw-bold">Popular Restaurants</h1>
      <div className="mt-4  container1">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="restraunt-container d-flex flex-column">
            <p className="lead">Select your favourite restaurant special dish and make your day happy..</p>
          </div>
          <div>
            <HiOutlineMenuAlt2 size={28} />
            <select
              className="form-select d-inline-block w-auto border-0"
              value={sortBy}
              onChange={e => {
                setSortBy(e.target.value);
                setPage(1);
              }}
            >
              <option value="Lowest">Sort By Lowest</option>
              <option value="Highest">Sort By Highest</option>
            </select>
          </div>
        </div>
        <div className="border mb-4"></div>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 200 }}>
            <div className="spinner-border text-warning" role="status" style={{ width: 60, height: 60 }}>
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="row ">
              {restaurants.map(restaurant => (
                <div
                  className="col-md-4 col-sm-6 col-12 mb-4"
                  key={restaurant.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/add-food/${restaurant.id}`)}
                >
                  <div className="d-flex align-items-center rounded p-2 h-100 bg-white">
                    <img
                      src={restaurant.image_url}
                      className="rounded"
                      alt={restaurant.name}
                      style={{ width: '160px', height: '130px', objectFit: 'cover', marginRight: '16px' }}
                    />
                    <div>
                      <h6 className="fw-bold mb-1">{restaurant.name}</h6>
                      <p className="mb-1">{restaurant.cuisine}</p>
                      <p className="mb-1">
                        {restaurant.user_rating.rating} ⭐
                        <span className="text-muted ms-2">({restaurant.user_rating.total_reviews} ratings)</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {restaurants.length === 0 && (
                <div className="col-12 text-center text-muted">No restaurants found.</div>
              )}
            </div>
            {totalPages > 1 && (
              <div className="d-flex justify-content-center align-items-center my-4 pagination">
                <button
                  className="btn btn-outline-secondary me-2"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  aria-label="Previous"
                >
                  &lt;
                </button>
                <span className="fw-bold mx-2">
                  {page} of {totalPages}
                </span>
                <button
                  className="btn btn-outline-secondary ms-2"
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  aria-label="Next"
                >
                  &gt;
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Home;