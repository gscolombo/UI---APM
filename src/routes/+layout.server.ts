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
        'actingAreas', 'actingAreas.image',
        'contact'
    ]

    const data = (await client.single('global').find({ populate: populate, fields: simpleFields })).data;

    // Parse publish datetime and get only initials of every review author
    const reviews: Review[] = (data.googleReviews.reviews as Review[]).map((review) => {
        review.publishTime = new Date(review.publishTime).toLocaleDateString('pt-BR');
        review.author = review.author.split(" ").map((s): string => s.at(0)!).join(".");
        return review;
    })

    const _actingAreas: ActingArea[] = (data.actingAreas as any[]).map((item) => (
        {
            title: item.title,
            description: item.description,
            imgSrc: STRAPI_SERVER_URL + item.image.formats.small.url
        }
    ))

    return {
        siteName: data.siteName,
        siteLogoURL: STRAPI_SERVER_URL + data.siteLogo.url,
        introductionText: data.about.introductionText,
        profile: STRAPI_SERVER_URL + data.about.profile.url,
        averageRating: data.googleReviews.averageRating,
        reviews: reviews,
        actingAreas: _actingAreas,
        phoneNumber: data.contact.phoneNumber,
        email: data.contact.email,
        contactText: data.contact.text
    };
};