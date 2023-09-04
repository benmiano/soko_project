import axios from "axios";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";


const getProducts = async () => {
    const res = await axios.get("https://fakestoreapi.com/products");
    const productsJson = await res.data;
    return productsJson;
}

const createProduct = (item: any) => {
    const product = {
        title: item.title,
        description: item.description,
        price: item.price,
        image: item.image,
        category: item.category,
    };
    return product;
}

const productsSchemaString = `type Product {
    id: Int!,
    title: String,
    description: String,
    price: Float!,
    image: String,
    category: String
}
input ProductInput {
    title: String!,
    description: String!,
    price: Float!,
    image: String,
    category: String
}
type RootQuery {
    products : [Product!]!
}
type RootMutation {
    createProduct(productInput: ProductInput) : Product
}
schema {
    query : RootQuery
    mutation : RootMutation
}`

export const productsRoute =
    graphqlHTTP({
        // schema: productsSchema,
        schema: buildSchema(`${productsSchemaString}`),

        // function to fetch products list using graphql
        rootValue: {
            products: getProducts,

            // function to add a product using graphql
            createProduct: createProduct
        },
        graphiql: true,
    })
    ;

