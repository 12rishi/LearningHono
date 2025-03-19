export enum STATUS {
  success = 200 | 201 | 202 | 204,
  clientError = 400 | 404 | 401 | 403 | 408,
  serverError = 500 | 503,
  redirect = 30,
}
