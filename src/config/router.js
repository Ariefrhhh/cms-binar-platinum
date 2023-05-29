import CarList from "../pages/List-car";
import Home from "../pages/home";
import Login from "../pages/login";
import Addnewcar from "../pages/add-new-car";
import Editcar from "../pages/edit-car";
// import Tes from "../pages/tes-new/index copy";

export const publicrouting = (props) => {
    return [
        { index: true, path: '/', element: <Login  {...props} title="Home" />, },
        { index: true, path: '/login', element: <Login  {...props} title="Login" />, },
        { index: true, path: '*', element: <div>Halaman Not Found</div> },
    ]
}

export const privaterouting = (props) => {
    const carId = 1;
    return [
        { index: true, path: '/home', element: <Home/> },
        { index: true, path: '/listcar', element: <CarList/> },
        { index: true, path: '/addnewcar', element: <Addnewcar/> },
        // { index: true, path: '/tes', element: <Tes/> },
        { index: true, path: '/editcar', element: <Editcar carId={carId}   /> },
        { index: true, path: '*', element: <div>Halaman Not Found</div> },
    ]
}