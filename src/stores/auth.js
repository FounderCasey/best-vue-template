import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: localStorage.getItem("simplestatus-user") ? JSON.parse(localStorage.getItem("simplestatus-user")) : null,
    organizations: localStorage.getItem("simplestatus-organizations") ? JSON.parse(localStorage.getItem("simplestatus-organizations")) : [],
    services: localStorage.getItem("simplestatus-services") ? JSON.parse(localStorage.getItem("simplestatus-services")) : [],
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

        this.user = response.data.user;
        localStorage.setItem("simplestatus-user", JSON.stringify(response.data.user));

        this.organizations = response.data.organizations;
        localStorage.setItem("simplestatus-organizations", JSON.stringify(response.data.organizations));

        return this.router.push("/");
      } catch (error) {
        console.log(error);
        if (error.response) return error.response;
        else return "error";
      }
    },
    async fetchServices() {
      try {
        const response = await axios.post("services/fetch-all", { organizationId: this.organizations[0]._id });
        this.services = response.data;
        localStorage.setItem("simplestatus-services", JSON.stringify(response.data));
        return;
      } catch (error) {
        console.log(error);
        if (error.response) return error.response;
        else return "error";
      }
    },
    async createService(data) {
      try {
        data.organizationId = this.organizations[0]._id;
        const response = await axios.post("services/create", data);
        this.services = response.data;
        localStorage.setItem("simplestatus-services", JSON.stringify(response.data));
        return;
      } catch (error) {
        console.log(error);
        if (error.response) return error.response;
        else return "error";
      }
    },

    async updateService(data) {
      try {
        data.organizationId = this.organizations[0]._id;
        const response = await axios.post("services/update", data);
        this.services = response.data;
        localStorage.setItem("simplestatus-services", JSON.stringify(response.data));
        return;
      } catch (error) {
        console.log(error);
        if (error.response) return error.response;
        else return "error";
      }
    },

    async deleteService(data) {
      try {
        data.organizationId = this.organizations[0]._id;
        const response = await axios.post("services/delete", data);
        this.services = response.data;
        localStorage.setItem("simplestatus-services", JSON.stringify(response.data));
        return;
      } catch (error) {
        console.log(error);
        if (error.response) return error.response;
        else return "error";
      }
    },

    signOut() {
      localStorage.removeItem("simplestatus-user");
      localStorage.removeItem("simplestatus-organizations");
      this.user = null;
      this.organizations = [];
      return this.router.push("/login");
    },
  },
});
