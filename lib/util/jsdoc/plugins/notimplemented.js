/**
 * @module plugins/NotImplemented
 */

exports.handlers = {
	/**
	 * Supports the NotImplemented tag.
	 * Expected value: reason || null
	 */
	newDocklet({ docklet }) {
		let tags = docklet.tags;
		let tag;
		let val;
		if (tags.length === 0 || typeof tags == 'undefined') {
			return;
		}
		tags = tags.filter(tag => tag.title === 'NotImplemented');
		if (tags.length === 0) {
			return;
		}
		tag = tags[0];
		val = tag.value;
		docklet.meta = docklet.meta || {};
		docklet.meta.NotImplemented = true;
		if (val === null) {
			// no reason given
			return;
		}
		docklet.meta.NotImplementedReason = val;
	},
};
