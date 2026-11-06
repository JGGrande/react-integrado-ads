import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { Header } from "../componentes/Header";
import { Link } from "react-router-dom";

type Musica = {
    id: number;
    title: string;
    durationInSeconds: number;
    releaseYear: number;
    photoUrl: string | null;
}

export function MusicaListPage() {
    const [musics, setMusics] = useState<Musica[]>([]);

    async function loadMusics() {
        const response = await api.get("/musics");
        setMusics(response.data);
    }

    async function deleteMusica(id: number) {
        await api.delete(`/musics/${id}`)
        loadMusics()
    }

    useEffect(() => {
        loadMusics()
    }, [])

    return (
        <>
            <Header />

            <div className="card-grid">
                {musics.map((musica) => {
                    return (
                        <div key={musica.id} className="card">
                            <img
                                src={musica.photoUrl || "https://raw.githubusercontent.com/abhiabhi94/django-cute-status/main/img/404-dog.jpg"}
                                className="card-photo"
                            />

                            <h3>{musica.title}</h3>

                            <div className="card-actions card-actions-row">
                                <Link 
                                    to={`/musicas/${musica.id}/editar`} 
                                    className="btn btn-secondary"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => deleteMusica(musica.id)} 
                                    className="btn btn-danger"
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    );
}