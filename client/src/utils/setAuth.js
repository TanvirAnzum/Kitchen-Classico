export const setAuth = (user) => {
  const { providerData, accessToken } = user;
  const auth = {
    accessToken: accessToken,
    user: providerData[0],
  };

  localStorage.setItem("auth", JSON.stringify(auth));
};
