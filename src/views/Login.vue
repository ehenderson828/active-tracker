<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- Error handling -->
    <!-- 'v-if' will be used to show the errorMsg only when an error occurs -->
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-gray shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <!-- Login -->
    <form 
          @submit.prevent="login" 
          class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg">

      <h1 class="text-3xl text-at-light-green mb-4">Login</h1>

      <div class="flex flex-col mb-2">
        <label for="email" class="mb-1 text-sm text-at-light-green">Email</label>
        <input 
        type="text" 
        required 
        class="p-2 text-gray-500 focus:outline-none" 
        id="email"
        v-model="email">
      </div>

      <div class="flex flex-col mb-2">
        <label for="password" class="mb-1 text-sm text-at-light-green">Password</label>
        <input 
        type="password" 
        required 
        class="p-2 text-gray-500 focus:outline-none"
        id="password"
        v-model="password">
      </div>
      
      <button 
        type="submit" 
        class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green"
      >
        Login
      </button>

      <router-link class="text-sm mt-6 text-center" :to="{name: 'Register'}">Don't have an account? <span class="text-at-light-green">Register</span></router-link>

    </form>
  </div>
</template>

<script>
import {ref} from 'vue'; // We gotta make this app reactive
import { supabase } from '../supabase/init';
import { useRouter } from 'vue-router';

export default {
  name: "login",
  setup() {
    // Create data / vars
    const router = useRouter();
    const email = ref(null); // The value of this variable will change once the user enters the input, hence the v-model
    const password = ref(null); // null is the initial value (gotta start somewhere)
    const errorMsg = ref(null);
    // Login function
    const login = async () => { // No validation needed here, unlike the register function
      try {
        const { error } = await supabase.auth.signIn({ // This is out call to supabase
          email: email.value,
          password: password.value
        });
        if (error) throw error; // if error returns true, then we move along to the catch block
        router.push({ name: 'Home' }); // If no error exists, push them to the 'Home' view
      }
      catch (error) { // We're going to output this to our error handing div it it occurs
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      }
    };

    return { email, password, errorMsg, login };
  },
};
</script>
