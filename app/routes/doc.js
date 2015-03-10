import Ember from "ember";

export default Ember.Route.extend({
	model: function(params) {
		return Ember.$.getJSON("/api/docs/" + params.doc__id);
	},

	serialize: function(model) {
		// this will make the URL `/posts/foo-post`
		return { doc__id: model._id };
	}
});