import Button from 'react-bootstrap/Button';

const ItemListContainer = (props) => {
  return (
    <div className="greeting">
        <p>{props.greeting}</p>
        <Button variant="outline-dark">Aceptar</Button>
    </div>
  )
}

export default ItemListContainer