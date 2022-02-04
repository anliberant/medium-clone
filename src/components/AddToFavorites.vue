<template>
  <button
    @click="handleLike"
    :class="{
      btn: true,
      'btn-sm': true,
      'btn-primary': isFavoritedChange,
      'btn-outline-primary': !isFavoritedChange,
    }"
  >
    <i class="ion-heart">
      <span>&nbsp; {{ favoritesCountChange }}</span>
    </i>
  </button>
</template>

<script>
import { actionTypes } from "./../store/modules/addToFavorites";
export default {
  name: "AppAddToFavorites",
  props: {
    isFavorited: {
      type: Boolean,
      required: true,
    },
    articleSlug: {
      type: String,
      required: true,
    },
    favoritesCount: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isFavoritedChange: this.isFavorited,
      favoritesCountChange: this.favoritesCount,
    };
  },
  methods: {
    handleLike() {
      this.$store.dispatch(actionTypes.addToFavorites, {
        slug: this.articleSlug,
        isFavorited: this.favoritesCountChange,
      });
      if (this.isFavoritedChange) {
        this.favoritesCountChange--;
      } else {
        this.favoritesCountChange++;
      }
      this.isFavoritedChange = !this.isFavoritedChange;
    },
  },
};
</script>

<style scoped>
</style>