import Header from "../Header/Header";
import banner from "../../assets/banner.jpg"
import "./Body.css"

export default function Body(){
    return(
        <>
            <Header></Header>
            <div className="banner">
            <img src={banner} alt="" className="banner-img"></img>
            </div>
        </>
    );
}