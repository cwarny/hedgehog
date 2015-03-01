import Ember from "ember";

export default Ember.Component.extend({

	annotations: function() {
		return Ember.A(_.flatten(this.get("paragraphs").mapBy("annotations")));
	}.property(),

	actions: {
		startCreatingAnnotation: function(annotation) {
			this.sendAction("newAnnotation", annotation);
		},
		addAnnotation: function(annotation) {
			this.get("annotations").addObject(annotation);
			this.sendAction("annotationCreated", annotation);
		},
		deleteAnnotation: function(annotation) {
			this.get("annotations").addObject(annotation);
			this.sendAction("annotationDeleted", annotation);
		}
	}
});