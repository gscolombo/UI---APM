import { strapi } from "@strapi/client";
import { STRAPI_API_TOKEN, STRAPI_SERVER_URL } from "$env/static/private";

export const client = strapi({ 
    baseURL: STRAPI_SERVER_URL + "/api",
    auth:  STRAPI_API_TOKEN
});