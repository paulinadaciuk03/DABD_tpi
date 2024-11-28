import "./Header.css";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

export default function Header(){
    return(
        <>
            <nav className="navbar">
                <div className="navbar-right">
                    <Link to="/">
                    <img src={logo} alt="" style={{width: "30px"}}></img>
                    </Link>
                </div>
                <div className="navbar-left">
                    <Link to="/equipos" className="navbar-item">Equipos</Link>
                    <Link to="/jugadores" className="navbar-item">Jugadores</Link>
                    <Link to="/torneo" className="navbar-item">Torneos</Link>
                    <Link to="/fixtures" className="navbar-item">Fixtures</Link>
                    <li className="navbar-item">Encuentros</li>
                    <li className="navbar-item">Estadísticas</li>
                    <li className="navbar-item">Resultados</li>
                    
                </div>
                   
            </nav>
        </>
    );
}