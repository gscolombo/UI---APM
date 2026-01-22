import type { Actions, LayoutServerLoad } from "./$types";

import { STRAPI_SERVER_URL } from "$env/static/private";
import { client, fetchWithRetry } from "$lib/strapiClient";
import type Review from "$lib/interfaces/Review";
import type ActingArea from "$lib/interfaces/ActingArea";

function sanitizeURL(url: string): string {
    if (url.startsWith("http")) {
        return url;
    }

    return STRAPI_SERVER_URL + url;
}

export const load: LayoutServerLoad = async () => {
    const simpleFields = ['siteName']
    const populate = [
        'siteLogo',
        'about', 'about.profile',
        'googleReviews', 'googleReviews.reviews',
        'actingAreas', 'actingAreas.image',
        'contact'
    ]

    const _fetch = () => client.single('global').find({ populate: populate, fields: simpleFields });

    const data = (await fetchWithRetry(_fetch)).data;

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
            imgSrc: sanitizeURL(item.image.formats.small.url)
        }
    ))

    return {
        siteName: data.siteName,
        siteLogoURL: sanitizeURL(data.siteLogo.url),
        introductionText: data.about.introductionText,
        profile: sanitizeURL(data.about.profile.url),
        averageRating: data.googleReviews.averageRating,
        reviews: reviews,
        actingAreas: _actingAreas,
        phoneNumber: data.contact.phoneNumber,
        email: data.contact.email,
        contactText: data.contact.text
    };
};