import Ember from "ember";
 
export default Ember.Component.extend({
	classNames: [ "draggableDropzone" ],
	classNameBindings: [ "dragClass" ],
	dragClass: "deactivated",
 
	dragLeave: function(event) {
		event.preventDefault();
		this.set("dragClass", "deactivated");
	},
 
	dragOver: function(event) {
		event.preventDefault();
		this.set("dragClass", "activated");
	},
 
	drop: function(event) {
		var data = event.dataTransfer.getData("text/data");
		this.sendAction("dropped", data);
		this.set("dragClass", "deactivated");    
	}
});