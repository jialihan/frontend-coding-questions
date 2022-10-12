function clz32(num) {
  if (num < 0) {
    return 0;
  }
  let cnt = 0;
  for (let i = 0; i < 32; i++) {
    if ((num >> i) & 1) {
      cnt = 0;
    } else {
      cnt++;
    }
  }
  return cnt;
}
console.log(clz32(-1));
//32bit integer:  https://www.w3schools.com/js/js_bitwise.asp



<script>
 
 {/* // JavaScript program to Count set
 // bits in an integerclass
  
 /* Function to get no of set
 bits in binary representation
 of passed binary no. */
 function countSetBits(n)
 {
     var count = 0;
     while (n > 0)
     {
         n &= (n - 1);
         count++;
     }
     return count;
 }
  
 // driver program
 var i = 9;
 document.write(countSetBits(i));
  
 // This code is contributed by 29AjayKumar
  
 </script>
 