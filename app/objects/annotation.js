import Ember from "ember";

export default Ember.Object.extend({
	isSelected: false,
	isStarted: false,
	isSaved: false,
	type: null,
	isEditing: true,
	isNotEditing: Ember.computed.not("isEditing"),
	isEntity: function() {
		return this.get("type") === "entity";
	}.property("type"),
	isComment: function() {
		return this.get("type") === "comment";
	}.property("type"),
	iconType: function() {
		if (this.get("type") === "entity") return "tag";
		else if (this.get("type") === "comment") return "comment";
	}.property()
});