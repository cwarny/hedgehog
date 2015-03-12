import Ember from "ember";
import CommentMixin from "../mixins/comment";
import EntityMixin from "../mixins/entity";

export default Ember.Component.extend({
	classNames: "annotation col-md-12".w(),
	attributeBindings: ["style"],

	click: function(evt) {
		evt.stopPropagation();
	},

	update: function() {
		Ember.run.schedule("afterRender", this, function() {
			var ann_id = this.get("annotation.ann_id");
			if (!ann_id) return;
			var offset = Ember.$("#" + ann_id).offset().top - Ember.$(".doc-content").offset().top - 20;
			this.set("style", "top:%@px".fmt(offset));
		});
	}.on("didInsertElement").observes("annotation"),

	actions: {
		createAnnotation: function(type) {
			var annotation = this.get("annotation");
			annotation.set("type", type);
			if (type === "entity") annotation.reopen(EntityMixin);
			else if (type === "comment") annotation.reopen(CommentMixin);
		},
		deleteAnnotation: function(annotation) {
			this.sendAction("action", annotation);
		}
	}
});