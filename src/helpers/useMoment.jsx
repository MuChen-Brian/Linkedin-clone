import moment from "moment/moment";
import "moment/locale/zh-cn.js"

/* 获取时间 */
export const getCurrentTimeStamp = (timeFormart) => {
    return (
        moment().locale('zh-cn').format(timeFormart)
    )
}

