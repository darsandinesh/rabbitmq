const amqp = require('amqplib');

const queueName = 'rpcQueue';

function fact(n) {
    if (n < 2) {
        return 1;
    }
    return fact(n - 1) * n;
}

const consume = async (req, res) => {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName)
    channel.consume(queueName, msg => {

        const f = fact(parseInt(msg.content.toString()));

        channel.sendToQueue(msg.properties.replyTo, Buffer.from(f.toString()), {
            correlationId: msg.properties.correlationId
        })
        
        console.log(`fact of ${parseInt(msg.content.toString())} :` ,f);
        channel.ack(msg);
    })
}

consume();