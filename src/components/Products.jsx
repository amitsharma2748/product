import React, { useEffect, useState } from "react";
import "../Styles/Products.css";
import Loader from "../layout/loader/Loader";
import Backdrop from "@mui/material/Backdrop";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Container,
  Fade,
  Grid,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import axios from "axios";
import Product from "./Product";
import CartCard from "./CartCard";
import { useSelector } from "react-redux";
const Products = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [cat, setCat] = useState([]);
  const [brandarr, setBrandArr] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [sort, setSort] = useState(0);
  const [open, setOpen] = useState(false);
  const product = useSelector((state) => state.cart);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    maxHeight: 400,
    overflowY: "scroll",
    bgcolor: "#313131",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const handleClose = () => {
    setOpen(false);
  };
  const openHandler = () => {
    if (product.items.length !== 0) {
      setOpen(true);
    } else {
      alert("add an Item to cart");
    }
  };
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products?limit=100")
      .then((res) => {
        setData(res.data.products);
        setCat(res.data.products);
        setBrandArr(res.data.products);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  const categories = cat?.map((item) => item.category);
  const uniqueCategories = categories?.filter(
    (item, index) => categories.indexOf(item) === index
  );
  const brands = brandarr?.map((item) => item.brand);
  const uniqueBrands = brands?.filter(
    (item, index) => brands.indexOf(item) === index
  );
  // console.log(uniqueBrands);
  const handleChange = (val) => {
    setSort(val);
    if (val === 1) {
      const sortedArr = data.sort((a, b) => b.rating - a.rating);
      setData(sortedArr);
    } else if (val === 2) {
      const sortedArr = data.sort(
        (a, b) => b.discountPercentage - a.discountPercentage
      );

      setData(sortedArr);
    } else if (val === 3) {
      const sortedArr = data.sort((a, b) => a.price - b.price);

      setData(sortedArr);
    } else if (val === 4) {
      const sortedArr = data.sort((a, b) => b.price - a.price);

      setData(sortedArr);
    }
  };
  const clickHandlerCategory = (category) => {
    const filteredArray = cat?.filter((item) => item.category === category);
    setData(filteredArray);
  };
  const clickHandlerBrand = (brand) => {
    setSelectedBrand("");
    const filteredArray = cat?.filter((item) => item.brand === brand);
    setData(filteredArray);
    setSelectedBrand(brand);
  };
  uniqueCategories.map((category) =>
    data
      ?.filter((item) => item.category === category)
      .map((item) => console.log(item))
  );
  return (
    <Container maxWidth="xl">
      {loading ? (
        <Loader />
      ) : (
        <Box>
          <h2 className="productsHeading">Products</h2>
          <Grid container marginBottom={"25px"}>
            <Grid
              item
              xs={12}
              sm={8}
              display={"flex"}
              justifyContent={"center"}
              flexDirection={"row"}
            >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={uniqueBrands}
                sx={{ width: 300 }}
                value={selectedBrand}
                onChange={(event, newValue) => {
                  clickHandlerBrand(newValue);
                  if (newValue === null) {
                    setData(brandarr);
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Brand" />
                )}
              />

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                label="Sort"
                onChange={(e) => handleChange(e.target.value)}
                sx={{ marginLeft: "65px" }}
              >
                <MenuItem value={0} defaultChecked>
                  Sort
                </MenuItem>
                <MenuItem value={1}>Rating (High to Low)</MenuItem>
                <MenuItem value={2}>Discount (High to Low)</MenuItem>
                <MenuItem value={3}>Price (Low to High)</MenuItem>
                <MenuItem value={4}>Price (High to Low)</MenuItem>
              </Select>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              display={"flex"}
              justifyContent={"center"}
              mt={2}
            >
              <ShoppingCartIcon onClick={openHandler} fontSize="large" />
              <Avatar sx={{ width: 24, height: 24 }}>
                {product.totalQuantity}
              </Avatar>
            </Grid>
          </Grid>
          <Box className="categories_button">
            {uniqueCategories?.map((item) => (
              <Button
                variant="contained"
                onClick={() => {
                  clickHandlerCategory(item);
                  console.log(item);
                }}
              >
                {item}
              </Button>
            ))}
          </Box>
          <div className="products">
            {data?.length &&
              uniqueCategories.map((category) =>
                data
                  ?.filter((item) => item.category === category)
                  .map((product, index) => (
                    <>
                      {index === 0 && (
                        <Box width={"100%"}>
                          <br />
                          <Typography
                            variant="h2"
                            sx={{ textTransform: "capitalize" }}
                            color={"green"}
                          >
                            {product.category}
                          </Typography>
                        </Box>
                      )}
                      <Product key={product.id} product={product} />
                    </>
                  ))
              )}
          </div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={open}>
              <Box sx={style} className="modal">
                <ul className="cart_list">
                  {product.items?.map((item) => (
                    <CartCard item={item} />
                  ))}
                </ul>
                <Box margin={"auto"}>
                  <Button variant="outlined">Checkout</Button>
                </Box>
              </Box>
            </Fade>
          </Modal>
        </Box>
      )}
    </Container>
  );
};

export default Products;
