<template>
    <div>
        <app-loading v-if="isLoading" />
        <app-error-message v-if="error" />
        <div v-if="popularTags" class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
                <router-link 
                    v-for="popularTag in popularTags" 
                    :key="popularTag" 
                    :to="{ name: 'tag', params: { slug: popularTag}}"
                    class="tag-default tag-pill"
                >
                        {{popularTag}}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { actionTypes } from "./../store/modules/popularTags";
import AppLoading from './Loading.vue';
import AppErrorMessage from './ErrorMessage.vue';
export default {
  name: "AppPopularTags",
  computed: {
    ...mapState({
      isLoading: (state) => state.popularTags.isLoading,
      error: (state) => state.popularTags.error,
      popularTags: (state) => state.popularTags.data,
    }),
  },
  mounted() {
    this.$store.dispatch(actionTypes.getPopularTags);
  },
  components: {
    AppLoading,
    AppErrorMessage
  }
};
</script>

<style scoped>
</style>