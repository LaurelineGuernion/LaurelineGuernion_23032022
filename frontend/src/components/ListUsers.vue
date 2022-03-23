<template>
<main class="container px-4">
<!-- LISTE DES MEMBRES DE L'ÉQUIPE -->
    <section
    v-for="user in users"
    :key="user.id"
    class="row my-4">
      <!-- Image utilisateur-->
      <article class='card col col-lg-5 pt-3 m-auto'>
        <img
        v-if="user.photo !== null"
        class="rounded-circle imagepageprofil--size m-auto"
        :src ="user.photo"
        alt="Photo de l'utilisateur" />

        <div
        v-else
        class="d-flex imagepageprofil--size justify-content-center m-auto rounded-circle align-items-center principal--color colorwhite p-2">
          <font-awesome-icon
          class="fa-3x"
          icon="user"
          alt="Image Profil pictogramme provisoire" />
        </div>
        
        <!-- Informations -->
        <div class="card-body">
          <h5 class="card-title">{{ user.nom.charAt(0).toUpperCase() + user.nom.slice(1) +  " " + user.prenom.charAt(0).toUpperCase() + user.prenom.slice(1) }}</h5>
          <p v-if="user.bio === '' || user.bio !== null" class="card-text">{{ user.bio }}</p>
          <p v-else class="card-text">Aucune bio pour le moment</p>
          <router-link class="btn btn-dark rounded-pill" :to="`/${user.id}`">Voir le profil</router-link>
        </div>
      </article>
    </section>

  </main>
</template>

<script>
  import { AxiosAuth } from '../services/AxiosAuth'
  import { Notyf } from 'notyf';
  import 'notyf/notyf.min.css';

  const notyf = new Notyf();

  export default {
    name: "Members",
    data() {
      return {  
        users: []
      }
    },
    
    created() {
      AxiosAuth.get('http://localhost:3000/api/auth/', { headers: { 'authorization': 'Bearer ' + localStorage.getItem('token')}})
      .then((response) => { 
        this.users = response.data;
      })
      .catch (() => notyf.error('Erreur de la page, reconnectez-vous !'))
    }
  }
</script>