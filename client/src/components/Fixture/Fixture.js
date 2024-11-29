import { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./Fixture.css";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function Fixture() {
    const { handleSubmit, register } = useForm();
    const [torneos, setTorneos] = useState([]);
    const [fixtures, setFixtures] = useState([]);

    // Cuando se selecciona un torneo, generamos los fixtures
    const onSubmit = (data) => {
        const { id_torneo } = data;

        // Realizamos la solicitud para obtener los fixtures del torneo
        axios
            .get(`http://localhost:3001/generar_fixtures/${id_torneo}`)
            .then((response) => {
                setFixtures(response.data); // Almacenamos los fixtures generados
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener los fixtures:", error);
            });
    };

    // Obtener los torneos al cargar la página
    useEffect(() => {
        axios
            .get("http://localhost:3001/torneos")
            .then((response) => {
                setTorneos(response.data); // Guardamos los torneos disponibles
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <Header></Header>

            <h1 className="title-fixture">Seleccione un torneo para generar los fixtures</h1>

            <form className="formulario" onSubmit={handleSubmit(onSubmit)}>
                <select {...register("id_torneo", { required: true })} className="form-input">
                    {torneos.map((torneo, index) => (
                        <option key={index} value={torneo.id}>
                            {torneo.nombre}
                        </option>
                    ))}
                </select>

                <button type="submit" className="form-btn">Generar Fixtures</button>
            </form>

            <div className="fixtures-lista">
                <h2>Fixtures Generados</h2>
                {fixtures.length > 0 ? (
                    <table className="tabla">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Partido</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fixtures.map((fecha, index) => (
                                <tr key={index}>
                                    <td>{fecha.fecha}</td>
                                    <td>
                                        {fecha.partidos.map((partido, i) => (
                                            <div key={i}>
                                                {partido.equipo1} vs {partido.equipo2}
                                            </div>
                                        ))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay fixtures generados.</p>
                )}
            </div>
        </>
    );
}
