import axios from "axios"


// サーバーに配置しているWebAPIのメソッドを呼び出すためのクラス
export class WebApiCall {
    private readonly requestUrl: string
    private payload: FormData | Record<string, unknown>
    private httpHeaders: Record<string, string>
    public responseData: Record<string, unknown>
    public blob: Blob | undefined

    constructor(requestUrl: string) {
        this.requestUrl = requestUrl
        this.payload = {}
        this.httpHeaders = {}
        this.responseData = {}
        this.blob = undefined
    }

    // FormDataを新たに作成
    public setFormData(arrayNameValue: NameValuePair[]): void {
        this.httpHeaders = { "Content-Type": "multipart/form-data" }
        this.payload = new FormData()

        arrayNameValue.forEach(item => {
            (this.payload as FormData).append(item.name, item.value)
        })
    }

    // getメソッドでapiを呼ぶ
    public async callApiGet(): Promise<void> {
        const response = await axios.get(this.requestUrl)
        this.responseData = response.data as Record<string, unknown>
    }

    // postメソッドでapiを呼ぶ
    public async callApiPost(): Promise<void> {
        const response = await axios.post(
            this.requestUrl,
            this.payload,
            { headers: this.httpHeaders }
        )
        this.responseData = response.data as Record<string, unknown>
    }

    // deleteメソッドでapiを呼ぶ
    public async callApiDelete(): Promise<void> {
        const isEmpty = Object.keys(this.payload).length === 0
        const response = isEmpty
            ? await axios.delete(this.requestUrl)
            : await axios.delete(this.requestUrl, { data: this.payload })

        this.responseData = response.data as Record<string, unknown>
    }

    // apiを呼んで、csvファイルをダウンロード
    public async downloadCsv(): Promise<void> {
        const response = await axios.get(this.requestUrl, { responseType: "blob" })
        const mimeType = response.headers["Content-Type"] as string

        this.blob = new Blob([response.data], { type: mimeType })
    }
}

// FormDataに追加するデータの型
interface NameValuePair {
    name: string
    value: string
}
