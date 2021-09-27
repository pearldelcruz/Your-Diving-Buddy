import React, {useState, useEffect} from 'react'
import './App.css'
import 
  {BrowserRouter as Router, 
  Switch, 
  Route} from 'react-router-dom';
import UserContext from './UserContext';

import Navs from './components/Navbar/Navs'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import PageNotFound from './components/PageNotFound';
import SingleProduct from './pages/SingleProduct';
import MyOrder from './pages/MyOrder';

function App() {

	const [user, setUser] = useState(
		{
			id: null,
			isAdmin: null
		}
	);

	const unsetUser = () => {
		localStorage.clear();
		setUser({
			id: null,
			isAdmin: null
		})
	}

	useEffect( () => {
		let token = localStorage.getItem('token');
		fetch('https://gentle-wave-67856.herokuapp.com/api/users/profile', 
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
          .then(result => result.json())
          .then(result => {
            console.log(result) 

            if(typeof result._id !== "undefined")
            {
              setUser
              ({
                id: result._id, isAdmin: result.isAdmin
              })
            } 
            else 
            {
              setUser
              ({ 
                id: null, isAdmin: null
              })
            }
          })
        }, [])

  return (
      <UserContext.Provider value={{user, setUser, unsetUser}}> 
        <Router>
            <Navs/>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register}/>
              <Route path="/products" exact component={Products}/>
              <Route path="/addProducts" exact component={AddProduct}/>
              <Route path="/products/:productId" exact component={SingleProduct}/>
              <Route path="/myOrder" exact component={MyOrder}/>
              <Route component={PageNotFound} />
            </Switch>
        </Router>
      </UserContext.Provider>
  );
}

export default App;
