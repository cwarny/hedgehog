import Ember from "ember";
import EntityProperty from "../objects/entity-property";

export default Ember.Component.extend({
	classNames: ["row"],
	
	newProp: function() {
		return EntityProperty.create();
	}.property(),
	props: function() {
		if (this.get("annotation.props")) return this.get("annotation.props").copy(true);
	}.property("annotation"),
	
	didInsertElement: function() {
		this.$("input.new-prop-key").focus();
	},

	actions: {
		saveAnnotation: function() {
			var e = this.get("annotation");
			e.toggleProperty("isEditing");
			e.set("props", this.get("props").copy(true));
			e.set("isSaved", true);
		},
		deleteAnnotation: function() {
			this.sendAction("action", this.get("annotation"));
		},
		cancelAnnotation: function() {
			var e = this.get("annotation");
			if (e.get("isEditing") && e.get("isSaved")) {
				e.toggleProperty("isEditing");
				e.set("isSaved", true);
				this.set("props", e.get("props").copy(true));
			} else {
				this.sendAction("action", e);
			}
		},
		editAnnotation: function() {
			this.toggleProperty("annotation.isEditing");
			this.$("input.new-prop-key").focus();
		},
		addProperty: function() {
			this.get("props").addObject(this.get("newProp"));
			this.set("newProp", EntityProperty.create());
			Ember.run.schedule("afterRender", this, function() {
				this.$("input.new-prop-key").focus();
			});
		}
	}
});