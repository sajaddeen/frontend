import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Theme from "../../Component/Theme";
import styled from "@emotion/styled";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { validateNewPassword } from "./Validation";
import { BtnTypography } from "./Recovery";
import { validationSchemaResetPwd } from "./Validation";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import { updateNewPassword } from "../../Services/ResetPassword/SendEmail";

const theme = Theme();

const Overly = styled(Stack)(({}) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0, 0.7)",
  zIndex: 1000,
}));

const ModelStack = styled(Stack)(({}) => ({
  zIndex: 2000,
}));
const TitleBox = styled(Box)(({ theme }) => ({
  marginBottom: "1em",
  textAlign: "center",
  width: 350,
  [theme.breakpoints.down("md")]: {
    width: "80%%",
  },
}));

const UserText = styled(Stack)(({ theme }) => ({
  textAlign: "left",
  width: 350,
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const UserInputBox = styled(Stack)(({ theme }) => ({
  textAlign: "left",
  width: 350,
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

export default function Reset({ reset, setReset, openAlertSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  // //validate
  // const initialValue={newpassword:"",confirmpassword:""}
  // const [formValues,setFormValues]=useState(initialValue);
  // const [frormError,setFormError]=useState({});
  // const [isSubmit,setIsSubmit]=useState(false);

  // const handleNewPassword=(e)=>{
  //     setFormValues({...formValues,[e.target.name]:e.target.value});
  // }

  // const resetPwdHandle=(e)=>{
  //     setFormError(validateNewPassword(formValues));
  //     setIsSubmit(true);

  //     if(validateNewPassword(formValues)==null){
  //         openAlertSuccess();
  //     }

  // }

  // useEffect(()=>{
  //     if(Object.keys(formValues)===0&&isSubmit){
  //         console.log(formValues)

  //     }
  // })

  const onSubmit = (values) => {
    console.log(values);
    updateNewPassword(values)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          openAlertSuccess();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const initialValues = {
    otp: "",
    newpassword: "",
    confirmpassword: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: validationSchemaResetPwd,
  });

  return ReactDOM.createPortal(
    <Overly>
      <Stack alignItems="center" justifyContent="center">
        <ModelStack
          sx={{
            backgroundColor: theme.palette.background.paper,
            marginTop: "4em",
            marginBottom: "4em",
            width: 500,
            height: "80vh",
            borderRadius: theme.shape.borderRadius,
            overflow: "hidden",
            overflowY: "auto",
            [theme.breakpoints.down("md")]: {
              width: 400,
              height: "70vh",
            },
          }}
        >
          <Stack display="flex" direction="row" justifyContent="end">
            <Button
              size="small"
              variant="contained"
              onClick={() => setReset(false)}
            >
              <Typography variant="h6">X</Typography>
            </Button>
          </Stack>
          <form onSubmit={formik.handleSubmit}>
            <Stack display="flex" direction="column" alignItems="center">
              <TitleBox>
                <Typography
                  variant="h5"
                  sx={{
                    [theme.breakpoints.down("md")]: {
                      fontSize: "24px",
                    },
                  }}
                >
                  Reset Password
                </Typography>
              </TitleBox>
              <Stack
                spacing={2}
                textAlign="left"
                sx={{
                  width: "80%",
                  [theme.breakpoints.down("md")]: {
                    width: "65%",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    [theme.breakpoints.down("md")]: {
                      fontSize: "1rem",
                    },
                  }}
                >
                  Enter OTP
                </Typography>
              </Stack>
              <Stack
                spacing={1.5}
                sx={{
                  width: 500,
                  alignItems: "center",
                }}
              >
                <Stack
                  sx={{
                    width: "80%",
                    [theme.breakpoints.down("md")]: {
                      width: "50%",
                    },
                  }}
                >
                  <TextField
                    id="otp"
                    name="otp"
                    variant="outlined"
                    size="small"
                    placeholder="xxx-xxx"
                    type="text"
                    helperText={formik.errors.otp}
                    FormHelperTextProps={{
                      style: { color: theme.palette.error.main },
                    }}
                    value={formik.values.otp}
                    onChange={formik.handleChange}
                    sx={{
                      size: "small",
                      width: "100%",
                      borderRadius: theme.shape.borderRadius,
                      "&:hover": {
                        borderBlockColor: theme.palette.success.main,
                      },
                    }}
                  />
                </Stack>
              </Stack>

              <UserText>
                <Typography variant="subtitle2">Password must be:</Typography>
              </UserText>

              <Stack sx={{ marginBottom: "20px" }}>
                <ul>
                  <li>
                    <Typography variant="subtitle2">
                      Be at least 8 characters long
                    </Typography>
                  </li>
                  <li>
                    {" "}
                    <Typography variant="subtitle2">
                      Contain at least one uppercase
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="subtitle2">
                      Contain at least one lowercase
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="subtitle2">
                      Contain at least one number
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="subtitle2">
                      Contain at least one special characters
                    </Typography>
                  </li>
                </ul>
              </Stack>

              <Stack display="flex" direction="column" spacing={1.5}>
                <UserText>
                  <Typography variant="h6">Enter New Password</Typography>
                </UserText>

                <UserInputBox>
                  <TextField
                    id="newpwd"
                    name="newpassword"
                    variant="outlined"
                    size="small"
                    helperText={formik.errors.newpassword}
                    FormHelperTextProps={{
                      style: { color: theme.palette.error.main },
                    }}
                    value={formik.values.newpassword}
                    onChange={formik.handleChange}
                    type={showPassword ? "text" : "password"}
                    sx={{
                      placeholder: "Enter your password",
                      size: "small",
                      width: "100%",
                      borderRadius: theme.shape.borderRadius,
                      "&:hover": {
                        borderBlockColor: theme.palette.success.main,
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => setShowPassword(true)}
                            onBlur={() => setShowPassword(false)}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </UserInputBox>

                <UserText>
                  <Typography variant="h6">Confirm New Password</Typography>
                </UserText>

                <UserInputBox>
                  <TextField
                    id="confirmpwd"
                    name="confirmpassword"
                    variant="outlined"
                    size="small"
                    helperText={formik.errors.confirmpassword}
                    FormHelperTextProps={{
                      style: { color: theme.palette.error.main },
                    }}
                    value={formik.values.confirmpassword}
                    onChange={formik.handleChange}
                    type={showConfirmPassword ? "text" : "password"}
                    sx={{
                      placeholder: "Confirm your password",
                      size: "small",
                      width: "100%",
                      borderRadius: theme.shape.borderRadius,
                      "&:hover": {
                        borderBlockColor: theme.palette.success.main,
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => setConfirmShowPassword(true)}
                            onBlur={() => setConfirmShowPassword(false)}
                          >
                            {showConfirmPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </UserInputBox>
              </Stack>

              <Stack
                justifyContent="center"
                alignItems="center"
                sx={{
                  marginTop: "3%",
                  width: 350,
                  [theme.breakpoints.down("md")]: {
                    width: 250,
                  },
                }}
              >
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    width: "100%",
                    "&:hover": {
                      backgroundColor: theme.palette.secondary.main,
                    },
                  }}
                >
                  <BtnTypography>Reset Password</BtnTypography>
                </Button>
              </Stack>
            </Stack>
          </form>
        </ModelStack>
      </Stack>
    </Overly>,
    document.getElementById("portal-reset")
  );
}
