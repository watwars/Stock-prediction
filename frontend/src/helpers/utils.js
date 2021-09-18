export const convertToString = (arr) => {
  let string = "";
  arr.forEach((num) => (string += num));
  return string;
};

export const checkResponse = (resp, user, history) => {
  if (resp) {
    if (resp.status === "Success") {
      localStorage.setItem("isLoggedIn", JSON.stringify("true"));
      localStorage.setItem("currentUser", JSON.stringify(user));
      history.push("/dashboard");
      return;
    } else {
      return resp.message;
    }
  }
  return "Request Failed";
};
