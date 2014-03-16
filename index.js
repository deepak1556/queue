'use strict';

var Promise = require('promise');
var thenable = require('thenable');

module.exports = Queue;
function Queue() {
	if (!(this instanceof Queue)) {
		return new Queue();
	}

	var end = new Deferred();
	this.put = function (value) {
		var next = new Deferred();
		thenable.wrap(end.resolve({
			head: value,
			tail: next.promise
		}));
		end.resolve = next.resolve;
	};
	this.get = function () {
		var result = thenable.unwrap(end.promise).then(function (val) {
			end.promise = val.tail;
			return val.head;
		});
		return result;
	}
}

function Deferred() {
	var resolve, reject;
	var promise = new Promise(function (_resolve, _reject) {
		resolve = _resolve;
		reject = _reject;
	});

	return {
		promise: promise,
		resolve: resolve,
		reject: reject
	};
}