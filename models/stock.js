class stock {
    constructor(symbol, lastUpdate, currClose, previousClose ){
        this.symbol = symbol;
        this.lastUpdate = lastUpdate;
        this.currClose = currClose;
        this.previousClose = previousClose;
    }
    // timeStamp_to_date(unixTimestamp){
    //     let date = new Date(unixTimestamp*1000);
    //     let converted = "" + date.getDate()+
    //     "/"+(date.getMonth()+1)+
    //     "/"+date.getFullYear()+
    //     " "+date.getHours()+
    //     ":"+date.getMinutes()+
    //     ":"+date.getSeconds()
    //     return converted;
    // }




}
// const timeStamp_to_date =   (unixTimestamp) => {
//     let date = new Date(unixTimestamp*1000);
//     let converted = "" + date.getDate()+
//     "/"+(date.getMonth()+1)+
//     "/"+date.getFullYear()+
//     " "+date.getHours()+
//     ":"+date.getMinutes()+
//     ":"+date.getSeconds()
//     return converted;
// }
module.exports =stock