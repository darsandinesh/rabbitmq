const amqp = require('amqplib');

const queueName = 'rpcQueue';

function fact(n){
    if(n<2) return 1;
    return fact(n-1) * n;
}

const consumeMsg = async (req,res)=>{
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName);
    console.log('reday to find the fact');
    channel.consume(queueName,(msg)=>{
        const num = parseInt(msg.content);
        const f = fact(num)
        console.log('replay sent',f);
        channel.sendToQueue(msg.properties.replyTo,Buffer.from(f.toString()),{
            correlationId:msg.properties.correlationId,
        })
        channel.ack(msg)
    })
}
consumeMsg();
