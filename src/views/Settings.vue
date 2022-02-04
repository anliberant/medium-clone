<template>
  <div class="settings-page" v-if="currentUser">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Settings</h1>
          <app-validation-errors
            v-if="validationErrors"
            :validation-errors="validationErrors"
          />
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Url for pic"
                  v-model="form.image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Username"
                  v-model="form.username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  placeholder="You short bio"
                  v-model="form.bio"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Email"
                  v-model="form.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="password"
                  class="form-control form-control-lg"
                  placeholder="Password"
                  v-model="form.password"
                />
              </fieldset>
            <button
            type="submit"
            class="btn btn-primary btn-lg btn-xs-right"
            :disabled="isSubmitting"
            >
            Update Settings
            </button>
            </fieldset>
            <hr />
            <button class="btn btn-outline-danger" type="text" @click="logout">Or click here to log out</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { getterTypes as authGetterTypes, actionTypes as authActionTypes} from "./../store/modules/auth";
import AppValidationErrors from "./../components/ValidationErrors.vue";
export default {
  name: "AppSettings",
  computed: {
    ...mapState({
      isSubmitting: (state) => state.settings.isSubmitting,
      validationErrors: (state) => state.settings.validationErrors,
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser,
    }),
    form() {
      return {
        username: this.currentUser.username,
        bio: this.currentUser.bio,
        image: this.currentUser.image,
        email: this.currentUser.email,
        password: "",
      };
    },
  },
  methods: {
    onSubmit() {
        this.$store.dispatch(authActionTypes.updateCurrentUser, {currentUserInput: this.form});
    },
    logout(){
        this.$store.dispatch(authActionTypes.logout).then(() => {
            this.$router.push({ name: 'globalFeed'})
        });
    }
  },
  components: {
    AppValidationErrors,
  },
};
</script>

<style scoped>
</style>