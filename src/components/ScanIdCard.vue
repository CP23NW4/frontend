<template>
  <div>
    <input type="file" @change="handleImageUpload" />
    <div v-if="recognizedText">เลขบัตรประชาชน : {{ recognizedText }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Tesseract from 'tesseract.js';

const recognizedText = ref('');

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    recognizedText.value = 'Recognizing text...';
    Tesseract.recognize(file, 'eng+tha', { logger: (m) => console.log(m) }) // 'eng+tha' for English and Thai recognition
      .then(({ data: { text } }) => {
        recognizedText.value = extractThaiID(text);
      })
      .catch((error) => {
        console.error('Error recognizing text:', error);
        recognizedText.value = 'Error recognizing text.';
      });
  }
};

const extractThaiID = (text) => {
  // Remove non-digit characters and spaces
  const cleanedText = text.replace(/[^\d]/g, '');

  // Extract the first 13 digits
  return cleanedText.substr(0, 13);
};
</script>