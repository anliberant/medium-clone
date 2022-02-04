<template>
  <div>
    <app-loading v-if="isLoading" />
    <app-error-message v-if="error" />
    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, index) in feed.articles"
        :key="index"
      >
        <div class="article-meta">
          <router-link
            :to="{
              name: 'userProfile',
              params: { slug: article.author.username },
            }"
          >
            <img :src="article.author.image" />
          </router-link>
        </div>
        <div class="info">
          <router-link
            :to="{
              name: 'userProfile',
              params: { slug: article.author.username },
            }"
            class="author"
          >
            {{ article.author.username }}
          </router-link>
          <span class="date">{{ article.createdAt }}</span>
        </div>
        <div class="pull-xs-right">
          <app-add-to-favorites
            :is-favorited="article.favorited"
            :article-slug="article.slug"
            :favorites-count="article.favoritesCount"
          />
        </div>
        <router-link
          :to="{ name: 'article', params: { slug: article.slug } }"
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          <app-tag-list :tags="article.tagList"></app-tag-list>
        </router-link>
      </div>
      <app-pagination
        :total="feed.articlesCount"
        :limit="limit"
        :current-page="currentPage"
        :url="baseUrl"
      ></app-pagination>
    </div>
  </div>
</template>

<script>
import { stringify, parseUrl } from "query-string";
import { mapState } from "vuex";
import { actionTypes } from "./../store/modules/feed";
import AppPagination from "./Pagination.vue";
import { LIMIT } from "./../helpers/constants";
import AppLoading from "./Loading.vue";
import AppErrorMessage from "./ErrorMessage.vue";
import AppTagList from "./TagList.vue";
import AppAddToFavorites from "./AddToFavorites.vue";
export default {
  name: "AppFeed",
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      limit: LIMIT,
      url: "/",
    };
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.feed.isLoading,
      feed: (state) => state.feed.data,
      error: (state) => state.feed.error,
    }),
    currentPage() {
      return Number(this.$route.query.page || "1");
    },
    baseUrl() {
      return this.$route.path;
    },
    offset() {
      return this.currentPage * LIMIT - LIMIT;
    },
  },
  watch: {
    currentPage() {
      this.fetchFeed();
    },
    apiUrl() {
      this.fetchFeed();
    },
  },
  methods: {
    fetchFeed() {
      const parsedUrl = parseUrl(this.apiUrl);
      const stringifiedParams = stringify({
        limit: LIMIT,
        offset: this.offset,
        ...parsedUrl.query,
      });
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
      this.$store.dispatch(actionTypes.getFeed, { apiUrl: apiUrlWithParams });
    },
  },

  mounted() {
    this.fetchFeed();
  },
  components: {
    AppPagination,
    AppLoading,
    AppErrorMessage,
    AppTagList,
    AppAddToFavorites,
  },
};
</script>

<style scoped>
</style>