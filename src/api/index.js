import { locStub } from '@vue/compiler-core'
import axios from 'axios'
import { ElMessage } from 'element-plus'
// http://192.168.56.1:3000
// http://192.168.56.1:8081
export function request(option) {
    let services = axios.create({
        baseURL: 'http://192.168.56.1:8000',
        timeout: 10000 //统一超时时间
    })
    services.interceptors.request.use((config) => {
        if (config.url.indexOf('api') === -1)
            config.headers.Authorization = localStorage.getItem('token')
        return config
    })
    services.interceptors.response.use((data) => {
        let res = data
        if (data.status == 200) res = data.data
        else if (data.status == 300) ElMessage.error('请求出错了')
        console.log(res);
        return res
    })
    return services(option)
}