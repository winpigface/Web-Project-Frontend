import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
export const useWashingMachineStore = defineStore("washing_machine", {
    state:()=>({
        washid: useStorage("washid", ""),
        name: useStorage("name",""),
    }),

    getters:{
        getWasherId:(state)=>{ return state.washid },
        getWasherName:(state)=>{ return state.name },


    },
    actions:{
        clearStorage(){
            this.washid = ""
            this.name = ""

        }
    }
});
