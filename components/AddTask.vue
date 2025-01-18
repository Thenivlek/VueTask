<template>
  <Transition name="fade">
    <div>
      <h1 class="title">VueTask</h1>
      <div v-if="showTaskInput" class="add-task">
        <input
          v-model="taskName"
          type="text"
          @keyup.enter="addTask"
          placeholder="Digite uma nova tarefa"
          class="task-input"
        />
        <button @click="addTask" class="add-button">Adicionar</button>
      </div>
    </div>
  </Transition>
</template>

<script>
import { ref, onMounted } from "vue";
import { collection, addDoc } from "firebase/firestore";
import { useNuxtApp } from "#app";

export default {
  setup(_, { emit }) {
    const taskName = ref("");
    const showTaskInput = ref(false);
    const { $db } = useNuxtApp();

    const addTask = async () => {
      if (taskName.value.trim()) {
        await addDoc(collection($db, "tasks"), {
          name: taskName.value,
          createdAt: new Date(),
        });

        taskName.value = "";
        emit("task-added"); // Atualizar a lista de tarefas
      }
    };

    onMounted(() => {
      showTaskInput.value = true;
    });

    return {
      taskName,
      addTask,
      showTaskInput,
    };
  },
};
</script>

<style scoped>
.add-task {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.task-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

.add-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background-color 0.3s;
}

.add-button:hover {
  background-color: #0056b3;
}
.title {
  text-align: center;
  font-size: 2rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
