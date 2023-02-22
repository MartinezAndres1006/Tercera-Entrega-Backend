import yargs from "yargs";
import {hideBin} from "yargs/helpers";


let portServer=undefined
let modeServer=undefined

yargs(hideBin(process.argv))
    .command('list', 'List all commands', /*handler*/)
    .command('inicio','Inicia aqui el server',{
        puerto:{
            describe:'Recibe aca el puerto',
            demandOption: true,
            type:'number'
        },
        mode:{
            describe:'Aca recibe el modo en el cual va a trabajar',
            demandOption:true,
            type:'string'
        }


    },(argv)=>{
        portServer=argv.puerto
        modeServer=argv.mode
    })
    .parse();

    export {modeServer, portServer}