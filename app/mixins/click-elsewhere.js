import Ember from "ember";

export default Ember.Mixin.create({
	onClickElsewhere: Ember.K,
	
	clickHandler: (function() {
		return this.get("elsewhereHandler").bind(this);
	}).property(),
  
	elsewhereHandler: function(e) {
		var $target, element, thisIsElement;
		element = this.get("element");
		$target = $(e.target);
		thisIsElement = $target.closest(element).length === 1;
		if (!thisIsElement) {
			return this.onClickElsewhere(e);
		}
	},
  
	didInsertElement: function() {
		this._super.apply(this, arguments);
		return $(window).on("mousedown", this.get("clickHandler"));
	},
	
	willDestroyElement: function() {
		$(window).off("mousedown", this.get("clickHandler"));
		return this._super.apply(this, arguments);
	}
});