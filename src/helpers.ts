export const getRequestMask = (path: any, method: any) => {
  const id = getUuidFromUrl(path);

  return id ? `/api/users/:id-${method}` : `${path}-${method}`;
};

function getUuidFromUrl(url: string) {
  const UUID_REGEX =
    /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;

  const match = url.match(UUID_REGEX);

  return match ? match[0] : null;
}
