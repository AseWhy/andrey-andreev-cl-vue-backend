export default class BasicResponse {
    private data: any;
    private error: boolean;
    private message: string;

    constructor(data: any, error: boolean, message: string = ''){
        this.data = data;
        this.error = error;
        this.message = message;
    }
}