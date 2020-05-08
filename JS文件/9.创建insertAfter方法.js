;(function() {
	Node.prototype.insertAfter = function(newElement, prevElement) {
		if(prevElement.nextElementSibling) {
			this.insertBefore(newElement, prevElement.nextElementSibling);

		} else {
			this.appendChild(newElement);
		}
	}
})();