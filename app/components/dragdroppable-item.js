import Ember from "ember";
 
export default Ember.Component.extend({
	classNames: [ "draggableItem", "draggableDropzone" ],
	classNameBindings: [ "dragClass" ],
	attributeBindings: [ "draggable" ],

	dragClass: "deactivated",
	draggable: "true",

	mouseDown: function(event) {
		event.stopPropagation();
	},
  
	dragStart: function(event) {
		return event.dataTransfer.setData("text/data", this.get("entity.ann_id"));
	},

	dragLeave: function(event) {
		event.preventDefault();
		this.set("dragClass", "deactivated");
	},
 
	dragOver: function(event) {
		event.preventDefault();
		this.set("dragClass", "activated");
	},
 
	drop: function(event) {
		var oid = event.dataTransfer.getData("text/data");
		this.sendAction("dropped", this.get("entity.ann_id"), oid);
		this.set("dragClass", "deactivated");
	}
});