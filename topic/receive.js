const amqplib = require('amqplib');

const exchange = 'topic';

const agrs = process.argv.slice(2);

const consumer = async () => {
    const connection = await amqplib.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertExchange(exchange, 'topic', { durable: false });
    const q = channel.assertQueue('', { exclusive: true });
    console.log('topice set to go');
    // agrs.forEach((bk)=>{
        channel.bindQueue(q.queue,exchange,'log.*');
    // })
    channel.consume(q.queue,(msg)=>{
        console.log(msg.content.toString());
    })

}

consumer()