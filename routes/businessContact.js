var express = require('express');
var router = express.Router();
let BusinessContact = require('../models/businessContact');

router.get('/', (req, res, next) => {
    BusinessContact.find({}).sort({ name: 'asc' }).exec((err, businessContacts) => {
        if (err) {
            return console.error(err);
        }
        else {
            //console.log(BookList);  res.render('book/list', {title: 'Books', BookList : BookList });
            res.render('business_contact/list', { title: 'Business Contacts', businessContacts: businessContacts });
        }
    })
});

router.get('/add', (req, res, next) => {
    res.render('business_contact/add', { title: "Add Business Contact" });
});

router.post('/add', (req, res, next) => {
    let businessContact = new BusinessContact({
        name: req.body.name.trim(),
        number: req.body.number,
        email: req.body.email
    });
    BusinessContact.create(businessContact, (err, Book) => { //book model error
        if (err) {
            console.log(err);
            res.end(err);  //will stop the server
        }
        else {
            //refresh the book list
            res.redirect('/business-contact');
        }
    })
});

router.get('/edit/:id', (req, res, next) => {
    console.log(req.params.id)
    BusinessContact.findById(req.params.id, (err, businessContact) => {
        res.render('business_contact/edit', { title: "Edit Business Contact", businessContact: businessContact });
    });

}
);

router.post('/edit/:id', (req, res, next) => {
    let name = req.body.name;
    let number = req.body.number;
    let email = req.body.email;
    BusinessContact.updateOne({ _id: req.params.id }, { name, number, email }, (err, businessContact) => {
        if (err) {
            console.log(err)
        }
        console.log(res);
        res.redirect('/business-contact');
    });
});

router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;
    BusinessContact.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/business-contact');
        }
    });
});

module.exports = router;
