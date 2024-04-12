export const getCloudinaryPublicId = (url) => {
  return url.split("/").pop().split(".")[0];
};
