const express = require('express')
const router = express.Router()

const {getAllNews, getAllStocks,getStockByInterval,getCurrStockData, getTrendingStocks} = require('../controllers/shares')

// router.route('/').get(getAllNews).get(getShareDtl)

router.get('/getAllNews', getAllNews)

router.get('/getAllStocks', getAllStocks)
router.get('/getStockByInterval', getStockByInterval)
router.get('/getCurrStockData', getCurrStockData)
router.get('/getTrendingStocks', getTrendingStocks)



module.exports = router