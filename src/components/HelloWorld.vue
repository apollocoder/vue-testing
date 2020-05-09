<template>
	<div>
		{{ msg }}
		<pre v-if="loading">LOADING</pre>
		<div>
			<pre v-for="user in users" :key="user.id">{{ user.email }}</pre>
		</div>
		<button v-on:click="loadTodos">Load Todos</button>
		<div>
			<pre v-for="todo in todos" :key="todo.id">{{ todo.title }}</pre>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import axios from 'axios'

@Component
export default class HelloWorld extends Vue {
	@Prop() private msg!: string

	private loading = false
	private users = []
	private todos = []

	async mounted() {
		this.loading = true
		const response = await axios.get(
			'https://jsonplaceholder.typicode.com/users'
		)
		this.users = response.data
		this.loading = false
	}

	async loadTodos() {
		this.loading = true
		const response = await axios.get(
			'https://jsonplaceholder.typicode.com/todos'
		)
		this.todos = response.data
		this.loading = false
	}
}
</script>

<style scoped lang="scss"></style>
