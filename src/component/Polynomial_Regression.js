import React from "react";
import './Bisection.css';
import PolynomialRegression from 'ml-regression-polynomial';
import ChartRegression from "./ChartRegression";
import * as ReactDOM from 'react-dom/client';

export default function Polynomial_Regression(){
    var arrayA = [] ;
    var xyScatter = [] ;
    var xyLinear = [] ;
    
    var lastResult = "" ;
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
        var Degree = document.getElementById("DegreeNum").value ;
        var Matx = [];
        var Maty = [];
        var xPoint = document.getElementById("xPoint").value ;
        for(var i = 0 ; i < Size ; i++){
            Matx.push(document.getElementById("Matx"+i).value);
            Maty.push(document.getElementById("Maty"+i).value);
        }

        var ans = Cal(Matx,Maty, xPoint);
        var aString = "" ;
        for(i = 0; i <= Degree; i++) {
            aString += "a"+i+" = "+arrayA[i].toFixed(4)+"<br>" ;
        }

        for(i = 0; i < Size; i++) {
            xyScatter.push([parseFloat((Matx[i])),parseFloat((Maty[i]))]) ;
        }

        const Rechart = ReactDOM.createRoot(document.getElementById("showchart"));
        Rechart.render(
            <div>
             <ChartRegression data = {{x:xyScatter, y:xyLinear}}/>
            </div>
        );

        var result = CalResult(ans,xPoint) ;
        document.getElementById("Showans").innerHTML = aString ;
        document.getElementById("ShowProof").innerHTML = result ;
    }

    function Cal(X, Y, xPoint) {

        var degree = document.getElementById("DegreeNum").value ;

        for(let i = 0; i < X.length; i++) {
            X[i] = parseFloat(X[i]) ;
            Y[i] = parseFloat(Y[i]) ;
        }
        
        const regression = new PolynomialRegression(X, Y, degree);

        for(let i = 0; i < degree+1; i++) {
            arrayA.push(regression.coefficients[i])
        }

        for(let i = 0; i < X.length; i++) {
            xyLinear.push([parseFloat((X[i])),(regression.predict(parseFloat(X[i])))]) ;
        }
        console.log(xyLinear) ;

        lastResult = regression.predict(parseFloat(xPoint)).toFixed(4) ;

        return arrayA ;
    }

    function CalResult(ans,xPoint) {

        var degree = document.getElementById("DegreeNum").value ;

        var exString = "f("+xPoint+") = "+ans[0].toFixed(4)+" + " ;
        for(let i = 1; i <= degree; i++) {
            if(i < degree) {
                exString += "("+ans[i].toFixed(4)+")"+"("+xPoint+") + " ;
            }
            else {
                exString += "("+ans[i].toFixed(4)+")"+"("+xPoint+") = " ;
            }
        }

        exString += lastResult ;

        return exString ;
    }

    return(
            <div><h1 style={{color:'black',paddingLeft:'320px',paddingTop:'75px'}}>Polynomial Regression</h1>
            <div className="containerBi" style={{color:'black'}}>
            <form>
                <h4 style={{paddingLeft:'60px'}}>Number of Degree : <input id="DegreeNum" type={'number'}></input></h4>
                <label style={{paddingLeft:'70px'}}>
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
            <div style={{paddingLeft:'230px', paddingTop:'30px'}}>
                <button style={{color:'#fff'}} onClick={getMat}>Calculate</button>
            </div>
            <div id = 'Showans' style={{paddingLeft:'220px',paddingTop:'30px', paddingBottom:'20px'}}></div>
            <div id = 'ShowProof' style={{paddingLeft:'120px', paddingBottom:'20px', overflow:'auto', width:'500px'}}></div>
            </div>
            <div className="chartcontrainer">
                <div id = "showchart" style={{paddingLeft:'320px'}}>
                    <ChartRegression data = {{x:xyScatter,y:xyLinear}}/>
                </div>
            </div>
            </div>
        )
    }
    