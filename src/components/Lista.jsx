export function ListaDeTarefas({ tarefas, onCheckClick }) {
    return (
        <ul className="lista">
            {
                tarefas.map((item) => {
                    return (
                        <li className="tarefa">
                            <input
                                className="tarefa-checkbox"
                                type="checkbox"
                                checked={item.feito}
                                onClick={() => onCheckClick(item.id)}
                            />
                            {item.texto}
                        </li>
                    )
                })
            }
        </ul>
    )
}