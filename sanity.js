// Import necessary libraries for Sanity client and image URL handling
import SanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Configure the Sanity client with project and dataset information
const client = SanityClient({
  projectId: "6ocoi2x5", // Replace with your project ID
  dataset: "production", // Replace with your dataset name
  useCdn: true, // Use Content Delivery Network (CDN) for faster image loading
  apiVersion: "2021-10-21", // Specify the API version
});

// Create an image URL builder based on the configured Sanity client
const builder = imageUrlBuilder(client);

// Export a function to generate URLs for images in your Sanity project
export const urlFor = (source) => builder.image(source);

// Export the configured Sanity client for use in other parts of your application
export default client;
