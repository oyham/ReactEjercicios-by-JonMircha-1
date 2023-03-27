import CrudApi from './components/CrudApi'
import CrudApp from './components/CrudApp'
import SongSearch from './components/SongSearch'
import SelectsAnidados from './components/SelectsAnidados'
import ContactForm from './components/ContactForm'
import Modals from './components/Modals'

function App() {
  return (
    <>
      <h1>Ejercicios React</h1>
      <Modals />
      <hr />
      <ContactForm />
      <hr />
      <SelectsAnidados />
      <hr />
      <SongSearch />
      <hr />
      <CrudApi />
      <hr />
      <CrudApp />
    </>
  )
}

export default App
