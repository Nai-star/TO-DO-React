import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Lista from '../pages/Lista'


const Routing =() =>{
  return (
    <Router>
        <Routes>
            <Route path="/Lista" element={<Lista/>}/>
         
        </Routes>
    </Router>
  )
}

export default Routing
