<template>
  <main  class="container-fluid form-custom-color-white pt-5">     
    <section class="mx-lg-5 pb-4" >
      <div v-if="posts.length === 0" class="alert alert-info" role="alert">
       Soyez la première personne à écrire un post !
      </div>

      <!-- LE FIL D'ACTUALITÉS DES POSTS -->
      <article
      v-else
      v-for="(post, index) in posts"
      :key="post.id"
      class="card mx-auto col-md-7 col-lg-6 border-0 p-0 mb-4 shadow-lg">
        <div class="card-body">
          <div class="d-flex justify-content-between"> 

            <router-link class="text-dark" :to="`/${post.User.id}`">
              <!-- Informations utilisateur -->
              <div class="d-flex align-items-center" >
                <img
                v-if="post.User.photo !== null"
                class="rounded-circle imageprofil--size"
                :src ="post.User.photo"
                alt="Photo de l'utilisateur" />

                <div
                v-else
                class="d-flex imageprofil--size justify-content-center rounded-circle align-items-center round--size principal--color colorwhite p-2">
                  <font-awesome-icon
                  class="fa"
                  icon="user"
                  alt="Image Profil pictogramme provisoire" />
                </div>

                <div class="text-start ps-2" aria-label="nom prénom de l'utilisateur">
                  <p class="card-text my-0">
                    {{ post.User.nom.charAt(0).toUpperCase() + post.User.nom.slice(1) +  " " + post.User.prenom.charAt(0).toUpperCase() + post.User.prenom.slice(1)}}
                  </p>

                  <p class="card-text">
                    <small class="text-muted">
                      {{ post.createdAt.slice(0,10).split('-').reverse().join(".") + " | " + post.createdAt.slice(11,16) }}
                    </small>
                  </p>
                </div>
              </div>
            </router-link>


              <!-- Bouton supprimer posts -->
            <div>
              <button
              v-if="idUser == post.User.id || isAdmin === 'true'"
              type="submit"
              role="button"
              aria-label="Supprimer post"
              class="btn"
              @click="deletePost(post.id), reload()">

                <font-awesome-icon
                class="fa"
                icon="trash-alt"
                alt="Supprimer post" />
              </button>

              <!-- Bouton éditer posts -->
              <button
              v-if="idUser == post.User.id"
              type="submit"
              role="button"
              class="btn"
              aria-label="Modifier post"
              data-bs-toggle="modal"
              :data-bs-target="`#exampleModal${index}`">
                  <font-awesome-icon
                  class="fa"
                  icon="edit"
                  alt="Édit post" />
              </button>
            </div>


          </div>
          <p class="card-text text-start mt-4">
            {{ post.contenu }}
          </p>
        </div>
        <img
        v-if="post.image !== ''"
        :src ="post.image"
        id="imgpost"
        class="card-img-bottom principal--color"
        alt="Image du post" />

        <!-- FENÊTRE MODIFICATION POSTS -->
        <div
        class="modal fade"
        :id="'exampleModal'+index" tabindex="-1"
        aria-labelledby="Fenêtre modification post"
        aria-hidden="true"
        v-if="idUser == post.User.id">

          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5
                class="modal-title"
                id="exampleModalLabel">
                  Modifiez votre post
                </h5>

                <button
                type="button"
                role="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close">
                </button>
              </div>

              <div class="modal-body">
                <form enctype="multipart/form-data" aria-label="Formulaire envoi nouveau post">
                  <div class="mb-3">
                    <label
                    for="message-text"
                    class="col-form-label"
                    aria-label="Mon nouveau post">
                      Mon nouveau post :
                    </label>

                    <!-- Champs modification post -->
                    <textarea
                    class="form-control"
                    id="message-text"
                    v-model="newContent"
                    placeholder="Modifier mon post…"
                    aria-label="Champs modifier le post">
                    </textarea>
                  </div>

                  <!-- et/ou champs choisir image -->
                  <div class="mb-3">
                    <label class="input-group-text my-3 btn-outline-dark labelimagepost--custom">
                      Choisir image
                      <input
                      @change="changeImage"
                      aria-label="Choisir image post"
                      class="form-control form-control-sm ms-3"
                      type="file"
                      name="image"
                      accept=".jpg, .jpeg, .gif, .png"/>
                    </label>
                  </div>
                </form>
              </div>

              <div class="modal-footer">
                <button
                type="button"
                class="btn btn-secondary rounded-pill"
                data-bs-dismiss="modal"
                aria-label="Annuler changement">
                  Annuler
                </button>

                <!-- Boutons envoi post -->
                <button
                v-if="newContent !== '' || this.image !== ''"
                 @click.prevent="modifyPost(post.id)"
                 type="button"
                 role="button"
                 class="btn btn-dark align-items-center rounded-pill"
                 aria-label="Enregister modification du post">
                  Enregistrer
                </button>
                
                <button
                v-else
                type="submit"
                role="button"
                class="btn btn-dark align-items-center rounded-pill"
                aria-label="Enregister modification du post désactivé"
                disabled>
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Commentaires -->
        <Comments
        aria-label="les commentaires"
        :postid="post.id" />

      </article>
    </section>
  </main>
</template>

<script>
  import { AxiosAuth } from '../services/AxiosAuth'
  import Comments from '@/components/Comments.vue'

  import { Notyf } from 'notyf';
  import 'notyf/notyf.min.css';

  const notyf = new Notyf();
  const formData = new FormData()
  const RegexTexarea = /^\s+|\s+$/;
  const RegexImage = /[^0-9a-zA-Z._-]/;

  export default {
    name: "Post",
    components: {
      Comments
    },
    data() {
      return {  
        posts: [],
        idUser: '',
        isAdmin: false,
        image: '',
        newContent:''
      }
    },

    created() {
      this.idUser = localStorage.userId;
      this.isAdmin = localStorage.isAdmin;

      AxiosAuth.get('http://localhost:3000/api/posts', { headers: { 'authorization': 'Bearer ' + localStorage.getItem('token')}})
      .then((response) => { 
        this.posts = response.data;
      })
      .catch (() => notyf.error('Erreur de la page, connectez-vous !'))
    },

    methods: {
      changeImage(event) {
          this.image = event.target.files[0];
      },

      reload() {
        setTimeout("window.open(self.location, '_self');", 2000);
      },

      modifyPost(post) {
        if(RegexTexarea.test(this.newContent) || RegexImage.test(this.image.name) ) { 
          notyf.open ({
          type: 'info',
          background: 'orange',
          message: 'Champs vide ou erreur champs'});
        } else {
          formData.set('image', this.image)
          formData.set('contenu', this.newContent)

          AxiosAuth.put('http://localhost:3000/api/posts/' + post, formData, { headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')} })
          .then(() => notyf.success('Post modifié !'))
          .catch ((error) => error + notyf.error('Erreur modification post, réessayez !'));
        }
      },

      deletePost(id) {
        AxiosAuth.delete('http://localhost:3000/api/posts/' + id, { headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')} })
        .then(() => notyf.success('Post supprimé !'))
        .catch ((error) => console.log(error.response));
      }
    }
  }
</script>

<style lang="scss">
.imageprofil {
  &--size {
	object-fit: cover;
	height: 2.5em;
  width: 2.5em;
  }
}

.labelimagepost {
  &--custom {
    background-color: white;
    
    &:hover {
      cursor: pointer;
    }
    input[type=file] {
      &::file-selector-button {
      display: none;
      }
    }
  }

  &--border {
  border: none;
  }
}
</style>
