

const stock = require('../models/stock')
const timeStamp_to_date =require('../models/stock')
var axios = require("axios").default;

const {StatusCodes} = require('http-status-codes')



// should get from outer API
const getAllNews = (req, res)=>
{
    res.send('all news')
}


//should send all information about the specified share -> first from the api
const getStockByInterval = async (req, res)=>{

    var options = {
        method: 'GET',
        url: 'https://yfapi.net/v8/finance/spark?interval=1d&range=1d&symbols=AAPL',
        // params: {modules: 'defaultKeyStatistics,assetProfile'},
        headers: {
          'x-api-key': '63S7F9om0X8wMyvolfWinWEwSzaEcrW5iVrD4oBb'
        }
      };
      
     await axios.request(options).then(function (response) {
          res.send(response.data);
      }).catch(function (error) {
          console.error(error);
      });

}

// symbol, lastUpdate, currClose, previousClose

function getDate(unix_date){
    const date = new Date(unix_date*1000);
    return "" + date.getDate()+
    "/"+(date.getMonth()+1)+
    "/"+date.getFullYear()+
    " "+date.getHours()+
    ":"+date.getMinutes()+
    ":"+date.getSeconds();
}

function str_to_array(str){

}


//param the symbol of the stock
const getCurrStockData = async (req, res)=>{
    symbol = req.query.symbol 

    var options = {
        method: 'GET',
        url: 'https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=' + symbol,
        // params: {modules: 'defaultKeyStatistics,assetProfile'},
        headers: {
          'x-api-key': '63S7F9om0X8wMyvolfWinWEwSzaEcrW5iVrD4oBb'
        }
      };
    try{
    


        let api_response = await axios.request(options)
        let result = api_response.data["quoteResponse"]["result"][0]
        //TODO  add time + earningsTimestampEnd  
      let {
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
      averageAnalystRating,regularMarketPreviousClose,fiftyTwoWeekRange
    } = result

      let curr_stock = new stock( 
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
      averageAnalystRating,regularMarketPreviousClose,fiftyTwoWeekRange
        )  
        
       
      curr_stock = JSON.parse(JSON.stringify(curr_stock))
      let ll = []
      ll[0] = curr_stock
      res.status(StatusCodes.OK).send({"stocks" : ll});
   

    } catch(error) {
        console.log("error occurd" , error);
        res.status(StatusCodes.BAD_REQUEST).send({"status" : StatusCodes.BAD_REQUEST, "message": "symbol does not exist"});
        
    }
    
  
  


}




//should send all information about the specified share -> first from the api
const getAllStocks = async (req, res)=>{
    var options = {
        method: 'GET',
        url: 'https://yfapi.net/v11/finance/quoteSummary/AAPL',
        params: {modules: 'defaultKeyStatistics,assetProfile'},
        headers: {
          'x-api-key': '63S7F9om0X8wMyvolfWinWEwSzaEcrW5iVrD4oBb'
        }
      };
      
     await axios.request(options).then(function (response) {
          res.send(response.data);
      }).catch(function (error) {
          console.error(error);
      });

}


//add stock history method https://yfapi.net/v8/finance/spark?interval=1d&range=1mo&symbols=AAPL
//

const getTrendingStocks = async (req, res) =>
{
    symbol = req.query.symbol 

    var options = {
        method: 'GET',
        url: 'https://yfapi.net/v1/finance/trending/US',
        // params: {modules: 'defaultKeyStatistics,assetProfile'},
        headers: {
          'x-api-key': '63S7F9om0X8wMyvolfWinWEwSzaEcrW5iVrD4oBb'
        }
      };
    try{
        let api_response = await axios.request(options)

        let result = api_response.data["finance"].result
        res.send(result)
        console.log(result);
        // let stocks = result.quotes
        // res.send(stocks)
        // let results = api_response.data["finance"].result
        // let stocks = results.quotes
        // console.log(stocks);
    //     let unix_time = api_response.data[symbol].timestamp
    //     let last_update_date= getDate(unix_time[unix_time.length-1])
    //     let curr_close =  api_response.data[symbol].close[unix_time.length-1]
    //     let prev_close = api_response.data[symbol].chartPreviousClose  
    //     let curr_stock = new stock(
    //     symbol,
    //     last_update_date,
    //     curr_close,
    //     prev_close
    //   )

    //   curr_stock = JSON.parse(JSON.stringify(curr_stock))
    //   res.status(StatusCodes.OK).send(curr_stock);
   

    } catch(error) {
        console.log("error occurd" , error);
        res.status(StatusCodes.BAD_REQUEST).send({"status" : StatusCodes.BAD_REQUEST, "message": "symbol does not exist"});
        
    }



}


module.exports ={
    getAllNews,
    getAllStocks,
    getStockByInterval,
    getCurrStockData,
    getTrendingStocks
}
