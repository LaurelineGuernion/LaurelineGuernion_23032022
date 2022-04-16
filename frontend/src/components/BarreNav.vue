<template>
  <header> 
    <nav
    class="navbar navbar-expand-lg navbar-dark principal--color"
    aria-labelledby="Barre de navigation">
      <div class="container-fluid">
        <router-link to="/">
          <!-- Logo Groupomania -->
          <img
          class="navbar-brand"
          src="../assets/groupomania-color.png"
          alt="logo-groupomania" />
        </router-link>

        <!-- Barre navigation mobile -->
        <button
        class="navbar-toggler"
        type="button"
        role="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="true"
        aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Barre navigation droite  -->
        <div
        class="collapse navbar-collapse justify-content-end"
        id="navbarNav">

          <ul class="navbar-nav">
            <li class="nav-item text-white mt-3 px-4">
              <p>
                <strong>
                  Bonjour {{ prenom }}
                </strong>
              </p>
              <hr class="d-lg-none" />
            </li>

            <li class="nav-item mt-3 pe-lg-4 pe-sm-0">
              <router-link
              class="linkwhite"
              to="/posts">
                <font-awesome-icon
                icon="comments"
                alt="comments"/>
                Posts
              </router-link>
            </li>

            <li class="nav-item mt-3 pe-lg-4 pe-sm-0">
              <router-link
              class="linkwhite"
              to="/members">
                <font-awesome-icon
                icon="users"
                alt="membres"/>
                Membres
              </router-link>
            </li>

            <li class="nav-item mt-3 pe-lg-4 pe-sm-0">
              <a
              class="linkwhite"
              :href="`/${userId}`">
                <font-awesome-icon
                icon="user"
                alt="user"/>
                Profil
              </a>
            </li>

            <li class="nav-item my-3">
              <router-link
              @click="deconnexion"
              class="linkwhite"
              to="/">
                <font-awesome-icon
                icon="sign-out-alt"
                alt="Déconnexion" />
                Déconnexion
              </router-link>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  </header>
</template>

<script>
  import router from '../router';

  export default {
    name: "BarreNav",
    data() {
      return { 
          prenom: '',
          userId: ''
      }
    },

    mounted() {
      if (localStorage.prenom) {
        this.prenom = localStorage.prenom;
        this.userId = localStorage.userId;
      }
    },
    
    methods: {
      deconnexion() {
        localStorage.clear()
        router.push({ path : '/'})
      }
    }
  }
</script>