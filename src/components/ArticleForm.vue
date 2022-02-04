<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <app-validation-errors v-if="validationErrors" :validation-errors="validationErrors" />
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Description"
                  v-model="description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  placeholder="What is article about?"
                  v-model="body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Enter Tags"
                  v-model="tagList"
                />
              </fieldset>
              <fieldset class="form-group">
                <button
                  type="submit"
                  class="btn btn-primary btn-lrg pull-xs-right"
                  :disable="isSubmitting"
                >
                  Submit
                </button>
              </fieldset>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppValidationErrors from "./../components/ValidationErrors.vue";
export default {
  name: "AppArticleForm",
  props: {
    initialValues: {
      type: Object,
      required: true,
    },
    validationErrors: {
      type: Object,
      required: false,
    },
    isSubmitting: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      title: this.initialValues.title,
      description:this.initialValues.description,
      body: this.initialValues.body,
      tagList: this.initialValues.tagList.join(' '),
    };
  },
  methods: {
    onSubmit() {
      const articleInput = {
          "title": this.title,
          "description": this.description,
          "body": this.body,
          "tagList": this.tagList.split(' ')
      };
      this.$emit("articleSubmit", { articleInput });
    },
  },
  components: {
    AppValidationErrors,
  },
};
</script>

<style scoped></style>
