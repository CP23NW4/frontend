import { ref, onMounted, computed } from 'vue';

export default function getStrayAnimals(type) {
  const allStrayAnimals = ref([]);
  const strayAnimals = computed(() => {
    if (!type) {
      return allStrayAnimals.value;
    }
    return allStrayAnimals.value.filter(animal => animal.type === type);
  });

  const getPost = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_TITLE}/strayAnimals/all`, {
        method: 'GET',
      });

      if (res.status === 200) {
        const data = await res.json();
        console.log('success', data);
        allStrayAnimals.value = data;
      } else {
        if (res.status === 404) {
          console.error('Error: Post not found');
          router.push({
            name: "notfound",
          });
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


export const getSigninStrayAnimals = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_APP_TITLE}/strayAnimals`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    });

    if (res.ok) {
      console.log('Successful');
      return await res.json();
    } else {
      if (res.status === 403) {
        console.log('Go to login');
        localStorage.removeItem('token');
        router.push({ name: 'login' });
      } else if (res.status === 404) {
        console.log(res.status);
        router.push({ name: 'notfound' });
      } else {
        console.log('Error, something went wrong');
        console.error('Error:', res.status, res.statusText);
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};
