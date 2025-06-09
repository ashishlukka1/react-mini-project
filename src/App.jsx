import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import AddFood from './components/Add_Food/Add_Food';
import Cart from './components/Cart/Cart';
import AuthProvider, { useAuth } from './components/context/AuthProvider';
import { CartProvider } from './components/context/CartContext';
import RootLayout from './components/RootLayout';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return !isAuthenticated ? children : <Navigate to="/home" replace />;
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <RootLayout>
            <Routes>
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-food/:id"
                element={
                  <ProtectedRoute>
                    <AddFood />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </RootLayout>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;