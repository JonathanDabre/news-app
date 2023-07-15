import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export class App extends Component {

  pageSize = 9;
  

  state = {
    progress: 0
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
            color='#c2bbba'
            progress={this.state.progress}
            shadow = {false}
            
          />
          <Routes>
            <Route exact path='/' element={<News setProgress = {this.setProgress}   key={"general"} pageSize={9} country={"in"} category={"general"}/>}></Route>
            <Route exact path='/business' element={<News setProgress = {this.setProgress}  key={"business"} pageSize={9} country={"in"} category={"business"}/>}></Route>
            <Route exact path='/science' element={<News setProgress = {this.setProgress}  key={"science"} pageSize={9} country={"in"} category={"science"}/>}></Route>
            <Route exact path='/entertainment' element={<News setProgress = {this.setProgress}  key={"entertainment"} pageSize={9} country={"in"} category={"entertainment"}/>}></Route>
            <Route exact path='/general' element={<News setProgress = {this.setProgress}  key={"general"} pageSize={9} country={"in"} category={"general"}/>}></Route>
            <Route exact path='/health' element={<News setProgress = {this.setProgress}  key={"health"} pageSize={9} country={"in"} category={"health"}/>}></Route>
            <Route exact path='/sports' element={<News setProgress = {this.setProgress}  key={"sports"} pageSize={9} country={"in"} category={"sports"}/>}></Route>
            <Route exact path='/technology' element={<News setProgress = {this.setProgress}  key={"technology"} pageSize={9} country={"in"} category={"technology"}/>}></Route>

          </Routes>
          {/* <News setProgress = {setProgress} pageSize={9} country={"in"}/> */}
        </Router>
      </div>
    )
  }
}

export default App

