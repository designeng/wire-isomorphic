function Timer() {
    this._start = null;
    this._end = null;
}

Timer.prototype.getFormattedTime = function(){
    let today = new Date();
    let DD = today.getDate();
    let MM = today.getMonth() + 1;

    let hh = today.getHours();
    let mm = today.getMinutes();
    let ss = today.getSeconds();

    let YYYY = today.getFullYear();
    if(DD < 10){
        DD= '0' + DD;
    } 
    if(MM < 10){
        MM = '0' + MM;
    } 
    return `${hh}:${mm}:${ss} ${DD}/${MM}/${YYYY}`;
}

Timer.prototype.start = function(){
    this._start = Date.now();
}

Timer.prototype.end = function(){
    this._end = Date.now();
    return this._end - this._start;
}

export default Timer;