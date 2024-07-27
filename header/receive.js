const amqp = require('amqplib');

const exchange = 'header';

const receive = async () => {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertExchange(exchange, 'headers', { durable: false });
    const q = channel.assertQueue('', { exclusive: true })
    channel.bindQueue(q.queue, exchange, '', { 'account': 'new', 'x-match': 'all' });
    console.log('header receiver ready')
    channel.consume(q.queue, msg => {
        console.log('[x] msg :', msg.content.toString())
    })
}

receive();