import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	this.resource("docs", { path: "/" });
	this.resource("doc", { path: "/doc/:doc__id" });
});

export default Router;
