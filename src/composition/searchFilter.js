import { ref, computed } from 'vue';

export default function searchFilter(initialData) {
  let keyword = ref('');

  const filteredStrayAnimals = computed(() => {
    return initialData.value.filter((item) =>
      (item.name && item.name.toLowerCase().includes(keyword.value.toLowerCase())) ||
      (item.description && item.description.toLowerCase().includes(keyword.value.toLowerCase())) ||
      (item.type && item.type.toLowerCase().includes(keyword.value.toLowerCase())) ||
      (item.gender && item.gender.toLowerCase().includes(keyword.value.toLowerCase())) ||
      (item.color && item.color.toLowerCase().includes(keyword.value.toLowerCase())) ||
      (item.owner?.username && item.owner.username.toLowerCase().includes(keyword.value.toLowerCase()))
    );
  });

  const setSearchKeyword = (data) => {
    if (typeof data === 'string' || data instanceof String) {
      keyword.value = data.toLowerCase();
    } else {
      console.error('Search keyword must be a string.');
    }
  };

  return {
    keyword,
    filteredStrayAnimals,
    setSearchKeyword,
  };
}
