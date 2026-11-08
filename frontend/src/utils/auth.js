export const getUserRole = () => {
  return localStorage.getItem("user_role");
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};