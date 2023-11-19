import type {
    AxiosResponse,
    InternalAxiosRequestConfig,
    CreateAxiosDefaults,
    AxiosRequestConfig,
} from 'axios'

/**
* 新增接口响应类型
*/
export interface ResponseData<T extends any = any> {
    status?: number
    success?: boolean
    msg?: string
    msgDev?: any
    response?: T
}

export interface RequestInterceptors<T> {
    // 请求拦截
    requestInterceptors?: (
        config: InternalAxiosRequestConfig,
    ) => InternalAxiosRequestConfig
    requestInterceptorsCatch?: (err: any) => any
    // 响应拦截
    responseInterceptors?: (config: T) => T
    responseInterceptorsCatch?: (err: any) => any
}

// 自定义传入的参数
export interface CreateRequestConfig<T = AxiosResponse>
    extends CreateAxiosDefaults {
    interceptors?: RequestInterceptors<T>
}

export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
    interceptors?: RequestInterceptors<T>
}

export interface CancelRequestSource {
    [index: string]: () => void
}

export interface reqRegisterUserType {
    name?: string,
    account?: string,
    wsClientId?: string,
    email?: string,
    phone?: string,
    pwd?: string
}

export interface resMainMenuType {
    title: string,
    url?: any,
    children?: resMainMenuType[]
}


export interface menuType {
    title: string,
    icon: string,
    path: any,
}

export interface websiteType {
    title: string,
    source: string,
    url: any,
    desc?: string,
    type: string
}


export const RESPONSE_CODE = {
    200: '请求成功',
    201: '创建成功',
    401: '认证失败！请输入有效token',
    403: '禁止访问，token可能失效！',
    404: '请求路径未找到',
    409: '资源已存在',
    500: '服务不可用',
    503: '服务不可用',
}
console.log(RESPONSE_CODE[200])
