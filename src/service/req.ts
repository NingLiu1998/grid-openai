import axios, {type AxiosResponse, AxiosError} from 'axios'
import type {AxiosInstance, InternalAxiosRequestConfig} from 'axios'
import type {BaseResponse, BaseRequestConfig} from './http'
import type {
  RequestConfig,
  RequestInterceptors,
  CreateRequestConfig,
  RESPONSE_CODE
} from './types'


type ResponseResult<T> = BaseResponse<T>

class Request {
  // axios 实例
  instance: AxiosInstance
  // 拦截器对象
  interceptorsObj?: RequestInterceptors<AxiosResponse>
  // * 存放取消请求控制器Map
  abortControllerMap: Map<string, AbortController>

  constructor(config: CreateRequestConfig) {
    this.instance = axios.create(config)
    // * 初始化存放取消请求控制器Map
    this.abortControllerMap = new Map()
    this.interceptorsObj = config.interceptors
    // 拦截器执行顺序 接口请求 -> 实例请求 -> 全局请求 -> 实例响应 -> 全局响应 -> 接口响应
    this.instance.interceptors.request.use(
      (res: InternalAxiosRequestConfig) => res,
      (err: any) => err,
    )

    // 使用实例拦截器
    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch,
    )
    this.instance.interceptors.response.use(
      this.interceptorsObj?.responseInterceptors,
      this.interceptorsObj?.responseInterceptorsCatch,
    )
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        return res.data
      },
      (err: AxiosError) => {
        // console.log('instance error', err)
        return err!.response!.data
      },
    )
  }

  request<T>(config: RequestConfig<ResponseResult<T>>): Promise<BaseResponse<T>> {
    return new Promise((resolve, reject) => {
      // 如果我们为单个请求设置拦截器，这里使用单个请求的拦截器
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config as any)
      }
      this.instance
        .request<any, ResponseResult<T>>(config)
        .then(res => {
          /// 拦截错误和正常结果
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res)
          }
          res = res as BaseResponse
          console.log('本次请求结果！=========>', res);
          if (res?.status || res?.success) {
            if (res.status == 200 || res.status == 201 || res.success) {
              resolve(res)
            } else {
              alert(res?.msg || '未知错误')
              reject(res)
            }
          }
          reject('未知错误')
        })
        .catch((err: any) => {
          console.log('http请求最底层catch返回', err);
          reject((err as Error)?.message)
        })
    })
  }
}

export default Request
export type {RequestConfig, RequestInterceptors}
