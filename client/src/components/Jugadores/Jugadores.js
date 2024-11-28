import Header from "../Header/Header";
import "./Jugadores.css"
import { useForm } from "react-hook-form";

export default function Jugadores(){
    const {handleSubmit, register} = useForm();
    const onSubmit = data => console.log(data);
    


    return(
        
        <>
        <Header></Header>
        
        <div className="container">
         <form className="formulario" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="title">Inscribir un Jugador</h1>
                <input {...register("name")} placeholder="nombre" className="form-input"></input>
                <input {...register("apellido")} placeholder="apellido" className="form-input"></input>
                <button onClick={handleSubmit(onSubmit)} className="form-btn">Enviar</button>
            </form>
        </div>
        </>
    );
}