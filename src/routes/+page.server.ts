import type { Actions, PageServerLoad } from './$types';

import { STRAPI_SERVER_URL } from "$env/static/private";
import { client } from '$lib/strapiClient';
import type Review from '$lib/interfaces/Review';
import type ActingArea from '$lib/interfaces/ActingArea';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
    const toPopulate = [
        'about', 'about.profile',
        'googleReviews', 'googleReviews.reviews',
        'actingAreas', 'actingAreas.image'
    ]
    const { about, googleReviews, actingAreas } = (await client.single('global').find({ populate: toPopulate })).data;

    // Parse publish datetime and get only initials of every review author
    const reviews: Review[] = (googleReviews.reviews as Review[]).map((review) => {
        review.publishTime = new Date(review.publishTime).toLocaleDateString('pt-BR');
        review.author = review.author.split(" ").map((s): string => s.at(0)!).join(".");
        return review;
    })

    const _actingAreas: ActingArea[] = (actingAreas as any[]).map((item) => (
        {
            "title": item.title,
            "description": item.description,
            "imgSrc": STRAPI_SERVER_URL + item.image.formats.small.url
        }
    ))

    return {
        "introductionText": about.introductionText,
        "profile": STRAPI_SERVER_URL + about.profile.url,
        "averageRating": googleReviews.averageRating,
        "reviews": reviews,
        "actingAreas": _actingAreas
    }
}

export const actions = {
    contact: async ({ request }) => {
        const data = JSON.stringify(Object.fromEntries((await request.formData()).entries()));
        
        const result = await client.fetch("/contact/submit", {
            body: data,
            method: "POST",
            headers: { "Content-Type": "application/json" }
        }).catch((error) => {
            return error.response;
        })

        const response = await result.json();

        if (result.ok) {
            return { data: response }
        }

        return fail(500, response.error);
    }
} satisfies Actions;