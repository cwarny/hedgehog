import Ember from "ember";

export default Ember.Route.extend({
	model: function(params) {
		return Ember.$.getJSON("/api/docs/" + params.doc_id);
	},

	serialize: function(model) {
		return { doc_id: model._id };
	}
});