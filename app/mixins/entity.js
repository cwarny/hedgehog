import Ember from "ember";

export default Ember.Mixin.create({
	relationships: function() {
		return Ember.A([]);
	}.property(),
	objectRelationships: function() {
		return this.get("relationships").filter(function(rel) {
			return Ember.typeOf(rel.get("object")) === "instance";
		});
	}.property("relationships.@each")
});