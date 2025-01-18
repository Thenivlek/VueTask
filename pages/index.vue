<template>
  <div class="container">
    <AddTaskVue @task-added="loadTasks" />
    <TaskList ref="taskList" />
  </div>
</template>

<script>
import AddTaskVue from "~/components/AddTask.vue";
import TaskList from "~/components/TaskList.vue";

export default {
  components: { AddTaskVue, TaskList },
  methods: {
    loadTasks() {
      this.$refs.taskList.fetchTasks(); // Atualiza a lista de tarefas
    },
  },
};
</script>

<style>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
</style>
