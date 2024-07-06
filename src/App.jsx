import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import "./App.css";
import {NormalRoutes, UserRoutes} from "./Routes/Routes";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequireAuth from "./Pages/Context/RequireAuth.jsx";
import 'react-multi-carousel/lib/styles.css';
import {useAuthContext} from "./Pages/Context/AuthContext.jsx";
import Login from "./Pages/Login/login.jsx";
import SignUp from "./Pages/SignUp/signUp.jsx";
import FZFNotFound from "./Components/PageNotFound/404NotFound.jsx";

function App() {
    const queryClient = new QueryClient();
    const {currentUser}  = useAuthContext()

    return (
        <QueryClientProvider client={queryClient}>
            <ToastContainer style={{fontSize:13}}/>
            <BrowserRouter>
                <Routes>
                    <Route path='/signup' element={currentUser?.accessToken ? <Navigate to="/" /> : <SignUp />} />
                    <Route path='/login' element={currentUser?.accessToken ? <Navigate to="/" /> : <Login />} />
                    {NormalRoutes.map((route, index) => (
                        <Route key={index} path={route.path} element={route.element}/>
                    ))}
                    {UserRoutes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={<RequireAuth>{route.element}</RequireAuth>}
                        ></Route>
                    ))}
                    <Route path='*' element={currentUser?.accessToken ? <FZFNotFound btnText={'Về trang chủ'} urlReturn={'/'}  error={'Xin lỗi, trang bạn đang tìm kiếm không tồn tại!'}/> : <Login />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
