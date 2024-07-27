const amqplib = require('amqplib');

const queueName = 'hello';

const receiveMsg = async () => {
    const connection = await amqplib.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: false });
    channel.consume(queueName, (msg) => {
        console.log('[X] msg recevied : ', msg.content.toString())
    }, { noAck: true })
    setTimeout(() => {
        channel.close();
        process.exit(0);
    })
}

receiveMsg()