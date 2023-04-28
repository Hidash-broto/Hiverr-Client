import { Button, MenuItem, TextField, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import React, { startTransition, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import { useReducer } from "react";
import axios from "axios";
import { toast } from "react-toastify";





function Pricing() {
  const [price, setPrice]:any = useState(0)
  const [imagePrice, setImagePrice]:any = useState(0)
  const reducer = (state: any, action: any) => {
    if(isNaN(state.totalPrice)) {
      state.totalPrice = price
      console.log(state.totalPrice, 'actual')
    }
    if (action.type == "price") {
      // price = parseInt(action.value);
      console.log(action.value,'l')
      return {
        totalPrice: action.value,
      };
    } else { 
      console.log(price,'p')
      return { 
        totalPrice: isNaN(state.totalPrice) ? price : action.value
      };
    }
  };
  const [state, dispatch1] = useReducer(reducer, { totalPrice: 0 });
  useEffect(() => {
    console.log('object')
    if(price == state.totalPrice) {
      console.log('458')
      dispatch({type:'imagePrice', value: parseInt(price)+parseInt(imagePrice)})
      console.log(state.totalPrice)
    }
  })
  const deliveryTime: Number[] = [];
  for (let i = 1; i <= 100; i++) {
    deliveryTime.push(i);
  }
  const arr = [];
  let totalPrice = 0;
  const dispatch = useDispatch();
  const initialValue = {
    deliveryTime: "",
    numberOfPages: "",
    revisions: "",
    hostingSetup: "",
    price: "",
    licensedImages: "",
    totalPrice: "",
  };
  return (
    <Container
      sx={{
        width: "1200px",
        height: "600px",
        backgroundColor: "white",
        marginTop: "65px",
        position: "absolute",
        marginLeft: "50px",
      }}
    >
      <Typography className="packege mt-5 ml-5" variant="h3">
        Package
      </Typography>
      <Formik
        initialValues={initialValue}
        validationSchema={yup.object({
          deliveryTime: yup.string().required("*Required"),
          numberOfPages: yup.string().required("*Required"),
          revisions: yup.string().required("*Required"),
          hostingSetup: yup.string().required("*Required"),
          price: yup
            .number()
            .test(
              "noEOrSign",
              "Number had an 'e' or sign.",
              (value) =>
                typeof value === "number" && !/[eE+-]/.test(value.toString())
            ),
          licensedImages: yup
            .number()
            .test(
              "noEOrSign",
              "Number had an 'e' or sign.",
              (value) =>
                typeof value === "number" && !/[eE+-]/.test(value.toString())
            ),
          // totalPrice: yup
          //   .number()
          //   .test(
          //     "noEOrSign",
          //     "Number had an 'e' or sign.",
          //     (value) =>
          //       typeof value === "number" && !/[eE+-]/.test(value.toString())
          //   ),
        })}
        onSubmit={(values) => {
          console.log(values, "=k=");
        }}
      >
        {({ handleSubmit, handleChange, errors, touched, values }) => (
          <form onSubmit={handleSubmit}>
            <Stack sx={{ marginLeft: "300px" }} direction="column">
              <Stack direction="row" spacing={0}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Delivery Time"
                  helperText={
                    touched.deliveryTime && errors.deliveryTime
                      ? errors.deliveryTime
                      : "Delivery Time"
                  }
                  name="deliveryTime"
                  sx={{
                    width: "240px",
                    height: "50px",
                    marginLeft: "0px",
                    marginTop: "20px",
                  }}
                  onChange={handleChange}
                >
                  {deliveryTime.map((number: any) => {
                    return (
                      <MenuItem key={number} value={number}>
                        {`${number} days Delivery`}
                      </MenuItem>
                    );
                  })}
                </TextField>
                <TextField
                  id="outlined-select-currency"
                  select
                  helperText={
                    touched.numberOfPages && errors.numberOfPages
                      ? errors.numberOfPages
                      : "Number of Pages"
                  }
                  label="Number of Pages"
                  name="numberOfPages"
                  sx={{
                    width: "240px",
                    height: "50px",
                    marginLeft: "100px",
                    marginTop: "20px",
                  }}
                  onChange={handleChange}
                >
                  {deliveryTime.map((number: any) => {
                    return (
                      <MenuItem key={number} value={number}>
                        {number}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Stack>
              <Stack direction="row" spacing={5}>
                <TextField
                  id="outlined-select-currency"
                  select
                  helperText={
                    touched.revisions && errors.revisions
                      ? errors.revisions
                      : "Revisions"
                  }
                  label="Revisions"
                  name="revisions"
                  sx={{
                    width: "240px",
                    height: "50px",
                    marginLeft: "0px",
                    marginTop: "50px",
                  }}
                  onChange={handleChange}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value="Unlimited">Unlimited</MenuItem>
                </TextField>
                <TextField
                  id="outlined-select-currency"
                  select
                  helperText={
                    touched.hostingSetup && errors.hostingSetup
                      ? errors.hostingSetup
                      : "Hosting Setup"
                  }
                  label="Hosting Setup"
                  name="hostingSetup"
                  sx={{
                    width: "240px",
                    height: "50px",
                    marginLeft: "100px",
                    marginTop: "50px",
                  }}
                  onChange={handleChange}
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </TextField>
              </Stack>
              <Stack direction="row" spacing={5}>
                <TextField
                  helperText={
                    touched.price && errors.price ? errors.price : "Price"
                  }
                  label="Price"
                  name="price"
                  sx={{
                    width: "240px",
                    height: "50px",
                    marginLeft: "0px",
                    marginTop: "50px",
                  }}
                  onChange={(e) => {
                    handleChange(e)
                    console.log(typeof(state.totalPrice))
                    let value = e.target.value
                    console.log(value,'vlaue')
                    setPrice(e.target.value)
                    dispatch1({type: 'price', value: value})
                  }}
                />
                <TextField
                  helperText={
                    touched.licensedImages && errors.licensedImages
                      ? errors.licensedImages
                      : "Licensed Images"
                  }
                  label="licensed Images"
                  name="licensedImages"
                  sx={{
                    width: "240px",
                    height: "50px",
                    marginLeft: "100px",
                    marginTop: "50px",
                  }}
                  onChange={(e) => {
                    handleChange(e)
                    let value = parseInt(e.target.value) * 100
                    console.log(parseInt(price)+value,'ki')
                    setImagePrice(e.target.value)
                    dispatch1({type: 'imagePrice', value: parseInt(price)+value})
                  }}
                />
              </Stack>
              <TextField
                helperText={
                  touched.totalPrice && errors.totalPrice
                    ? errors.totalPrice
                    : "Total Price"
                }
                value={state.totalPrice?state.totalPrice:price}
                name="totalPrice"
                sx={{ width: "580px", marginTop: "5.5rem" }}
                id="outlined-basic"
                label="Total Price"
                variant="outlined"
                onChange={(e) => {
                  console.log('ready')
                  if(price == e.target.value) {
                    dispatch({type:'imagePrice', value: parseInt(price)+parseInt(imagePrice)})
                  }
                }}
              />
              <Button
                type="submit"
                sx={{ width: "200px", marginLeft: "385px" }}
                color="success"
                variant="contained"
                size="large"
              >
                Save & Continue
              </Button>
            </Stack>
          </form>
        )}
      </Formik>
    </Container>
  );
}

export default Pricing;
