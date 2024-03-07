<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const selectedProvince = ref('');
const selectedDistrict = ref('');
const selectedTambon = ref('');
const selectedPostCode = ref('');
const thailand = ref([]);
const uniqueProvinces = ref([]);
const filteredDistricts = ref([]);
const filteredTambons = ref([]);

const getThailandData = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_APP_TITLE}/thailand/`, {
      method: 'GET',
    });

    if (res.ok) {
      const data = await res.json();
      console.log('Thailand data:', data);
      thailand.value = data;
      // Extract distinct province names
      // uniqueProvinces.value = [...new Set(data.map(item => item.provinceThai))];
    } else {
      if (res.status === 404) {
        console.error('Error: Thailand data not found');
        router.push({ name: 'notfound' });
      } else if (res.status === 500) {
        console.error('Error: Internal Server Error');
      } else {
        console.error('Error:', res.status, res.statusText);
      }
    }
  } catch (error) {
    console.error('Error fetching Thailand data:', error);
  }
};

onMounted(() => {
  getThailandData();
});

const distinctProvinces = computed(() => {
  const uniqueProvinces = [];
  const visitedProvinces = new Set();

  for (const province of thailand.value) {
    if (!visitedProvinces.has(province.ProvinceThai)) {
      uniqueProvinces.push(province);
      visitedProvinces.add(province.ProvinceThai);
    }
  }

  return uniqueProvinces.sort((a, b) => a.ProvinceThai.localeCompare(b.ProvinceThai));
});
</script>

<template>
  <div class="mt-20">

    <label for="province">Select Province:</label>
    <select id="province" v-model="selectedProvince" @change="filterLocations">
      <option disabled value="">Please select a province</option>
      <option v-for="province in distinctProvinces" :key="province._id" :value="province">{{ province.ProvinceThai }}</option>
    </select>

    <!-- Select District dropdown -->
    <label for="district">Select District:</label>
    <select id="district" v-model="selectedDistrict">
      <option disabled value="">Please select a district</option>
      <option v-for="district in distinctProvinces" :key="district._id" :value="district">{{ district.DistrictThaiShort }}</option>
    </select>

    <!-- Select Tambon dropdown -->
    <label for="tambon">Select Tambon:</label>
    <select id="tambon" v-model="selectedTambon">
      <option disabled value="">Please select a tambon</option>
      <option v-for="tambon in thailand" :key="tambon._id" :value="tambon">{{ tambon.TambonThaiShort }}</option>
    </select>

    <!-- Display PostCode -->
    <p>PostCode: {{ selectedPostCode }}</p>
  </div>
</template>

