import * as Yup from "yup";

//Login form validation
export const validationSchema = Yup.object({
  username: Yup.string().required("Required*"),
  password: Yup.string()
    .required("Required*")
    .max(20, "Maximum 20 characters")
    .min(8, "At least 8 characters require"),
});

//Recovery Password email/Mobile No field validation using Yup

export const validationSchemaRecoveryEmail = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
    mobile: Yup.string()
    .matches(/^[0-9]+$/, "Mobile number must only contain digits")
    .min(10, "Mobile number must be at least 10 digits")
    .max(10, "Mobile number must not exceed 10 digits")
  
});

//Recover Password button control validation

export const validationSchemaOtp = Yup.object({
  otp: Yup.string()
    .matches(/^\d{6}$/, "OTP must be a 6-digit number")
    .required("OTP is required"),
});

//Reset Password validation

export const validationSchemaResetPwd = Yup.object({
  otp:Yup.string()
    .required("OTP is required"),
  newpassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("newpassword"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

//Customer Support page validation

export const validationSchemaCustonerSupport = Yup.object({
  nic: Yup.string().required("Required*"),
  username: Yup.string().required("Required*"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  description: Yup.string().required("Required*"),
});

export const validateNewPassword = (values) => {
  const errors = {};
  const passwordPattern =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

  if (!values.newpassword) {
    errors.newpassword = "New password is required*";
  } else if (passwordPattern.test(values.newpassword)) {
    errors.newpassword = "Please enter valid password";
  } else if (!values.confirmpassword) {
    errors.confirmpassword = "Confirm password is required*";
  } else if (values.newpassword !== values.confirmpassword) {
    errors.confirmpassword = "Password Confirmation is wrong";
  } else {
    return null;
  }

  return errors;
};
