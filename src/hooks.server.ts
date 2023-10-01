import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';

const authHandle = SvelteKitAuth({
	providers: [Google({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET })]
});

const requestHandle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/custom')) {
		return new Response('custom response');
	}
	console.log('request Handle > start');
	const response = await resolve(event);
	console.log('request Handle < end');
	return response;
};

export const handle = sequence(authHandle, requestHandle);
