import amqp, { Channel } from 'amqplib/callback_api'
import { Queue } from '../common/enum/queue.enum'
import { MQMessage } from '../common/types/mq-message.type';
import { config } from '../config/app.config';

export type MQProducer = { send: (message: MQMessage) => void };

export const createMQProducer = (queueName: Queue): MQProducer => {
    let channel: Channel;
    amqp.connect(config.queue.getUrl(), (err, connection) => {
        if (err) throw err;
        connection.createChannel((err, newchannel) => {
            if (err) throw err;
            channel = newchannel;
            channel.assertQueue(queueName);
        })
    });
    return {
        send: async (message: MQMessage) => {
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
        }
    }
}