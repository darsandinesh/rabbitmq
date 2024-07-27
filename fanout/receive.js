const amqplib = require('amqplib');

const exchange = 'logs';

const receive = async () => {
    const connection = await amqplib.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertExchange(exchange, 'fanout', { durable: false });
    const q = await channel.assertQueue('', { exclusive: true });
    channel.bindQueue(q.queue, exchange, '');
    console.log('waiting for msg.....')
    channel.consume(q.queue, (msg) => {
        console.log('[X] msg is : ', msg.content.toString());
    }, { noAck: true })
}

receive()