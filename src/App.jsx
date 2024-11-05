import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import {Signin} from "./pages/Sigin"
import {Dashboard} from"./pages/Dashboard";
import {Signup} from "./pages/Signup"
import { FullPost } from './pages/FullPost';
import {CreatePost} from "./pages/CreatePost";
import { PostCreatedSuccess } from './pages/PostCreatedSucess';
import {NavBar}  from "./components/AppBar";
import { Profile } from './pages/Profile';
import {OtherUserProfile} from "./pages/OtherUserProfile";
import NotFound from "./pages/NotFound"

// import {NotFound} from "./pages/NotFound";

function App() {
  const user = localStorage.getItem("user");

  return (
    <div>
    <BrowserRouter> 
    <NavBar />
    <Routes>
      <Route path='/' element={ <Dashboard />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/signin' element ={<Signin />}/>
      {/* <Route path='/user-dashboard' element={<Dashboard  />} /> */}
      <Route path='/full-post/:id' element={<FullPost/>} />
      <Route path='/profile' element = {<Profile />}/>
      
      <Route path='/create-post' element={<CreatePost />} ></Route> 

      <Route path='/post-created-sucess' element = {<PostCreatedSuccess />}></Route>
      <Route path='/:userId/profile' element= {<OtherUserProfile />}  > </Route>
      <Route path = "*" element = {<NotFound />} ></Route>

    </Routes>
   
    </BrowserRouter>       
    </div>
  )
}

export default App
