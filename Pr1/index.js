const http = require('http');
const sendMail = require('./sendMail');

const PORT = process.env.PORT || 8000;

const server = http.createServer((req,res) => {
    if(req.url == '/'){
        res.end('Hello from the server side');
    }
    else if(req.url == '/mail'){
        sendMail();
        res.end('Mail Sent');
    }
    else{
        res.statusCode = 404;
        res.end("404 page not found");
    }
});


server.listen(PORT,'127.0.0.1',() => {
    console.log("listening at port "+PORT);
});