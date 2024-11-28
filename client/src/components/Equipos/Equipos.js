import { useState } from "react";
import Header from "../Header/Header";
import "./Equipos.css"
import { useForm } from "react-hook-form";

export default function Equipos(){
    const {handleSubmit, register} = useForm();
    const [equipos, setEquipos] = useState([]);

    const onSubmit = data => {

        if(validaciones(data) > 0){
            alert("Por favor elija un equipo que no esté registrado");
        } else {
            setEquipos([...equipos, data]);
        }
        console.log(data);
    };

    const validaciones = (data) => {
        let cont = 0;
        equipos.forEach(element => {
            if(element.name === data.name){
                cont++;
            } 
        });
        return cont;
    }

    return(
        <>
        <Header></Header>
         <div className="container">
         <form className="formulario" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="title">Inscribir un Equipo</h1>
                <input {...register("name", {required: true})} placeholder="Nombre del equipo" className="form-input"></input>
                <input {...register("director", {required: true})} placeholder="Director Tecnico" className="form-input"></input>
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