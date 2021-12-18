const express = require('express')
const router = express.Router()

const {getAllNews, getAllStocks,getStockByInterval,getCurrStockData} = require('../controllers/shares')

// router.route('/').get(getAllNews).get(getShareDtl)

router.get('/getAllNews', getAllNews)

router.get('/getAllStocks', getAllStocks)
router.get('/getStockByInterval', getStockByInterval)
router.get('/getCurrStockData', getCurrStockData)

module.exports = router