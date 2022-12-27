import { useParams } from "react-router-dom";
import Ranking from "../components/Home/Ranking";
import { useFetchHomepage } from "../hooks/fetch";


/*
    TODO:
    - Fix the spacing of the headers (this probably shouldn't be using flex?) 
    - Change how the filter looks
    - Why is text-overflow: ellipsis not working :(
*/


function HomeView() {
    const { period } = useParams();
    const { data } = useFetchHomepage(period ?? "");

    return (
        data && period ?
            <Ranking period={period} data={data} />
        :   <div className="placeholder"></div>
    );
}


export default HomeView;