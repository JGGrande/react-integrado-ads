import { useState } from "react"
import { ListaDeTarefas } from "../src/components/Lista"

function App() {
  const [texto, setTexto] = useState(null);
  const [tarefas, setTarefas] = useState([]);

  function addTarefa(event) {
    event.preventDefault();

    const newTarefa = {
      id: tarefas.length + 1,
      texto: texto,
      feito: false
    }

    setTarefas([...tarefas, newTarefa])
    setTexto("")
  }

  function toggleFeito(id) {
    const tarefasAtualizadas = tarefas.map((tarefa) => {
      if (tarefa.id === id) {
        tarefa.feito = !tarefa.feito
      }

      return tarefa
    })

    setTarefas(tarefasAtualizadas)
  }

  return (
    <div className="app">
      <h1>Minhas tarefas</h1>

      <form className="todo-form" onSubmit={addTarefa}>
        <input
          type="text"
          placeholder="O que precisa ser feito?"
          value={texto}
          onChange={(event) => setTexto(event.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      {/* <ListaDeTarefas tarefas={tarefas} /> */}
      <ul className="lista">
        {
          tarefas.map((item) => {
            return (
              <li className="tarefa">
                <input
                  className="tarefa-checkbox"
                  type="checkbox"
                  checked={item.feito}
                  onClick={() => toggleFeito(item.id)}
                />
                {item.texto}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default App