import React from "react";

export default function Guass_Elimination(){
    var gaussMat = [] ;
    function Getmat(){
        var Size = document.getElementById("Matnum").value;
        var MatString = "";
        for(var i =  0; i<Size ; i++){
            for(var j = 0 ; j<=Size ; j++){
                if(j != Size)
                    MatString +=" <input id = 'Matrix"+i+j+"' className = 'inputmat' type='number' style='width: 80px'></input>"
                else
                    MatString +=" | <input id = 'Matrix"+i+j+"' className = 'inputmat' type='number' style='width: 80px'></input><br>"
            }
        }
        document.getElementById("Matrix").innerHTML = MatString;
    }
    function getmat2(){
        var Size = document.getElementById("Matnum").value;
        var MatA = [];
        for(var i = 0 ; i<Size ; i++){
            MatA.push([]);
            for(var j = 0 ; j<=Size ; j++){
                MatA[i].push(document.getElementById("Matrix"+i+j).value);
            }
        }
        var MatAfp = copyMatrix(MatA);
        var ans = Cal(MatA,Size);
        var ansfp = pushArrayans(ans);
        var ansproof = Proof(MatAfp,ansfp);
        var str = "";
        var str1 = "";
        var eliminated = "" ;

        for(i = 0 ; i < Size ; i++){
            str += "X["+i+"] = "+ans[i]+"<br>";
            for(let j = 0; j <= Size; j++) {
                if(j < Size) {
                    eliminated += (MatA[i][j]/MatA[i][i]).toFixed(4)+"  ";
                }
                else {
                    eliminated += " | "+(MatA[i][j]/MatA[i][i]).toFixed(4)+"<br>";
                }    
            } 
        }

        for(i = 0; i < Size; i++) {
            for(let j = 0; j < Size; j++) {
                if(j < Size-1) {
                    str1 += "("+MatAfp[i][j]+")("+ans[j]+") + " ;
                }
                else {
                    str1 += "("+MatAfp[i][j]+")("+ans[j]+") = "+ ansproof[i]+"<br>"
                }
            }
        }

        document.getElementById("Showans").innerHTML = str;
        document.getElementById("ShowMatrix").innerHTML = eliminated;
        document.getElementById("ShowProof").innerHTML = str1;
    }
    function copyMatrix(a){
        var A = [];
        for(var i = 0 ; i < a.length ; i++){
            A.push([]);
            for(var j = 0 ; j < a.length ; j++){
                A[i][j] = a[i][j];
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
        var sum = 0;
        for(var i = 0 ; i < b.length ; i++){
            mat.push([]);
            sum = 0;
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

    function Cal(a,size){
        var x = 0;
        var y = new Array(size);
        var n = a.length-1;
        for(var i = 0 ; i <= a.length ; i++)
        {
          for(var j = i+1 ; j < a.length ; j++ )
          {
            x = a[j][i] / a[i][i]
            for(var k = 0 ; k <= a.length ; k++)
            {
              a[j][k] = a[j][k] - (x * a[i][k])
            }
          }
        }
        
        for(i = 0; i < a.length; i++) {
            gaussMat.push([]) ;
            for(j = 0; j < a.length; j++) {
                gaussMat[i][j] = a[i][j] ;
            }
        }

        y[n]=a[n][n+1]/a[n][n]
        for(var l = n-1 ; l >= 0 ; l-- )
        {
          let sum = 0
            for(j = l+1 ; j <= n ; j++)
            {  
                sum += (a[l][j]*y[j])
            }
            y[l]=(a[l][n+1]-sum)/a[l][l];
        }
        for(i = 0 ; i < size  ;i++){
            y[i] = y[i].toFixed(3);
        }
        return y;
    }
    return(
        <div><h1 style={{color:'black',paddingLeft:'400px',paddingTop:'75px'}}>Gauss Elimination</h1>
            <div className="containerBi" style={{color:'black'}}>
                <form>
                    <label>
                        <h4 style={{paddingLeft:'50px', paddingRight:'10px'}}>Number of Matrix :</h4>
                    </label> 
                    <input id = "Matnum" placeholder=" " type='number' style={{fontSize:'20px'}} size='1' onChange={Getmat}></input>
                </form>
                <div id = 'Matrix' className="matrix" style={{paddingTop:'10px'}}></div>
                <div style={{paddingLeft:'225px',paddingTop:'20px'}}>
                    <button style={{color:'#fff'}} onClick={getmat2}>Calculate</button>
                </div>
                <div>
                    <h2 style={{paddingLeft:'200px',paddingTop:'20px'}}>Result : </h2>
                    <div id = 'Showans' style={{paddingLeft:'205px',paddingTop:'20px'}}></div>
                </div>
                <div>
                    <h2 style={{paddingLeft:'200px',paddingTop:'20px'}}>Matrix : </h2>
                    <div id = 'ShowMatrix'style={{color:'black',paddingLeft:'100px',paddingTop:'20px'}}></div>
                </div>
                <div>
                    <div id = 'ShowProof'style={{color:'black',paddingLeft:'30px',paddingTop:'20px',paddingBottom:'50px'}}></div>
                </div>
            </div>
        </div>
    )
}