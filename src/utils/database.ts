import{Pool} from 'pg';

let conn:any

if(!conn){
conn=new Pool({
    user: 'postgres',
    password:"mateo3107",
    host: 'localhost',
    port: 5432,
    database:"smartInventory"
});
}

export{conn};