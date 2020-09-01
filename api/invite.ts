import { axios } from '@/utils/api';

// 邀请用户
export const _articleInvite = (params: any) => axios.$post('/article/invite', params);
