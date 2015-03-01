import Ember from "ember";

/* global _ */

export default Ember.Controller.extend({

	doc: [
		{
			text: "In software, a stack overflow occurs when too much memory is used on the call stack. The call stack contains a limited amount of memory, often determined at the start of the program.",
			annotations: []
		},
		{
			text: "The size of the call stack depends on many factors, including the programming language, machine architecture, multi-threading, and amount of available memory. When too much memory is used on the call stack the stack is said to overflow, typically resulting in a program crash.",
			annotations: []
		},
		{
			text: "This class of software bug is usually caused by one of two types of programming errors.",
			annotations: []
		}
	],
	
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
			debugger;
			this.set("annotationBeingCreated", null);
			if (this.get("annotationSelected")) this.get("annotationSelected").set("selected", false);
			annotation.set("selected", true);
			this.get("annotations").addObject(annotation);
		},
		deleteAnnotation: function(annotation) {
			this.set("annotationBeingCreated", null);
			this.get("annotations").removeObject(annotation);
		}
	}
});