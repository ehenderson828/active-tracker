<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- Error handling -->
    <!-- 'v-if' will be used to show the errorMsg only when an error occurs  i.e.: conditional rendering-->
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-gray shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <!-- Register  -->
    <form @submit.prevent="register"
          class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg">

      <h1 class="text-3xl text-at-light-green mb-4">Register</h1>

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

      <div class="flex flex-col mb-2">
        <label for="confirmPassword" class="mb-1 text-sm text-at-light-green">Confirm Password</label>
        <input 
        type="password" 
        required 
        class="p-2 text-gray-500 focus:outline-none" 
        id="confirmPassword"
        v-model="confirmPassword">
      </div>
      
      <button class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green">
      Register</button>

      <router-link class="text-sm mt-6 text-center" :to="{name: 'Login'}">Already have an account? <span class="text-at-light-green">Login</span></router-link>

    </form>
  </div>
</template>

<script>
import {ref} from 'vue'; // We gotta make this app reactive
import {supabase} from '../supabase/init';
import { useRouter } from 'vue-router'; // Once the user signs up, we're going to push them to the login page (hence 'useRouter')
export default {
  name: "register",
  setup() {
    // Create data / vars
    const router = useRouter();
    const email = ref(null); // The value of this variable will change once the user enters the input, hence the v-model
    const password = ref(null); // null is the initial value (gotta start somewhere)
    const confirmPassword = ref(null);
    const errorMsg = ref(null);

    // Register function
    const register = async () => {
      if (password.value === confirmPassword.value) { // If the 'password' and 'confirmPassword match'
        // If things go good
        try { // sign up the new user
          const { error } = await supabase.auth.signUp({ // Here we're destructuring the response from supabase, and only getting the error back
            email: email.value,
            password: password.value, // Using these values, their new credentials
          });
          if (error) throw error; // This detects supabase errors, if error is true
          router.push({ name: 'Login' }); // Push the user to login with new their credentials
        }
        // If things go bad
        catch(error) {
          errorMsg.value = error.message;
          setTimeout(() => {
            errorMsg.value = null; // Get rid of that error value
          }, 5000) // 5 second timeout time for error
        }
        return;
      } else {
        errorMsg.value = "Error: Passwords do not match";
        setTimeout(() => {
          errorMsg.value = null; // Get rid of that error value
        }, 5000) // 5 second timeout time for error
      }
    };
    return {email, password, confirmPassword, errorMsg, register};
  },
};
</script>
