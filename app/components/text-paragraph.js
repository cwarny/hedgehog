import Ember from "ember";
import Annotation from "../objects/annotation";

export default Ember.Component.extend({
	tagName: "p",

	chunks: function() {
		var text = this.get("text"),
			annotations = this.get("annotations").sortBy("start");
		if (!annotations.length) return [text];
		var chunks = [];
		chunks.pushObject(text.slice(0, annotations[0].start));
		for (var i=0; i<annotations.length; i++) {
			chunks.pushObject(annotations[i]);
			if (i == annotations.length-1) chunks.pushObject(text.slice(annotations[i].end));
			else chunks.pushObject(text.slice(annotations[i].end, annotations[i+1].start));
		}
		return chunks;
	}.property("annotations.@each"),

	mouseUp: function(evt) {
		var selection = document.getSelection();
		var highlight = selection.toString();
		if (!highlight) return;
		var range = [ selection.anchorOffset, selection.focusOffset ].sort(function(a,b) { return a-b; });
		range = { start: range[0], end: range[1] };
		var offset = this.computeOffset(evt.target.previousElementSibling);
		range.start += offset;
		range.end += offset;
		var offsetTop = evt.pageY - this.get("element.parentElement.parentElement.offsetTop") - 20;
		var annotation = Annotation.create({
			text: this.get("text").slice(range.start, range.end),
			offsetTop: offsetTop,
			start: range.start,
			end: range.end,
			p: this
		});
		this.get("annotations").addObject(annotation);
		this.sendAction("newAnnotation", annotation);
	},

	computeOffset: function(previousElementSibling) {
		var offset = 0;
		while (previousElementSibling) {
			offset += previousElementSibling.textContent.length;
			previousElementSibling = previousElementSibling.previousElementSibling;
		}
		return offset;
	},

	actions: {
		deleteAnnotation: function(annotation) {
			this.get("annotations").removeObject(annotation);
			annotation.destroy();
			this.sendAction("annotationDeleted", annotation);
		}
	}

});