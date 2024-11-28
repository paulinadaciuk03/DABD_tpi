import { useState } from "react";
import Header from "../Header/Header";
import "./Equipos.css"
import { useForm } from "react-hook-form";

export default function Equipos(){
    const {handleSubmit, register} = useForm();
    const [equipos, setEquipos] = useState([]);

    const onSubmit = data => {
        setEquipos([...equipos, data]);
        console.log(data);
    };



    return(
        <>
        <Header></Header>
         <div className="container">
         <form className="formulario" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="title">Inscribir un Equipo</h1>
                <input {...register("name")} placeholder="Nombre del equipo" className="form-input"></input>
                <input {...register("director")} placeholder="Director Tecnico" className="form-input"></input>
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
 </thead>
 <tbody>
     {equipos.map((equipos,index) => (
         <tr key={index}>
             <td>{equipos.name}</td>
             <td>{equipos.director}</td>
         </tr>
     ))}
 </tbody>
</table>
            ) : (
                <p>No hay equipos inscriptos aún.</p>
            )}
           
        </div>

        </>
    );
}