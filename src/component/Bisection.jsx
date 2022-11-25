import React from "react";
import './Bisection.css';
import ChartBI from './ChartBi';
import * as ReactDOM from 'react-dom/client';
const math = require('mathjs');

var xlbi = [];
var xrbi = [];
var xmbi = [];

export default function Bisection(){
 
    function BisectionFuction(Xl,Xr,Function){
        const func = (x) =>{
            let expr = math.parse(Function);
            return expr.evaluate({x: (x)});
        }
        var xl = parseFloat(Xl);
        var xr = parseFloat(Xr);
        var Error = 999;
        var xm, xold;
        var count = 0;
        do{
            xlbi.push(xl);
            xrbi.push(xr);
            xm = (xl+xr)/2;
            xmbi.push(xm);

            if(func(xm)*func(xr)<0){
                xold = xl;
                xl = xm;
            }
            else if(func(xm)*func(xr)>0){
                xold = xr;
                xr = xm;
            }
            else if(func(xm)*func(xr) == 0 || func(xm)*func(xl) == 0) {
                Error = 0 ;
            }
            Error = Math.abs((xm-xold)/xm);
            count++;
        }while(Error>0.000001&&count!=30);
        return "Xm = "+xm.toFixed(5);
    }

    function getValue (){
        var Xl = document.getElementById("xl").value;
        var Xr = document.getElementById("xr").value;
        var Function = document.getElementById("Function").value;
        var Xm = BisectionFuction(Xl,Xr,Function);
        const Rechart = ReactDOM.createRoot(document.getElementById("showchart"));
        Rechart.render(
            <div>
                <ChartBI data = {{xm:xmbi, xl:xlbi , xr:xrbi}}/>
            </div>
        );
        document.getElementById("ShowXM").innerHTML = Xm;
    }

    return(
        <div className="TitleBi"><h1 style={{color:'black',paddingLeft:'500px',paddingTop:'75px'}}>Bisection</h1>
            <div className="containerBi" style={{color:'black'}}>
                <form>
                    <label>
                        <h4 style={{paddingRight:'10px'}}>Xl :</h4>
                    </label> 
                        <input id = "xl" className="xl" placeholder="Xl" type='number' size='1' style={{fontSize:'20px'}}></input>
                    <label>    
                        <h4 style={{paddingTop:'20px',paddingRight:'10px'}}>Xr :</h4>
                    </label>
                        <input id = "xr" className="xr" placeholder="Xr" type ='number' size='1' style={{fontSize:'20px'}}></input>
                    <div className="labelfunc">
                    <label>    
                        <h4 style={{paddingLeft:'100px',paddingRight:'10px'}}>Function :</h4>
                    </label>
                        <input id = "Function" className="function" placeholder="Function" type = 'function' size='15' style={{fontSize:'20px'}}></input>
                    </div>
                </form>
                <div className="buttonbi">
                    <button style={{color:'#fff'}} onClick={getValue}>Calculate</button>
                </div>
            </div>
            <div id="ShowXM" className="ShowXM" style={{color: 'black',paddingLeft:'525px',paddingTop:'30px'}}></div>
            <div className="chartcontrainer">
                <div id = "showchart" className = 'chart' style={{paddingLeft:'320px' , paddingTop:'30px'}}>
                    <ChartBI data = {{xm:xmbi, xl:xlbi , xr:xrbi}}/>
                </div>
            </div>
        </div> 
    );
}


   
