import React from "react";
import './Bisection.css';

export default function Lagarange(){
    function Getmat(){
        var Size = document.getElementById("Matnum").value;
        var MatStringX = "";
        var MatStringY = "";
        for(var i =  0; i<Size ; i++){
            MatStringX +="X : <input id = 'MatrixX"+i+"' className = 'inputmatX' placeholder=' ' type='number' style = 'width: 80px'></input><br>";
            MatStringY +="Y : <input id = 'MatrixY"+i+"' className = 'inputmatY' placeholder=' ' type='number' style = 'width: 80px'></input><br>";
        }
        document.getElementById("MatrixX").innerHTML = MatStringX ;
        document.getElementById("MatrixY").innerHTML = MatStringY ;
    }
    function getMat(){
        var Size = document.getElementById("Matnum").value;
        var Matx = [];
        var Maty = [];
        for(var i = 0 ; i < Size ; i++){
            Matx.push(document.getElementById("MatrixX"+i).value);
            Maty.push(document.getElementById("MatrixY"+i).value);
        }
        var X_point = document.getElementById("x_point").value;
        console.log("X ="+X_point);
        var ans = Cal(Matx,Maty,X_point);
        console.log(ans);
        document.getElementById("Showans").innerHTML = "Answer = "+ans.toFixed(4);
    }
    function Cal(Matx,Maty,x_point){
        var L;
        var y = 0;
        for(var i = 0 ; i < Matx.length ; i++){
            L = 1 ;
            for(var j = 0 ; j < Maty.length ; j++){
                if(i!==j){
                L = (L * (x_point - Matx[j])) / (Matx[i] - Matx[j]);

                }
            }
            y += L * Maty[i];
        }
        return y;
    }
    return(
            <div><h1 style={{color:'black',paddingLeft:'480px',paddingTop:'75px'}}>Lagarange</h1>
            <div className="containerBi" style={{color:'black'}}>
            <form>
                <label>
                    <h4 style={{paddingLeft:'40px', paddingRight:'10px'}}>Number of Point :</h4>
                </label> 
                <input id = "Matnum" placeholder=" " type='number' style={{fontSize:'20px'}} size='1' onChange={Getmat}></input><br></br>
            </form>
            <div style={{display:'flex'}}>
                <div id = 'MatrixX'style={{paddingTop:'10px', paddingLeft:'170px'}}></div>
                <div id = 'MatrixY'style={{paddingTop:'10px', paddingLeft:'20px'}}></div>
            </div>
            <form>
                <label style={{paddingLeft:'200px',paddingRight:'10px',paddingTop:'20px'}}>
                    <h4>X point :</h4>
                </label>
                <input id = "x_point" placeholder=" " type='number' style={{ width: "80px" }} size='1'></input>
            </form>
            <div style={{paddingLeft:'225px'}}>
                <button style={{color:'#fff'}} onClick={getMat}>Calculate</button>
            </div>
            <div id = 'Showans' style={{paddingLeft:'205px',paddingTop:'50px'}}></div>
            </div>
            </div>
        )
    }
    