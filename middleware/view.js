import { Message } from 'view-design';

export default function() {
  const isClient = process.client;
  if (isClient) {
    Message.destroy();
  }
}
