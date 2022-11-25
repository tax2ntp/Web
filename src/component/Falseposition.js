import React from "react";
import './Falseposition.css';
import ChartBI from './ChartBi';
import * as ReactDOM from 'react-dom/client';
const math = require('mathjs');

var xlbi = [];
var xrbi = [];
var xmbi = [];
var loopbi = [];

export default function Falseposition(){
    function FalsePositionFuction(Xl,Xr,Function){
        const func = (x) =>{
            let expr = math.parse(Function);
            return expr.evaluate({x: (x)});
        }
        var xl = Xl;
        var xr = Xr;
        var Error = 0;
        var xm, xold;
        var i = 0;
        var count = 0;
        do{
            xlbi.push(xl);
            xrbi.push(xr);
            loopbi.push(i++);
            xm=((xl*func(xr))-(xr*func(xl)))/(func(xr)-func(xl));
            xmbi.push(xm);
            if(func(xm)*func(xr)<0){
                xold = xl;
                xl = xm;
            }
            else if(func(xm)*func(xl)>0){
                xold = xr;
                xr = xm;
            }
            Error = Math.abs((xm-xold)/xm);
            count++;
        }while(Error>0.000001&&count!== 50 );
        console.log(xm);
        return "Xm = "+xm.toFixed(5);
    }
    function getValue (){
        var Xl = document.getElementById("xl").value;
        var Xr = document.getElementById("xr").value;
        var Function = document.getElementById("Function").value;
        var Xm = FalsePositionFuction(Xl,Xr,Function);
        const Rechart = ReactDOM.createRoot(document.getElementById("showchart"));
        Rechart.render(
            <div>
            <ChartBI data = {{xm:xmbi, xl:xlbi , xr:xrbi ,loop:loopbi}}/>
            </div>
        );
        console.log(Xl);
        console.log(Xr);
        console.log(Function);
        console.log(Xm);
        document.getElementById("ShowXM").innerHTML = Xm;
    }
    return(
        <div><h1 style={{color:'black',paddingLeft:'450px',paddingTop:'75px'}}>False Position</h1>
            <div className="containerBi" style={{color:'black'}}>
            <form>
                <label>
                    <h4 style={{paddingRight:'10px'}}> Xl :</h4>
                </label> 
                    <input id = "xl" placeholder="Xl" type='number' style={{fontSize:'20px'}}></input>
                <label>    
                    <h4 style={{paddingTop:'20px',paddingRight:'10px'}}>Xr :</h4>
                </label>
                    <input input id = "xr" placeholder="Xr" type = 'number' style={{fontSize:'20px'}}></input>
                <div className="labelfun">
                <label>    
                    <h4 style={{paddingLeft:'100px',paddingRight:'10px'}}>Function :</h4>
                </label>
                    <input input id = "Function" placeholder="Function" type='function' style={{fontSize:'20px'}} ></input>
                </div>
            </form>
            <div className="buttonbi">
                <button style={{color:'white'}} onClick={getValue}>Calculate</button>
            </div>
            </div>
            <div id="ShowXM" className="ShowXM" style={{color: 'black',paddingTop:'30px',textAlign:'center'}}></div>
            <div id = "showchart" style={{paddingLeft:'320px' , paddingTop:'30px'}}>
                <ChartBI data = {{xm:xmbi, xl:xlbi , xr:xrbi ,loop:loopbi}}/>
            </div>
        </div>
        
    )
}