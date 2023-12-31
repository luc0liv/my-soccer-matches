const statusCodes: Record<string, number> = {
  ok: 200,
  notFound: 404,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  noContent: 204,
  unprocessableEntity: 422,
};

export default statusCodes;
