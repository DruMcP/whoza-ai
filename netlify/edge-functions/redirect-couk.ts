export default async (request: Request) => {
  const url = new URL(request.url);
  const host = url.host.toLowerCase();

  // 1. Domain redirect: whoza.co.uk -> whoza.ai
  if (host === 'whoza.co.uk' || host === 'www.whoza.co.uk') {
    url.host = 'whoza.ai';
    url.protocol = 'https:';
    return Response.redirect(url.toString(), 308);
  }

  // 2. SEO: Strip WordPress-style search query params that cause GSC duplicate issues
  // These params don't exist on this React SPA and create duplicate/alternate page issues
  const pathname = url.pathname;
  const params = url.searchParams;

  // Strip ?s= from homepage (WordPress search param)
  if (pathname === '/' && params.has('s')) {
    return Response.redirect('https://whoza.ai/', 301);
  }

  // Strip ?q= from /blog/ (search query param)
  if (pathname === '/blog/' && params.has('q')) {
    return Response.redirect('https://whoza.ai/blog/', 301);
  }

  // Strip ?plan= from /start (plan param handled client-side, strip for canonical cleanliness)
  if (pathname === '/start' && params.has('plan')) {
    return Response.redirect('https://whoza.ai/start', 301);
  }

  return;
};

export const config = {
  path: "/*",
};
