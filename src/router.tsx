import { createBrowserRouter } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import FavoritesPage from "./components/pages/Favorites/FavoritesPage";


const router = createBrowserRouter([
    {
        path : "/",
        element : <Home/>
    },
    {
        path : "/favorites",
        element : <FavoritesPage/>
    }
]);
export default router;