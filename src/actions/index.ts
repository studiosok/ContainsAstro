import { defineAction } from "astro:actions";
import { z } from 'astro:schema';
import { search } from '../functions/search.js';

export interface ActionResponse { 
    safe: boolean,
    allergens: [string]
    risks: string[][]
}

export const server = {
    searchData: defineAction({
        input: z.string(),
        handler: async (input): Promise<ActionResponse> => {
            const { safe, allergens, risks } = await search(input);
            return { safe, allergens, risks }
    }
})
}