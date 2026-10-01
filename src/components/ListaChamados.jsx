const CORES = { Baixa: 'success', Média: 'warning', Alta: 'danger' }

export default function ListaChamados({ chamados, loading, erro }) {
  if (loading) return <p>Carregando chamados...</p>
  if (erro) return <div className="alert alert-danger">{erro}</div>

  return (
    <>
      <h2 className="mb-3">Chamados Abertos</h2>
      {chamados.length === 0 && <p>Nenhum chamado registrado.</p>}
      <ul className="list-group">
        {chamados.map((c) => (
          <li key={c.id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <strong>
                #{c.id} · {c.solicitante}
              </strong>
              <span className={`badge text-bg-${CORES[c.prioridade]}`}>
                {c.prioridade}
              </span>
            </div>
            <div className="text-muted">
              {c.setor} · {c.tipo}
            </div>
            <div>{c.descricao}</div>
          </li>
        ))}
      </ul>
    </>
  )
}