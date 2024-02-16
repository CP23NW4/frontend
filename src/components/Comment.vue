<template>
  <div class="max-w-2xl mx-auto px-4">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Commentation (20)</h2>
    </div>
    <form class="mb-6">
        <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label for="comment" class="sr-only">Your comment</label>
            <textarea id="comment" rows="6"
                class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..." required></textarea>
        </div>
        <button type="submit"
            class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
            Post comment
        </button>
    </form>
    <article class="p-6 text-base bg-white rounded-lg dark:bg-gray-900 relative">
        <footer class="flex justify-between items-center mb-2">
            <div class="flex items-center">
                <p class="inline-flex items-center mr-2 text-sm text-gray-900 dark:text-white font-semibold"><img
                        class="mr-2 w-8 h-8 rounded-full object-cover"
                        src="/cat.jpg"
                        alt="Michael Gough">Michael Gough</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">Dec 11, 2023, 9:33 PM</p>
            </div>

    <div class="dropdown dropdown-end absolute top-0 right-2 p-4">
      <div tabindex="0" role="button" class="btn btn-sm bg-transparent border-transparent shadow-transparent">
        <div class="w-4 rounded-full">
          <img src="/menu.png" />
        </div>
      </div>
      <ul tabindex="0" class="mt-0 z-[1] p-2 shadow-lg menu menu-sm dropdown-content bg-white rounded-box w-3">
        <li><a>Edit</a></li>
        <li><a>Report</a></li>
        <li><a>Delete</a></li>
      </ul>
    </div>

        </footer>
        <p class="text-gray-500 dark:text-gray-400 text-left">สนใจค่ะ ติดต่อได้ที่ไหนคะ</p>
        <div class="flex items-center mt-4 space-x-4">
            <button type="button"
                class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                <svg class="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                </svg>
                Reply
            </button>
        </div>
    </article>
  </div>

  </template>
  