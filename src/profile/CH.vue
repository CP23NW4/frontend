<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const adoptionReq = ref([]);

const getRequest = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_APP_TITLE}/strayAnimals/sender/reqAdoption`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    });

    if (res.ok) {
      const reqData = await res.json();
      adoptionReq.value = reqData;
    } else {
      console.error('Error fetching adoption requests:', res.status, res.statusText);
    }
  } catch (error) {
    console.error('Error fetching adoption requests:', error);
  }
};

onMounted(async () => {
  getRequest();
});

const showDetail = (id) => {
  router.push({
    name: 'req-detail',
    params: { id: id },
  });
};
</script>

<template>
  <div>
    <div v-for="req in adoptionReq" :key="req._id" @click="showDetail(req._id)" style="cursor: pointer;">
      <div class="text-sm font-bold leading-none tracking-tight">
        {{ req.animal.saName }}
      </div>
      <div class="text-xs leading-none tracking-tight mt-1 text-gray-500">
        Owner: {{ req.owner.ownerUsername }}
      </div>
      {{ req }}
      <hr class="my-2">
    </div>
  </div>
</template>
