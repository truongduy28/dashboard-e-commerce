const REGISTER = "/auth/register";
const LOGIN = "/auth/login";
const GOOGLE_LOGIN = "/auth/google-login";

// supplier endpoints
const ADD_SUPPLIER = "/supplier/add-new";
const UPDATE_SUPPLIER = "/supplier/update";
const EXPORT_SUPPLIER = "/supplier/export-to-excel";
const GET_SUPPLIERS = "/supplier";

// category endpoints
const ADD_CATEGORY = "/category/add-new";
const GET_CATEGORIES = "/category";
const DELETE_CATEGORY = "/category/delete";
const UPDATE_CATEGORY = "/category/update";

// product endpoints
const ADD_PRODUCT = "/product/add-new";
const GET_PRODUCT = "/product";
const GET_PRODUCT_DETAIL = "/product/detail";
const UPDATE_PRODUCT = "/product/update";
const DELETE_PRODUCT = "/product/delete";
// sub-product endpoints
const ADD_SUB_PRODUCT = "/product/add-sub-product";

export {
  ADD_CATEGORY,
  ADD_PRODUCT,
  ADD_SUB_PRODUCT,
  ADD_SUPPLIER,
  DELETE_CATEGORY,
  DELETE_PRODUCT,
  EXPORT_SUPPLIER,
  GET_CATEGORIES,
  GET_PRODUCT,
  GET_PRODUCT_DETAIL,
  GET_SUPPLIERS,
  GOOGLE_LOGIN,
  LOGIN,
  REGISTER,
  UPDATE_CATEGORY,
  UPDATE_PRODUCT,
  UPDATE_SUPPLIER,
};
