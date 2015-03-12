import Ember from "ember";

/* global _ */

export default Ember.Controller.extend({
	needs: ["docs"],

	body: Ember.computed.alias("model._source.body"),
	highlight: Ember.computed.alias("model.highlight.body.firstObject"),
	doc_id: Ember.computed.alias("model._id"),

	chunks: function() {
		var body = this.get("body"),
			annotations = this.get("annotations");

		if (!annotations.length) return [ body.replace(/\n/g,"<br><br>") ];
		annotations = annotations.sortBy("start");
		var chunks = [];
		chunks.pushObject(body.slice(0, annotations[0].start).replace(/\n/g,"<br><br>"));
		for (var i=0; i<annotations.length; i++) {
			chunks.pushObject(annotations[i]);
			if (i == annotations.length-1) chunks.pushObject(body.slice(annotations[i].end).replace(/\n/g,"<br><br>"));
			else chunks.pushObject(body.slice(annotations[i].end, annotations[i+1].start).replace(/\n/g,"<br><br>"));
		}
		return chunks;
	}.property("annotations.@each"),

	annotations: function() {
		return Ember.A([]);
	}.property(),

	annotationsSaved: function() {
		return this.get("annotations").filterBy("isSaved");
	}.property("annotations.@each.isSaved"),

	annotationSelected: function() {
		return this.get("annotations").findBy("isSelected");
	}.property("annotations.@each.isSelected"),

	actions: {
		deleteAnnotation: function(annotation) {
			this.get("annotations").removeObject(annotation);
			annotation.destroy();
		}
	}
});