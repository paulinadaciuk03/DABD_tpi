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
        <h1 className="title">Crear un Torneo</h1>
                <input {...register("name", {required: true})} placeholder="Nombre" className="form-input"></input>
                <select {...register("categoria", {required: true})} className="form-input">
                    <option value="">Selecciona una categoría</option>
                </select>

                <select {...register("division", {required: true})} className="form-input">
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