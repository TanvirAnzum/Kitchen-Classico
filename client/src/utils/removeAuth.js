export const removeAuth = () => {
  if (localStorage.getItem("auth")) localStorage.removeItem("auth");
};
