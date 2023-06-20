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


function App(){

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/products" element={<Products />} />
        <Route path="/news" element={<News />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/help" element={<Help />} />
        <Route path="/member" element={<Member />} />
        <Route path="/memberslist" element={<MembersList />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </>
  );

};

export default App;