const util = require('./scripts/util');

const homepageCtrl = require('./pages/homepage');
const paymentCtrl = require('./pages/payment');
const backofficeCtrl = require('./pages/backoffice');

util.onReady(() => {
	util.router('/', homepageCtrl);
	util.router('/payment', paymentCtrl);
	util.router('/backoffice', backofficeCtrl);
});