import { useState } from "react";
import AppRouter from "./pages/App/AppRouter";
import AuthRouter from "./pages/Auth/AuthRouter";
import { useLocalStorage } from "usehooks-ts";

function App() {

    // const [isAuthenticated, setIsAuthenticated] = useState(false)
    // if(isAuthenticated)
    
    const stringData = localStorage.getItem("userList") || "[]";
    let currentList = JSON.parse(stringData);

    const [loggedUser, setLoggedUser] = useLocalStorage('loggedUser', undefined);
    console.log(loggedUser);
    if(loggedUser)

        return <AppRouter />

    return <AuthRouter />
}

export default App;
