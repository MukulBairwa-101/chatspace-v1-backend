const responseCode = {
  SUCCESS: {
    code: 200,
    name: "Success",
    status: true,
  },
  CREATED: {
    code: 201,
    name: "Created",
    status: true,
  },
  ACCEPTED: {
    code: 202,
    name: "Created",
    status: true,
  },
  NO_CONTENT: {
    code: 204,
    name: "No Content",
    status: false,
  },
  NOT_FOUND: {
    code: 404,
    name: "Not Found",
    status: false,
  },
  BAD_REQUEST: {
    code: 400,
    name: "Bad Request",
    status: false,
  },
  FORBIDDEN: {
    code: 403,
    name: "Forbidden",
    status: false,
  },
  UNAUTHORIZED: {
    code: 401,
    name: "Unauthorized",
    status: false,
  },
  CONFLICT: {
    code: 409,
    name: "Conflict",
    status: false,
  },
  SERVER: {
    code: 500,
    name: "Internal Server Error",
    status: false,
  },
  MISSING: {
    code: 422,
    name: "Missing Parameter",
    status: false,
  },
  UNIQUE_DATA: {
    code: 500,
    name: "DuplicateKey",
    status: false,
  },
  SYNTAX: {
    code: 500,
    name: "Syntax Error",
    status: false,
  },
};
module.exports = responseCode;
