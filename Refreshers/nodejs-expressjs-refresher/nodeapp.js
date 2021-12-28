//const fs = require('fs');

//const userName = 'Max';

//fs.writeFile('user-data.txt', 'Name: ' + userName, (err)=>{
//    if(err){
//        console.log(err);
//        return;
//    }
//    console.log('WROTE FILE');
//});
//console.log(userName);

const http = require('http');

const server = http.createServer((req, res) => {
    console.log('INCOMING REQUEST');
    console.log(req.method);

    if(req.method === 'POST'){
        let body = '';
        req.on('end' ,() => {
            const userName = body.split('=')[1];
            console.log(body);
            res.end('<h1>'+ userName+'</h1>');
        });
        req.on('data',(chunk)=>{
            body += chunk
        });
    }
    else{
        res.setHeader('Content-Type', 'text/html')
        res.end('<form method="POST"><input type="text" name="username"><button type="submit">Create User</button></form>');
    }
});

server.listen(5000);