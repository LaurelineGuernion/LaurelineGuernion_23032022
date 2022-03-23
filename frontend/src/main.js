import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import "bootstrap";
import "axios";

import "bootstrap/dist/css/bootstrap.min.css";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faSignOutAlt, faPaperPlane, faFileImage, faTrashAlt, faEdit, faComments, faComment, faCheck, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUser, faSignOutAlt, faPaperPlane, faFileImage, faTrashAlt, faEdit, faComments, faComment, faCheck, faUsers)

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .mount("#app");