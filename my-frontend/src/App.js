

import { Route, Routes,useLocation } from "react-router-dom";

import Header from './components/Header'; 
import Home from './components/Home';
import Contact from './components/Contact';
import NewTrip from './components/NewTrip';
import Login from "./components/Login";
import Signup from "./components/SignUp";
import PackageDetail from "./components/PackageDetail"
import Footer from './components/Footer';
import Profile from "./components/Profile";
import PackageDescription from "./components/PackageDescription"
import Placetovisit from './components/Placetovisit'
import BookingForm from "./components/BookingForm";
import PaymentSuccess from "./components/PaymentSuccess";
import './App.css';

import './assets/bootstrap/css/bootstrap.min.css'
import AdminApp from "./Admin1/AdminApp";
import User from "./Admin1/User/User"
import AddPackageForm from "./Admin1/AddPackageForm";
import PackageList from "./Admin1/Package/PackageList";
import TripList from "./Admin1/Trip/TripList";
import Scan from "./components/Scan";

function App() {

  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin1');
 
  return (
    <div className="App">
      {!isAdminPage && <Header/> }
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/new-trip" element={<NewTrip />} />
    <Route path ="/package-details"element={<PackageDetail/>} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/packages/:id" element={<PackageDescription/>} />
    <Route path="/places/:id" element={<Placetovisit/>} />
    <Route exact path="/booking-form" element={<BookingForm/>} />
    <Route path="/payment" element={<PaymentSuccess/>} />
    <Route exact path="/scan" element={<Scan/>} />



    <Route exact path="/admin1" element={<AdminApp/>} />
    <Route exact path="/admin1/users" element={<User/>} />
    <Route exact path="/admin1/addpackageform" element={<AddPackageForm/>} />
    <Route exact path="/admin1/packagelist" element={<PackageList/>} />
    <Route exact path="/admin1/triplist" element={<TripList/>} />
    <Route path="/admin1/packages/edit/:id" element={<AddPackageForm/>} />
 

    </Routes>
    {!isAdminPage && <Footer/>}
    </div>
  );
}

export default App;

