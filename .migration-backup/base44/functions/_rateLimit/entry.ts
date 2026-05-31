// Deprecated — rate limiting is now inlined per-function.
// This file is intentionally a no-op handler to satisfy the platform.
Deno.serve(() => new Response('Deprecated', { status: 410 }));