import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css'
import { NormalRoutes } from "./Routes/Routes";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

function App() {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route>
                        {
                            NormalRoutes.map((route, index) =>(
                                <Route key={index} path={route.path} element={route.element} />
                            ))
                        }
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App
