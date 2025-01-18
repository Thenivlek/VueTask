<template>
  <TransitionGroup name="fade" tag="ul" class="task-list">
    <li v-for="task in tasks" :key="task.id" class="task-item">
      <input
        v-model="task.name"
        @blur="editTask(task)"
        @keyup.enter="editTask(task)"
        class="task-input"
      />
      <button @click="deleteTask(task.id)" class="delete-button">
        Excluir
      </button>
    </li>
  </TransitionGroup>
</template>

<script>
import { ref, onMounted } from "vue";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useNuxtApp } from "#app";

export default {
  setup() {
    const tasks = ref([]);
    const { $db } = useNuxtApp();

    const fetchTasks = async () => {
      try {
        const querySnapshot = await getDocs(collection($db, "tasks"));

        if (querySnapshot.empty) {
          console.log("Nenhuma tarefa encontrada.");
        } else {
          tasks.value = querySnapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .sort((a, b) => a.name.localeCompare(b.name)); // Ordena as tarefas por ordem alfabética
        }
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };

    onMounted(async () => {
      await fetchTasks();
    });

    const deleteTask = async (taskId) => {
      try {
        const taskDocRef = doc($db, "tasks", taskId);
        await deleteDoc(taskDocRef);
        tasks.value = tasks.value.filter((task) => task.id !== taskId);
        console.log("Tarefa excluída com sucesso!");
      } catch (error) {
        console.error("Erro ao excluir tarefa:", error);
      }
    };

    const editTask = async (task) => {
      try {
        const taskDocRef = doc($db, "tasks", task.id);
        await updateDoc(taskDocRef, { name: task.name });
        console.log("Tarefa editada com sucesso!");
      } catch (error) {
        console.error("Erro ao editar tarefa:", error);
      }
    };

    return {
      tasks,
      fetchTasks,
      deleteTask,
      editTask,
    };
  },
};
</script>

<style scoped>
.task-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  transition: background-color 0.3s;
}

.task-item:hover {
  background-color: #f1f1f1;
}

.task-input {
  flex: 1;
  padding: 5px;
  border: none;
  background: none;
  font-size: 1.2rem;
}

.delete-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 1.2rem;
}

.delete-button:hover {
  background-color: #cc0000;
}

/* Transições */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
