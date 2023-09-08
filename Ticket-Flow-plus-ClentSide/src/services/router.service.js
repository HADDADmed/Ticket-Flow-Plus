
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  // your router configuration here
});

export function provideRouter() {
  return router;
}