class stock {
    constructor(
                symbol, 
                lastUpdate,
                currClose,
                regularMarketDayHigh,
                regularMarketDayLow,
                regularMarketDayRange,
                regularMarketVolume,
                regularMarketOpen,
                fiftyDayAverage,
                marketState,
                averageAnalystRating,
                earningsTimestampEnd
                ){
        this.symbol = symbol;
        this.lastUpdate = lastUpdate;
        this.currClose = currClose;
        this.previousClose = previousClose;
        this.averageAnalystRating =averageAnalystRating
        this.fiftyDayAverage = fiftyDayAverage
        // this.currStart = currStart
    }
}

module.exports =stock