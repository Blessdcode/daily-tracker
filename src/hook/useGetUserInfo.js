export const useGetUserInfo = () => {
  const { displayName, profilePhoto, userID, isAuth } =
    JSON.parse(localStorage.getItem("auth")) || {};

  return { displayName, profilePhoto, userID, isAuth };
};
