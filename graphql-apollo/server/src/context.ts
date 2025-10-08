// this typically includes
// Database Connections or Models
// Authentication Data
// API clients for other services
// DataLoaders (to learn)
// to create a typesafe context object which is created once per request and shared across all resolvers for that request.


export interface MyContext {
  // Example: You could have a user's auth token here
  token?: String;
}