import Header from "../Header/Header";
import "./Torneo.css"
import { useForm } from "react-hook-form";



export default function Torneos(){
    const {handleSubmit, register} = useForm();
    const onSubmit = data => console.log(data);

    return(
        <>
        <Header></Header>
        <div className="container">
        <form className="formulario" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="title">Inscribirse a un Torneo</h1>
                <input {...register("name")} placeholder="nombre del equipo" className="form-input"></input>
                <select {...register("categoria")} className="form-input">
                    <option value="">Selecciona una categoría</option>
                </select>

                <select {...register("division")} className="form-input">
                    <option value="">Selecciona una división</option>
                    <option value="Division1">División 1</option>
                    <option value="Division2">División 2</option>
                    <option value="Division3">División 3</option>
                </select>
                <button onClick={handleSubmit(onSubmit)} className="form-btn">Enviar</button>
                
            </form>
        </div>

        </>
    );
}