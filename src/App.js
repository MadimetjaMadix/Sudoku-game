import './App.css'
import { generateSodukoObject } from './lib/sodukoFns'
import Game from './Components/Game'

function App () {
  function getSoduko (difficulty) {
    return generateSodukoObject(difficulty)
  }
  return (
    <div className='App'>
      <link
        rel='stylesheet'
        href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css'
        integrity='sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We'
        crossOrigin='anonymous'
      />
      <header className='App-header'>
        Mad-Soduko
      </header>
      <Game soduko={getSoduko('random')} />
    </div>
  )
}

export default App
