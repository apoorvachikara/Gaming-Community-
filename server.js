var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var ejs = require('ejs')
var request = require('request')
var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID
var multer = require('multer')
//var router = require('router')

app.set('view engine', 'ejs')	 

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var db
	//Mongo connectivity
	MongoClient.connect('mongodb://127.0.0.1:27017/profiles', function(err, database){

			db = database

			if(err){

					return console.log(err)
				}

			console.log("successfully connected to database")
	

			app.listen(3000, function(){

			console.log('I am listening on port 3000, please send me the requests')


				})

	})

 

app.get('/', function(request, response){

		response.sendFile(__dirname + '/index.html')

})

app.get('/views', function(request, response){

	 db.collection('profiles').find().toArray(function(err, result){

			if (err) return console.log(err)

				response.render('index.ejs', {profiles: result})
		})
})


app.post('/profiles', function(request, response){

	db.collection('profiles').save(request.body, function(err, result){

		console.log(request.body)

		response.redirect("/views")

	})
})



app.put('/profiles', function(request, response){
	console.log(request.body)
		db.collection('profiles').findOneAndUpdate(
			{name: request.body.name}, 
				{$set: {
					email: request.body.email,
					age: request.body.age,
					gender: request.body.gender

				}}, function(err, result){
					if(err)
						return response.send(err)
    			//console.log(result);
    			response.redirect("/views")
			})
})

app.delete('/profiles', function(request, response){

	console.log(request.body)
	db.collection('profiles').findOneAndDelete({name: request.body.name}, function(err, result){
		console.log(result);
		response.redirect("/views")
	})
})








