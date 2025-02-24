import {execa} from "execa"
import {bin} from "./utils"

async function setup(){
  await execa('pnpm', ['run', 'clean'], {
    cwd: hooksRootDir,
    stdout: 'inherit',
  })
}

async function main(){
  await setup();
}

main().catch(error=>{
  console.log("error",error);
  process.exit(1);
})