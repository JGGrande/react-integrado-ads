import { useState, type SubmitEvent } from "react";

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
    
    function onFormSubmit(event: SubmitEvent) {
        event.preventDefault();
    }

    return (
        <form onSubmit={onFormSubmit} className="music-form">
            <h2>Nova música</h2>

            <div className="field">
                <label>Titulo</label>
                <input type="text" />
            </div>

            <div className="field">
                <label>Duração (segundos)</label>
                <input type="number" />
            </div>

            <div className="field">
                <label>Ano lançamento</label>
                <input type="number" />
            </div>

            <div className="field">
                <label>Foto URL</label>
                <input type="url" />
            </div>

            <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                    Salvar
                </button>
            </div>
        </form>
    )
}