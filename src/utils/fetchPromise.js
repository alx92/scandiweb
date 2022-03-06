// export const catQuery = `query Categories {
//     categories {
//       name
//       products {
//         id
//         name
//         inStock
//         gallery
//         description
//         category
//         attributes {
//            id
//            name
//            type
//            items {
//                displayValue
//                value
//                id
//            }
//         }
//         prices {
//           amount
//           currency {
//             symbol
//             label
//           }
//         }
//         brand
//       }
//     }
//   }`;

// export default async function fetchPromise() {
//   try {
//     const res = await fetch("http://localhost:4000", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         query: catQuery,
//       }),
//     });
//     const json = await res.json();
//     return json.data.categories;
//   } catch (err) {
//     console.log("Error " + err);
//   }
// }
