import Ember from "ember";

export default Ember.Object.extend({
	selected: false,
	started: false,
	saved: false,
	type: null,
	editing: true,
	notEditing: Ember.computed.not("editing"),
	isEntity: function() {
		return this.get("type") === "entity-annotation";
	}.property("type"),
	iconType: function() {
		if (this.get("type") === "entity-annotation") return "tag";
		else return "comment";
	}.property()
});