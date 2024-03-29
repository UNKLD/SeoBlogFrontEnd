import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export const API = publicRuntimeConfig.PRODUCTION
  ? "https://seoblogbackend-leuldamtew.b4a.run/api"
  : publicRuntimeConfig.API_DEVELOPMENT;

export const APP_NAME = publicRuntimeConfig.APP_NAME;

export const DOMAIN = publicRuntimeConfig.PRODUCTION
  ? publicRuntimeConfig.DOMAIN_PRODUCTION
  : publicRuntimeConfig.DOMAIN_DEVELOPMENT;

export const DISQUS_SHORTNAME = publicRuntimeConfig.DISQUS_SHORTNAME;
