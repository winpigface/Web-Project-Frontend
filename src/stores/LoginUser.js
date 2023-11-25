import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
export const useLoginUserStore = defineStore("loginuser", {
    state:()=>({
        userid: useStorage("userid", ""),
        email: useStorage("email",""),
        username: useStorage("username",""),
        phone: useStorage("phone",""),
        role: useStorage("role",""),
        accessToken: useStorage("accessToken", ""),

    }),
    getters:{
        getUserid:(state)=>{ return state.userid },
        getEmail:(state)=>{ return state.email },
        getUsername:(state)=>{ return state.username },
        getPhone:(state)=>{return state.phone},
        getRole: (state)=>{return state.role},
        getAccessToken:(state)=>{return state.accessToken}
    },
    actions:{
        clearStorage(){
            this.userid = ""
            this.email = ""
            this.username = ""
            this.phone = ""
            this.role = ""
            this.accessToken = ""
        }
    }
});
