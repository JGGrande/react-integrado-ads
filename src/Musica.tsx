import { useEffect, useState, type SubmitEvent } from "react"
import "./Musica.css"
import { Header } from "./componentes/Header";
import { Loading } from "./componentes/Loading";

type Musica = {
    trackId: number;
    trackName: string;
    artworkUrl100: string;
    collectionName: string;
}

export function MusicaPage() {
    const [termo, setTermo] = useState("");
    const [musicas, setMusicas] = useState<Musica[]>([]);
    const [loading, setLoading] = useState(false);

    async function search(searchTerm: string) {
        const query = new URLSearchParams({
            term: searchTerm,
            media: "music",
            entity: "song",
            limit: "20"
        });

        setMusicas([])
        setLoading(true)

        try {
            const resposta = await fetch(`https://itunes.apple.com/search?${query}`);

            const responseBody = await resposta.json();
    
            setMusicas(responseBody.results);
        }catch {
            alert("Falha ao buscar dados, verifique sua conexão com a internet!")
        }finally {
            setLoading(false)
        }

    }

    function onFormSubmit(event: SubmitEvent) {
        event.preventDefault();

        search(termo);
    }

    //  Executa um código apenas uma vez na montagem do componente
    // Quando a página for acessada
    useEffect(() => {
        search("Menos é mais")
    }, [])

    return (
        <div className="page-content">
            <Header />

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

            {
                loading && (<Loading />)
            }

            <div className="card-grid">
                {
                    musicas.map((musica) => {
                        return (
                            <div key={`${musica.trackId}`} className="card">
                                <img
                                    src={musica.artworkUrl100.replace("100x100bb", "700x700bb")}
                                    className="card-photo"
                                />

                                <h3>{musica.trackName}</h3>

                                <h3>{musica.collectionName}</h3>
                            </div>
                        )
                    })
                }
            </div>

        </div >
    )
}