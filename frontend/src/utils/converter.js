export const convertToTime = (hour, minute) => {
    let strTime = ''
    if (+hour < 10) {
        strTime += '0'
    }
    strTime += hour + ':'

    if (+minute < 10) {
        strTime += '0'
    }
    strTime += minute

    return strTime
}