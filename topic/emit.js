const amqplib = require('amqplib');

const exchange = 'topic';



// const agrs = process.argv.slice(2);
const log ='hello'

const producer = async () => {
    const connection = await amqplib.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertExchange(exchange, 'topic', { durable: false });
    channel.publish(exchange,'log.hello',Buffer.from(log));
    setTimeout(()=>{
        channel.close();
        process.exit(0);
    },10);
}

producer()