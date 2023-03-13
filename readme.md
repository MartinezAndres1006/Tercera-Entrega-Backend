
Como primera consigna me pidieron una comparacion con el middleware compression para verificar cuanto puede comprimir la ruta "/info"

Los resultados me dieron:

💥Sin el compression: 693 B

💥Con el compression: 717 B



Manejo de loggers:

💥Con info lo utilice en la ruta "/info"

💥Con warm lo use con cualquier ruta que no exista en la pagina

💥El ERROR lo utilice en el apartado del login ya que si no acepta algun dato te lo regrese 

Artillery:

Primero hay que tener en cuenta que inicio hay que hacer para cada caso:

💥Para fork utilizamos el comando comun para iniciar el servidor:

npm run start || nodemon app.js


💥Y para cluster utilizamos el siguiente:

node app.js inicio --puerto=1006 --mode=cluster

Para acceder en Artillery utiliza el siguiente comando:

artillery quick --count 50 -n 40 http://localhost:8080 > result.txt



Luego utilizamos el siguiente comando para analizar el perfilamiento del servidor

💥nodemon --prof app.js


y para poder procesarlo utilizamos el comando:

💥node --prof-process isolate-000001C9619239B0-12620-v8.log > resultado.txt

