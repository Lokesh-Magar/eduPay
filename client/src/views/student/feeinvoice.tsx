"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import {Box} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField, InputAdornment } from "@mui/material";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { createTheme } from "@mui/material/styles";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import CryptoJS from 'crypto-js';

const FeesInvoiceList = () => {
  const textFieldRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const router = useRouter();
  // const { register, handleSubmit, formState: { errors } } = useForm();
  // const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState(null);
  // const [error, setError] = useState<string | null>(null);


  // const [orders, setOrders] = useState([]);

  const handleFocus = () => {
    if (textFieldRef.current) {
      textFieldRef.current.placeholder = "";
    }
  };

  const handleBlur = () => {
    if (textFieldRef.current && textFieldRef.current.value === "") {
      textFieldRef.current.placeholder = "SEARCH";
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2",
      },
    },
  });

//   const onSubmit = async (payment_method: string) => {
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     // console.log(data);
    
//     try {
//       const response = await axios.post('/initialize-esewa');
//       console.log(response);
//       setSuccess(response.data.message);
//       router.push('/portal')

//   } catch (err:any) {
//       if (err.response) {
//           setError(err.response.data.message || 'An error occurred');
//       } else {
//           setError("An error occurred");
//       }
//   } finally {
//       setLoading(false);
//   }
// };

//Generate Hash
// const [hashInBase64, setHashInBase64] = useState('');
// const [cryptoLoaded, setCryptoLoaded] = useState(false);

// useEffect(() => {
//   // Check if CryptoJS is loaded
//   if (CryptoJS) {
//     setCryptoLoaded(true);
//   }
// }, []);

const generateHash = () => {
 

  const hash = CryptoJS.HmacSHA256(
    'total_amount=110,transaction_uuid=555,product_code=EPAYTEST',
    '8gBm/:&EnhH.1/q'
  );
  const hashBase64 = CryptoJS.enc.Base64.stringify(hash);
  // setHashInBase64(hashBase64);
  return hashBase64;
};

//Form Submit under Add button setting
 const signature = generateHash();
console.log(signature);

  return (
    <>
      <div className="flex ">
        <Typography variant="h6" component="h3">
          Fees Invoice
        </Typography>
        <nav style={{ marginLeft: "65%" }}>
          <Typography
            variant="h6"
            component="h3"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Link href="#" style={{ marginRight: "35px" }}>
              Dashboard
            </Link>
            <span style={{ marginRight: "10px" }}>|</span>
            <Link href="#" style={{ marginRight: "35px" }}>
              Fees
            </Link>
            <span style={{ marginRight: "35px" }}>|</span>
            <Link href="#">Fees Invoice</Link>
          </Typography>
        </nav>
      </div>

      {/* Fees Group list 1st card */}
      <div className="feesList mt-7 " style={{ flex: 1 }}>
        <Card sx={{ width: "100%", height: "105%" }}>
          <CardContent>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h6"
                component="h3"
                style={{ flex: 1, marginRight: "16%" }}
              >
                <Button variant="contained"
                  // onClick={()=> onSubmit("esewa")
                  onClick={handleClickOpen}
                >+ ADD</Button>
              </Typography>

              <div>

              {/* <Button variant="outlined" >
                Open Dialog
              </Button> */}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Add Fees/Payment"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ESEWA Payment Redirect.
          </DialogContentText>
          <Box component="form" action={"https://rc-epay.esewa.com.np/api/epay/main/v2/form"} method="POST" target="_blank" >
          <TextField hidden label="Amount" name="amount" defaultValue="100"  required fullWidth />
          <TextField hidden label="Tax Amount" name="tax_amount" defaultValue="10" required fullWidth />
          <TextField hidden label="Total Amount" name="total_amount" defaultValue="110" required fullWidth />
          <TextField hidden label="Transaction UUID" name="transaction_uuid" defaultValue="555" required fullWidth />
          <TextField hidden label="Product Code" name="product_code" defaultValue="EPAYTEST" required fullWidth />
          <TextField hidden label="Product Service Charge" name="product_service_charge" defaultValue="0" required fullWidth />
          <TextField hidden label="Product Delivery Charge" name="product_delivery_charge" defaultValue="0" required fullWidth />
          <TextField hidden label="Success URL" name="success_url" defaultValue="https://esewa.com.np" required fullWidth />
          <TextField hidden label="Failure URL" name="failure_url" defaultValue="https://google.com" required fullWidth />
          <TextField hidden label="Signed Field Names" name="signed_field_names" defaultValue="total_amount,transaction_uuid,product_code" required fullWidth />
          <TextField hidden label="Signature" name="signature" value= {signature} required fullWidth />

          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
            Submit
          </Button>
          </Box>
          {/* <Button variant="contained" onClick={generateHash}>Generate Hash</Button> */}
          {/* {hashInBase64 && <p>Hash (Base64): {hashInBase64}</p>} */}

          {/* <Button variant="contained"
                  onClick={()=> onSubmit("esewa")}
                >+ PAY</Button> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
              <div style={{ flexGrow: 1 }}>
                <TextField
                  id="standard-search"
                  variant="standard"
                  placeholder="QUICK SEARCH"
                  inputRef={textFieldRef}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchSharpIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ButtonGroup
                  variant="outlined"
                  aria-label="Basic button group"
                  sx={{
                    "& .MuiButton-root": {
                      fontSize: "1.2rem",
                      padding: "4px 8px",
                      backgroundColor: "transparent",
                      borderColor: "currentColor",
                      color: "currentColor",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.08)",
                        borderColor: "currentColor",
                      },
                      boxShadow: "none",
                    },
                  }}
                >
                  <Button title="Copy Table">
                    <Icon icon="material-symbols:file-copy-outline-sharp" />
                  </Button>
                  <Button title="Export to Excel">
                    <Icon icon="mdi:file-excel-outline" />
                  </Button>
                  <Button title="Export to CSV">
                    <Icon icon="mdi:file-document-outline" />
                  </Button>
                  <Button title="Export to PDF">
                    <Icon icon="mdi:file-pdf-outline" />
                  </Button>
                  <Button title="Print">
                    <Icon icon="fa:print" style={{ fontSize: "1rem" }} />
                  </Button>
                  <Button title="Action">
                    <Icon
                      icon="mdi:table"
                      style={{
                        fontSize: "1.3rem",
                      }}
                    />
                  </Button>
                </ButtonGroup>
              </div>
            </div>
            {/* Table */}
            <div style={{ marginTop: "20px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th
                      style={{
                        padding: "8px",
                        textAlign: "left",
                        backgroundColor: "lightgray",
                        borderRadius: "5px 0 0 5px",
                        position: "relative", // Required for rounded corners
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ArrowDownwardIcon style={{ marginRight: "8px" }} />
                        <span>SL</span>
                      </div>
                    </th>
                    <th
                      style={{
                        padding: "8px",
                        textAlign: "left",
                        backgroundColor: "lightgray",
                        position: "relative", // Required for rounded corners
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ArrowDownwardIcon style={{ marginRight: "8px" }} />
                        <span>Student</span>
                      </div>
                    </th>
                    <th
                      style={{
                        padding: "8px",
                        textAlign: "left",
                        backgroundColor: "lightgray",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ArrowDownwardIcon style={{ marginRight: "8px" }} />
                        <span>Amount</span>
                      </div>
                    </th>
                    <th
                      style={{
                        padding: "8px",
                        textAlign: "left",
                        backgroundColor: "lightgray",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ArrowDownwardIcon style={{ marginRight: "8px" }} />
                        <span>Waiver</span>
                      </div>
                    </th>
                    <th
                      style={{
                        padding: "8px",
                        textAlign: "left",
                        backgroundColor: "lightgray",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ArrowDownwardIcon style={{ marginRight: "8px" }} />
                        <span>Fine</span>
                      </div>
                    </th>
                    <th
                      style={{
                        padding: "8px",
                        textAlign: "left",
                        backgroundColor: "lightgray",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ArrowDownwardIcon style={{ marginRight: "8px" }} />
                        <span>Paid</span>
                      </div>
                    </th>
                    <th
                      style={{
                        padding: "8px",
                        textAlign: "left",
                        backgroundColor: "lightgray",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ArrowDownwardIcon style={{ marginRight: "8px" }} />
                        <span>Balance</span>
                      </div>
                    </th>
                    <th
                      style={{
                        padding: "8px",
                        textAlign: "left",
                        backgroundColor: "lightgray",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ArrowDownwardIcon style={{ marginRight: "8px" }} />
                        <span>Status</span>
                      </div>
                    </th>

                    <th
                      style={{
                        padding: "8px",
                        textAlign: "left",
                        backgroundColor: "lightgray",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ArrowDownwardIcon style={{ marginRight: "8px" }} />
                        <span>Date</span>
                      </div>
                    </th>
                    <th
                      style={{
                        padding: "8px",
                        textAlign: "left",
                        backgroundColor: "lightgray",
                        borderRadius: "0 5px 5px 0",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ArrowDownwardIcon style={{ marginRight: "8px" }} />
                        <span>Action</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                {/*------ Body Section ------ */}
                <tbody>
                  <tr style={{ borderBottom: "1px solid #ddd" }}>
                    <td
                      style={{
                        padding: "8px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ marginLeft: 8 }}>1</span>{" "}
                      {/* Adjust margin for spacing */}
                    </td>
                    <td style={{ padding: "8px" }}>STUDENT NAME</td>
                    <td style={{ padding: "8px" }}>AMOUNT</td>
                    <td style={{ padding: "8px" }}>WAIVER</td>
                    <td style={{ padding: "8px" }}>FINE </td>
                    <td style={{ padding: "8px" }}>PAID</td>
                    <td style={{ padding: "8px" }}>BALANCE</td>
                    <td style={{ padding: "5px" }}>
                      <Button
                        variant="outlined"
                        size="small"
                        style={{ borderRadius: "5px" }}
                      >
                        STATUS
                      </Button>
                    </td>
                    <td style={{ padding: "8px" }}>DATE</td>
                    <td style={{ padding: "8px" }}>ACTIONS</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #ddd" }}>
                    <td
                      style={{
                        padding: "8px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ marginLeft: 8 }}>2</span>{" "}
                      {/* Adjust margin for spacing */}
                    </td>
                    <td style={{ padding: "8px" }}>STUDENT NAME</td>
                    <td style={{ padding: "8px" }}>AMOUNT</td>
                    <td style={{ padding: "8px" }}>WAIVER</td>
                    <td style={{ padding: "8px" }}>FINE </td>
                    <td style={{ padding: "8px" }}>PAID</td>
                    <td style={{ padding: "8px" }}>BALANCE</td>
                    <td style={{ padding: "5px" }}>
                      <Button
                        variant="outlined"
                        size="small"
                        style={{ borderRadius: "5px" }}
                      >
                        STATUS
                      </Button>
                    </td>
                    <td style={{ padding: "8px" }}>DATE</td>
                    <td style={{ padding: "8px" }}>ACTIONS</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #ddd" }}>
                    <td
                      style={{
                        padding: "8px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ marginLeft: 8 }}>3</span>{" "}
                      {/* Adjust margin for spacing */}
                    </td>
                    <td style={{ padding: "8px" }}>STUDENT NAME</td>
                    <td style={{ padding: "8px" }}>AMOUNT</td>
                    <td style={{ padding: "8px" }}>WAIVER</td>
                    <td style={{ padding: "8px" }}>FINE </td>
                    <td style={{ padding: "8px" }}>PAID</td>
                    <td style={{ padding: "8px" }}>BALANCE</td>
                    <td style={{ padding: "5px" }}>
                      <Button
                        variant="outlined"
                        size="small"
                        style={{ borderRadius: "5px" }}
                      >
                        STATUS
                      </Button>
                    </td>
                    <td style={{ padding: "8px" }}>DATE</td>
                    <td style={{ padding: "8px" }}>ACTIONS</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #ddd" }}>
                    <td
                      style={{
                        padding: "8px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ marginLeft: 8 }}>4</span>{" "}
                      {/* Adjust margin for spacing */}
                    </td>
                    <td style={{ padding: "8px" }}>STUDENT NAME</td>
                    <td style={{ padding: "8px" }}>AMOUNT</td>
                    <td style={{ padding: "8px" }}>WAIVER</td>
                    <td style={{ padding: "8px" }}>FINE </td>
                    <td style={{ padding: "8px" }}>PAID</td>
                    <td style={{ padding: "8px" }}>BALANCE</td>
                    <td style={{ padding: "5px" }}>
                      <Button
                        variant="outlined"
                        size="small"
                        style={{ borderRadius: "5px" }}
                      >
                        STATUS
                      </Button>
                    </td>
                    <td style={{ padding: "8px" }}>DATE</td>
                    <td style={{ padding: "8px" }}>ACTIONS</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #ddd" }}>
                    <td
                      style={{
                        padding: "8px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ marginLeft: 8 }}>5</span>{" "}
                      {/* Adjust margin for spacing */}
                    </td>
                    <td style={{ padding: "8px" }}>STUDENT NAME</td>
                    <td style={{ padding: "8px" }}>AMOUNT</td>
                    <td style={{ padding: "8px" }}>WAIVER</td>
                    <td style={{ padding: "8px" }}>FINE </td>
                    <td style={{ padding: "8px" }}>PAID</td>
                    <td style={{ padding: "8px" }}>BALANCE</td>
                    <td style={{ padding: "5px" }}>
                      <Button
                        variant="outlined"
                        size="small"
                        style={{ borderRadius: "5px" }}
                      >
                        STATUS
                      </Button>
                    </td>
                    <td style={{ padding: "8px" }}>DATE</td>
                    <td style={{ padding: "8px" }}>ACTIONS</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #ddd" }}>
                    <td
                      style={{
                        padding: "8px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ marginLeft: 8 }}>6</span>{" "}
                      {/* Adjust margin for spacing */}
                    </td>
                    <td style={{ padding: "8px" }}>STUDENT NAME</td>
                    <td style={{ padding: "8px" }}>AMOUNT</td>
                    <td style={{ padding: "8px" }}>WAIVER</td>
                    <td style={{ padding: "8px" }}>FINE </td>
                    <td style={{ padding: "8px" }}>PAID</td>
                    <td style={{ padding: "8px" }}>BALANCE</td>
                    <td style={{ padding: "5px" }}>
                      <Button
                        variant="outlined"
                        size="small"
                        style={{ borderRadius: "5px" }}
                      >
                        STATUS
                      </Button>
                    </td>
                    <td style={{ padding: "8px" }}>DATE</td>
                    <td style={{ padding: "8px" }}>ACTIONS</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #ddd" }}>
                    <td
                      style={{
                        padding: "8px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ marginLeft: 8 }}>7</span>{" "}
                      {/* Adjust margin for spacing */}
                    </td>
                    <td style={{ padding: "8px" }}>STUDENT NAME</td>
                    <td style={{ padding: "8px" }}>AMOUNT</td>
                    <td style={{ padding: "8px" }}>WAIVER</td>
                    <td style={{ padding: "8px" }}>FINE </td>
                    <td style={{ padding: "8px" }}>PAID</td>
                    <td style={{ padding: "8px" }}>BALANCE</td>
                    <td style={{ padding: "5px" }}>
                      <Button
                        variant="outlined"
                        size="small"
                        style={{ borderRadius: "5px" }}
                      >
                        STATUS
                      </Button>
                    </td>
                    <td style={{ padding: "8px" }}>DATE</td>
                    <td style={{ padding: "8px" }}>ACTIONS</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #ddd" }}>
                    <td
                      style={{
                        padding: "8px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ marginLeft: 8 }}>8</span>{" "}
                      {/* Adjust margin for spacing */}
                    </td>
                    <td style={{ padding: "8px" }}>STUDENT NAME</td>
                    <td style={{ padding: "8px" }}>AMOUNT</td>
                    <td style={{ padding: "8px" }}>WAIVER</td>
                    <td style={{ padding: "8px" }}>FINE </td>
                    <td style={{ padding: "8px" }}>PAID</td>
                    <td style={{ padding: "8px" }}>BALANCE</td>
                    <td style={{ padding: "5px" }}>
                      <Button
                        variant="outlined"
                        size="small"
                        style={{ borderRadius: "5px" }}
                      >
                        STATUS
                      </Button>
                    </td>
                    <td style={{ padding: "8px" }}>DATE</td>
                    <td style={{ padding: "8px" }}>ACTIONS</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #ddd" }}>
                    <td
                      style={{
                        padding: "8px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ marginLeft: 8 }}>9</span>{" "}
                      {/* Adjust margin for spacing */}
                    </td>
                    <td style={{ padding: "8px" }}>STUDENT NAME</td>
                    <td style={{ padding: "8px" }}>AMOUNT</td>
                    <td style={{ padding: "8px" }}>WAIVER</td>
                    <td style={{ padding: "8px" }}>FINE </td>
                    <td style={{ padding: "8px" }}>PAID</td>
                    <td style={{ padding: "8px" }}>BALANCE</td>
                    <td style={{ padding: "5px" }}>
                      <Button
                        variant="outlined"
                        size="small"
                        style={{ borderRadius: "5px" }}
                      >
                        STATUS
                      </Button>
                    </td>
                    <td style={{ padding: "8px" }}>DATE</td>
                    <td style={{ padding: "8px" }}>ACTIONS</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #ddd" }}>
                    <td
                      style={{
                        padding: "8px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ marginLeft: 8 }}>10</span>{" "}
                      {/* Adjust margin for spacing */}
                    </td>
                    <td style={{ padding: "8px" }}>STUDENT NAME</td>
                    <td style={{ padding: "8px" }}>AMOUNT</td>
                    <td style={{ padding: "8px" }}>WAIVER</td>
                    <td style={{ padding: "8px" }}>FINE </td>
                    <td style={{ padding: "8px" }}>PAID</td>
                    <td style={{ padding: "8px" }}>BALANCE</td>
                    <td style={{ padding: "5px" }}>
                      <Button
                        variant="outlined"
                        size="small"
                        style={{ borderRadius: "5px" }}
                      >
                        STATUS
                      </Button>
                    </td>
                    <td style={{ padding: "8px" }}>DATE</td>
                    <td style={{ padding: "8px" }}>ACTIONS</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
          {/* Pagination */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "16px",
            }}
          >
            <Typography variant="body2" style={{ marginLeft: "16px" }}>
              Showing 1 to 10 of 55 entries
            </Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "auto",
                cursor: "pointer",
              }}
            >
              <Button
                size="small"
                style={{
                  color: "black",
                  marginRight: "10px",
                  padding: "4px 8px",
                  width: "30px",
                  minWidth: "auto",
                  border: "none",
                }}
              >
                <ArrowBackIcon style={{ fontSize: "16px" }} />
              </Button>
              <Typography
                variant="body2"
                sx={{
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  marginRight: "8px",
                  background: theme.palette.primary.main,
                  "&:hover": {
                    background: theme.palette.primary.main,
                  },
                }}
              >
                1
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "black",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  marginRight: "8px",
                  transition: "background 0.3s ease",
                  "&:hover": {
                    color: "white",
                    background: theme.palette.primary.main,
                  },
                }}
              >
                2
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "black",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  marginRight: "8px",
                  transition: "background 0.3s ease",
                  "&:hover": {
                    color: "white",
                    background: theme.palette.primary.main,
                  },
                }}
              >
                3
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "black",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  marginRight: "8px",
                  transition: "background 0.3s ease",
                  "&:hover": {
                    color: "white",
                    background: theme.palette.primary.main,
                  },
                }}
              >
                4
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "black",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  transition: "background 0.3s ease",
                  "&:hover": {
                    color: "white",
                    background: theme.palette.primary.main,
                  },
                }}
              >
                5
              </Typography>

              <Button
                size="small"
                style={{
                  color: "black",
                  marginLeft: "10px",
                  padding: "4px 8px",
                  width: "30px",
                  minWidth: "auto",
                  border: "none",
                }}
              >
                <ArrowForwardIcon style={{ transform: "scale(0.8)" }} />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default FeesInvoiceList;