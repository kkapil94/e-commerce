import {
  Container,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import useProducts from "../store";
import ProductCard from "./ProductCard";

export default function HomeProducts() {
  const products = useProducts((state) => state.products.product);
  const loading = useProducts((state) => state.loading);
  console.log(products, loading);
  const fetch = useProducts((state) => state.fetchProducts);
  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <Fragment>
      <Container sx={{width:"85%",marginTop: "5rem" }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            color: "#424040",
            borderBottom: "2px solid #b1aeae",
            width: "25rem",
            paddingBottom: "1rem",
            textAlign: "center",
            margin: "0 auto 4rem auto",
          }}
        >
          Featured Products
        </Typography>
        <Stack
          direction={"row"}
          flexWrap="wrap"
          alignItems={"center"}
          justifyContent="center"
        >
          {!loading &&
            products.map((product) => (
              <Link
                to={`product/${product._id}`}
                style={{ textDecoration: "none" }}
                key={product._id}
              >
                <ProductCard products={product}/>
              </Link>
            ))}
        </Stack>
      </Container>
    </Fragment>
  );
}





































// import {
//   Card,
//   CardContent,
//   Box,
//   Container,
//   Rating,
//   Typography,
// } from "@mui/material";
// import { Stack } from "@mui/system";
// import React, { Fragment, useEffect } from "react";
// import { Link } from "react-router-dom";
// import useProducts from "../store";

// export default function Products() {
//   const products = useProducts((state) => state.products.product);
//   const loading = useProducts((state) => state.loading);
//   console.log(products, loading);
//   const fetch = useProducts((state) => state.fetchProducts);
//   useEffect(() => {
//     fetch();
//   }, [fetch]);

//   return (
//     <Fragment>
//       <Container sx={{ marginTop: "5rem" }}>
//         <Typography
//           variant="h4"
//           align="center"
//           sx={{
//             color: "#424040",
//             borderBottom: "2px solid #b1aeae",
//             width: "25rem",
//             paddingBottom: "1rem",
//             textAlign: "center",
//             margin: "0 auto 4rem auto",
//           }}
//         >
//           Featured Products
//         </Typography>
//         <Stack
//           direction={"row"}
//           flexWrap="wrap"
//           alignItems={"center"}
//           justifyContent="center"
//         >
//           {!loading &&
//             products.map((product) => (
//               <Link
//                 to={`product/${product._id}`}
//                 style={{ textDecoration: "none" }}
//                 key={product._id}
//               >
//                 <Card
//                   sx={{
//                     width: "16rem",
//                     height: "25rem",
//                     margin: "2rem 1rem 0 1rem",
//                   }}
//                 >
//                   <CardContent>
//                     <Box>
//                       <img
//                         src={product.images[0].url}
//                         alt=""
//                         style={{ height: "18rem", width: "100%" }}
//                       />
//                     </Box>
//                     <Typography variant="h6" sx={{ marginBottom: "0.5rem" }}>
//                       {product.name}
//                     </Typography>
//                     <Rating
//                       name="read-only"
//                       value={product.ratings}
//                       readOnly
//                       size="small"
//                     />
//                     <Typography
//                       variant="subtitle2"
//                       sx={{ marginTop: "0.5rem" }}
//                     >
//                       ₹{product.price}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Link>
//             ))}
//         </Stack>
//       </Container>
//     </Fragment>
//   );
// }
