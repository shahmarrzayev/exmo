import { EConfig } from './config.enum';

export const getConfig = (config: EConfig): any => {
  if (!config) return null;

  return process.env[config];
};
