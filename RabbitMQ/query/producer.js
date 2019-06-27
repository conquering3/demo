var amqp = require('amqplib/callback_api');

amqp.connect('amqp://192.168.40.134:5672', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'queue';
        var msg = 'hello world';

        channel.assertQueue(queue, {
            durable: false
        });
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        let i = 0;
        setInterval(() => {
            channel.sendToQueue(queue, Buffer.from((i++).toString()), {
                persistent: true // 数据永久化存储, RabbitMQ重启不会消息
            });
        }, 1000);
        console.log(" [x] Sent %s", msg);
    });
});