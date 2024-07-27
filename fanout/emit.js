const amqplib = require('amqplib');

const exchange = 'logs';

const msg = process.argv.slice(2).join(' ') || "hello all this is a log msg";

const emit = async () => {
    const connection = await amqplib.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertExchange(exchange, 'fanout', { durable: false });
    channel.publish(exchange,'',Buffer.from(msg));
    setTimeout(()=>{
        connection.close();
        process.exit(0);
    },500);
}

emit();