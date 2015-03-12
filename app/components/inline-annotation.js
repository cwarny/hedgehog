import Ember from "ember";
import ClickElsewhereMixin from "../mixins/click-elsewhere";

export default Ember.Component.extend(ClickElsewhereMixin, {
	tagName: "span",
	classNames: ["annotated"],
	classNameBindings: ["annotation.isSelected:selected"],

	onClickElsewhere: function() {
		var annotation = this.get("annotation");
		if (annotation.get("isSaved")) {
			annotation.set("isEditing", false);
			if (annotation.get("isSelected")) annotation.set("isSelected", false);
		} else {
			this.sendAction("action", annotation);
		}
	},

	click: function(evt) {
		this.toggleProperty("annotation.isSelected");
	}
});