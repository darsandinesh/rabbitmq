const amqp = require('amqplib');

const queueName = 'rpcQueue';
const n = '5'
const id = '12343';

const sendMsg = async () => {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const q = await channel.assertQueue('', { exclusive: true });
    console.log('reqeust send')
    channel.sendToQueue(queueName, Buffer.from(n), {
        replyTo: q.queue,
        correlationId: id
    })

    channel.consume(q.queue, msg => {
        if (msg.properties.correlationId == id) {
            console.log('fact of 5 :', parseInt(msg.content))
        }
        channel.ack(msg)
    })


}

sendMsg()