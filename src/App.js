import './App.css';
import RegistrationComponent from './auth/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';
import SignInComponent from './auth/SignIn';

function App() {
  const { authState } = useAuth();
  const { expiresAt } = authState;

  // Function to redirect unauthenticated users to the sign-in route
  const redirectToSignIn = () => {
    if (expiresAt < Math.floor(Date.now() / 1000)) {
      return <Navigate to="/result" />;
    }
    return null; // Return null if no redirection is needed
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={redirectToSignIn()} // Use the element prop directly
            index // Use the index prop to indicate the default route
          />
          <Route path="/result" element={<SignInComponent />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
