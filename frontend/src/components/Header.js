import React from "react"
import { LinkContainer } from "react-router-bootstrap"
import { Navbar, Nav, Container, NavDropdown,  } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { logout } from '../actions/userActions'
const Header = () =>
{
  const dispatch = useDispatch()
 
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () =>
  {
    dispatch(logout())
  } 

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
        { userInfo ? (
          <NavDropdown title={userInfo.name} id='username'>
            <LinkContainer to='/profile'>
              <NavDropdown.Item>
                Profile
                </NavDropdown.Item>
             </LinkContainer>
          <NavDropdown.Item onClick={logoutHandler}>
            Logout
          </NavDropdown.Item>
          </NavDropdown>
        ) :(
        <LinkContainer to='/login'>
        <Nav.Link >
          <i className="fas fa-user"></i>
          Sign in
          </Nav.Link>
        </LinkContainer>)}

        {userInfo && userInfo.isAdmin && (
          <NavDropdown title='Admin' id='adminmenu'>
          
          <LinkContainer to='/admin/userlist'>
            <NavDropdown.Item>
              Users
              </NavDropdown.Item>
           </LinkContainer>

           <LinkContainer to='/admin/productList'>
            <NavDropdown.Item>
              Products
              </NavDropdown.Item>
           </LinkContainer>

           <LinkContainer to='/admin/orderList'>
            <NavDropdown.Item>
              Orders
              </NavDropdown.Item>
           </LinkContainer>
           
        <NavDropdown.Item onClick={logoutHandler}>
          Logout
        </NavDropdown.Item>
        </NavDropdown>
        )}
      
    </Navbar.Collapse>
    </div>
    
  </Container>
</Navbar>
</div>
</header>
)}

    export default Header