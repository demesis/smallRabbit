import request from "@/utils/requst";

// 登录
export const userAccountLogin = ({ account,password }) => {
    return request('/login','post',{ account,password })
}