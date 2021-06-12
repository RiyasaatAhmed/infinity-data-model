import Welcome from './Pages/Welcome';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Footer from './Layout/Footer';
import ModelData from './Pages/ModelData';
import AddDevice from './Pages/AddDevice';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {
  return (


    <Router>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/modeltype" component={Home} />
        <Route exact path="/devicemodel" component={AddDevice} />
        <Route path="/modeldata/:brandId/:name" component={ModelData} />
        <Route exact path="/login" component={Login} />
      </Switch>
      <Footer />
      </Router>

  );
}

export default App;
