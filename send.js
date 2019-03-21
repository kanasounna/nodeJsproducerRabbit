
//#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
//amqp.connect('amqp://10.61.142.235:5672', function(err, conn){
amqp.connect('amqp://localhost:5672', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'hello';
    var msg = 'Hello World! from Bereket and Kana';

    ch.assertQueue(q, {durable: false});
    ch.sendToQueue(q, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });
  setTimeout(function() { conn.close(); process.exit(0) }, 5000);
});