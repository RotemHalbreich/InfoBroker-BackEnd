const express = require('express')
const router = express.Router()

const {getAllNews, getAllStocks,getStockByInterval,getCurrStockData, getTrendingStocks, appendRecStock, removeRecStock} = require('../controllers/shares')
const {verifyToken} = require('../middleware/authentication')
// router.route('/').get(getAllNews).get(getShareDtl)

router.get('/getAllNews', verifyToken,getAllNews)

router.get('/getAllStocks',verifyToken, getAllStocks)
router.get('/getStockByInterval',verifyToken, getStockByInterval)
router.get('/getCurrStockData',getCurrStockData)
router.get('/getTrendingStocks', verifyToken,getTrendingStocks)
router.post('/appendRecStock',appendRecStock)
router.post('/removeRecStock',removeRecStock)



//


module.exports = router