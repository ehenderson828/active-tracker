
import { reactive } from 'vue';

const state = reactive({
    user: null,
});

const methods = {
    setUser(payload) { // 'Payload' is the object used for a user session
        state.user = payload ? payload.user : null; // Here we're checking if this payload is true
    }
}

export default {
    state,
    methods,
}