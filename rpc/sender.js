const amqp = require('amqplib');

const queueName = 'rpcQueue';
const num = 5
const id = '12345'

const sendMsg = async (req, res) => {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const q = channel.assertQueue('', { exclusive: true });

    channel.sendToQueue(queueName, Buffer.from(num.toString()), {
        replyTo: q.queue,
        correlationId: id
    })

    channel.consume(q.queue,msg=>{
        console.log(msg.properties.correlationId);
        console.log(`fact of ${num} :` ,parseInt(msg.content.toString()));
        if(msg.properties.correlationId == id){
            console.log(`fact of ${num} :` ,parseInt(msg.content.toString()));
        }
        channel.ack(msg);
    })

    console.log('msg sent!!');
}

sendMsg();