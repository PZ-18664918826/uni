import { SERVICE_ENV } from '@/config';
import { createRequest } from './request';

/**
 * @type {'dev'|'test'|'prod'}
 */
const env = process.env.VUE_APP_HTTP_ENV || 'dev';

const { url } = SERVICE_ENV[env];

export const request = createRequest({ baseURL: url });
