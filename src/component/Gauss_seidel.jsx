import React from "react";
import './Matrix.css'

export default function Gauss_seidel(){
    function Getmat(){
        var Size = document.getElementById("Matnum").value;
        var MatString = "";
        for(var i =  0; i<Size ; i++){
            for(var j = 0 ; j<Size ; j++){
                MatString +=" <input id = 'Matrix"+i+j+"' className = 'inputmat' placeholder=' ' type='number' style = 'width: 80px'></input>"
            }
            MatString +=" | <input id = 'Matrixans"+i+j+"' className = 'inputmatans' placeholder=' ' type='number' style = 'width: 80px'></input><br>";
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
        var matA = pushArray(MatA,Size);
        var ansfp = pushArrayans(ans);
        var Proofans = Proof(matA,ansfp);
        var str = "";
        var str1 = "";
        for(i = 0 ; i < Size ; i++){
            str += "X["+i+"] = "+ans[i]+"<br>";
            str1 += matA[i]+" x "+ans[i]+" = "+ Proofans[i]+"<br>";
        }
        document.getElementById("Showans").innerHTML = str;
        document.getElementById("ShowProof").innerHTML = str1;
    }
    function pushArray(a,size){
        var A = [];
        for(var i = 0 ; i < size ; i++){
            A.push([]);
            for(var j = 0 ; j < size ; j++){
                A[i].push(a[i][j]);
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
        var mat = [];
        for(var i = 0 ; i < a.length ; i++){
            mat.push([]);
            var sum = 0;
            for(var j = 0 ; j < b[i].length ; j++){
                for(var k = 0 ; k < b.length ; k++){
                    sum += a[i][k] * b[k][j];
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
                if(Math.abs((xnew[i]-xold[i])/xnew[i])<=0.0001)
                {
                    count++;
                }
                xold[i] = xnew[i];
            }
          
        }
        while(count !== xnew.length);
        for(i = 0 ; i < size  ;i++){
            xnew[i] = xnew[i].toFixed(3);
        }
        return xnew;
    }
    return(
        <div><h1 style={{color:'black',paddingLeft:'450px',paddingTop:'75px'}}>Gauss Seidel</h1>
        <div className="containerBi" style={{color:'black'}}>
        <form>
            <label>
                <h4 style={{paddingLeft:'50px', paddingRight:'10px'}}>Number of Matrix :</h4>
            </label> 
                <input id = "Matnum" placeholder=" " type='number' style={{fontSize:'20px'}} size='1' onChange={Getmat}></input>
        </form>
        <div id = 'Matrix' className="matrix" style={{paddingTop:'10px'}}></div>
        <div style={{paddingLeft:'235px',paddingTop:'20px'}}>
            <button style={{color:'#fff'}} onClick={getmat2}>Calculate</button>
        </div>
        <div id = 'Showans' style={{paddingLeft:'205px',paddingTop:'20px'}}></div>
        <div>
        <div id = 'ShowProof'style={{paddingLeft:'170px'}}></div>
        </div>
        </div>
        </div>
    )
}