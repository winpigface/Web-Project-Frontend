import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
export const useLoginUserStore = defineStore("loginuser", {
    state:()=>({
        washid: useStorage("washid", ""),


    }),
    getters:{
        getWserid:(state)=>{ return state.washid },

    },
    actions:{
        clearStorage(){
            this.washid = ""
        }
    }
});
