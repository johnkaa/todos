import * as yup from "yup";

export default yup.object({
  username: yup.string().required().label("Username"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[\d+().\s-]+$/, "Phone number contains invalid characters"),
});
