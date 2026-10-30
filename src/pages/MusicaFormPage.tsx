import { useState, type SubmitEvent } from "react";
import { api } from "../api/axios";
import { Loading } from "../componentes/Loading";

type Musica = {
    title: string;
    durationInSeconds: string;
    releaseYear: string;
    photoUrl: string;
}

export function MusicaFormPage() {
    const [form, setForm] = useState<Musica>({
        title: "",
        durationInSeconds: "",
        releaseYear: "",
        photoUrl: ""
    });
    const [loading, setLoading] = useState(false);

    async function onFormSubmit(event: SubmitEvent) {
        event.preventDefault();

        setLoading(true)
        const response = await api.post("/musics", form)
        await new Promise(resolve => setTimeout(resolve, 3000))
        setLoading(false)

        setForm({
            title: "",
            durationInSeconds: "",
            releaseYear: "",
            photoUrl: ""
        })

        alert("Musica cadastrada com sucesso!")
    }

    return (
        <form onSubmit={onFormSubmit} className="music-form">
            { loading ? (<Loading />) : (<></>) }

            <h2>Nova música</h2>

            <div className="field">
                <label>Titulo</label>
                <input
                    type="text"
                    value={form.title}
                    onChange={(ev) => setForm({
                        ...form,
                        // releaseYear: form.releaseYear,
                        // durationInSeconds: form.durationInSeconds,
                        // photoUrl: form.photoUrl,
                        title: ev.target.value
                    })}
                />
            </div>

            <div className="field">
                <label>Duração (segundos)</label>
                <input
                    type="number"
                    value={form.durationInSeconds}
                    onChange={(ev) => setForm({
                        ...form,
                        durationInSeconds: ev.target.value,
                    })}
                />
            </div>

            <div className="field">
                <label>Ano lançamento</label>
                <input
                    type="number"
                    value={form.releaseYear}
                    onChange={(ev) => setForm({
                        ...form,
                        releaseYear: ev.target.value
                    })}
                />
            </div>

            <div className="field">
                <label>Foto URL</label>
                <input
                    type="url"
                    onChange={(ev) => setForm({
                        ...form,
                        photoUrl: ev.target.value
                    })}
                />
            </div>

            <div className="form-actions">
                {
                    !loading
                        ? (
                            <button type="submit" className="btn btn-primary">
                                Salvar
                            </button>
                        )
                        : (<></>)
                }

            </div>
        </form>
    )
}