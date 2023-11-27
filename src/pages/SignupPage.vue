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
      <q-page padding class="row items-center justify-center">
        <div class="row full-width">
          <div class="col-md-8 offset-md-2 col-xs-12 q-pl-md q-pr-md q-pt-sm">
            <q-card
              flat
              class="bg-white text-black"
              style="border-radius: 30px"
            >
              <div class="row">
                <!-- left box -->
                <div
                  class="col-md-6 col-xs-12 q-pa-md"
                  style="border: 1px solid black"
                >
                  <q-img
                    class="self-center"
                    placeholder-src="../image/animation03.gif"
                    src="../image/animation03.gif"
                    spinner-color="white"
                    style="
                      height: 200px;
                      width: 200px;
                      text-align: center;
                      margin-left: 18%;
                      margin-top: 20%;
                    "
                  ></q-img>
                </div>

                <!-- right box -->
                <div class="col-md-6 col-xs-12" style="margin-left: auto">
                  <div class="q-pa-md">
                    <div
                      class="text-h6 q-pb-md text-blue-8 text-center text-weight-bolder"
                      style="font-size: 30px"
                    >
                      Signup
                    </div>

                    <q-form
                      @submit="onSubmit"
                      @reset="onReset"
                      class="q-gutter-md"
                    >
                      <q-input
                        filled
                        v-model="username"
                        type="text"
                        label="Username"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val && val.length > 0) ||
                            'Please type your username',
                        ]"
                      />
                      <q-input
                        filled
                        v-model="email"
                        type="text"
                        label="Email"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val && val.length > 0) || 'Please type your email',
                          // (val && val.length > 0) || 'Please type your email'
                        ]"
                      />
                      <q-input
                        filled
                        v-model="phone"
                        type="text"
                        label="Phone"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val && val.length > 0) || 'Please type your phone',
                        ]"
                      />
                      <q-input
                        filled
                        v-model="password"
                        type="password"
                        label="Password"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val !== null && val !== '') ||
                            'Please type your password',
                          (val && val.length >= 6) ||
                            'Must be 6 characters at least.',
                        ]"
                      />

                      <div>
                        <q-btn label="Signup" type="submit" color="primary" />
                        <q-btn
                          label="Reset"
                          type="reset"
                          color="primary"
                          flat
                          class="q-ml-sm"
                        />
                      </div>
                      <div>I already have an account <a href="">Login</a></div>
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
export default defineComponent({
  naem: "SignupPage",
  data() {
    return {
      username: null,
      email: null,
      phone: null,
      password: null,
      usernameCaption: {
        showStatus: false,
        showClass: false,
        icon: null,
        msg: null,
      },
    };
  },
  methods: {
    onSubmit() {
      const data = {
        email: this.email,
        password: this.password,
        username: this.username,
        phone: this.phone,
      };
      this.$api
        .post("/signup", data)
        .then((res) => {
          if (res.status == 200) {
            Notify.create({
              type: "positive",
              message: "Create account successfully",
            });
            console.log("create successfully");
            this.$router.push("/");
          }
        })
        .catch((err) => {
          ErrorHandle(err.response.status,err,this.$router)
        });
    },
    onReset() {
      this.username = null;
      this.email = null;
      this.phone = null;
      this.password = null;
    },
    usernameValidate() {
      if (this.username) {
        this.$api
          .get("/auth/" + this.username)
          .then((response) => {
            // console.log(JSON.stringify(response.data));
            if (response.data.valid) {
              this.usernameCaption.showStatus = true;
              this.usernameCaption.showClass = true;
              this.usernameCaption.icon = "check_circle";
              this.usernameCaption.msg = "This username is Available.";
            } else {
              this.usernameCaption.showStatus = true;
              this.usernameCaption.showClass = false;
              this.usernameCaption.icon = "highlight_off";
              this.usernameCaption.msg = "This username is NOT Available.";
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.resetUserCaption();
      }
    },
  },
});
</script>
