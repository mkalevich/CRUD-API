export const getRequestMask = (path: string = "", method: string = "") => {
  const id = getIdFromUrl(path);

  return id ? `/api/users/:id-${method}` : `${path}-${method}`;
};

export const getUuidFromUrl = (url: string | undefined) => {
  const UUID_REGEX =
    /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;

  const match = url?.match(UUID_REGEX);

  return match ? match[0] === match.input : null;
};

const getIdFromUrl = (url: string) => {
  return url.split("/")[3];
};
