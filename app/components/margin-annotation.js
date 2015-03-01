import Ember from "ember";
import EntityProperty from "../objects/entity-property";

export default Ember.Component.extend({
	classNames: ["annotation", "col-md-12"],
	attributeBindings: ["style"],

	click: function(evt) {
		evt.stopPropagation();
	},
	
	style: function() {
		return "top:%@px".fmt(this.get("annotation.offsetTop"));
	}.property("annotation.offsetTop"),

	p: function() {
		return EntityProperty.create();
	}.property(),

	actions: {
		createAnnotation: function(type) {
			this.set("annotation.type", type);
		},
		addAnnotation: function() {
			var annotation = this.get("annotation");
			annotation.set("completed", true);
			annotation.get("p").sendAction("annotationCreated", annotation);
		},
		deleteAnnotation: function() {
			var annotation = this.get("annotation");
			annotation.get("p.annotations").removeObject(annotation);
			annotation.destroy();
			this.set("annotation", null);
		},
		addProperty: function() {
			this.get("properties").addObject(this.get("p"));
			this.set("p", EntityProperty.create());
		}
	}
});