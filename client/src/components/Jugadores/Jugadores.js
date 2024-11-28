import Header from "../Header/Header";
import "./Jugadores.css"
import { useForm } from "react-hook-form";

export default function Jugadores(){
    const {handleSubmit, register} = useForm();
    const onSubmit = data => {
        console.log(data)
        const fechaNacimiento = data.age;
        const edad = calcularEdad(fechaNacimiento);
        console.log(edad);

        switch (edad){
            case edad <= 45 && edad >= 41:
                console.log("Maxi");
                break;
            case edad :
                console.log("Es un adolescente");
                break;
            case 2:
                console.log("Es un joven");
                break;
            default:
                console.log("Es un adulto");
                break;
        }
    };

    const calcularEdad = (fechaNacimiento) => {
        const nacimiento = new Date(fechaNacimiento);
        const hoy = new Date();
    
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();
        const dia = hoy.getDate() - nacimiento.getDate();
    
        // Ajustar la edad si no ha cumplido años este año
        if (mes < 0 || (mes === 0 && dia < 0)) {
          edad--; // No ha cumplido años aún en el año actual
        }
    
        return edad;
      };
    return(
        <>
        <Header></Header>
        <div className="container">
         <form className="formulario" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="title">Inscribir un Jugador</h1>
                <input {...register("name")} placeholder="Nombre" className="form-input"></input>
                <input {...register("last_name")} placeholder="Apellido" className="form-input"></input>
                <input type="date" {...register("age")} placeholder="Edad" className="form-input"></input>
                <input type="file" {...register("foto")} placeholder="Foto" className="form-input"></input>
                <button onClick={handleSubmit(onSubmit)} className="form-btn">Enviar</button>
            </form>
        </div>
        </>
    );
}