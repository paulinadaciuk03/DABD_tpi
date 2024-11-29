import { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./Jugadores.css"
import { useForm } from "react-hook-form";
import axios from 'axios';

export default function Jugadores(){
    const {handleSubmit, register} = useForm();
    const [categoria, setCategoria] = useState('');
    const [jugadores, setJugadores] = useState([]);
    const [equipos, setEquipos] = useState([]);

    
    useEffect(() => {
        axios.get("http://localhost:3001/jugadores")
            .then((response) => {
                setJugadores(response.data); 
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Hubo un error al recuperar los jugadores", error.response || error);
            });

            axios.get("http://localhost:3001/equipos")
            .then((response) => {
                setEquipos(response.data);
                console.log(response.data);
            })
            .catch((error) =>
            {
                console.log(error);
            })
    }, []);
    
    
    const onSubmit = data => {
        const fechaNacimiento = new Date(data.fechaNacimiento);
        const edad = calcularEdad(fechaNacimiento);
        const categoria = calcularCategoria(edad);
        setCategoria(categoria);
        console.log(categoria); 
        
        axios.post("http://localhost:3001/inscribir_jugador", {
            nombre: data.nombre,
            apellido: data.apellido,
            dni: data.dni,
            telefono : data.telefono,
            direccion : data.direccion,
            edad,
            categoria,
            id_equipo : data.id_equipo
        })
        .then(() => {
            alert("Jugador inscripto exitosamente");
        })
        .catch(error => {
            console.error('Error during Axios request:', error);
            alert("Error al inscribir jugador. Verifica la consola para más detalles.");
        });

        window.location.reload();
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
        <div className="container">
         <form className="formulario" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="title">Inscribir un Jugador</h1>
                <input  {...register("nombre", {required: true})} placeholder="Nombre" className="form-input" ></input>
                <input  {...register("apellido", {required: true})} placeholder="Apellido" className="form-input"></input>
                <input  {...register("dni", {required: true})} placeholder="DNI" className="form-input"></input>
                <input  {...register("telefono", {required: true})} placeholder="Teléfono" className="form-input"></input>
                <input  {...register("direccion", {required: true})} placeholder="Dirección" className="form-input"></input>
                <input  type="date" {...register("fechaNacimiento", {required: true})} placeholder="Fecha de Nacimiento"className="form-input"></input>
                <select {...register("id_equipo", { required: true })} className="form-input">
                        {equipos.map((equipo, index) => (
                            <option key={index} value={equipo.id}>
                                {equipo.nombre}
                            </option>
                        ))}
                </select>
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
                    <th>DNI</th>
                    <th>Teléfono</th>
                    <th>Dirección</th>
                    <th>Edad</th>
                    <th>Categoría</th>
                    <th>Equipo</th>
                </tr>
            </thead>
            <tbody>
            {jugadores.map((jugador, index) => {
                            const equipo = equipos.find(equipo => equipo.id === jugador.id_equipo);
                            return (
                                <tr key={index}>
                                    <td>{jugador.nombre}</td>
                                    <td>{jugador.apellido}</td>
                                    <td>{jugador.dni}</td>
                                    <td>{jugador.telefono}</td>
                                    <td>{jugador.direccion}</td>
                                    <td>{jugador.edad}</td>
                                    <td>{jugador.categoria}</td>
                                    <td>{equipo ? equipo.nombre : "No asignado"}</td>
                                </tr>
                            );
                        })}
            </tbody>
        </table>
    ) : (
        <p>No hay jugadores inscritos.</p>
    )}
</div>
        </>
    );
}