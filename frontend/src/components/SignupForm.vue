<template>
  <main class="container-sm d-flex mt-4 justify-content-center">
    <section class="row">
      <div class="col">

        <img
        alt="Groupomania logo"
        src="../assets/groupomania_logo.png" />

        <article class="pt-5 pb-5">
          <h1 class="colorwhite">
            La plate-forme d'échange facile et rapide
          </h1>
        </article>

        <!-- FORMULAIRE INSCRIPTION -->
        <form
        @submit.prevent="signup"
        aria-label="Formulaire inscription"
        class="rounded-3 p-5 mb-5 form-custom-color-white  shadow-lg">
          <h2 class="lead text-secondary">
            INSCRIVEZ-VOUS
          </h2>

          <!-- Nom -->
          <div class="form-floating mt-3">
            <input
            type="text"
            v-model="register.nom"
            class="form-control"
            id="nom"
            placeholder="Nom"
            aria-label="Nom"
            required />

            <label for="nom">
              Nom*
            </label>
          </div>

          <!-- Prénom -->
          <div class="form-floating mt-3">
            <input
            type="text"
            v-model="register.prenom"
            class="form-control"
            id="prenom"
            placeholder="Prénom"
            aria-label="Prénom"
            required />

            <label for="prenom">
              Prénom*
            </label>
          </div>
          
          <!-- Email -->
          <div class="form-floating mt-3">
            <input
            type="email"
            v-model="register.email"
            class="form-control"
            id="email"
            placeholder="email@example.com"
            aria-label="Email"
            required />
            <label for="Email">
              Email*
            </label>
          </div>

          <!-- Mot de passe -->
          <div class="form-floating mt-3">
            <input
            type="password"
            v-model="register.password"
            class="form-control"
            id="motdepasse"
            placeholder="Mot de passe"
            aria-label="Mot de passe"
            required />
            <label for="motdepasse">
              Mot de passe*
            </label>
          </div>

          <p class="mt-2 text-secondary">
            <small>
              * Champs obligatoires
            </small>
           </p>

          <!-- Envoi formulaire -->
          <button
          type="submit"
          role="button"
          aria-label="S'inscrire"
          class="btn btn-dark m-4 rounded-pill">
            S'inscrire
          </button>
          
          <p class="text-muted pt-2">
            En vous inscrivant, vous acceptez les conditions d'utilisation.
          </p>
        </form>

        <article class="form-custom-color-white rounded-3 mb-5 pt-3 pb-1 shadow-lg">
          <p>
            Vous avez un compte ?
            <router-link to="/login">
              Connectez-vous
            </router-link>
          </p>

        </article>
      </div>
    </section>
  </main>
</template>


<script>
  import { AxiosAuth } from '../services/AxiosAuth';
  import router from "../router";
  import { Notyf } from 'notyf';
  import 'notyf/notyf.min.css';

  const notyf = new Notyf();

  export default {
    name: 'Signup',
    data() {
      return {
        register: {
          nom: '',
          prenom: '',
          email: '',
          password: ''
        }
      }
    },
    methods: {
      signup() {
        AxiosAuth.post('http://localhost:3000/api/auth/signup', this.register)
        .then (() => notyf.success('Compte créé, connectez-vous !') + router.push({ path : '/login'}) )
        .catch (() => notyf.error('Erreur, réessayer !'))
      }
    }
  };
</script>

