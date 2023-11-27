<template>

<h1 id="current-time"></h1>

</template>

<script>

setInterval(()=>{
let time = document.getElementById("current-time");

  let d = new Date();
  time.innerHTML = d.toLocaleTimeString();
})


</script>
