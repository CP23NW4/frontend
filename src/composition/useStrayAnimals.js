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


// export const getPostById = async (postId) => {
//   try {
//     const res = await fetch(`${import.meta.env.VITE_APP_TITLE}/strayAnimals/${postId}`, {
//       method: 'GET',
//     });

//     if (res.status === 200) {
//       const data = await res.json();
//       return data;
//     } else if (res.status === 404) {
//       console.error("Error: Post not found");
//       router.push({
//         name: "notfound",
//       });
//     } else if (res.status === 500) {
//       console.error("Error: Internal Server Error");
//     } else if (res.status === 400) {
//       console.error("Not validate");
//     } else {
//       throw new Error(`Error: ${res.status} - ${res.statusText}`);
//     }
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };


// export const createPost = async (postData) => {
//   try {
//     const res = await fetch(`${import.meta.env.VITE_APP_TITLE}/strayAnimals`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(postData),
//     });

//     if (res.status === 200 || res.status === 201) {
//       const data = await res.json();
//       return data;
//     } else {
//       // Handle errors here
//       throw new Error(`Error: ${res.status} - ${res.statusText}`);
//     }
//   } catch (error) {
//     console.error(error);
//     throw new Error('Error creating post');
//   }
// };

// export const updatePost = async (postId, postData) => {
//   try {
//     const res = await fetch(
//       `${import.meta.env.VITE_APP_TITLE}/strayAnimals/${postId}`,
//       {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(postData),
//       }
//     );

//     if (res.status === 200) {
//       const data = await res.json();
//       return data;
//     } else {
//       // Handle errors here
//       throw new Error(`Error: ${res.status} - ${res.statusText}`);
//     }
//   } catch (error) {
//     console.error(error);
//     throw new Error('Error updating post');
//   }
// };

