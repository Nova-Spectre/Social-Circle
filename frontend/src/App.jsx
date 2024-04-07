import { BrowserRouter , Navigate , Routes , Route } from "react-router-dom";

import HomePage from "./scenes/homePage/index";
import LoginPage from "./scenes/loginPage";
import ProfilePage from "./scenes/profilePage";
import { useMemo } from "react";
import {  useSelector } from "react-redux";
import { CssBaseline,ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import themeSettings from "./theme";
import PreLoader from "./preloader/Preloader";
import { useState ,useEffect} from "react";




function App() {

  const mode= useSelector((state)=> state.mode );
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth=Boolean(useSelector((state)=>state.token));
  const [isLoading, setIsLoading] = useState(true);
 

  useEffect(() => {
  
    const timeout = setTimeout(() => {
      setIsLoading(false); 
    }, 4000); 

    return () => clearTimeout(timeout);
  }, []);
  const isProfilePage = location.pathname.startsWith("/profile");



  return (
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        
        <CssBaseline/>
        {!isProfilePage && isLoading && <PreLoader />}
        {!isLoading && (
      <Routes>
        <Route path="/" element={<LoginPage></LoginPage>}></Route>
        <Route path="/home" element={isAuth?<HomePage></HomePage>:<Navigate to="/"></Navigate>}></Route>
        <Route path="/profile/:userId" element={isAuth?<ProfilePage></ProfilePage>:<Navigate to="/"></Navigate>}></Route>
      </Routes>
        )}
      </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
