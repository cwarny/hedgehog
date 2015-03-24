import Ember from "ember";

export default Ember.Component.extend({
	// tagName: "span",
	classNames: ["relationship-predicate"],
	attributeBindings: ["tabindex","contenteditable"],
	tabindex: "-1",
	contenteditable: true,
	plaintext: true,
	isUserTyping: false,

	mouseDown: function(event) {
		event.stopPropagation();
	},

	processValue: function() {
		if (!this.get("isUserTyping") && this.get("value")) {
			return this.setContent();
		}
	},

	// Observers:
	valueObserver: (function() {
		Ember.run.once(this, "processValue");
	}).observes("value", "isUserTyping"),

	// Events:
	didInsertElement: function() {
		this.setContent();
		this.$().focus();
	},

	focusOut: function() {
		return this.set("isUserTyping", false);
	},

	keyDown: function(event) {
		if (!event.metaKey) {
			return this.set("isUserTyping", true);
		}
	},

	keyUp: function(event) {
		return this.set("value", this.$().text());
	},

	setContent: function() {
		this.$().html(this.get("value"));
	}
});