import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
const PrivateRoute = ({children}) => {
    const auth = useSelector(state => state.auth.isAuthenticated); // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute