import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
    apiKey = process.env.REACT_APP_NEWS_API;    
    pageSize = 6;
    country = "in";
    state = {
      progress: 10,
    }
    setProgress = (progress)=>{ 
      this.setState({progress: progress})
     }
  render() {
    return (
      <div>
        <Router>          
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
        <Switch>  
        <Route exact path="/"><News apiKey={this.apiKey} setProgress={this.setProgress} key="home" pageSize={this.pageSize} country={this.country} category={"general"}/></Route>
         <Route exact path="/business"><News apiKey={this.apiKey} setProgress={this.setProgress} key="business" pageSize={this.pageSize} country={this.country} category={"business"}/></Route>
         <Route exact path="/entertainment"><News apiKey={this.apiKey} setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} country={this.country} category={"entertainment"}/></Route>
         <Route exact path="/health"><News apiKey={this.apiKey} setProgress={this.setProgress} key="health" pageSize={this.pageSize} country={this.country} category={"health"}/></Route>
         <Route exact path="/science"><News apiKey={this.apiKey} setProgress={this.setProgress} key="science" pageSize={this.pageSize} country={this.country} category={"science"}/></Route>
         <Route exact path="/sports"><News apiKey={this.apiKey} setProgress={this.setProgress} key="sports" pageSize={this.pageSize} country={this.country} category={"sports"}/></Route>
         <Route exact path="/technology"><News apiKey={this.apiKey} setProgress={this.setProgress} key="technology" pageSize={this.pageSize} country={this.country} category={"technology"}/></Route>
      </Switch>  
        </Router>
      </div>
    )
  }
}



