import { ref, computed } from 'vue';

export default function searchFilter(initialData) {
  const keyword = ref('');

  const filteredStrayAnimals = computed(() => {
    return initialData.value.filter((item) =>
      (item.name && item.name.toLowerCase().includes(keyword.value.toLowerCase())) ||
      (item.description && item.description.toLowerCase().includes(keyword.value.toLowerCase())) ||
      (item.type && item.type.toLowerCase().includes(keyword.value.toLowerCase())) ||
      (item.gender && item.gender.toLowerCase().includes(keyword.value.toLowerCase())) ||
      (item.color && item.color.toLowerCase().includes(keyword.value.toLowerCase()))
    );
  });

  const setSearchKeyword = (data) => {
    keyword.value = data;
  };

  return {
    keyword,
    filteredStrayAnimals,
    setSearchKeyword,
  };
}
