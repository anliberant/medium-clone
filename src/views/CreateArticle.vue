<template>
  <app-article-form
    :initial-values="initialValues"
    :validation-errors="validationErrors"
    :is-submitting="isSubmitting"
    @articleSubmit="onSubmit"
  ></app-article-form>
</template>

<script>
import { mapState } from "vuex";
import { actionTypes } from "./../store/modules/createArticle";
import AppArticleForm from "./../components/ArticleForm.vue";
export default {
  name: "AppCreateArticle",
  data() {
    return {
      initialValues: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
    };
  },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.createArticle.isSubmitting,
      validationErrors: (state) => state.createArticle.validationErrors,
    }),
  },
  methods: {
    onSubmit(articleInput) {
      console.log("On submit", articleInput);
      this.$store
        .dispatch(actionTypes.createArticle, { articleInput })
        .then((article) => {
          this.$router.push({
            name: "article",
            params: { slug: article.slug },
          });
        });
    },
  },
  components: {
    AppArticleForm,
  },
};
</script>

<style scoped>
</style>