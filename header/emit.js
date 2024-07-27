const amqplib = require('amqplib');
const exchange = 'header';


const msg = 'this is header message broker!!';

const producer = async ()=>{
    const connection =await amqplib.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertExchange(exchange,'headers',{durable:false});
    channel.publish(exchange,'',Buffer.from(msg),{headers:{'account':'old','method':'google'}});
    setTimeout(()=>{
        channel.close();
        process.exit(0)
    },100);
}

producer()