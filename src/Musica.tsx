import { useState } from "react"
import "./Musica.css"

export function MusicaPage() {
    const [termo, setTermo] = useState("");
    const [musicas, setMusicas] = useState([]);
    const [loading, setLoading] = useState(false);

    async function search(searchTerm) {
        const query = new URLSearchParams({
            term: searchTerm,
            media: "music",
            entity: "song",
            limit: 20
        });

        setLoading(true)

        const resposta = await fetch(`https://itunes.apple.com/search?${query}`);

        // Sleep 3s
        await new Promise(resolve => setTimeout(resolve, 3000));

        const responseBody = await resposta.json();

        setLoading(false);
        setMusicas(responseBody.results);
    }

    function onFormSubmit(event) {
        event.preventDefault();

        search(termo);
    }

    // if (loading) {
    //     return (
    //         <div style={{
    //             width: "100%",
    //             height: "100vh",
    //             display: "flex",
    //             justifyContent: "center",
    //             alignItems: "center",
    //             flex: 1
    //         }}>
    //             <span class="loader"></span>
    //         </div>
    //     )
    // }

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

            {
                loading && (
                    <div style={{
                        width: "100%",
                        height: "100vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1,
                        zIndex: 999
                    }}>
                        <span class="loader"></span>
                    </div>
                )
            }

            <div className="card-grid">
                {
                    musicas.map((musica) => {
                        return (
                            <div key={`${musica.trackId}`} className="card">
                                <img
                                    src={musica.artworkUrl100}
                                    className="card-photo"
                                />

                                <h3>{musica.trackName}</h3>
                            </div>
                        )
                    })
                }
            </div>

        </div >
    )
}