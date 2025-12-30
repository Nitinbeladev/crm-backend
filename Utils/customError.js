export class customError extends Error {
  constructor(statusCode,message ) {
    super(message); // Call the parent Error constructor
    this.statusCode = statusCode; // Add a custom property
  }
}
