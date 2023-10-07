import ErrorImg from "./assets/page-not-found.jpg";
import "./404.css";

function Error() {
    return (
        <div className="errorPage-Container">
            <img src={ErrorImg} alt="" />
        </div>
    );
}
export default Error;