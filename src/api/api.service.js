import axios from 'axios'

const ApiService = {

    _401interceptor: null,

    init(baseURL) {
        axios.defaults.baseURL = baseURL;
        this.initInterceptors();
    },

    initInterceptors() {
        axios.interceptors.request.use(function (config) {
            // Do something before request is sent
            return {
                ...config,
                params: {
                    ...config.params,
                    lang: localStorage.getItem('lang') || 'en'
                }
            };
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });
    },

    setHeader(token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    },

    removeHeader() {
        axios.defaults.headers.common = {}
    },

    get(resource, config = null) {
        return axios.get(resource, config)
    },

    post(resource, data) {
        return axios.post(resource, data)
    },

    put(resource, data) {
        return axios.put(resource, data)
    },

    patch(resource, data) {
        return axios.patch(resource, data)
    },

    delete(resource, data) {
        return axios.delete(resource, {data})
    },

    /**
     * Perform a custom Axios request.
     *
     * data is an object containing the following properties:
     *  - method
     *  - url
     *  - data ... request payload
     *  - auth (optional)
     *    - username
     *    - password
     **/
    customRequest(data) {
        return axios(data)
    },

    // mount401Interceptor() {
    //     this._401interceptor = axios.interceptors.response.use(
    //         (response) => {
    //             return response
    //         },
    //         async (error) => {
    //             if (error.request.status == 401) {
    //                 if (error.config.url.includes('/o/token/')) {
    //                     // Refresh token has failed. Logout the user
    //                     store.dispatch('auth/logout')
    //                     throw error
    //                 } else {
    //                     // Refresh the access token
    //                     try{
    //                         await store.dispatch('auth/refreshToken')
    //                         // Retry the original request
    //                         return this.customRequest({
    //                             method: error.config.method,
    //                             url: error.config.url,
    //                             data: error.config.data
    //                         })
    //                     } catch (e) {
    //                         // Refresh has failed - reject the original request
    //                         throw error
    //                     }
    //                 }
    //             }
    //
    //             // If error was not 401 just reject as is
    //             throw error
    //         }
    //     )
    // },
    //
    // unmount401Interceptor() {
    //     // Eject the interceptor
    //     axios.interceptors.response.eject(this._401interceptor)
    // }
}


export default ApiService