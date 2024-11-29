import { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./Torneo.css"
import { useForm } from "react-hook-form";
import axios from "axios";



export default function Torneos(){
    const {handleSubmit, register} = useForm();
    const [torneos, setTorneos] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/torneos")
        .then((response) => {
            setTorneos(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
    })

    const onSubmit = data => {
        axios.post("http://localhost:3001/crear_torneo", {
            nombre : data.nombre,
            categoria : data.categoria,
            division : data.division
        })
        .then(() => {
            alert("Torneo creado exitosamente");
        })
        .catch(error => {
            console.log(error);
            alert("error");
        })

    };



    return(
        <>
        <Header></Header>
        <div className="container">
        <form className="formulario" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="title">Crear un Torneo</h1>
                <input {...register("nombre", {required: true})} placeholder="Nombre" className="form-input"></input>
                <select {...register("categoria", {required: true})} className="form-input">
                    <option value="">Seleccione una categoría</option>
                    <option value="Prebenjamin">Prebenjamin</option>
                    <option value="Benjamin">Benjamin</option>
                    <option value="Alevin">Alevin</option>
                    <option value="Infantil">Infantil</option>
                    <option value="Cadete">Cadete</option>
                    <option value="Juvenil">Juvenil</option>
                </select>

                <select {...register("division", {required: true})} className="form-input">
                    <option value="">Selecciona una división</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <button onClick={handleSubmit(onSubmit)} className="form-btn">Enviar</button>
                
            </form>
        </div>

        <div className="jugadores-lista">
        <h2>Torneos</h2>
        {torneos.length > 0 ? (
            <table className="tabla">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>División</th>
                    </tr>
                </thead>
                <tbody>
                    {torneos.map((torneo, index) => (
                        <tr key={index}>
                            <td>{torneo.nombre}</td>
                            <td>{torneo.categoria}</td>
                            <td>{torneo.division}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <p>No hay torneos registrados.</p>
        )}
        </div>

        </>
    );
}