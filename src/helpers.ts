export const getRequestMask = (method: any, withId?: boolean) =>
  withId ? `$/api/user-${method}:id` : `/api/user-${method}`;
