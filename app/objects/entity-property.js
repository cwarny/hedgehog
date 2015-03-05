import Ember from "ember";

var EntityProperty = Ember.Object.extend(Ember.Copyable, {
	propKey: null,
	propValue: null,

	copy: function() {
		return EntityProperty.create(this);
	}
});

export default EntityProperty;