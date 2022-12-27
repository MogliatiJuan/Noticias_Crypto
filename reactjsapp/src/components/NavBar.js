import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import CartWidget from './CartWidget';

const NavBar = (props) => {
  
    if (props.isHeader){
        return (
        <Navbar bg="light" expand="lg">
            <Container>
            <Navbar.Brand href="#home">Crypto Club</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#productos">Productos</Nav.Link>
                    <Nav.Link href="#contacto">Contacto</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
            <CartWidget/>
        </Navbar>
  )
    } else {
        return(
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>Crypto Club</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav" className='navFooter'>
                    <Nav className="me-auto">
                    <Nav.Link href="https://twitter.com/Papu_Crypto" target="_blank" >Twitter</Nav.Link>
                    <p>Copyright &copy; 2022</p>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        )
    }
}

export default NavBar
