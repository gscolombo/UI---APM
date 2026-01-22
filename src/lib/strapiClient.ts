import { strapi } from "@strapi/client";
import { STRAPI_API_TOKEN, STRAPI_SERVER_URL } from "$env/static/private";

export const client = strapi({ 
    baseURL: STRAPI_SERVER_URL + "/api",
    auth:  STRAPI_API_TOKEN
});

export async function fetchWithRetry(APICall: any, retries: number = 3) {
    let error: Error | undefined = undefined;

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const result = await APICall();
            return result;
        } catch (err) {
            error = err as Error;
            console.error(`Error during #${attempt} request attempt:`, error.message);
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    throw error;
}