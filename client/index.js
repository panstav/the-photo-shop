const onReady = require('@panstav/on-ready');

const router = require('./scripts/router');

const homepageCtrl = require('./pages/homepage');
const paymentCtrl = require('./pages/payment');
const backofficeCtrl = require('./pages/backoffice');

onReady(() => {
	router('/', homepageCtrl);
	router('/payment', paymentCtrl);
	router('/backoffice', backofficeCtrl);
});