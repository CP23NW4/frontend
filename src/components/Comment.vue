<script setup>
import { ref, onMounted, defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const comments = ref([]);
// const comment = ref('');
const commentData = ref({
  comment: "",
});

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
      alert("Create Successful!");
      window.location.reload();
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
      // Show alert if deletion is successful
      comments.value = comments.value.filter(comment => comment._id !== commentId);
      alert("Comment deleted successfully");
      } else if (res.status === 401) {
      alert("No authentication, Go to signin");
      localStorage.removeItem("token");
      router.push({
        name: "login"})
      } else if (res.status === 403) {
          alert("You do not have permission to edit other post, Check your role");
          router.push({
            name: "home",
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
    <form @submit.prevent="createComment" class="mb-6">
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
        class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-gray-900 bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
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
                <!-- <div class="w-4 rounded-full">
          <img src="/menu.png" />
        </div> -->X
              </div>
              <!-- <ul
                tabindex="0"
                class="mt-0 z-[1] p-2 shadow-lg menu menu-sm dropdown-content bg-white rounded-box w-3"
              >
                <li><a>Edit</a></li>
                <li><a>Report</a></li>
                <li><a>Delete</a></li>
              </ul>
            </div> -->
          </footer>
          <p class="text-gray-500 dark:text-gray-400 text-left">
            {{ comment.comment }}
          </p>
          <div class="flex items-center mt-4 space-x-4">
            <!-- <button type="button"
                class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                <svg class="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                </svg>
                Reply
            </button> -->
          </div>
        </article>
      </div>
    </div>
    <div v-else>
      <p>No comments yet</p>
    </div>
  </div>
</template>
  