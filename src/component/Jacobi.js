import React from "react";
import './Matrix.css'
//const math = require('mathjs');

export default function Jacobi(){
    function Getmat(){
        var Size = document.getElementById("Matnum").value;
        var MatString = "";
        for(var i =  0; i<Size ; i++){
            for(var j = 0 ; j<Size ; j++){
                MatString +=" <input id = 'Matrix"+i+j+"' className = 'inputmat' type='number' style='width: 80px'></input>"
            }
            MatString +=" | <input id = 'Matrixans"+i+j+"' className = 'inputmatans' type='number' style='width: 80px'></input><br>";
        }
        document.getElementById("Matrix").innerHTML = MatString;
    }
    function getmat2(){
        var Size = document.getElementById("Matnum").value;
        var MatA = [];
        var MatB = [];
        var MatBfp = [];
        for(var i = 0 ; i<Size ; i++){
            MatA.push([]);
            MatBfp.push([]);
            for(var j = 0 ; j<Size ; j++){
                MatA[i].push(document.getElementById('Matrix'+i+j).value);
            }
            MatB.push(document.getElementById("Matrixans"+i+j).value);
            MatBfp[i].push(document.getElementById("Matrixans"+i+j).value);
        }
        var ans = Cal(MatA,MatB,Size);
        console.log(ans);
        var matA = pushArray(MatA,Size);
        console.log(matA);
        var ansfp = pushArrayans(ans);
        console.log(ansfp);
        var Proofans = Proof(matA,ansfp);
        var str = "";
        var str1 = "";
        for(i = 0 ; i < Size ; i++){
            str += "X["+i+"] = "+ans[i]+"<br>";
            str1 += matA[i]+" x "+ans[i]+" = "+ Proofans[i]+"<br>";
        }
        //console.log("A = "+MatA);
        document.getElementById("Showans").innerHTML = str;
        document.getElementById("ShowProof").innerHTML = str1;
    }
    function pushArray(a,size){
        var A = [];
        console.log(a);
        for(var i = 0 ; i < size ; i++){
            A.push([]);
            for(var j = 0 ; j < size ; j++){
                A[i].push(a[i][j]);
                //console.log(A);
            }
        }
        return A;
    }
    function pushArrayans(ans){
        var Ans = [];
        for(var i = 0 ; i < ans.length ; i++){
            Ans.push([]);
            Ans[i].push(ans[i]);
        }
        return Ans;
    }
    function Proof(a,b){
        //console.log(a+" "+b);
        var mat = [];
        for(var i = 0 ; i < b.length ; i++){
            mat.push([]);
            var sum = 0;
            for(var j = 0 ; j < b[0].length ; j++){
                for(var k = 0 ; k < b.length ; k++){
                    sum += a[i][k] * b[k][j];
                    //console.log(mat);
                }
                mat[i][j] = sum;
                mat[i][j] = mat[i][j].toFixed(2);
            }
        }
        return mat;
    }
    function Cal(a,b,size){
        var xnew = [];
        var xold = [];
        var count = 0;
        //var n = 0;
        pushArray(xnew);
        pushArray(xold);
        function pushArray(a){
            for(var i = 0 ; i < size ; i++){
                a.push(0);
            }
            return a;
        }
        do
        {
            count = 0;
            for(var i = 0 ; i < a.length ; i++)
            {
                xnew[i] = b[i];
                for(var j = 0 ; j < a.length ; j++)
                {
                    if(i !== j)
                    {
                        xnew[i] -= (a[i][j]*xold[j]);
                    }
                }
                xnew[i]/=a[i][i]
                //console.log(xnew);
                if(Math.abs((xnew[i]-xold[i])/xnew[i])<=0.0001)
                {
                    count++;
                }
            }
            for(var k = 0 ; k < a.length ; k++)
            {
                xold[k] = xnew[k];
            }
          
        }
        while(count !== xnew.length);
        for(i = 0 ; i < size  ;i++){
            xnew[i] = xnew[i].toFixed(3);
        }
        return xnew;
    }
    return(
        <div><h1 style={{color:'black',paddingLeft:'430px',paddingTop:'75px'}}>Jacobi Iteration</h1>
        <div className="containerBi" style={{color:'black'}}>
        <form>
            <label>
                <h4 style={{paddingLeft:'50px', paddingRight:'10px'}}>Number of Matrix :</h4>
            </label> 
                <input id = "Matnum" placeholder=" " type='number' style={{fontSize:'20px'}} size='1'onChange={Getmat}></input>
        </form>
        <div id = 'Matrix' className="matrix" style={{paddingTop:'10px'}}></div>
        <div style={{paddingLeft:'225px',paddingTop:'20px'}}>
            <button style={{color:'#fff'}} onClick={getmat2}>Calculate</button>
        </div>
        <div id = 'Showans' style={{paddingLeft:'205px',paddingTop:'20px'}}></div>
        <div>
        <div id = 'ShowProof'style={{color:'black',paddingLeft:'170px',paddingTop:'20px'}}></div>
        </div>
        </div>
        </div>
    )
}