import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useEffect, useState } from "react";
import User from "../views/User";
import { useAuth } from '../context/AuthContext';
import { NavItem } from 'react-bootstrap';
import DatabaseClient from "../api/DatabaseClient";

function MenuNavBar() {

  const { signout, getUserDetails } = useAuth()
  const username = getUserDetails()?.username

  const [user, setUser] = useState<User>();

  useEffect(() => {
    if(username) {
      DatabaseClient.getUserByUsername(username)
        .then(snapshot => {
            const data = snapshot.val();
            const user = Object.values(data)[0] as User;
            setUser(user)
        })
    }
  }, []);

  async function handleLogout() {
    try {
      await signout()
      window.location.href = "/login"
    } catch {
      console.log("Failed to log out")
    }
  }

  function openProfile() {
    if(username)
      window.location.href = "/member/" + username;
  }

  // Dark theme handler
  const [switchState, setSwitchState] = useState(false)
  const [moodtheme, setMoodTheme] = useState("tertiary")
  const handleChange=(e: { target: { checked: any; }; })=>{
    let isDark = e.target.checked ? false: true;
    let body = document.getElementsByTagName("body")[0];
    console.log("Dark: " + isDark);
    if (isDark) { 
      body.className = "";
      setMoodTheme("tertiary");
    }
    else{
      body.className += " dark";
      setMoodTheme("dark");
    }
      
    setSwitchState(!switchState)
  }
  //Dark theme handler

  return (
    <Navbar expand="lg" className="navBarBG" id="navID" bg={moodtheme} data-bs-theme={moodtheme}>
      <Container fluid className="navBarSvg">
        <Navbar.Brand href="/"><img src="/resources/images/logo.png" height="50px" width="150px"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '370px' , alignItems:'center'}}
            navbarScroll
          >
            <Nav.Link href="/" className="NavLink">Home</Nav.Link>
            <Nav.Link href="/products" className="NavLink">Products</Nav.Link>
            <Nav.Link href="/news" className="NavLink">News</Nav.Link>
            <NavDropdown title="More" id="navbarScrollingDropdown1">
            <NavDropdown.Item href="/about-us">About Us</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/contact-us">Contact Us</NavDropdown.Item>
              <NavDropdown.Item href="/help">Help & FAQ's</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/members-list">Members List</NavDropdown.Item>
            </NavDropdown>
                <Form style={{alignSelf:"center"}}>
                  <Form.Check
                    type="switch"
                    id="dark-theme-switch"
                    label="Dark Theme"
                    defaultChecked={switchState}
                    onChange={handleChange}   
                  />
                </Form>
          </Nav>
          <Nav style={{alignItems:"center"}}>
          {
            (username) ?
              <>
                
                <NavDropdown align="end" title={user?<><img width={34} height={34} className="rounded-circle" src={user.avatarUrl ? user.avatarUrl : "resources/images/logo.png"} /> {(username)} </>: <>{(username)}</>} id="navbarScrollingDropdownUser">
                  <NavDropdown.Item onClick={openProfile}>Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/edit-member">Edit Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </>
            : 
            <>
              <NavItem>
                <Button href="/login" size="lg" className="smallnavform navButton"><strong>Login</strong></Button>
                <Button href="/signup" size="lg" className="smallnavform navButton">Sign-up</Button>
              </NavItem>
            </>
          }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MenuNavBar;
