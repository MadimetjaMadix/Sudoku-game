import './App.css'
import Game from './Components/Game'
import Logo from './SD_logo.svg'

/* rander the Game component */
function App () {
  return (
    <div className='App'>
      <link
        rel='stylesheet'
        href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css'
        integrity='sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We'
        crossOrigin='anonymous'
      />
      <header className='App-header'>
        Mad-<img src={Logo} alt='S' />udoku
      </header>
      <Game />
    </div>
  )
}

export default App
