import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import NoMatch from './components/layouts/NoMatch'
import Alert from './components/layouts/Alert'
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";


const App = () => {



  return (
    <>
      <Router>
        <>
          <Navbar />
          <section className="container">
            <Alert />
            <Routes>
              <Route path="*" element={<NoMatch />} />
              <Route path="/" element={<Landing />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/profiles" element={<Profiles />} />
              <Route element={<PrivateRoute />}>
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/create-profile" element={<CreateProfile />} />
                <Route exact path="/edit-profile" element={<EditProfile />} />
                <Route exact path="/add-experience" element={<AddExperience />} />
                <Route exact path="/add-education" element={<AddEducation />} />
                <Route exact path="/profile/:id" element={<Profile />} />
                <Route exact path="/posts" element={<Posts />} />
                <Route exact path="/post/:id" element={<Post />} />
              </Route>
            </Routes>
          </section>

        </>
      </Router >
    </>
  )
}
export default App;
