import NavBar from './NavBar'

const Header = () => {

    const isHeader = true

  return (
        <header className='header'>
            <NavBar isHeader={isHeader}/>
        </header>
  )
}

export default Header