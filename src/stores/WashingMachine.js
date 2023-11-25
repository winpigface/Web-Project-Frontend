import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
export const useWashingMachineStore = defineStore("washing_machine", {
    state:()=>({
        washid: useStorage("washid", ""),
        name: useStorage("name",""),
        status: useStorage("status","")


    }),
    getters:{
        getWserid:(state)=>{ return state.washid },

    },
    actions:{
        clearStorage(){
            this.washid = ""
            this.name = ""
            this.status = ""
        }
    }
});
