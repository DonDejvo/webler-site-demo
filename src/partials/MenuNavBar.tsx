import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

//import { SyntheticEvent } from 'react';

/*
function handleLoginButton(e: SyntheticEvent) {
  e.preventDefault();
  //logInAction();
}

function handleSignupButton(e: SyntheticEvent) {
  e.preventDefault();
  //signUpAction();
}
*/

function MenuNavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary navBarBG">
      <Container fluid className="navBarSvg">
        <Navbar.Brand href="/"><img src="/resources/images/logo.png" height="50px" width="150px"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '370px' }}
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

            <NavDropdown title="Settings" id="navbarScrollingDropdown2">
              <NavDropdown.Item href="#toggleSwitch1">
                <Form>
                  <Form.Check // prettier-ignore
                    type="switch"
                    id="dark-theme-switch"
                    label="Dark Theme"
                  />
                </Form>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#toggleSwitch2">
              <Form>
                  <Form.Check // prettier-ignore
                    type="switch"
                    id="remember-me-switch"
                    label="Remember me (keep me logged in)"
                  />
                </Form>
              </NavDropdown.Item>
            </NavDropdown>
            
          </Nav>
          {/*
          <Form className="d-flex">
            <Form.Control
              type="email"
              placeholder="e-mail address"
              className="me-2 navEntry"
              aria-label="Email address"
            />
            <Form.Control
              type="password"
              placeholder="password"
              className="me-2 navEntry"
              aria-label="Password"
            />
            <div className="e-flex navFormContainer">
              <div className="d-flex">
                <Button size="sm" className="smallnavform navButton"><strong>Login</strong></Button>
                <Button size="sm" className="smallnavform navButton">Sign-up</Button>
              </div>
              <a href="/resetpassword" className="smallnavform forgot">Forgot password?</a>
            </div>
          </Form>
          */}
            <Button href="/login" size="lg" className="smallnavform navButton"><strong>Login</strong></Button>
            <Button href="/signup" size="lg" className="smallnavform navButton">Sign-up</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MenuNavBar;