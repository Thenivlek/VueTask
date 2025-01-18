<template>
  <div class="add-task">
    <input
      v-model="taskName"
      type="text"
      placeholder="Digite uma nova tarefa"
      class="task-input"
    />
    <button @click="addTask" class="add-button">Adicionar</button>
  </div>
</template>

<script>
import { ref } from "vue";
import { collection, addDoc } from "firebase/firestore";

export default {
  setup(_, { emit }) {
    const taskName = ref("");
    const { $db } = useNuxtApp();
    const addTask = async () => {
      if (taskName.value.trim()) {
        await addDoc(collection($db, "tasks"), {
          name: taskName.value,
          createdAt: new Date(),
        });

        taskName.value = "";
        emit("task-added"); // Emite o evento para atualizar a lista de tarefas
      }
    };

    return {
      taskName,
      addTask,
    };
  },
};
</script>

<style scoped>
.add-task {
  display: flex;
  gap: 10px;
}
.task-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.add-button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.add-button:hover {
  background-color: #0056b3;
}
</style>
