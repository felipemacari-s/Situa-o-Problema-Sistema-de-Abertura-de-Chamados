import { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import FormChamado from './components/FormChamado'
import ListaChamados from './components/ListaChamados'

const URL = 'http://localhost:3000/chamados'

export default function App() {
  const [paginaAtiva, setPaginaAtiva] = useState('form')
  const [chamados, setChamados] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')

  // GET apenas uma vez, dentro do useEffect com [] de dependências
  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((dados) => setChamados(dados))
      .catch(() => setErro('Não foi possível carregar os chamados.'))
      .finally(() => setLoading(false))
  }, [])

  // Atualiza a lista direto no state, sem novo GET
  function handleCadastrado(novoChamado) {
    setChamados((prev) => [...prev, novoChamado])
    setPaginaAtiva('lista')
  }

  return (
    <>
      <NavBar paginaAtiva={paginaAtiva} onMudarPagina={setPaginaAtiva} />
      <div className="container mt-4">
        {paginaAtiva === 'form' && (
          <FormChamado url={URL} onCadastrado={handleCadastrado} />
        )}
        {paginaAtiva === 'lista' && (
          <ListaChamados chamados={chamados} loading={loading} erro={erro} />
        )}
      </div>
    </>
  )
}
