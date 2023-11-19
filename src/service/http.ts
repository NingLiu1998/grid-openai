// http.ts
import type { AxiosResponse } from 'axios'
import Request from './req';
import type { RequestConfig, reqRegisterUserType } from './types';
import type { ResponseData } from './types'
import s from '@/utils/storage/index'

const request = new Request({
    baseURL: "https://api.weixin.xintianyuehui.cn/api",//import.meta.env.VITE_API_BASE_URL,
    timeout: 1000 * 60 * 5,
    headers: {
        'Authentication': s.getItem('token') ?? '',
        'token': s.getItem('token') ?? ''
    },
    interceptors: {
        // 请求拦截器
        requestInterceptors: config => config,
        // 响应拦截器
        responseInterceptors: (result: AxiosResponse) => {
            return result
        },
    },
})


//api接口正常返回最原始数据结构
export interface BaseResponse<T = any> extends ResponseData<T> {

}


export interface BaseRequestConfig<T = any, R = any> extends RequestConfig<BaseResponse<R>> {
    //这里就是请求data
    data?: T
}


/**
 * @description: 函数的描述
 * @interface D 请求参数的interface
 * @interface T 响应结构的intercept
 * @param {BaseRequestConfig} config 不管是GET还是POST请求都使用params
 * @returns {Promise}
 */
const http = <D = any, T = any>(config: BaseRequestConfig<D, T>) => {
    const { method = 'GET' } = config

    //😨 本开源对接接口首个bug代码段，特此留念
    // if (method === 'get' || method === 'GET'|| method === 'Get') {
    //   config.params = config.data
    // }
    return request.request<T>(config)
}


const nativeRequest = new Request({
    baseURL: import.meta.env.VITE_NATIVE_BASE_URL,
    timeout: 1000 * 60 * 5,
    headers: {
        'Authentication': s.getItem('token') ?? '',
        'token': s.getItem('token') ?? ''
    },
    interceptors: {
        // 请求拦截器
        requestInterceptors: config => config,
        // 响应拦截器
        responseInterceptors: (result: AxiosResponse) => {
            return result
        },
    },
})


/**
 * @description: 函数的描述
 * @interface D 请求参数的interface
 * @interface T 响应结构的intercept
 * @param {BaseRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const native = <D = any, T = any>(config: BaseRequestConfig<D, T>) => {
    const { method = 'GET' } = config
    if (method === 'get' || method === 'GET') {
        config.params = config.data
    }
    return nativeRequest.request<T>(config as any)
}


export { http, request, native, nativeRequest }



