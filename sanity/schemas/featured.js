export default {
    name: "featured",
    type: "document",
    title: "Featured Menu catefories",
    fields: [
        {
            name: "name",
            type: "string",
            title: "Featured Category Name",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "short_description",
            type: "string",
            title: "Short Description",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "retaurants",
            type: "array",
            title: "Restaurants",
            of: [{
                type: "reference", to: [{
                    type: "restaurant"
                }]
            }],
        }
    ]
};