import Ember from "ember";

export default Ember.Object.extend({
	selected: false,
	type: null,
	started: false,
	completed: false,
	isComment: Ember.computed.equal("type", "comment"),
	isEntity: Ember.computed.equal("type", "entity"),
	entityProperties: function() {
		return Ember.A([]);
	}.property()
});