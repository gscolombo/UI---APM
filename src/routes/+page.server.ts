import type { PageServerLoad } from './$types';

import { STRAPI_SERVER_URL } from "$env/static/private";
import { client } from '$lib/strapiClient';
import type Review from '$lib/interfaces/Review';

export const load: PageServerLoad = async () => {
    const toPopulate = [
        'about', 'about.profile',
        'googleReviews', 'googleReviews.reviews'
    ]
    const { about, googleReviews } = (await client.single('global').find({populate: toPopulate})).data;

    // Parse publish datetime and get only initials of every review author
    const reviews: Review[] = (googleReviews.reviews as Review[]).map((review) => {
        review.publishTime = new Date(review.publishTime).toLocaleDateString('pt-BR');
        review.author = review.author.split(" ").map((s): string => s.at(0)!).join(".");
        return review;
    })

    return {
        "introductionText": about.introductionText,
        "profile": STRAPI_SERVER_URL + about.profile.url,
        "averageRating": googleReviews.averageRating,
        "reviews": reviews
    }
}