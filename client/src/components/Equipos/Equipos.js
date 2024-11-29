import { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./Equipos.css"
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Equipos(){
    const {handleSubmit, register} = useForm();
    const [equipos, setEquipos] = useState([]);
    const [torneos, setTorneos] = useState([]);


    useEffect( ()=> {
        axios.get("http://localhost:3001/equipos")
        .then((response) => {
            setEquipos(response.data);
            console.log(response.data);
        })
        .catch((error) =>
        {
            console.log(error);
        })

        axios.get("http://localhost:3001/torneos")
        .then((response) => {
            setTorneos(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }, []) 

    const onSubmit = data => {

        const idTorneo = data.id_torneo || null;
        axios.post("http://localhost:3001/inscribir_equipo", {
            nombre: data.nombre,
            director: data.director,
            id_torneo : idTorneo
        })
        .then(() => {
            alert("Equipo inscripto exitosamente");
        })
        .catch(error => {
            console.error(error);
            alert("Ha ocurrido un error");
        })
        console.log(typeof data.id_torneo);
        window.location.reload();
    };

   

    return(
        <>
        <Header></Header>
         <div className="container">
         <form className="formulario" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="title">Inscribir un Equipo</h1>
                <input {...register("nombre", {required: true})} placeholder="Nombre del equipo" className="form-input"></input>
                <input {...register("director", {required: true})} placeholder="Director Tecnico" className="form-input"></input>
                <select {...register("id_torneo")} className="form-input">
                <option value="">Inscribir a un torneo</option>
                <option value="">No inscribir</option>
    {torneos.map((torneo, index) => (
        <option key={index} value={torneo.id}>
            {torneo.nombre}
        </option>
    ))}
</select>
                <button onClick={handleSubmit(onSubmit)} className="form-btn">Enviar</button>
            </form>
        </div>

        <div className="jugadores-lista">
            <h2>Equipos Inscriptos</h2>
            {equipos.length > 0 ? (
 <table className="tabla">
 <thead>
     <th>Nombre</th>
     <th>Director Técnico</th>
     <th>Torneo</th>
 </thead>
 <tbody>
     {equipos.map((equipo,index) => {
       const torneo = torneos.find(torneo => torneo.id === equipo.id_torneo);
       return(
        <tr key={index}>
             <td>{equipo.nombre}</td>
             <td>{equipo.director}</td>
             <td>{torneo ? torneo.nombre : "No asignado"}</td>
         </tr>
       )
     }
  
     )}
 </tbody>
</table>
            ) : (
                <p>No hay equipos inscriptos aún.</p>
            )}
           
        </div>

        </>
    );
}