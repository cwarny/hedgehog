import Ember from "ember";
 
export default Ember.Component.extend({
	classNames: [ "draggableItem" ],
	attributeBindings: [ "draggable" ],
	draggable: "true",

	mouseDown: function(event) {
		event.stopPropagation();
	},
  
	dragStart: function(event) {
		return event.dataTransfer.setData("text/data", this.get("content.name"));
	}
});