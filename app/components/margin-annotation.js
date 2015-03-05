import Ember from "ember";
import CommentMixin from "../mixins/comment";
import EntityMixin from "../mixins/entity";
import EntityProperty from "../objects/entity-property";

export default Ember.Component.extend({
	classNames: ["annotation", "col-md-12"],
	attributeBindings: ["style"],

	click: function(evt) {
		evt.stopPropagation();
	},
	
	style: function() {
		return "top:%@px".fmt(this.get("annotation.offsetTop"));
	}.property("annotation.offsetTop"),

	actions: {
		createAnnotation: function(type) {
			debugger;
			var annotation = this.get("annotation");
			annotation.set("type", type);
			if (type === "entity-annotation") annotation.reopen(EntityMixin);
			else annotation.reopen(CommentMixin);
		}
	}
});