import Ember from "ember";

export default Ember.Component.extend({
	comment: Ember.computed.oneWay("annotation.comment"),

	actions: {
		saveAnnotation: function() {
			var c = this.get("annotation");
			c.toggleProperty("editing");
			c.set("comment", this.get("comment"));
			c.set("saved", true);
			c.get("p").sendAction("annotationCreated", c);
		},
		deleteAnnotation: function() {
			var c = this.get("annotation");
			c.get("p.annotations").removeObject(c);
			c.get("p").sendAction("annotationDeleted", c);
			c.destroy();
			this.set("annotation", null);
		},
		cancelAnnotation: function() {
			var c = this.get("annotation");
			if (c.get("editing")) {
				c.toggleProperty("editing");
				c.set("saved", true);
				this.set("comment", c.get("comment"));
			} else {
				c.get("p.annotations").removeObject(c);
				c.get("p").sendAction("annotationDeleted", c);
				c.destroy();
				this.set("annotation", null);
			}
		},
		editAnnotation: function() {
			this.toggleProperty("annotation.editing");
		}
	}
});