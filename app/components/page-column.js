import Ember from "ember";

export default Ember.Component.extend({
	classNameBindings: ["colClass"],

	colSize: 3,
	colClass: function() {
		return "col-md-%@".fmt(this.get("colSize"));
	}.property("colSize"),

	mouseEnter: function() {
		this.set("colSize", 6);
	},
	mouseLeave: function() {
		this.set("colSize", 3);
	}
});