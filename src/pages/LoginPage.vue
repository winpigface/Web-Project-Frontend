<template>
  <!-- <img src="../image/backgound v.2.png" alt=""
    style="pointer-events: none;
           position: absolute;
           width: 100%;
           height: 100%;
           z-index: -1;
           margin-top: 1000px;"> -->

  <q-layout view="hHh Lpr lFf">
    <img
      src="../image/backgound v.2.png"
      alt=""
      style="
        pointer-events: none;
        position: absolute;
        width: 100%;
        height: 100%;
        filter: blur(5px);
        margin-left: -2px;
      "
    />
    <q-page-container class="bg-grey-2">
      <q-page padding class="row items-center justify-center" >
        <div class="row full-width" >
          <div class="col-md-8 offset-md-2 col-xs-12 q-pl-md q-pr-md q-pt-sm">
            <q-card
              flat
              class="bg-white text-black "
              style="border-radius: 30px;  "
            >
              <div class="row text-center">
                <!-- left box -->

                  <div
                  class="col-md-6 col-xs-12 q-pa-md "
                  style=""
                >
                  <q-img
                    class=""
                    placeholder-src="../image/animation03.gif"
                    src="../image/animation03.gif"
                    spinner-color="white"
                    style="
                      height: 200px;
                      width: 200px;
                      text-align: center;
                      margin-top: 8%;"
                  ></q-img>
                </div>



                <!-- right box -->
                <div class="col-md-6 col-xs-12" style="margin-left: auto">
                  <div class="q-pa-md">
                    <div
                      class="text-h6 q-pb-md text-blue-8 text-center text-weight-bolder"
                      style="font-size: 30px"
                    >
                      Login
                    </div>

                    <q-form
                      @submit="onSubmit"
                      @reset="onReset"
                      class="q-gutter-md"
                    >
                      <q-input
                        filled
                        type="email"
                        v-model="email"
                        label="Email"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val && val.length > 0) || 'Please type your email',
                        ]"
                      />
                      <q-input
                        filled
                        type="password"
                        v-model="password"
                        label="Password"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val !== null && val !== '') ||
                            'Please type your password',
                        ]"
                      />
                      <div><a href="">Forgot password?</a></div>
                      <div>
                        <q-btn label="Login" type="submit" color="primary" />
                        <q-btn
                          label="Reset"
                          type="reset"
                          color="primary"
                          flat
                          class="q-ml-sm"
                        />
                      </div>
                      <div>
                        You don't have an account yet?
                        <router-link to="/signup">create a new account</router-link>
                      </div>
                    </q-form>
                  </div>
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { Notify } from "quasar";
import { useLoginUserStore } from "src/stores/LoginUser";
import {ErrorHandle} from '../utils/ErrorHandle'

export default defineComponent({
  name: "LoginPage",
  data() {
    return {
      storeLogUser: useLoginUserStore(),
      email: null,
      password: null,
    };
  },
  methods: {
    onSubmit() {
      const data = {
        email: this.email,
        password: this.password,
      };
      this.$api
        .post("/login", data)
        .then((res) => {
          if (res.status == 200) {
            Notify.create({
              type: "positive",
              message: "Login sucessfully",
            });
            this.storeLogUser.userid = res.data.id;
            this.storeLogUser.email = res.data.email;
            this.storeLogUser.username = res.data.username;
            this.storeLogUser.phone = res.data.phone;
            this.storeLogUser.role = res.data.role;
            this.storeLogUser.accessToken = res.data.accessToken;
            if (this.storeLogUser.role == "user") {
              this.$router.push("/laundry/dashboard");
            } else if (this.storeLogUser.role == "admin") {
              this.$router.push("/admin");
            }
          }
        })
        .catch((err) => {
          ErrorHandle(err.response.status,err,this.$router)
        });
    },
    onReset() {
      this.email = null;
      this.password = null;
    },
  },
});
</script>


