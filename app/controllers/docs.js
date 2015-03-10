import Ember from "ember";

/* global _ */

export default Ember.ArrayController.extend({
	needs: ["application"],
	
	q: Ember.computed.alias("controllers.application.q"),

	queryParams: [ "q" ],
	
	annotations: function() {
		return Ember.A(_.flatten(this.get("doc.annotations")));
	}.property(),

	annotationBeingCreated: null,

	annotationSelected: function() {
		return this.get("annotations").findBy("selected");
	}.property("annotations.@each.selected"),

	actions: {
		startCreatingAnnotation: function(annotation) {
			this.set("annotationBeingCreated", annotation);
		},
		addAnnotation: function(annotation) {
			this.set("annotationBeingCreated", null);
			if (this.get("annotationSelected")) this.get("annotationSelected").set("selected", false);
			this.get("annotations").addObject(annotation);
			annotation.set("selected", true);
		},
		deleteAnnotation: function(annotation) {
			this.set("annotationBeingCreated", null);
			this.get("annotations").removeObject(annotation);
		}
	}
});