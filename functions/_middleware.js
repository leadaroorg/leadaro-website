export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (url.hostname === "www.leadaro.org") {
    url.hostname = "leadaro.org";
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
}
