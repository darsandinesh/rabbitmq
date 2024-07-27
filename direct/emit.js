const amqplib = require('amqplib');


const exchange = 'direct';

// const msg = process.argv.slice(2)
// const rk = msg[0];
const log = 'hello';

const send = async () => {
    const connection = await amqplib.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertExchange(exchange, 'direct', { durable: false });
    channel.publish(exchange, 'log', Buffer.from(log));
    console.log('[X] msg send.......')
    setTimeout(() => {
        channel.close();
        process.exit(0);
    }, 500)
}

send()  