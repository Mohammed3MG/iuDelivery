import  SanityClient  from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";


const client = SanityClient({
    projectId: "6ocoi2x5",
    dataset: "production",
    useCdn: true,
    apiVersion: "2021-10-21",
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export default client;