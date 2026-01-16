import type { PageServerLoad } from './$types';

import { STRAPI_SERVER_URL } from "$env/static/private";
import { client } from '$lib/strapiClient';

export const load: PageServerLoad = async () => {
    const { about } = (await client.single('global').find({populate: ['about', 'about.profile']})).data;

    return {
        "introductionText": about.introductionText,
        "profile": STRAPI_SERVER_URL + about.profile.url
    }
}