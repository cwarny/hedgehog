import Ember from "ember";
import ClickElsewhereMixin from "../mixins/click-elsewhere";

export default Ember.Component.extend(ClickElsewhereMixin, {
	tagName: "span",
	classNames: ["annotated"],
	classNameBindings: ["annotation.selected:selected"],

	onClickElsewhere: function() {
		var annotation = this.get("annotation");
		if (annotation.get("saved")) {
			annotation.set("editing", false);
			if (annotation.get("selected"))	annotation.set("selected", false);
		} else {
			this.sendAction("action", annotation);
		}
	},
	
	click: function(evt) {
		this.toggleProperty("annotation.selected");
	}
});