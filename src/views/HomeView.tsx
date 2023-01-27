import { useSearchParams } from "react-router-dom";
import Ranking from "../components/Home/Ranking";
import { useFetchHomepage } from "../hooks/fetch";


/*
    TODO:
    - Images are not loading properly (copying image above?)
    - Why is text-overflow: ellipsis not working :( (width needs to be constrained in pixels not percent)
*/


function HomeView() {
    const [queryParams] = useSearchParams();
    const period = queryParams.get("period");

    const { data } = useFetchHomepage(period ?? "");

    return (
        data && period ?
            <Ranking period={period} data={data} />
        :   <div className="placeholder"></div>
    );
}


export default HomeView;