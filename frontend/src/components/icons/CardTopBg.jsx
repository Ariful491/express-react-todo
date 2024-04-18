import Tiles from "./Tiles.jsx";
import Lines from "./Lines.jsx";

function CardTopBg() {

    return (
        <>
            <div className="shine"></div>
            <div className="background">
                <Tiles/>
                <Lines/>
            </div>
        </>
    );
}


export default CardTopBg;