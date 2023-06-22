import {
  Routes,
  Route
} from 'react-router-dom';

import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import Products from './pages/Products';
import Error404 from './pages/Error404';
import News from './pages/News';
import AboutUs from './pages/AboutUs';
import Help from './pages/Help';
import ResetPassword from './pages/ResetPassword';
import Member from './pages/Member';
import MembersList from './pages/MembersList';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import { AuthProvider } from './context/AuthContext';


function App(){

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/products" element={<Products />} />
        <Route path="/news" element={<News />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/help" element={<Help />} />
        <Route path="/member/:username" element={<Member />} />
        <Route path="/members-list" element={<MembersList />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </AuthProvider>
  );

};

export default App;