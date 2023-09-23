import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: localStorage.getItem("simplestatus-user") ? JSON.parse(localStorage.getItem("simplestatus-user")) : null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    async signUp(data) {
      try {
        const response = await axios.post("auth/signup", data);
        this.user = response.data.user;
        localStorage.setItem("monitaur-user", JSON.stringify(response.data.user));

        localStorage.setItem("monitaur-workspace", JSON.stringify(response.data.workspace));
        this.workspace = response.data.workspace;

        this.teams = response.data.teams;
        localStorage.setItem("monitaur-teams", JSON.stringify(response.data.teams));

        localStorage.setItem("monitaur-alerts", JSON.stringify({ alerts: [], alertsCount: 0 }));

        await this.fetchAlertAnalytics();

        return "success";
      } catch (error) {
        console.log(error);
        if (error.response) return error.response.data;
        else return error;
      }
    },
    async signIn(data) {
      try {
        const response = await axios.post("auth/signin", data);

        // await this.fetchAlertAnalytics();

        console.log(response.data);

        this.user = response.data;
        localStorage.setItem("simplestatus-user", JSON.stringify(response.data));

        return this.router.push("/");
      } catch (error) {
        console.log(error);
        if (error.response) return error.response;
        else return "error";
      }
    },
  },
});
