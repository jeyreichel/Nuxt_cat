<template>
  <div class="min-h-screen flex flex-col items-center bg-beige font-jost">
    <div class="bg-navy text-off-white w-full py-12 header">
      <h1 class="text-center text-4xl md:text-6xl">
        THE DEFSAFE CAT FACTS PAGE
      </h1>
    </div>
    <div class="flex flex-col md:flex-row mt-8 w-full md:w-3/4">
      <div class="flex-1 p-6 relative content">
        <div class="cat-fact-title">
          <h2 class="text-navy text-3xl md:text-5xl mb-4">CAT FACT:</h2>
        </div>
        <transition name="fade">
          <div key="fact-{{ currentFact }}" class="cat-fact-text">
            <p
              class="text-purple text-xl md:text-4xl mb-6"
              v-html="currentFact"
            ></p>
          </div>
        </transition>
        <button
          @click="fetchCatData"
          class="flex items-center justify-center bg-purple text-off-white px-6 py-3 md:px-9 md:py-5 rounded-lg shadow-lg hover:bg-navy transition-all duration-300 refresh-button"
        >
          <span class="material-icons mr-2">autorenew</span>
          GET A RANDOM CAT FACT
        </button>
      </div>
      <div
        class="flex flex-row items-start space-x-4 md:ml-auto images-container"
      >
        <transition name="fade" mode="out-in">
          <img
            v-if="images.length > 0"
            :key="images[0].url"
            :src="images[0].url"
            alt="Cat Image"
            class="rounded-lg shadow-lg large-image"
          />
        </transition>
        <div class="flex flex-col space-y-4">
          <transition name="fade" mode="out-in">
            <img
              v-if="images.length > 1"
              :key="images[1].url"
              :src="images[1].url"
              alt="Cat Image"
              class="rounded-lg shadow-lg small-image"
            />
          </transition>
          <transition name="fade" mode="out-in">
            <img
              v-if="images.length > 2"
              :key="images[2].url"
              :src="images[2].url"
              alt="Cat Image"
              class="rounded-lg shadow-lg small-image"
            />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from "@nuxtjs/composition-api";
import { useCatStore } from "~/store/catStore";

const store = useCatStore();

const fetchCatData = async () => {
  await store.fetchCatFact();
  await store.fetchCatImages();
};

onMounted(fetchCatData);

const currentFact = computed(() => store.currentFact);
const images = computed(() => store.images);
</script>

<style scoped>
.header {
  height: 25%;
}

.content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
}

.cat-fact-title,
.cat-fact-text,
.refresh-button {
  margin-left: -140px;
}

.cat-fact-title {
  margin-top: 40px;
}

.cat-fact-text {
  margin-top: 20px;
  min-height: 200px;
  max-height: 200px;
  overflow: hidden;
}

.refresh-button {
  margin-top: 20px;
  margin-bottom: -170px;
  position: relative;
}

.material-icons {
  vertical-align: middle;
}

.large-image {
  width: 100%;
  height: auto;
  margin-top: 20px;
  object-fit: cover;
}

.small-image {
  width: 100%;
  height: auto;
  margin-top: 70px;
  object-fit: cover;
}

.images-container {
  margin-right: -140px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

@media (min-width: 768px) {
  .large-image {
    width: 630px;
    height: 600px;
    margin-right: 20px;
  }

  .small-image {
    width: 330px;
    height: 240px;
  }
}
</style>
