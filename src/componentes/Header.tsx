import { Link } from "react-router-dom";

export function Header() {
    return (
        <div className="page-header">
            <h1>SpotUI</h1>

            <nav className="nav">
                <Link to="/">Home</Link>
                <Link to="/itunes">Itunes</Link>
                <Link to="/musicas/cadastro">Cadastrar musica</Link>
            </nav>
        </div>
    )
}