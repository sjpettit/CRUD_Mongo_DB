
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.helloworld = function(req, res){
  res.render('helloworld', { title: 'Hello, World!' });
};

exports.userlist = function(db) {
    return function(req, res) {
        var collection = db.get('usercollection');
        collection.find({},{},function(e,docs){
            res.render('userlist', {
                "userlist" : docs
            });
        });
    };
};

exports.updateuser = function(db) {
    return function(req, res) {
        var collection = db.get('usercollection');
		var oid = req.body.uoid;
        collection.find({_id:oid},{},function(e,docs){
            res.render('updateuser', {
				"updateuser" :docs
            });
        });
    };
};

exports.changeusr = function(db) {
    return function(req, res) {

        // Get our form values. These rely on the "name" attributes
        var oid = req.body.hiddenoid;
		var userName = req.body.username;
        var userEmail = req.body.email;

        // Set our collection
        var collection = db.get('usercollection');

        // Submit to the DB
        collection.update({"_id":oid},{
            "username" : userName,
            "email" : userEmail
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("userlist");
                // And forward to success page
                res.redirect("userlist");
            }
        });

    }
};

exports.newuser = function(req, res){
  res.render('newuser', { title: 'Add New User' });
};

exports.adduser = function(db) {
    return function(req, res) {

        // Get our form values. These rely on the "name" attributes
        var userName = req.body.username;
        var userEmail = req.body.useremail;

        // Set our collection
        var collection = db.get('usercollection');

        // Submit to the DB
        collection.insert({
            "username" : userName,
            "email" : userEmail
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("userlist");
                // And forward to success page
                res.redirect("userlist");
            }
        });

    }
};

exports.deluser = function(db) {
    return function(req, res) {

        // Get our form values. These rely on the "name" attributes
        var oid = req.body.boid;

        // Set our collection
        var collection = db.get('usercollection');

        // Submit to the DB
        collection.remove({
            "_id" : oid
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("userlist");
                // And forward to success page
                res.redirect("userlist");
            }
        });

    }
};