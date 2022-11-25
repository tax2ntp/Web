import React from "react";
import './Matrix.css'
const math = require('mathjs');

export default function CramerRule(){
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
        var MatBfp = []
        for(var i = 0 ; i<Size ; i++){
            MatA.push([]);
            MatBfp.push([]);
            for(var j = 0 ; j<Size ; j++){
                MatA[i].push(document.getElementById("Matrix"+i+j).value);
            }
            MatB.push(document.getElementById("Matrixans"+i+j).value);
            MatBfp[i].push(document.getElementById("Matrixans"+i+j).value);
        }
        var matA = pushArray(MatA,Size);
        var ans = Cal(MatA,MatB,Size);
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
    function Proof(a,b){
        var mat = [];
        var sum = 0;
        for(var i = 0 ; i < a.length ; i++){
            mat.push([]);
            sum = 0;
            for(var j = 0 ; j < b[0].length ; j++){
                for(var k = 0 ; k < a[i].length ; k++){
                    sum += a[i][k] * b[k][j];
                    console.log(mat);
                }
                mat[i][j] = sum;
                mat[i][j] = mat[i][j].toFixed(2);
            }
        }
        return mat;
    }
    function pushArrayans(ans){
        var Ans = [];
        for(var i = 0 ; i < ans.length ; i++){
            Ans.push([]);
            Ans[i].push(ans[i]);
        }
        return Ans;
    }
    function Cal(a,b,size){
        var A = pushArray(a);
        var x = [];
        var deta = math.det(A)
        function pushArray(a){
            var A = [];
            for(var i = 0 ; i < size ; i++){
                A.push([]);
                for(var j = 0 ; j < size ; j++){
                    A[i].push(a[i][j]);
                }
            }
            return A;
        }
        function setArray(A,i)
            {
                for(var j = 0 ; j < A.length ; j++)
                A[j][i] = b[j]
                console.log(A);
                return A
            }
        for(var i = 0 ; i < a.length ; i++)
        {
            console.log("set = "+setArray(a,i));
            x[i] = math.det(setArray(a,i))/deta
            console.log("deta = "+deta);
            //a = [];
            a = pushArray(A);
            //console.log(a);
            console.log("x = "+x);
        }
        for(i = 0 ; i < size  ;i++){
            x[i] = x[i].toFixed(3);
        }
        return x;
    }
    return(
        <div><h1 style={{color:'black',paddingLeft:'450px',paddingTop:'75px'}}>Cramer's Rule</h1>
        <div className="containerBi" style={{color:'black'}}>
        <form>
            <label>
                <h4 style={{paddingLeft:'50px'}}>Number of Matrix :</h4>
            </label> 
                <input id = "Matnum" placeholder=" " type='number' onChange={Getmat}></input>
        </form>
        <div id = 'Matrix' className="matrix" style={{paddingBottom:'20px'}}></div>
        <div style={{paddingLeft:'225px'}}>
            <button style={{color:'#fff'}} onClick={getmat2}>Calculate</button>
        </div>
        <div style={{paddingLeft:'205px',paddingTop:'20px'}}>
        <div id = 'Showans'></div>
        </div>
        <div style={{color:'black'}}>
        <div id = 'ShowProof'style={{paddingLeft:'170px',paddingTop:'20px'}}></div>
        </div>
        </div>
        </div>
    )
}