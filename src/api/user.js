import { request } from "./index";

export function userLogin(loginInfo) {
    return request({
        url: 'api/user/login',
        method: 'post',
        data: loginInfo
    })
}
export function userRegister(registerInfo) {
    return request({
        url: '/api/user/register',
        method: 'post',
        data: registerInfo
    })
}
export function getUserMsg(userLoginName) {
    return request({
        url: `/user/${userLoginName}`,
        method: 'get',
    })
}
export function editUser(user) {
    return request({
        url: '/user/edit',
        method: 'post',
        data: user
    })
}