import type { HTTPMethod } from "../types/base";
import instance from "./axios";

class HttpRequest {
    get(url: string, methou: HTTPMethod, params?: string) {
        return instance({
            url: url,
            method: methou,
        })
    }
}