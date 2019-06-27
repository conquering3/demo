class Test {
	constructor() {
		this.message = "hello world"
		this.hello = this.hello.bind(this)
	}

	hello(val) {
		console.log(this)
		return `${val}: his.message;`
	}
	hellos() {
		return [0, 1, 2].map(this.hello)
	}

	*[Symbol.iterator]() {
		let node = [1, 2, 3, 4]

		while (node.length) {
			yield node.pop()
		}
	}
}

const test = new Test()
console.log([...test])

test.hellos()

function* generator() {
	yield "123"
	yield "234"
	yield "345"
}
console.log([...generator()])

fetch("https://jsonplaceholder.typicode.com/todos/1", { method: "get" })
	.then(data => {
		return data.json()
	})
	.then(data => {
		console.log(data)
	})

import { hi } from "./app2"

console.log(hi);

import obj from './app3';

console.log(obj.hi);
