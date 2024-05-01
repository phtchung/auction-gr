import publicHttp from "./Http/publicHttp.config.jsx";
import privateHttp from "./Http/privateHttp.config.jsx";

export const updateUserInfo = async (data) => {
  return privateHttp({
    method: "PUT",
    url: "/user",
    data,
  });
};

const USER = {
  getUser: ({ userId = "" }) =>
    privateHttp({
      method: "GET",
      url: "/user",
      params: {
        userId,
      },
    }),
  // trẩ về quyền người dùng
  me: () =>
    privateHttp({
      method: "GET",
      url: "/user/me",
    }),

  register: async ({ email, password,username, name,phone}) => {
    let result = await publicHttp({
      method: "POST",
      url: "/auth/signup",
      data: {
        email: email,
        password: password,
        name: name,
        phone : phone,
        username
      },
    });
    return result;
  },
  login: async ({ email, password }) => {
    let result = await publicHttp({
      method: "POST",
      url: "/auth/signin",
      data: {
        email,
        password,
      },
    });
    if (result.message === "LOGIN_SUCCESS") {
      localStorage.setItem("accessToken", result.token);
    }
    return result;
  },
  logout: () => {
    return privateHttp({
      method: "POST",
      url: "/auth/logout",
    });
  },
  changePassword: (old_password, new_password) => {
    return privateHttp({
      method: "POST",
      url: "/user/change-password",
      data: {
        old_password,
        new_password,
      },
    });
  },
  setRole: (user_id, role) => {
    return privateHttp({
      method: "POST",
      url: "/user/set-role",
      data: {
        user_id,
        role,
      },
    });
  },
  refreshRequest: () => {
    return privateHttp({
      method: "GET",
      url: "/newAccessToken",
    });
  },
};

export default USER;
