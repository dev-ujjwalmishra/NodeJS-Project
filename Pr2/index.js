const fs = require('fs');
const http = require('http');
const requests = require('requests');
const PORT = process.env.PORT || 8000;

const server = http.createServer((req,res) => {
    const fileData = fs.readFileSync('./index.html','utf-8');
    const cssData = fs.readFileSync('./style.css','utf-8');
    const jsData = fs.readFileSync('./script.js','utf-8');

    if(req.url == '/'){
        // res.end('Hello from the server side');
        requests('https://api.openweathermap.org/data/2.5/weather?q=allahabad&appid=f53ecde89798a9a19298dc31b378749b')
        .on('data', (chunk) => {
            const objData = JSON.parse(chunk);
            const arrObjData = [objData];
            const data = arrObjData.map((curElm) => {
                // subtracting 272.15 to convert temp into Celsius by default it's in kelvin
                const curTemp = (curElm.main.temp - 272.15).toFixed(2);
                const minTemp = (curElm.main.temp_min - 272.15).toFixed(2);
                const maxTemp = (curElm.main.temp_max - 272.15).toFixed(2);
                const name = curElm.name;
                const country = curElm.sys.country;

                let newFileData = fileData.replace('{%place%}',name);

                newFileData = newFileData.replace('{%country%}',country);

                newFileData = newFileData.replace('{%temp%}',curTemp);

                newFileData = newFileData.replace('{%tempMin%}',minTemp);

                newFileData = newFileData.replace('{%tempMax%}',maxTemp);

                return newFileData;

            })

            const newData = data.join("");

            // console.log(newData);
            res.writeHead(200,{'content-type':'text/html'});
            res.write(newData);
        })
        .on('end',(err) => {
            if(err) return console.log('connection closed due to erros',err);

            console.log('end');
            res.end();
        })

    }
    else if(req.url == '/style.css'){
        res.writeHead(200,{'content-type':'text/css'});
        res.end(cssData);
    }
    else if(req.url == '/script.js'){
        res.writeHead(200,{'content-type':'application/javascript'});
        res.end(jsData);
    }
    else{
        res.statusCode = 404;
        res.end('404 page not found');
    }
});

server.listen(PORT,"127.0.0.1",() => {
    console.log('Listening at port '+PORT);
})