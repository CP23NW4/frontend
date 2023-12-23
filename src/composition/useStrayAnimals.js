import { ref, onMounted, computed } from 'vue';

export default function useStrayAnimals(type) {
  const allStrayAnimals = ref([]);
  const strayAnimals = computed(() => {
    if (!type) {
      return allStrayAnimals.value;
    }
    return allStrayAnimals.value.filter(animal => animal.type === type);
  });

  const getPost = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_TITLE}/strayAnimals`, {
        method: 'GET',
      });

      if (res.status === 200) {
        const data = await res.json();
        console.log('success', data);
        allStrayAnimals.value = data;
      } else {
        if (res.status === 404) {
          console.error('Error: Post not found');
        } else if (res.status === 500) {
          console.error('Error: Internal Server Error');
        } else {
          console.error('Error:', res.status, res.statusText);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  onMounted(() => {
    getPost();
  });

  return { strayAnimals };
}
