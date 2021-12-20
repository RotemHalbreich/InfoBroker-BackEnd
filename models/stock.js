class stock {
    constructor(
                symbol, 
                longName,
                regularMarketPrice,
                preMarketPrice,
                regularMarketDayHigh,
                regularMarketDayLow,
                regularMarketDayRange,
                regularMarketVolume,
                regularMarketOpen,
                fiftyDayAverage,
                marketState,
                averageAnalystRating,
                regularMarketPreviousClose,
                fiftyTwoWeekRange
                ){
                    this.symbol = symbol; 
                    this.longName = longName;
                    this.regularMarketPrice = regularMarketPrice;
                    this.preMarketPrice = preMarketPrice;
                    this.regularMarketDayHigh =regularMarketDayHigh; 
                    this.regularMarketDayLow =regularMarketDayLow; 
                    this.regularMarketDayRange = regularMarketDayRange;
                    this.regularMarketVolume =regularMarketVolume; 
                    this.regularMarketOpen =regularMarketOpen;
                    this.fiftyDayAverage = fiftyDayAverage;
                    this.marketState =marketState;
                    this.averageAnalystRating =averageAnalystRating;
                    this.regularMarketPreviousClose =regularMarketPreviousClose;
                    this.fiftyTwoWeekRange = fiftyTwoWeekRange;
    }
}

module.exports =stock