import React from "react";
import "../Styles/Products.css";
import ReactStars from "react-rating-stars-component";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { cartActions } from "../Redux/cartSlice";
const Product = ({ product }) => {
  const dispatch = useDispatch();
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.rating,
    isHalf: true,
  };

  const buyHandler = (product) => {
    if (product?.stock < 50) {
      alert("hurry! only a few items left");
    }
  };

  const cartHandler = (product) => {
    dispatch(cartActions.addItemToCart(product));
  };
  // console.log(useSelector(state => state.productDetail))
  return (
    <>
      {product && (
        <div className="productCard">
          <img src={product?.thumbnail} alt={product?.title} />
          <Typography component={"h1"} textAlign={"center"} fontSize={"28px"}>
            {product.title}
          </Typography>
          <div className="stars">
            <ReactStars {...options} />
          </div>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Typography fontSize={"28px"}>
              <span>₹{product.price}</span>
            </Typography>
            <span>
              <Typography fontSize={"12px"} color={"GrayText"}>
                ({product?.discountPercentage}% off)
              </Typography>
            </span>
          </Box>
          <Box
            width={"50%"}
            margin={"auto"}
            display={"flex"}
            flexDirection={"column"}
          >
            <Button
              variant="outlined"
              fullWidth
              onClick={() => cartHandler(product)}
            >
              Add to cart
            </Button>
            <Button
              variant="outlined"
              color="success"
              sx={{ marginY: "10px" }}
              fullWidth
              onClick={() => buyHandler(product)}
            >
              Buy now
            </Button>
          </Box>
        </div>
      )}
    </>
  );
};

export default Product;
