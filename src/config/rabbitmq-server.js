import amqp from "amqplib";

const getRabbitMQUrl = () => {
  const { RABBITMQ_USER, RABBITMQ_PASSWORD, RABBITMQ_HOST, RABBITMQ_PORT } =
    process.env;
  return `amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`;
};

export async function rabbitMqServer(queue, message) {
  const connection = await amqp.connect(getRabbitMQUrl());
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, { durable: true});

  await channel.sendToQueue(queue, Buffer.from(message));

  await channel.close();
  await connection.close();
}
