import BasicResponse from "./BasicResponse";

export default class OkResponse extends BasicResponse {
    constructor(data: any){
        super(data, false, '');
    }
}