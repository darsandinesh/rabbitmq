const amqplib = require('amqplib');

const args = process.argv.slice(2);

const exchange = 'direct';

const consume = async () => {
    const connection = await amqplib.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertExchange(exchange,'direct',{durable:false});
    const q  = channel.assertQueue('',{exclusive:true});
    console.log('[X] ready to accept..')
    // args.forEach((bk)=>{
        channel.bindQueue(q.queue,exchange,'logs')
    // })
    channel.consume(q.queue,(msg)=>{
        console.log('[X] msg is :',msg.content.toString());
    })
}
consume()