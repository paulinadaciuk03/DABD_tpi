import { useState } from "react";
import Header from "../Header/Header";
import "./Jugadores.css"
import { useForm } from "react-hook-form";

export default function Jugadores(){
    const {handleSubmit, register} = useForm();
    const [categoria, setCategoria] = useState('');
    const [jugadores, setJugadores] = useState([]);

    const onSubmit = data => {
        const fechaNacimiento = new Date(data.fechaNacimiento);
        const edad = calcularEdad(fechaNacimiento);
        const categoria = calcularCategoria(edad);
        setCategoria(categoria);
        console.log(categoria); 
        const equipo = "No inscripto";

        const validacion = validarDatos(data);

        if(validacion !== 0){
            alert("El jugador ya está inscripto");
        } else {
            const nuevoJugador = {
                name: data.name,
                lastName: data.last_name,
                fechaNacimiento: data.fechaNacimiento,
                edad,
                categoria,
                equipo
            };
            setJugadores([...jugadores, nuevoJugador]);
        }


    };

    const validarDatos = (data) => {
        return jugadores.some(jugador => 
            jugador.name === data.name && 
            jugador.lastName === data.last_name && 
            jugador.fechaNacimiento === data.fechaNacimiento
        ) ? 1 : 0;
    };

    const calcularCategoria = (edad) => {
        if(edad <= 7 && edad >= 0) {
            return "Prebenjamin";
        } else if (edad <= 9 && edad >= 8) {
            return "Benjamin";
        } else if (edad <= 11 && edad >= 10){
            return "Alevin";
        } else if  (edad <= 13 && edad >= 12) {
            return "Infantil";
        } else if (edad <= 15 && edad >= 14) {
            return "Cadete";	
        } else {
            return "Juvenil";
        }
    }

    const calcularEdad = (fechaNacimiento) => {
        const nacimiento = new Date(fechaNacimiento);
        const hoy = new Date();
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();
        const dia = hoy.getDate() - nacimiento.getDate();
    
        if (mes < 0 || (mes === 0 && dia < 0)) {
          edad--; 
        }
    
        return edad;
      };
    return(
        <>
        <Header></Header>
        <div className="background">    
        </div>
        <div className="container">
         <form className="formulario" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="title">Inscribir un Jugador</h1>
                <input  {...register("name", {required: true})} placeholder="Nombre" className="form-input" ></input>
                <input  {...register("last_name", {required: true})} placeholder="Apellido" className="form-input"></input>
                <input  type="date" {...register("fechaNacimiento", {required: true})} placeholder="Fecha de Nacimiento"className="form-input"></input>
                <button onClick={handleSubmit(onSubmit)} className="form-btn">Enviar</button>
            </form>
        </div>

        <div className="jugadores-lista">
    <h2>Jugadores Inscritos</h2>
    {jugadores.length > 0 ? (
        <table className="tabla">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Fecha de Nacimiento</th>
                    <th>Edad</th>
                    <th>Categoría</th>
                    <th>Equipo</th>
                </tr>
            </thead>
            <tbody>
                {jugadores.map((jugador, index) => (
                    <tr key={index}>
                        <td>{jugador.name}</td>
                        <td>{jugador.lastName}</td>
                        <td>{jugador.fechaNacimiento}</td>
                        <td>{jugador.edad}</td>
                        <td>{jugador.categoria}</td>
                        <td>{jugador.equipo}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    ) : (
        <p>No hay jugadores inscritos.</p>
    )}
</div>
        </>
    );
}