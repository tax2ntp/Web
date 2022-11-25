import React from "react";
import './Bisection.css';

export default function NewtonDivided(){
    function Getmat(){
        var Size = document.getElementById("Matnum").value;
        var MatStringX = "";
        var MatStringY = "";
        for(var i =  1; i<=Size ; i++){
            MatStringX +="X : <input id = 'MatrixX"+i+"' className = 'inputmatans' placeholder=' ' type='number' style = 'width: 80px'></input><br>";
            MatStringY +="Y : <input id = 'MatrixY"+i+"' className = 'inputmatans' placeholder=' ' type='number' style = 'width: 80px'></input><br>";
        }
        document.getElementById("MatrixX").innerHTML = MatStringX ;
        document.getElementById("MatrixY").innerHTML = MatStringY ;
    }
    function getMat(){
        var Size = document.getElementById("Matnum").value;
        var Matx = [];
        var Maty = [];
        for(var i = 1 ; i <= Size ; i++){
            Matx.push(document.getElementById("MatrixX"+i).value);
            Maty.push(document.getElementById("MatrixY"+i).value);
        }
        var X_point = document.getElementById("x_point").value;
        var ans = Cal(Matx,Maty,X_point);
        document.getElementById("Showans").innerHTML = "Answer = "+ans.toFixed(4);
    }
    function Cal(MatX,MatY,xPoint){
        var n = document.getElementById("Matnum").value;

        if(n <= 1) {
            return 0 ;
        }

        var i,j=1,f1=1,f2=0 ;
        var p = [] ;
        var f = MatY[0] ;

        do {
            for(i=0;i < n-1;i++) {
                p[i]=((MatY[i+1]-MatY[i])/(MatX[i+j]-MatX[i]));
                MatY[i]=p[i];
            }
            for(i=0;i<j;i++)  {
                f1 *= (xPoint-MatX[i]);
            }
    
            f2 += (MatY[0]*f1);
            f1=1;
            n--;
            j++;
        }while(n!==0);

        f = parseFloat(f) 
        f += f2 ;
        console.log(f) 
        

        return f;
    }
    return(
            <div><h1 style={{color:'black',paddingLeft:'285px',paddingTop:'75px'}}>Newton Divided Difference</h1>
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
            <div id = 'Showans' style={{paddingLeft:'170px',paddingTop:'50px'}}></div>
            </div>
            </div>
        )
    }
    