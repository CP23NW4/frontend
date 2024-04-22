<script setup>
import { ref, onMounted, defineProps } from "vue";
import Swal from 'sweetalert2';
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const comments = ref([]);

// const comment = ref('');
const commentData = ref({
  comment: "",
});


let checkSignIn= ref(localStorage.getItem('token'))     
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    timeZone: "Asia/Bangkok",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};


// const props = defineProps(["comments"]);
const getComments = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_APP_TITLE}/strayAnimals/${
        route.params.id
      }/comments`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (res.status === 200) {
      const commentsData = await res.json();
      comments.value = commentsData;
    } else {
      if (res.status === 404) {
        console.error("Error: Post not found");
        router.push({
          name: "notfound",
        });
      } else if (res.status === 403) {
        alert("You do not have permission to edit other post, Check your role");
        router.push({
          name: "home",
        });
      } else if (res.status === 500) {
        console.error("Error: Internal Server Error");
        router.push({
          name: "notfound",
        });
      } else {
        console.error("Error:", res.status, res.statusText);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const createComment = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_APP_TITLE}/strayAnimals/${
        route.params.id
      }/comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(commentData.value),
      }
    );

    if (res.status === 200 || res.status === 201) {
      const commentData = await res.json();
      console.log("Comment created successfully:", commentData);
      Swal.fire({
        title: 'Success!',
        text: 'Comment created successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        window.location.reload();
      });
    } else {
      if (res.status === 404) {
        console.error("Error: Post not found");
        router.push({
          name: "notfound",
        });
      } else if (res.status === 403) {
        alert("You do not have permission to edit other post, Check your role");
        router.push({
          name: "home",
        });
      } else if (res.status === 500) {
        console.error("Error: Internal Server Error");
        router.push({
          name: "notfound",
        });
      } else {
        console.error("Error:", res.status, res.statusText);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

// const handleSubmit = async () => {
//   if (route.params.id) {
//     createComment();
//   }
// };

const mentionUser = (username) => {
  commentData.value.comment += ` @${username} `;
};


const removeComment = async (commentId) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_APP_TITLE}/strayAnimals/${route.params.id}/comment/${commentId}`,
      {
        method: "DELETE",
        headers: {
        Authorization: localStorage.getItem("token"),
    },
      }
    );

    if (res.status === 200) {
      comments.value = comments.value.filter(comment => comment._id !== commentId);
      Swal.fire({
        title: 'Success!',
        text: 'Comment deleted successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        window.location.reload();
      });
      } else if (res.status === 401) {
        Swal.fire({
        title: 'Unauthorized',
        text: 'No authentication, please sign in.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      } else if (res.status === 403) {
        Swal.fire({
        title: 'Permission Denied',
        text: 'You do not have permission to delete this comment.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
        }else {
      console.error("Error deleting post:", res.status, res.statusText);
    }
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};

onMounted(async () => {
  getComments();
});
</script>

<template>
  <!-- {{ comments }} -->
  <div class="max-w-2xl mx-auto px-4">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
        Comment ({{ comments.length }})
      </h2>
    </div>
    <form @submit.prevent="createComment" class="mb-6" v-if="checkSignIn">
      <div
        class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
      >
        <label for="comment" class="sr-only">Your comment</label>
        <textarea
          v-model.trim="commentData.comment"
          id="comment"
          rows="6"
          class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
          placeholder="Write a comment..."
          required
        ></textarea>
      </div>
      <button
        type="submit"
        class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-gray-900 bg-amber-600 text-white font-bold rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
      >
        Post comment
      </button>

    </form>
    <div v-if="comments.length > 0">
      <div v-for="comment in comments" :key="comment._id">
        <article
          class="p-6 text-base bg-white rounded-lg dark:bg-gray-900 relative mt-4"
        >
          <footer class="flex justify-between items-center mb-2">
            <div class="flex items-center">
              <p
                class="inline-flex items-center mr-2 text-sm text-gray-900 dark:text-white font-semibold"
              >
                <img
                  class="mr-2 w-8 h-8 rounded-full object-cover"
                  :src="comment.user.userPicture"
                  alt="username"
                />
                <span @click="mentionUser(comment.user.username)" class="cursor-pointer">{{ comment.user.username }}</span>
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(comment.createdOn) }}
              </p>
            </div>

              <div @click="removeComment(comment._id)"
                tabindex="0"
                role="button"
                class="btn btn-sm bg-transparent border-transparent shadow-transparent"
              >
               X
              </div>
              

          </footer>
          <p class="text-gray-500 dark:text-gray-400 text-left">
            {{ comment.comment }}
          </p>
        </article>
      </div>
    </div>
    <div v-else>
      <p>No comments yet</p>
    </div>
  </div>
</template>
  