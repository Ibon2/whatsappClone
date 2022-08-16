const express = require('express');
const validateForm = require('../controlers/validateForm');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
	validateForm(req, res);
    console.log(req.session);
	const potentialLogin = await pool.query('SELECT id,username, passhash FROM users u WHERE u.username=$1 ', [
		req.body.username
	]);

	if (potentialLogin.rowCount > 0) {
		const isSamePass = await bcrypt.compare(req.body.password, potentialLogin.rows[0].passhash);
        if (isSamePass) {
            //login
            req.session.user = {
                username: req.body.username,
                id: potentialLogin.rows[0].id
            };
            res.json({ loggedIn: true, username:req.body.username });
        } else {
            //No good Login
            console.log("Not good")
            res.json({loggedIn:false,status:"Wrong username or password!"})
        }
    } else {
        console.log("Not good")
        res.json({loggedIn:false,status:"Wrong username or password!"})
	}
	
});
router.post('/register', async (req, res) => {
	validateForm(req, res);

	const existingUser = await pool.query('SELECT username FROM users WHERE username=$1', [ req.body.username ]);

	if (existingUser.rowCount === 0) {
		//register
		const hashedPass = await bcrypt.hash(req.body.password, 10);
		const newUserQuery = await pool.query(
			'INSERT INTO users(username,passHash) values($1,$2) RETURNING id,username',
			[ req.body.username, hashedPass ]
		);
		req.session.user = {
			username: req.body.username,
			id: newUserQuery.rows[0].id
		};
		res.json({ loggedIn: true, username: req.body.username });
	} else {
		res.json({ loggedIn: false, status: 'Username taken' });
	}
});

module.exports = router;
