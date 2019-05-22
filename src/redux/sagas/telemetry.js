import {/*call,*/ put} from "redux-saga/effects";
import {beginAJAXCall, sendTelemetryErrorSuccess, ajaxCallError} from "../actions/actionCreators";
//import {endPoints} from "../../config/api";
//import {postData} from "../../helpers/api";

export function* sendTelemetryError(action) {
    try {
        yield put(beginAJAXCall());
        /* const url = endPoints.TELEMETRY;
         yield call(postData,url, {
             service: "ReactJS App",
             message: action.payload,
             level: "critical"
         });*/
        yield put(sendTelemetryErrorSuccess());
    } catch (error) {
        yield put(ajaxCallError());
    }

}