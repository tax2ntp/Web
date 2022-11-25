import React from "react";
import './Bisection.css';
import ChartRegression from "./ChartRegression";
import * as ReactDOM from 'react-dom/client';
const {create, all} = require('mathjs')
const math = create(all)

var xyScatter = [] ;
var xyLinear = [] ;

export default function LinearRegression(){
    function Getmat() {
        var Size = document.getElementById("Matnum").value ;
        var MatxString = "" ;
        var MatyString = "" ;
        for(let i = 0; i < Size; i++) {
            MatxString += "X : <input id='Matx"+i+"' type='number' style={{width:'80px'}}></input><br>"
            MatyString += "Y : <input id='Maty"+i+"' type='number' style={{width:'80px'}}></input><br>"
        }
        document.getElementById("Matx").innerHTML = MatxString ;
        document.getElementById("Maty").innerHTML = MatyString ;
    }

    function getMat(){
        var Size = document.getElementById("Matnum").value ;
        var Matx = [];
        var Maty = [];
        var xPoint = document.getElementById("xPoint").value ;
        for(var i = 0 ; i < Size ; i++){
            Matx.push(document.getElementById("Matx"+i).value);
            Maty.push(document.getElementById("Maty"+i).value);
        }
        for(i = 0; i < Size; i++) {
            xyScatter.push([parseFloat((Matx[i])),parseFloat((Maty[i]))]) ;
        }

        var ans = Cal(Matx,Maty);
        var result = CalResult(ans,xPoint) ;

        for(i = 0; i < Size; i++) {
            xyLinear.push([parseFloat((Matx[i])),(ans[0][2]+(ans[1][2]*parseFloat(Matx[i])))]) ;
        }

        const Rechart = ReactDOM.createRoot(document.getElementById("showchart"));
        Rechart.render(
            <div>
             <ChartRegression data = {{x:xyScatter, y:xyLinear}}/>
            </div>
        );
        document.getElementById("Showans").innerHTML = "a0 = "+ans[0][2].toFixed(4)+"<br>a1 = "+ans[1][2].toFixed(4) ;
        document.getElementById("ShowProof").innerHTML = "f("+xPoint+") = "+ans[0][2].toFixed(4)+" + "+xPoint+" * ("+ans[1][2].toFixed(4)+") = "+result.toFixed(4) ;
    }

    function Cal(X,Y){

        var n = document.getElementById('Matnum').value ;
        
        function findSumX(x) {
            let sum = 0 ;
            for(let i = 0; i < X.length; i++) {
                sum += parseFloat(x[i]) ;
            }
            return sum ;
        }

        function findSumXSQ(x) {
            let sum = 0 ;
            for(let i = 0; i < X.length; i++) {
                sum += math.pow(x[i],2) ;
            }
            return sum ;
        }

        function findSumY(y) {
            let sum = 0 ;
            for(let i = 0; i < y.length; i++) {
                sum += parseFloat(y[i]) ;
            }
            return sum ;
        }

        function findSumXY(x,y) {
            let sum = 0 ;
            for(let i = 0; i < x.length; i++) {
                sum += x[i]*y[i] ;
            }
            return sum ;
        }

        var sumX = findSumX(X) ;
        var sumXSQ = findSumXSQ(X) ;
        var sumY = findSumY(Y) ;
        var sumXY = findSumXY(X,Y) ;

        var a = [[n,sumX,sumY],
                 [sumX,sumXSQ,sumXY]] ;

        var t = 1 ;

        for(let j = 0; j < a.length; j++) {
            for(let i = 0; i < a.length; i++) {
                if(i != j) {
                    t = a[i][j] / a[j][j];
                    for(let k = 0; k < a.length+1; k++) {
                        a[i][k] -= a[j][k]*t;
                    }
                }
            } 
        }

        for(let i = 0; i < a.length; i++) {
            t = a[i][i] ;
            for(let j = 0; j < a.length+1; j++) {
                a[i][j] = a[i][j] / t ;
            }
        }
        
        return a ;
    }

    function CalResult(a,xPoint) {
        let ans = a[0][2] + a[1][2]*xPoint ;
        return ans ;
    }

    return(
            <div><h1 style={{color:'black',paddingLeft:'400px',paddingTop:'75px'}}>Linear Regression</h1>
            <div className="containerBi" style={{color:'black'}}>
            <form>
                <label style={{paddingLeft:'90px'}}>
                    <h4>Number of point : <input id="Matnum" type={'number'} onChange={Getmat}></input></h4>
                    
                </label> 
            </form>
            <div style={{display:'flex'}}>
                <div id="Matx" style={{paddingLeft:'50px'}}></div>
                <div id="Maty" style={{paddingLeft:'10px'}}></div>
            </div>
            <form style={{paddingLeft:'150px'}}>
                <h4>Point x : <input id = "xPoint" type='number'></input></h4>
            </form>
            <div style={{paddingLeft:'230px', paddingTop:'20px'}}>
                <button style={{color:'#fff'}} onClick={getMat}>Calculate</button>
            </div>
            <div id = 'Showans' style={{paddingLeft:'220px',paddingTop:'50px', paddingBottom:'20px'}}></div>
            <div id = 'ShowProof' style={{paddingLeft:'100px', paddingBottom:'50px'}}></div>
            </div>
            <div className="chartcontrainer">
                <div id = "showchart" style={{paddingLeft:'320px'}}>
                    <ChartRegression data = {{x:xyScatter,y:xyLinear}}/>
                </div>
            </div>
            </div>
        )
    }
    