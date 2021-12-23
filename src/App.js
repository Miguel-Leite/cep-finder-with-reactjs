import { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FiSearch } from 'react-icons/fi'
import api from './services/api'

toast.configure()
function App() {

  const [input,setInput] = useState('')
  const [cep,setCep] = useState({})

  async function handleSearch () {
    
    if (input == '') {
      toast.error('Preencha o formulário!',{position: toast.POSITION.BOTTOM_CENTER})
      return;
    }

    try {
      const response = await api.get(`${input}/json`)      
      setCep(response.data)
      setInput("")
      toast.success('CEP localizado!',{position: toast.POSITION.TOP_RIGHT})

    } catch (error) {
      toast.error('Erro ao buscar CEP!',{position: toast.POSITION.BOTTOM_CENTER})
    }

  }

  return (
    <div className="container">
      <h1 className="title">BUSCADOR CEP</h1>

    <div className="containerInput">
        <input 
          type="text"
          value={input}
          onChange={ e => setInput(e.target.value) }
          placeholder="Digita um CEP..."
        />

      <button type="button" className='buttonSearch' onClick={ handleSearch }>
        <FiSearch size={25} color='#fff' />
      </button>

    </div>
    {Object.keys(cep).length > 0 &&(
      <main className='main'>
        <h2>CEP: {cep.cep}</h2>
        <span>Rua:  {cep.bairro}</span>
        <span>Complemento:  {cep.complemento}</span>
        <span>Logradouro: {cep.logradouro}</span>
        <span>Localidade: {cep.localidade} - {cep.uf}</span>
      </main>
    )}

    </div>
   );
}

export default App;
