var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
// keep our todo items in a list of objects
// a todo is a model (individual object)
// a set of todos is a model collection
// first two are examples
var todos = [{
	id: 1,
	description: 'Meet mom for lunch',
	completed: false
}, {
	id: 2,
	description: 'Go to market',
	completed: false
}, {
	id: 3,
	description: 'Walk the dog',
	completed: true
}];

app.get('/', function (req,res) {
	res.send ('Todo API Root');
});

// all the todas
// GET /todos
app.get ('/todos', function (req, res) {
	res.json(todos);
});

// individual todo items
// GET /todos/:id
app.get ('/todos/:id', function (req, res) {
	// need to convert the string into an int so we can so numeric comparisons
	// the second value means base 10
	var todoId = parseInt(req.params.id, 10);
	// leave the match indicator undefined at the beginning
	var matchedTodo;

	// iterate over the todos array looking for a match
	// using the foreach method that is part of the array
	todos.forEach (function (todo) {
		if (todoId === todo.id) {
			// set matchedTodo to the found item
			matchedTodo = todo;
		}
	});

	// After iterating over the array, indicate whether or not it found a match
	if (matchedTodo) {
		// if we found one, return it in its json format
		res.json (matchedTodo);
	} else {
		// if we didn't find a match, send back a page not found status
		res.status(404).send();
	}

	//res.send ('Individual ID section');
	//res.send ('Asking for todo with id of ' + req.params.id);
});

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + '!');
});