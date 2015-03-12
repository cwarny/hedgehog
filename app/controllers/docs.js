import Ember from "ember";

export default Ember.ArrayController.extend({
	needs: ["application"],
	itemController: ["doc"],
	
	q: Ember.computed.alias("controllers.application.q"),

	queryParams: [ "q" ],
	
	annotations: function() {
		return this.mapBy("annotations").reduce(function(previousValue, value) {
			return previousValue.concat(value);
		}, []);
	}.property("@each.annotations")
});