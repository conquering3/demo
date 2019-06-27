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

		channel.consume(queue,
			function(msg) {
                console.log(' [x] Received %s', msg.content.toString());
                // ack 确认
                channel.ack(msg);
			},
			{
				noAck: false // 消息处理完成确认 发送ack
			}
		);
	});
});
