import BasicResponse from "./BasicResponse";

export default class ErrorResponse extends BasicResponse {
    constructor(message: string){
        super({}, true, message);
    }
}