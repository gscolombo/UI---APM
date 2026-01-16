import { strapi } from "@strapi/client";
import { STRAPI_API_TOKEN, STRAPI_SERVER_URL } from '$env/static/private';

import type { LayoutServerLoad } from "./$types";

const client = strapi({ 
    baseURL: STRAPI_SERVER_URL + "/api",
    auth:  STRAPI_API_TOKEN
});

export const load: LayoutServerLoad = async () => {
    const { siteName, siteLogo } = (await client.single('global').find({ populate: "*" })).data;

    return {
        siteName: siteName,
        siteLogoURL: STRAPI_SERVER_URL + siteLogo.url
    };
};



