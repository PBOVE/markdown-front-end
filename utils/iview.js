import { Message } from 'view-design';

export default (content) => {
  if (process.client) {
    Message.error({ content, duration: 10, background: true });
  }
};
