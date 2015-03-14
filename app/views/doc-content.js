import Ember from "ember";
import Annotation from "../objects/annotation";

export default Ember.View.extend({
	classNames: "col-md-6 doc-content".w(),
	templateName: "doc-content",

	mouseUp: function() {
		var selection = document.getSelection();
		var highlight = selection.toString();
		if (!highlight) return;
		var offset = this.getCharacterOffsetWithin(this.$()[0]);
		var nl = this.getNumberOfPreviousNewlines(selection.anchorNode.previousElementSibling);
		var range = {};
		range.start = offset + nl;
		range.end = range.start + highlight.length;
		var annotations = this.get("controller.annotations");
		var annotationSelected = this.get("annotationSelected");
		if (annotationSelected) annotationSelected.set("isSelected", false);
		var annotation = Annotation.create({
			name: highlight,
			text: highlight,
			start: range.start,
			end: range.end,
			ann_id: "a" + annotations.length,
			doc_id: this.get("controller.doc_id"),
			isSelected: true
		});
		annotations.addObject(annotation);
	},

	getNumberOfPreviousNewlines: function(ps) {
		var nl = 0; 
		while (ps) {
			if (ps.nodeName === "BR") nl++;
			ps = ps.previousElementSibling;
		} 
		return nl/2;
	},

	getCharacterOffsetWithin: function(element) { // See http://stackoverflow.com/questions/4811822/get-a-ranges-start-and-end-offsets-relative-to-its-parent-container/4812022#4812022
		var offset = 0;
		var doc = element.ownerDocument || element.document;
		var win = doc.defaultView || doc.parentWindow;
		var sel = win.getSelection();
		if (sel.rangeCount > 0) {
			var range = win.getSelection().getRangeAt(0);
			var preCaretRange = range.cloneRange();
			preCaretRange.selectNodeContents(element);
			preCaretRange.setEnd(range.endContainer, range.startOffset);
			offset = preCaretRange.toString().length;
		}
		return offset;
	}

});