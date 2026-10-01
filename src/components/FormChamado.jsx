import { useState } from 'react'

export default function FormChamado({ url, onCadastrado }) {
  const [solicitante, setSolicitante] = useState('')
  const [setor, setSetor] = useState('')
  const [tipo, setTipo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [prioridade, setPrioridade] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')

    if (solicitante.trim().length < 3) {
      setErro('O nome deve ter pelo menos 3 caracteres.')
      return
    }
    if (descricao.trim().length < 10) {
      setErro('A descrição deve ter pelo menos 10 caracteres.')
      return
    }
    if (!setor || !tipo || !prioridade) {
      setErro('Escolha setor, tipo de problema e prioridade.')
      return
    }

    const chamado = {
      solicitante: solicitante.trim(),
      setor,
      tipo,
      descricao: descricao.trim(),
      prioridade,
    }

    setEnviando(true)
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(chamado),
      })
      const novoChamado = await res.json() // já vem com o id gerado

      setSolicitante('')
      setSetor('')
      setTipo('')
      setDescricao('')
      setPrioridade('')
      onCadastrado(novoChamado)
    } catch {
      setErro('Erro ao enviar o chamado. Tente novamente.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-3">Abrir Chamado</h2>

      {erro && <div className="alert alert-danger">{erro}</div>}

      <div className="mb-3">
        <label className="form-label">Nome do Solicitante</label>
        <input
          type="text"
          className="form-control"
          value={solicitante}
          onChange={(e) => setSolicitante(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Setor</label>
        <select
          className="form-select"
          value={setor}
          onChange={(e) => setSetor(e.target.value)}
        >
          <option value="">Selecione...</option>
          <option>TI</option>
          <option>RH</option>
          <option>Financeiro</option>
          <option>Operações</option>
          <option>Comercial</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Tipo de Problema</label>
        <select
          className="form-select"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option value="">Selecione...</option>
          <option>Hardware</option>
          <option>Software</option>
          <option>Rede</option>
          <option>Acesso</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Descrição do Problema</label>
        <textarea
          className="form-control"
          rows="4"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Prioridade</label>
        <select
          className="form-select"
          value={prioridade}
          onChange={(e) => setPrioridade(e.target.value)}
        >
          <option value="">Selecione...</option>
          <option>Baixa</option>
          <option>Média</option>
          <option>Alta</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary" disabled={enviando}>
        {enviando ? 'Enviando...' : 'Abrir Chamado'}
      </button>
    </form>
  )
}
