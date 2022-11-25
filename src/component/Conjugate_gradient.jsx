import React from "react";
import './Matrix.css'
const { create, all } = require('mathjs')
const math = create(all)

export default function Conjugate_gradient(){
    function Getmat(){
        var Size = document.getElementById("Matnum").value;
        var MatString = "";
        var MatXString = "";
        for(var i =  0; i<Size ; i++){
            for(var j = 0 ; j<Size ; j++){
                MatString +=" <input id = 'Matrix"+i+j+"' className = 'inputmat' placeholder=' ' type='number' style = 'width: 80px'></input>"
            }
            MatString +=" | <input id = 'Matrixans"+i+j+"' className = 'inputmatans' placeholder=' ' type='number' style = 'width: 80px'></input><br>";
            MatXString +=" X["+i+"] = <input id = 'MatrixX"+i+j+"' className = 'inputmat' placeholder=' ' type='number' style = 'width: 80px '></input>"
        }
        document.getElementById("Matrix").innerHTML = MatString;
        document.getElementById("MatrixX").innerHTML = MatXString;
    }
    function getmat2(){
        var Size = document.getElementById("Matnum").value;
        var MatA = [];
        var MatB = [];
        var MatX = [];
        var MatBfp = []
        for(var i = 0 ; i<Size ; i++){
            MatA.push([]);
            MatB.push([]);
            MatBfp.push([]);
            MatX.push([]);
            for(var j = 0 ; j<Size ; j++){
                MatA[i].push(document.getElementById("Matrix"+i+j).value);
            }
            MatB[i].push(document.getElementById("Matrixans"+i+j).value);
            MatBfp[i].push(document.getElementById("Matrixans"+i+j).value);
            MatX[i].push(document.getElementById("MatrixX"+i+j).value);
        }
        var matA = pushArray(MatA,Size);
        var ans = Cal(MatA,MatB,MatX);
        var ansfp = pushArrayans(ans);
        var Proofans = Proof(matA,ansfp);
        var str = "";
        var str1 = "";

        for(i = 0 ; i < Size ; i++){
            str += "X["+i+"] = "+ans[i]+"<br>";
        }

        for(i = 0; i < Size; i++) {
            for(let j = 0; j < Size; j++) {
                if(j < Size-1) {
                    str1 += "("+matA[i][j]+")("+ans[j]+") + " ;
                }
                else {
                    str1 += "("+matA[i][j]+")("+ans[j]+") = "+ Proofans[i]+"<br>"
                }
            }
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
    function Cal(a,b,x){
        var R0 = []
        var D0 = []
        var alpha,error,lamda,D1 ;
        var R1 = [];
        var X1 = [];

        function findR0(A,B,X){
        return math.subtract(math.multiply(A,X) ,B)
        }

        function findD0(R0){
        return math.multiply(R0,-1)
        }

        function findX1(X0,alpha,D0){
        return math.add(X0,math.multiply(alpha,D0))
        }

        function findAlpha(D0,R0,A){
        return - math.multiply(math.transpose(D0),R0) / math.multiply(math.multiply(math.transpose(D0),A),D0)
        }

        function findR1(A,X1,B){
        return math.subtract(math.multiply(A,X1),B)
        }
        function findError(R){
        const errorArray = math.multiply(math.transpose(R),R)
        return math.sqrt(errorArray[0][0])
        }
        function findLamda(R1,A,D0){
        return math.multiply(math.multiply(math.transpose(R1),A),D0) / math.multiply(math.multiply(math.transpose(D0),A),D0)
        }
        function findD1(R1,lamda,D0){
        return math.add(math.multiply(R1,-1),math.multiply(lamda,D0))
        }

        R0 = findR0(a,b,x)
        D0 = findD0(R0)

        do{

        alpha = findAlpha(D0,R0,a)
        X1 = findX1(x,alpha,D0)
        R1 = findR1(a,X1,b)
        error = findError(R1)
        lamda = findLamda(R1,a,D0)
        D1 = findD1(R1,lamda,D0)
        R0 = R1
        D0 = D1
        x = X1

        }while(error > 0.000001)
        for(var i = 0 ; i<X1.length ; i++){
            for(var j = 0 ; j<X1[i].length ; j++){
                X1[i][j] = X1[i][j].toFixed(4);
            }
        }
        console.log(X1);
        return X1;
    }
    return(
        <div><h1 style={{color:'black',paddingLeft:'370px',paddingTop:'75px'}}>Conjugate Gradient</h1>
        <div className="containerBi" style={{color:'black'}}>
        <form>
            <label>
                <h4 style={{paddingLeft:'40px', paddingRight:'10px'}}>Number of Matrix :</h4>
            </label> 
                <input id = "Matnum" placeholder=" " type='number' style={{fontSize:'20px'}} size='1' onChange={Getmat}></input>
        </form>
        <div id = 'Matrix' className="matrix" style={{paddingTop:'10px'}}></div>
        <div id = 'MatrixX' style={{paddiingLeft:'100px',paddingTop:'20px'}}>
        </div>
        <div style={{paddingLeft:'225px',paddingTop:'20px'}}>
            <button style={{color:'#fff'}} onClick={getmat2}>Calculate</button>
        </div>
        <div style={{paddingLeft:'205px',paddingTop:'20px'}}>
        <div id = 'Showans'></div>
        </div>
        <div style={{color:'black'}}>
        <div id = 'ShowProof'style={{paddingBottom:'50px',paddingTop:'20px',overflow:'auto',width:'600px'}}></div>
        </div>
        </div>
        </div>
    )
}