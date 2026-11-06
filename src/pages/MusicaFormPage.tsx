import { useEffect, useState, type SubmitEvent } from "react";
import { api } from "../api/axios";
import { Loading } from "../componentes/Loading";
import { Header } from "../componentes/Header";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import z from "zod";

type Musica = {
    title: string;
    durationInSeconds: string;
    releaseYear: string;
    photoUrl: string;
}

const schema = z.object({
    title: z
        .string()
        .nonempty("Campo obrigatório")
        .min(3, "Mínimo 3 caracteres")
        .max(150, "Máximo 150 caracteres"),
    durationInSeconds: z.number().int().positive(),
    releaseYear: z.number().int().positive(),
    photoUrl: z.url().nullish()
})

export function MusicaFormPage() {
    const { id } = useParams();
    const [form, setForm] = useState<Musica>({
        title: "",
        durationInSeconds: "",
        releaseYear: "",
        photoUrl: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [erros, setErrors] = useState<Record<string, string[]>>({})

    async function onFormSubmit(event: SubmitEvent) {
        event.preventDefault();

        const resultado = schema.safeParse(form);

        if (!resultado.success) {
            setErrors(z.flattenError(resultado.error).fieldErrors)
            return;
        }

        setLoading(true)

        if (id) {
            await api.put(`/musics/${id}`, form)

            setLoading(false)

            toast.success("Musica alterada com sucesso!", {
                theme: "dark",
                draggable: true
            })
        } else {
            await api.post("/musics", form)

            setLoading(false)

            toast.error("Musica cadastrada com sucesso!")
        }

        navigate("/")
    }

    async function loadMusic() {
        const response = await api.get(`/musics/${id}`)

        setForm({
            title: response.data.title,
            durationInSeconds: response.data.durationInSeconds,
            photoUrl: response.data.photoUrl,
            releaseYear: response.data.releaseYear
        })   
    }

    useEffect(() => {
        if (id) {
            loadMusic()
        }
    }, [])

    return (
        <>
            <Header />

            <form onSubmit={onFormSubmit} className="music-form">
                {loading ? (<Loading />) : (<></>)}

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
                    { erros.title && (<span className="field-error">{erros.title.join(" ")}</span>) }
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
                        value={form.photoUrl}
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
        </>
    )
}