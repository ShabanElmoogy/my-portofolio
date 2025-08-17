export const API_URL = `${import.meta.env.VITE_API_BASE_URL || ''}/api`;

export const initialProjectForm = {
  title: "",
  businessTypeId: "",
  categoryId: "",
  imgPath: "",
  featured: false
};

export const initialCategoryForm = { 
  name: "" 
};

export const initialBusinessTypeForm = {
  name: ""
};