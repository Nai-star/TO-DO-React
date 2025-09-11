import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Lista from '../pages/Lista'
import LoginUsuario from "../pages/LoginUsuario"


const Routing =() =>{
  return (
    <Router>
        <Routes>
            <Route path="/Lista" element={<Lista/>}/>
            <Route path="/LoginUsuario" element={<LoginUsuario/>}/>
        </Routes>
    </Router>
  )
}

export default Routing
