const amqplib = require('amqplib');

const queueName = 'task';

const mgs = process.argv.slice(2).join(' ') || 'hello world';

const send = async () => {
    const connection = await amqplib.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(mgs),{persistent:true});
    console.log('[X] msg sent : ' ,mgs);
    setTimeout(()=>{
        connection.close();
        process.exit(0);
    },500);
}

send();