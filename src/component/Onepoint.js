import React from "react";
import ChartOne from "./ChartOne";
import * as ReactDOM from 'react-dom/client';
const math = require('mathjs');

var Xone = [];
var loopone = [];

export default function Onepoint(){
    function Onepoint(X,Function){
        const func = (x) =>{
            let expr = math.parse(Function);
            return expr.evaluate({x: (x)});
        }
        console.log(X) ;
        var xold = parseFloat(X);
        var xnew = 0;
        var Error = 999;
        var i = 0;
        do{
            xnew = func(xold);
            Xone.push(xnew);
            Error = Math.abs((xnew-xold)/xnew)*100;
            i++;
            loopone.push(i);
            xold = xnew;
        }while(Error>0.000001 || i<30);
        console.log(xnew);
        return "X = "+xnew.toFixed(5);
    }
    function getValue (){
        var X = document.getElementById("x").value;
        var Function = document.getElementById("Function").value;
        var Xans = Onepoint(X,Function);
        const Rechart = ReactDOM.createRoot(document.getElementById("showchart"));
        Rechart.render(
            <div>
             <ChartOne data = {{x:Xone,loop:loopone}}/>
            </div>
        );
        document.getElementById("ShowAns").innerHTML = Xans;
    }
    return(
        <div><h1 style={{color:'black',paddingLeft:'480px',paddingTop:'75px'}}>One point</h1>
            <div className="containerBi" style={{color:'black'}}>
            <form>
                <label>
                    <h4 style={{paddingLeft:'135px', paddingTop:'25px', paddingRight:'10px'}}>X :</h4>
                </label> 
                    <input id = "x" placeholder="X" type='number' style={{fontSize:'20px'}} size='1' padding='500' width='100'></input>
                <div className="labelfun">
                <label>    
                    <h4 style={{paddingLeft:'90px', paddingRight:'10px'}}>Function :</h4>
                </label>
                    <input input id = "Function" placeholder="Function" size='15' type='function' style={{fontSize:'20px'}}></input>
                </div>
            </form>
            <div className="buttonbi">
                <button style={{color:'#fff'}} onClick={getValue}>Calculate</button>
            </div>
            </div>
            <div id="ShowAns" className="ShowXM" style={{color: 'black',paddingLeft:'550px',paddingTop:'30px'}}></div>
            <div id = "showchart" style={{paddingLeft:'320px' , paddingTop:'30px'}}>
                <ChartOne data = {{x:Xone,loop:loopone}}/>
            </div>
        </div>
    )
}