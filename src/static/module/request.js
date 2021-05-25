export class Request {
    constructor() {
    }
    request(res) {
        let sendObj = {
            url: this.baseUrl + res.path,
            method: res.method,
            data: res.data,
        }
        if (res.method == "POST" || res.method == "post") {
            sendObj.header = {
                "content-type": "application/x-www-form-urlencoded"
            }
        }
        // return new Promise((resolve, reject) => {
        uni.request({
            ...sendObj,
            success: (result) => {
                res.callback(result.data)
                // resolve(result.data)
            },
            fail: (err) => {
                res.callback(err)
                // reject(err)
            }
        })
        // })
    }
}