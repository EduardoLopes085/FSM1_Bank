import './header.css'
import Logo from '/coin.png'

function Header() {
  return (
    <div className='Header'>

      <a className='LogoContainer' href="/"><img className='Logo' src={Logo} alt="" /></a>

      <nav className='Navigation'>

        <a href="/">Home</a>
        <a href="/addspent">Adicionar Gasto</a>
        <a href="">Lista de Gastos</a>
        <a href="/ChartsPage">Relatórios</a>

      </nav>
    </div>
  )
}

export default Header
