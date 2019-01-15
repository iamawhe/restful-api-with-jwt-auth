const express = require('express'),
	router = require('express-promise-router')();

/*  */
router.route('/').get((req, res, next) => {
	res.status(200).json({ Index: 'You requested index page' });
});

/*  */
module.exports = router;
