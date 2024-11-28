import Header from "../Header/Header";
import "./Equipos.css"

export default function Equipos(){
    return(
        <>
        <Header></Header>
        <div className="container">
        <form className="formulario">
                <h1 className="title">Inscribir un Equipo</h1>
                <input type="text" name="name" className="form-input"></input>
                <label className="form-label">Nombre</label>
                <input type="text" name="director" className="form-input"></input>
                <label className="form-label">Director Técnico</label>

            </form>
        </div>

        </>
    );
}