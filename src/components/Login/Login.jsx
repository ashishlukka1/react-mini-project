import '../../styles/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

function Login() { 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const navigate = useNavigate();
    const { setToken } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError('');
        const newErrors = {};
        if (!username.trim()) newErrors.username = 'Username is required';
        if (!password) newErrors.password = 'Password is required';
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});
        try {
            const response = await axios.post('/api/login', { username, password });
            if (response.data && response.data.jwt_token) {
                setToken(response.data.jwt_token);
                navigate('/home');
            } else {
                setApiError('Please enter valid Username and Password');
            }
        } catch (err) {
            setApiError('Please enter valid Username and Password');
        }
    };

    return (
        <div>
            <div className="login d-flex">
                <div className="login-left p-5">
                    <div className="login-form">
                        <div className="logo-section align-items-center d-flex flex-column ">
                            <img src="https://i.postimg.cc/8PBT4fJ9/image.png" alt="" />
                            <div className="logo-font mb-5">Tasty Kitchens</div>
                            {/* <h1 className="logo-text">Login</h1> */}
                        </div>
                        <form className="login-content" onSubmit={handleSubmit} noValidate>
                            <label className="form-label">USERNAME</label>
                            <input
                                type="text"
                                className={`form-control inputs ${errors.username ? 'is-invalid' : ''}`}
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                                placeholder='rahul'
                            />
                            {errors.username && (
                                <div className="invalid-feedback d-block">{errors.username}</div>
                            )}

                            <label className="form-label  mt-4">PASSWORD</label>
                            <input
                                type="password"
                                className={`form-control inputs ${errors.password ? 'is-invalid' : ''}`}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                placeholder='rahul@2021'
                            />
                            {errors.password && (
                                <div className="invalid-feedback d-block">{errors.password}</div>
                            )}

                            {apiError && (
                                <div className="invalid-feedback d-block">{apiError}</div>
                            )}

                            <button className="btn1 fw-bold mt-4" type="submit">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
                <div className="login-right">
                    <img src="https://i.postimg.cc/dV6tsZJr/image.png" alt="" className="right-image" />
                </div>
            </div>
        </div>
    );
}

export default Login;