/*
 * util.js
 * Utility functions that don't fit anywhere else.
 */

#pragma strict

/*
 * Returns signed SQRT(x)
 */
function signedSqrt(x :float){
   var r = Mathf.Sqrt(Mathf.Abs(x));
   if(x < 0){
      return -r;
   } else {
      return r;
   }
}

function Start () {

}

function Update () {

}
