const amqplib = require('amqplib');

const queueName = "hello";

const msg = 'hello darsan, how are you';

const sendMsg = async () => {
    const connection = await amqplib.connect('amqp://localhost');
    const channel = await connection.createChannel()
    await channel.assertQueue(queueName, { durable: false });
    channel.sendToQueue(queueName, Buffer.from(msg))
    console.log('[X] msg send : ',msg)
    setTimeout(()=>{
        channel.close();
        process.exit(0);
    },500)
}


sendMsg()