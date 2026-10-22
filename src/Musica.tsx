import { useState } from "react"
import "./Musica.css"

export function MusicaPage() {
    const [termo, setTermo] = useState("");

    function onFormSubmit(event) {
        event.preventDefault();

        console.log("Buscando da api....")
    }

    return (
        <div className="page-content">
            <div className="page-header">
                <h1>SpotUI</h1>
            </div>

            <form onSubmit={onFormSubmit} className="search-form">
                <input
                    type="search"
                    placeholder="Digite o nome da música"
                    onChange={(event) => setTermo(event.target.value)}
                    value={termo}
                />
                <button type="submit" className="btn btn-primary">
                    Buscar
                </button>
            </form>
        </div>
    )
}