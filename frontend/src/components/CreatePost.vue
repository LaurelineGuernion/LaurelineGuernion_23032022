<template>
  <main class="container-fluid form-custom-color-white pb-5">
    <h1 class="h3 pt-5 pb-2">
      Partager un post
    </h1>
    <form
     @submit.prevent="createPost(), reload()"
    class="container"
    enctype="multipart/form-data"
    aria-label="Formulaire créatioon post">
    
      <!-- CHAMPS CRÉATION POST -->
      <section class="d-flex align-items-center gap-3">
        <div
        v-for="info in user"
        :key="info">

          <!-- Afficher informations utilisateur -->
          <img
          v-if="user.photo !== null"
          class="rounded-circle imageprofil--size"
          :src ="user.photo"
          alt="Image profile" />

          <div
          v-else
          class="d-flex rounded-circle align-items-center round--size principal--color colorwhite p-2">
            <font-awesome-icon
            class="fa"
            icon="user"
            alt="Image Profil pictogramme"/>
          </div>
        </div>

        <!-- Champs texte envoi -->
        <textarea
        class="form-control me-auto"
        id="message-text"
        row="1"
        v-model="post.contenu"
        placeholder="Créer un post…"
        aria-label="Créer un post…">
        </textarea>
      </section>
      
      <!-- BOUTONS -->
      <section class="d-flex justify-content-center align-items-center p-3 gap-3">
        <label class="input-group-text col-sm-6 col-md-4 col-lg-4 my-3 btn-outline-dark rounded-pill labelimagepost--custom labelimagepost--sizecolor">

          <!-- Choix image envoi -->
          <font-awesome-icon
          icon="file-image"
          alt="Image" />
          
          <span class="d-none d-lg-block ms-2">
            Image
          </span>
          <input
          type="file"
          @change="uploadFile"
          class="form-control rounded-pill form-control-sm ms-3"
          name="image"
          id="image"
          ref="image"
          aria-label="Choix image post"/>
        </label>

        <span class="vr"></span>
        <!-- boutons envois -->
        <button
        v-if="post.contenu !== '' || post.image !== ''"
        type="submit"
        role="button"
        class="btn btn-dark py-3 py-lg-2 px-3 px-lg-3 d-flex align-items-center rounded-pill">
          <font-awesome-icon
          icon="paper-plane"
          alt="Envoyer" />
          <span
          class="d-none d-lg-block ms-2">
          Partager
          </span>
        </button>

        <button
        v-else
        type="submit"
        role="button"
        class="btn btn-dark py-3 py-lg-2 px-3 px-lg-3 d-flex align-items-center rounded-pill"
        disabled>
          <font-awesome-icon
          icon="paper-plane"
          alt="Envoyer" />
          <span class="d-none d-lg-block ms-2">
            Partager
          </span>
        </button>
      </section>
      
    </form>
  </main>
</template>

<script>
  import { AxiosAuth } from '../services/AxiosAuth';
  import { Notyf } from 'notyf';
  import 'notyf/notyf.min.css';

  const notyf = new Notyf();
  const formData = new FormData();
  const RegexTexarea = /^\s+|\s+$/;

  export default {
    name: 'Posts',
    data() {
      return {
        user: {
          photo:''
        },
        post: {
          image: '',
          contenu: '',
          userId: ''
        }
      }
    },

    created() {        
    let id = localStorage.getItem('userId');

    AxiosAuth.get("http://localhost:3000/api/auth/" + id, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
    .then(response => {  
        this.user.photo = response.data.photo; 
    })
    .catch ((error) => error + notyf.error('Erreur récupération profil, se reconnecter !'));
    },

    methods: {
      uploadFile(event) {
        this.post.image = event.target.files[0];
      },

      reload() {
        setTimeout("window.open(self.location, '_self');", 2000);
      },

      createPost() {
        if(RegexTexarea.test(this.post.contenu)) {
          notyf.open ({
          type: 'info',
          background: 'orange',
          message: 'Champs vide'});
        } else {
          formData.append('image', this.post.image);
          formData.append('contenu', this.post.contenu);
          formData.append('UserId', localStorage.getItem('userId'));
          AxiosAuth.post('http://localhost:3000/api/posts', formData, { headers: { 'Content-Type': 'multipart/form-data', 'Authorization':'Bearer ' + localStorage.getItem('token')}} )
          .then(() => notyf.success('Post envoyé !'))
          .catch (() => notyf.error('Erreur de la page, connectez-vous !'))
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .round {
    &--size
    {
      width: 2em;
      height: 2em;
    }
  }

  .labelimagepost {
    &--sizecolor {
      background-color:black;
      color:white;
      padding-right: .4em;

      &:hover {
      background-color:white;
      color:black;
      }
    }
  }
</style>