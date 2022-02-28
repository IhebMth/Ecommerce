import React from "react"
import { LinkContainer } from "react-router-bootstrap"
import { Navbar, Nav, Container} from "react-bootstrap"

const Header = () =>
{
return(
    <header>
       <div className="row">
       <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
  <Container>
  
  <LinkContainer to='/'>
    <Navbar.Brand href="/">Mobile for you</Navbar.Brand>
    </LinkContainer>
    
    <div className="col-md-6"></div>
    <div className="col-md-3 ">
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
     
      <LinkContainer to='/cart'>
        <Nav.Link >
          <i className="fas fa-shopping-cart"></i> Cart
        </Nav.Link>
        </LinkContainer>
        <LinkContainer to='/login'>
        <Nav.Link  >
          <i className="fas fa-user"></i>Sign in</Nav.Link>
        </LinkContainer>
      
    </Navbar.Collapse>
    </div>
    
  </Container>
</Navbar>
</div>
</header>
)}

    export default Header