var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    var q = url.parse(req.url, true).query;
    var txt = q.name + " " + q.price + " " + q.onSale;
    var price = Number(q.price);
    var name = q.name;
    var onSaleValue = Boolean(q.onSale);

    var obj = { name: name, price: price, onSale: onSaleValue };
    var myJSON = JSON.stringify(obj);
    //console.log(myJSON);
    var amqp = require('amqplib/callback_api');
    amqp.connect('amqp://10.61.142.235:5672', function (err, conn) {
        //amqp.connect('amqp://localhost:5672', function(err, conn) {
        //amqp.connect('amqp://10.61.142.5:15672', function(err, conn) {
        conn.createChannel(function (err, ch) {
           var q = 'HELLO_QUEUE';
           //var q = 'employee-queue2';
            //var q = 'hello';
            //var msg = 'Hello World! from Bereket and Kana';
            ch.assertQueue(q, { durable: true });
            ch.sendToQueue(q, Buffer.from(myJSON));
            console.log(" [x] Sent %s", myJSON);
        });
        setTimeout(function () { conn.close(); process.exit(0) }, 50000);
    });
    res.end(myJSON);
}).listen(8080);