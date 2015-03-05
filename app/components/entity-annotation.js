import Ember from "ember";
import EntityProperty from "../objects/entity-property";

export default Ember.Component.extend({
	newProp: function() {
		return EntityProperty.create();
	}.property(),
	props: function() {
		return this.get("annotation.props").copy(true);
	}.property(),
	
	didInsertElement: function() {
		this.$("input.new-prop-key").focus();
	},

	actions: {
		saveAnnotation: function() {
			var e = this.get("annotation");
			e.toggleProperty("editing");
			e.set("props", this.get("props").copy(true));
			e.set("saved", true);
			e.get("p").sendAction("annotationCreated", e);
		},
		deleteAnnotation: function() {
			var e = this.get("annotation");
			e.get("p.annotations").removeObject(e);
			e.get("p").sendAction("annotationDeleted", e);
			e.destroy();
			this.set("annotation", null);
		},
		cancelAnnotation: function() {
			var e = this.get("annotation");
			if (e.get("editing") && e.get("saved")) {
				e.toggleProperty("editing");
				e.set("saved", true);
				this.set("props", e.get("props").copy(true));
			} else {
				e.get("p.annotations").removeObject(e);
				e.get("p").sendAction("annotationDeleted", e);
				e.destroy();
				this.set("annotation", null);
			}
		},
		editAnnotation: function() {
			this.toggleProperty("annotation.editing");
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