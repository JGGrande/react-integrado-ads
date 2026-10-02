import { useState } from "react"

function Pastel(props) {
  return (
    <button className="my-btn" onClick={props.onClick}>{props.ze}</button>
  )
}

function App() {
  const [tarefas, setTarefas] = useState([
    { id: 1, texto: "Estudar React", feito: true },
    { id: 2, texto: "Fazer a trilha", feito: false },
  ])

  function addTarefa() {
    const newTarefa = {
      id: 3,
      texto: "Estudar as 173 questões da prova",
      feito: false
    }

    setTarefas([ ...tarefas, newTarefa ])
  }

  return (
    <div className="app">
      <h1>Minhas tarefas</h1>

      <Pastel onClick={addTarefa} ze="Salve" />
      <Pastel onClick={addTarefa} ze="Legal ne" />

      <br />
      <br />
      <br />

      <ul>
        {
          tarefas.map((item) => {
            return (
              <li>{item.texto}</li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default App