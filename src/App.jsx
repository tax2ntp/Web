import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './component/Home';
import Sidebar from './component/Sidebar';
import Bisection from './component/Bisection';
import Falseposition from './component/Falseposition';
import Onepoint from './component/Onepoint';
import QandA from './component/Q&A';
import Newton from './component/Newton'
import CramerRule from './component/Cramer_Rule';
import Guass_Elimination from './component/Gauss_Eliminate';
import Gauss_Jordan from './component/Gauss_Jordan';
import Jacobi from './component/Jacobi';
import Gauss_seidel from './component/Gauss_seidel';
import Conjugate_gradient from './component/Conjugate_gradient';
import Lagarange from './component/Lagarange';
import LinearRegression from './component/Linear_Regression';
import PolynomialRegression from './component/Polynomial_Regression';
import Default from './component/Default';
import Secant from './component/Secant';
import NewtonDivided from './component/NewtonDivided';
import MultipleLinear from './component/Multiple_Regression';



function App() {
    return ( 
        <div className = 'container' >
        <Sidebar/>
        <BrowserRouter>
        <Routes >
        <Route path = '/numerProject/' element = {<Home/>} > </Route>  
        <Route path = '/numerProject/Bisection' element = {<Bisection/>}> </Route>  
        <Route path = '/numerProject/Falseposition' element = {<Falseposition/>}> </Route>  
        <Route path = '/numerProject/OnePointiteration' element = {<Onepoint/>}> </Route>  
        <Route path = '/numerProject/NewtonRaphson' element = {<Newton/>}> </Route>  
        <Route path = '/numerProject/cramerrule' element = {<CramerRule/>}> </Route>  
        <Route path = '/numerProject/Secant' element = {<Secant/>}> </Route>  
        <Route path = '/numerProject/gausselimination' element = {<Guass_Elimination/>}> </Route>  
        <Route path = '/numerProject/gaussjordan' element = { < Gauss_Jordan / > } > </Route>  
        <Route path = '/numerProject/jacobi' element = { < Jacobi / > } > </Route>  
        <Route path = '/numerProject/gaussseidel' element = { < Gauss_seidel / > } > </Route>  
        <Route path = '/numerProject/conjugategradient' element = { < Conjugate_gradient / > } > </Route> 
        <Route path = '/numerProject/NewtonDivided' element = { < NewtonDivided / > } > </Route>  
        <Route path = '/numerProject/largrange' element = { < Lagarange / > } > </Route>  
        <Route path = '/numerProject/linearregression' element = { < LinearRegression / > } > </Route>  
        <Route path = '/numerProject/polynomial' element = { < PolynomialRegression / > } > </Route>  
        <Route path = '/numerProject/Default' element = { < Default / > } > </Route>  
        <Route path = '/numerProject/Q&A' element = { < QandA / > } > </Route>  
        <Route path = '/numerProject/MultipleLinear' element = {<MultipleLinear/>}> </Route>
        </Routes> 
        </BrowserRouter>  
        </div>
    );
}

export default App;