import { Message } from 'view-design';

export default (content) => {
  Message.error({ content, duration: 10, background: true });
};
