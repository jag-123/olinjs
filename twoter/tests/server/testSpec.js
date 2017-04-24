//server-side tests
var chai = require('chai')
var expect = chai.expect;
var sinon = require('sinon')
var app = require('./../../app.js');

var index = require('../../routes/twote');

describe("index", function() {

	// login page should render on GET request
	it('should return a rendered response when called', function() {
		var req, res, spy;

		req = res = {};
		spy = res.render = sinon.spy();

		index.login(req, res);
		expect(spy.calledOnce).to.equal(true);
	});

	// No one logged in
	it('should not return a rendered response when no user signed in', function() {
		var req, res, spy;

		req = {session: {}};
		res = {};
		spy = res.render = sinon.spy();

		index.twoteshome(req, res);
		expect(spy.renderParams).to.equal(undefined);
	}) ;

	// Someone logged in
	it('should return an object when user signed in', function() {
		var req, res, spy;

		req = {session: {
			passport: {
				user: {
					username: 'Jeremy Garcia'
				}
			}
		}};

		res = {};
		spy = res.render = sinon.spy();

		index.twoteshome(req, res);
		expect(spy.renderParams).to.be.Object;
	});

	it('should return 200 on login', function(done) {
		request(app)
			.get('/login')
			.expect(200, done);
	});

	it('should return 404 on invalid routes', function(done) {
		request(app)
			.get('/invalid')
			.expect(404, done);
	});
});