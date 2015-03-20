import Ember from "ember";
import Relationship from "../objects/relationship";

export default Ember.Component.extend({
	classNames: ["row"],
	
	newRel: function() {
		return Ember.Object.create({ predicate: null, object: null });
	}.property(),
	relationships: function() {
		var e = this.get("annotation");
		if (e) return e.get("relationships").copy(true);
		else return Ember.A([]);
	}.property("annotation.relationships"),
	
	didInsertElement: function() {
		this.$("input.rel").focus();
	},

	actions: {
		saveAnnotation: function() {
			var e = this.get("annotation");
			e.toggleProperty("isEditing");
			var entity = e.get("entity");
			e.set("relationships", this.get("relationships").copy(true));
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
				this.set("relationships", e.get("relationships").copy(true));
			} else {
				this.sendAction("action", e);
			}
		},
		editAnnotation: function() {
			this.toggleProperty("annotation.isEditing");
			this.$("input.rel").focus();
		},
		addRelationship: function() {
			var newRel = this.get("newRel");
			this.get("relationships").addObject(Relationship.create({
				predicate: newRel.get("predicate"),
				object: newRel.get("object")
			}));
			this.set("newRel", Relationship.create());
			Ember.run.schedule("afterRender", this, function() {
				this.$("input.rel").focus();
			});
		}
	}
});