var assert = require('better-assert');
var Promise = require('promise');
var Queue = require('../');

describe('Queue', function () {
	it('should enqueue then dequeue', function () {
		var queue = Queue();
		queue.put(5)
		return queue.get().then(function (value) {
			assert(value === 5);
		});
	});
	it('should dequeue then enqueue', function () {
		var queue = Queue();
		var promise = queue.get().then(function (value) {
			assert(value === 1);
		});
		queue.put(1);
		return promise;
	});	
});