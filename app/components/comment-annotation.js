import Ember from "ember";

export default Ember.Component.extend({
	comment: Ember.computed.oneWay("annotation.comment"),

	didInsertElement: function() {
		this.$("textarea").focus();
	},

	actions: {
		saveAnnotation: function() {
			var c = this.get("annotation");
			c.toggleProperty("isEditing");
			c.set("comment", this.get("comment"));
			c.set("isSaved", true);
		},
		deleteAnnotation: function() {
			this.sendAction("action", this.get("annotation"));
		},
		cancelAnnotation: function() {
			var c = this.get("annotation");
			if (c.get("isEditing") && c.get("isSaved")) {
				c.toggleProperty("isEditing");
				c.set("isSaved", true);
				this.set("comment", c.get("comment"));
			} else {
				this.sendAction("action", c);
			}
		},
		editAnnotation: function() {
			this.toggleProperty("annotation.isEditing");
		}
	}
});