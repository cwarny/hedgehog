import Ember from "ember";

export default Ember.Route.extend({
	queryParams: {
		q: { refreshModel: true, replace: true }
	},

	model: function(params) {
		return Ember.$.getJSON("/api/docs", params);
	},

	setupController: function(controller, model) {
		controller.set("took", model.docs.took);
		controller.set("max_score", model.docs.hits.max_score);
		controller.set("total", model.docs.hits.total);
		controller.set("model", model.docs.hits.hits);
	}
});