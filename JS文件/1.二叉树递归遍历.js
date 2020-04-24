/*首先创建一棵树*/
let creatTree = {
	value: 1,
	left: {
		value: 2,
		left: {
			value: 4,
			left: {
				value: 8
			},
			right: {
				value: 9
			}
		},
		right: {
			value: 5,
			left: {
				value: 10
			},
			right: {
				value: 11
			}
		}
	},
	right: {
		value: 3,
		left: {
			value: 6,
			left: {
				value: 12
			},
			right: {
				value: 13
			}
		},
		right: {
			value: 7,
		}
	}
};

/*中序遍历*/
function forMidTree(tree) {
	if(tree.left) {
		arguments.callee(tree.left);//在严格模式下 arguments.callee()用不了
	}
	console.log(tree.value);
	if(tree.right) {
		arguments.callee(tree.right);
	}
}
/*前序遍历*/
function forPreTree(tree) {
	if(tree.left) {
		arguments.callee(tree.left);
	}
	console.log(tree.value);
	if(tree.right) {
		arguments.callee(tree.right);
	}
}
/*后序遍历*/
function forNextTree(tree) {
	if(tree.left) {
		arguments.callee(tree.left);
	}
	console.log(tree.value);
	if(tree.right) {
		arguments.callee(tree.right);
	}
}