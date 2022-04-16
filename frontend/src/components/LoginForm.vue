<template>
  <main class="container-sm d-flex mt-4 justify-content-center">
    <section class="row">
      <div class="col">
        <img
        alt="Groupomania logo"
        src="../assets/groupomania_logo.png">

        <article class="pt-5 pb-5">
          <h1 class="colorwhite">
            La plate-forme d'échange facile et rapide
          </h1>
        </article>

        <!-- FORMULAIRE CONNEXION -->
        <form
        @submit.prevent="login"
        class="rounded-3 p-5 mb-5 form-custom-color-white shadow-lg">
        
          <!-- Email -->
          <h2 class="lead text-secondary">CONNECTEZ-VOUS</h2>
          <div class="form-floating mt-3">
            <input
            type="email"
            v-model="connexion.email"
            class="form-control"
            id="email"
            placeholder="Email"
            required />
            <label for="email">
              Email*
            </label>
          </div>

          <!-- Mot de passe -->
          <div class="form-floating mt-3">
            <input
            type="password"
            v-model="connexion.password"
            class="form-control"
            id="password"
            placeholder="Mot de passe"
            required />
            <label for="password">
              Mot de passe*
            </label>
          </div>

          <p class="mt-2 text-secondary">
            <small>
              * Champs obligatoires
            </small>
          </p>

          <!-- Bouton connexion -->
          <button
          type="submit"
          role="button"
          class="btn btn-dark m-4 rounded-pill">
          Connexion
          </button>
        </form>

        <article class="form-custom-color-white rounded-3 mb-5 pt-3 pb-1 shadow-lg">
          <p>
            Vous n'avez pas de compte ?
            <router-link to="/signup">
              Inscrivez-vous
            </router-link>
          </p>
        </article>

      </div>
    </section>
  </main>
</template>

<script>
  import { AxiosAuth } from '../services/AxiosAuth';
  import router from '../router';
  import { Notyf } from 'notyf';
  import 'notyf/notyf.min.css';

  const notyf = new Notyf();

  export default {
    name: 'Login',
    data() {
      return {
        connexion: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      login() {
        AxiosAuth.post('http://localhost:3000/api/auth/login', this.connexion)
        .then((response) => {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('userId', response.data.userId)
          localStorage.setItem('prenom', response.data.prenom)
          localStorage.setItem('nom', response.data.nom)
          localStorage.setItem('isAdmin', response.data.isAdmin)
          notyf.success('Connexion réussie !'), router.push({ path : '/Posts'})
        })
        .catch ((error) => error + notyf.error('Erreur connexion, réessayez !'));
      }
    }
  };
</script>