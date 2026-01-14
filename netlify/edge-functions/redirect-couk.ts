export default async (request: Request) => {
  const url = new URL(request.url);
  const host = url.host.toLowerCase();

  if (host === 'whoza.co.uk' || host === 'www.whoza.co.uk') {
    url.host = 'whoza.ai';
    url.protocol = 'https:';
    return Response.redirect(url.toString(), 308);
  }

  return;
};

export const config = {
  path: "/*",
};
