export default {
    async fetch(request: Request): Promise<Response> {
        const url = new URL(request.url);
        if (url.pathname.startsWith('/api')) {
            return new Response(JSON.stringify({ message: 'Hello from API' }), {
            headers: { 'Content-Type': 'application/json' },
            });
        }
        return new Response('Hello from Cloudflare Worker!', {
            headers: { 'Content-Type': 'text/plain' },
        });
    },
};