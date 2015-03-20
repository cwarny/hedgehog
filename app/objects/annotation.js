import Ember from "ember";

var Annotation = Ember.Object.extend(Ember.Copyable, {
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
	}.property(),
	copy: function() {
		var a = Annotation.extend(this);
		return a.create();
	}
});

export default Annotation;