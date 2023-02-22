process.on("message", (msg) => {
    console.log("El proceso hijo recibio un parametro", msg);
    const result = getRandom(msg);
    process.send(result);
  
    setTimeout(() => {
      process.exit();
    }, 5000);
  });
  
  function getRandom(cantidad) {
    const numeros = [];
    for (let i = 0; i < cantidad; i++) {
      numeros.push(Math.floor(Math.random() * 1000) + 1);
    }
    
    const contador = numeros.reduce((acc, num) => {
      acc[num] = (acc[num] || 0) + 1;
      return acc;
    }, {});
  
    return contador;
  }
  
  export default getRandom;