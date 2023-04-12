var express = require('express');
var app = express();
const CsvParser = require("json2csv").Parser;
const fs = require("fs");
const Parse = require('parse/node');
const csv=require('csvtojson');
var mysql = require('mysql');
/*    connection = require('express-myconnection'),
    config = {
      host: 'localhost',
      user: 'root',
      password: '',
      port: 3306,
      database: 'crud'
    };*/
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'crud'
});
let j = 5;
let i = 0;
var d = new Date();
var h = d.getHours();
var m = d.getMinutes()+2;
console.log("dd",h);
console.log("mm",m);
var url_taskMap = {};
var pattern = "* "+m+" "+h+ " * * *";
console.log("pattern",pattern);

function limit (c){
    return this.filter((x,i)=>{
        if(i<=(c-1)){return true}
    })
}
    
Array.prototype.limit = limit;
 
function skip(c){
    return this.filter((x,i)=>{
        if(i>(c-1)){return true}
    })
}
 
Array.prototype.skip = skip;
const midStreamPath='./Sample - FTP_Midstream.csv';
app.get('/midstream', async function (req, res) {
    let duu = new Date();
    h = duu.getHours();
    m = duu.getMinutes();
    try{
        const items = await csv().fromFile(midStreamPath);
        if(items.length > 0){
            conn.query(
            'INSERT INTO ftpmidstream ( mid, last_poll_attempt_time, last_succ_com_time_text, upload_position_time, flow_rate, current_day_volume, previous_day_volume,meter_press,gas_temp,differ_press,btu,specific_gravity,co2,n2,batt_volt,plate_size,previous_month_volume) VALUES ?',
            [items.map(item => [item.Mid, item.Last_Poll_Attempt_Time, item.Last_Succ_Com_Time_Text, item.Upload_Position_Time, item.Flow_Rate, item.Current_Day_Volume, item.Previous_Day_Volume, item.Meter_Press, item.Gas_Temp, item.Differ_Press, item.BTU, item.Specific_Gravity, item.CO2, item.N2, item.Batt_Volt, item.Plate_Size, item.Previous_Month_Volume])],
            (error, results) => {
                if(error){
                    console.log("error elsse", error);
                }else{
                    console.log("results", results);
                }  
            });
            res.send('<html><body><h1>Hello World</h1></body></html>');
        }else{
            res.send('Data not found!');
        }    
    }
    catch(error){
        console.log("Error", error);
    }
});
const storageTankPath='./Sample - FTP_StorageTanks.csv';
app.get('/storageTank', async function (req, res) {

    try{
        const items = await csv().fromFile(storageTankPath);
        if(items.length > 0){
            conn.query(
            'INSERT INTO  ftpstoragetank ( mid, last_Succ_Com_Time_Text, current_Inventory) VALUES ?',
            [items.map(item => [item.Mid, item.Last_Succ_Com_Time_Text, item.Current_Inventory])],
            (error, results) => {
                if(error){
                    console.log("error elsse", error);
                }else{
                    console.log("results", results);
                }  
            });
            console.log("ggggg",items);
            res.send('<html><body><h1>Hello World</h1></body></html>');
        }else{
           res.send('Data not found!'); 
        }    
    }
    catch(error){
        console.log("Error", error);
    }
});

const waterPath='./Sample - FTP_Water.csv';
app.get('/water', async function (req, res) {

    try{
        const items = await csv().fromFile(waterPath);
        if(items.length > 0){
    /*        conn.query(
            'INSERT INTO   ftpwater ( mid, last_Succ_Com_Time_Text, flow_Rate, current_Day_Volume, previous_Day_Volume, pressure, batt_Volt) VALUES ?',
            [items.map(item => [item.Mid, item.Last_Succ_Com_Time_Text, item.Flow_Rate, item.Current_Day_Volume, item.Previous_Day_Volume, item.Pressure, item.Batt_Volt])],
            (error, results) => {
                if(error){
                    console.log("error elsse", error);
                }else{
                    console.log("results", results);
                }  
            });*/
            console.log("water",items);
            res.send('<html><body><h1>Hello World</h1></body></html>');
        }else{
            res.send('Data not found!');
        }
    }
    catch(error){
        console.log("Error", error);
    }
});

const pondLevelPath='./Sample - Pond_Level.csv';
app.get('/pondLevel', async function (req, res) {

    try{
        const items = await csv().fromFile(pondLevelPath);
        if(items.length > 0){
    /*        conn.query(
            'INSERT INTO   ftppondlevel ( mid, last_Succ_Com_Time_Text, pond_Level_(foot), pond_Level_(percent), pond_Inventory, stream_Level) VALUES ?',
            [items.map(item => [item.Mid, item.Last_Succ_Com_Time_Text, item.Pond_Level_(foot), item.Pond_Level_(percent), item.Pond_Inventory, item.Stream_Level])],
            (error, results) => {
                if(error){
                    console.log("error elsse", error);
                }else{
                    console.log("results", results);
                }  
            });*/
            console.log("pond Level",items);
            res.send('<html><body><h1>Hello World</h1></body></html>');
        }else{
            res.send('Data not found!');
        }
    }
    catch(error){
        console.log("Error", error);
    }
});
/*cron.schedule('* 14 16 * * *', async () => {
    
});*/
/*const jsonString = JSON.stringify(productBranchInfoRelations);
    fs.writeFile('./newCustomer.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })*/
app.get('/submit-student-data', async function (req, res) {
   
    const jsonString = JSON.stringify(productBranchInfoRelationNew);
    fs.writeFile('./newCustomer.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })

/*    return;

    const csvFields = ["ProductId", "ID", "Name", "Barcode", "Price"];
    const csvParser = new CsvParser({ csvFields });
    const csvData = csvParser.parse(tutorials);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=product.csv");*/

    res.status(200);
    //res.data(filterProductBranchInfoRelation);    
  	res.send({"Message" : 'Submitted Successfully!', "data" : productBranchInfoRelationNew});
});

async function filterproductfind(id){
	let filterdata = product.filter(obj=> obj.objectId == id);;
	return filterdata[0];
}

// DB connection
//app.use(conn(mysql, config, 'request'));

var server = app.listen(5000, function () {
    console.log('Node server is running...');
});