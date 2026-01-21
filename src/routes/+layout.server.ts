import type { Actions, LayoutServerLoad } from "./$types";

import { STRAPI_SERVER_URL } from "$env/static/private";
import { client } from "$lib/strapiClient";
import type Review from "$lib/interfaces/Review";
import type ActingArea from "$lib/interfaces/ActingArea";

export const load: LayoutServerLoad = async () => {

    const simpleFields = ['siteName']

    const populate = [
        'siteLogo',
        'about', 'about.profile',
        'googleReviews', 'googleReviews.reviews',
        'actingAreas', 'actingAreas.image'
    ]

    const { siteName, siteLogo, about, googleReviews, actingAreas } = (await client.single('global').find({ populate: populate, fields: simpleFields })).data;

    // Parse publish datetime and get only initials of every review author
    const reviews: Review[] = (googleReviews.reviews as Review[]).map((review) => {
        review.publishTime = new Date(review.publishTime).toLocaleDateString('pt-BR');
        review.author = review.author.split(" ").map((s): string => s.at(0)!).join(".");
        return review;
    })

    const _actingAreas: ActingArea[] = (actingAreas as any[]).map((item) => (
        {
            title: item.title,
            description: item.description,
            imgSrc: STRAPI_SERVER_URL + item.image.formats.small.url
        }
    ))

    return {
        siteName: siteName,
        siteLogoURL: STRAPI_SERVER_URL + siteLogo.url,
        introductionText: about.introductionText,
        profile: STRAPI_SERVER_URL + about.profile.url,
        averageRating: googleReviews.averageRating,
        reviews: reviews,
        actingAreas: _actingAreas
    };
};