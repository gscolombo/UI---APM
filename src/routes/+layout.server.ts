import type { Actions, LayoutServerLoad } from "./$types";

import { STRAPI_SERVER_URL } from "$env/static/private";
import { client } from "$lib/strapiClient";

export const load: LayoutServerLoad = async () => {
    const { siteName, siteLogo } = (await client.single('global').find({ populate: "*" })).data;

    return {
        siteName: siteName,
        siteLogoURL: STRAPI_SERVER_URL + siteLogo.url
    };
};

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        
    }
} satisfies Actions;