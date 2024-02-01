import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "../supabase/init";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Create from "../views/Create.vue";
import ViewWorkout from "../views/ViewWorkout.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { // This is so cool
      title: "Home",
      auth: false,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { // Meta tags add titles to the browser tab - along with the below function
      title: "Login",
      auth: false,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register",
      auth: false,
    },
  },
  {
    path: "/create",
    name: "Create",
    component: Create,
    meta: {
      title: "Create",
      auth: true, // This route is guarded, i.e: an unauthenticated user cannot just visit this url without logging in
    },
  },
  {
    path: "/view-workout/:workoutId", // This is a unique parameter
    name: "View-Workout",
    component: ViewWorkout,
    meta: {
      title: "View Workout",
      auth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Change document titles
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Active Tracker`;
  next(); // This method proceeds to the next route
});

// Route guard for auth routes
router.beforeEach((to, from, next) => {
  const user = supabase.auth.user(); // Verifies whether the user is logged in or not
  if (to.matched.some((res) => res.meta.auth)) {
    // If the user is logged in, proceed to the desired route
    if (user) {
      next();
      return;
    }
    // If not, push the user to the login page
    next({ name: "Login" });
    return;
  }
  next();
});

export default router;