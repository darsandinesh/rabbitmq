const amqp = require('amqplib');

const queueName = 'task';

const consume = async () => {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel()
    await channel.assertQueue(queueName, { durable: true });
    channel.prefetch(1);
    channel.consume(queueName,(msg)=>{
        console.log('[Y] msg consumed : ',msg.content.toString());
        setTimeout(()=>{
            channel.ack(msg)
        })
    })
}

consume();