import Header from "../Header/Header";
import "./Equipos.css"
import { useForm } from "react-hook-form";

export default function Equipos(){
    const {handleSubmit, register} = useForm();
    const onSubmit = data => console.log(data);

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

        </>
    );
}