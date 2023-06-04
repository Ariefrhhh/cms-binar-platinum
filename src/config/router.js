import CarList from "../pages/List-car";
import Login from "../pages/login";
import Addnewcar from "../pages/add-new-car";
import Editcar from "../pages/edit-car";
import Dashboard from "../pages/dashboard";
// import Tes from "../pages/tes-new/index copy";

export const publicrouting = (props) => {
    return [
        { index: true, path: '/', element: <Login  {...props} title="Home" />, },
        { index: true, path: '/login', element: <Login  {...props} title="Login" />, },
        { index: true, path: '*', element: <div>Halaman Not Found</div> },
    ]
}

export const privaterouting = (props) => {
  
    return [
        { index: true, path: '/dashboard', element: <Dashboard/> },
        { index: true, path: '/listcar', element: <CarList/> },
        { index: true, path: '/addnewcar', element: <Addnewcar/> },
        // { index: true, path: '/tes', element: <Tes/> },
        { index: true, path: '/editcar', element: <Editcar /> },
        { index: true, path: '*', element: <div>Halaman Not Found</div> },
    ]
}