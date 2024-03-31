import * as yup from "yup";

export default yup.object({
  userId: yup
    .number()
    .required()
    .typeError("User ID must be a number")
    .min(1)
    .max(10)
    .label("User ID"),
  title: yup.string().required().max(100).label("Title"),
});
