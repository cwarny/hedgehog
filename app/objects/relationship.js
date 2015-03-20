import Ember from "ember";

var Relationship = Ember.Object.extend(Ember.Copyable, {
	predicate: null,
	object: null,

	copy: function() {
		var obj = this.get("object");
		return Relationship.create({
			predicate: this.get("predicate"),
			object: Ember.typeOf(obj) === "instance" ? obj.copy(true) : obj
		});
	}
});

export default Relationship;