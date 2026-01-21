import type { Actions } from './$types';

import { client } from '$lib/strapiClient';
import { fail } from '@sveltejs/kit';

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