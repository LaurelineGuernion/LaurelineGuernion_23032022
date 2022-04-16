<template>
  <main>
    <section class="container card my-5 py-5">
      <h1 class="card-title h2 d-flex ms-3 justify-content-start">
        Mon profil
      </h1>
      <div class="row">

        <!-- IMAGE (GAUCHE) -->
        <article class="col-md-5 d-flex justify-content-center align-items-center">
          <div>
          
            <!-- Afficher informations utilisateur -->
            <img
            v-if="infoUser.photo !== null"
            class="imagepageprofil--size rounded-circle"
            alt="Image profil"
            :src ="infoUser.photo" />

            <div
            v-else
            class="d-flex imagepageprofil--size justify-content-center m-auto rounded-circle align-items-center principal--color colorwhite p-2">
              <font-awesome-icon
              class="fa-3x"
              icon="user"
              alt="Image Profil pictogramme" />
            </div>

            <h2 class="h4 mt-3">
              {{ usernameMaj }}
            </h2>

            <!-- Bouton modifier image -->
            <button
            v-if="urlId === localstorageUserId"
            @click="show"
            type="button"
            role="button"
            class="btn btn-dark rounded-pill"
            data-bs-toggle="collapse"
            data-bs-target="#editImage"
            aria-label="Modifier image">
              Modifier image
            </button>

            <form
            v-if="isDisplay"
            class="collapse fade"
            id="editImage"
            aria-labelledby="Modification image profil"
            aria-hidden="true">
              <label class="input-group-text my-3 mx-2 btn-outline-dark labelimagepost--custom">
                Choisir image
                <input
                @change="changeImage"
                class="form-control form-control-sm ms-3"
                type="file"
                name="image"
                accept=".jpg, .jpeg, .gif, .png" />
              </label>

              <button
              type="button"
              role="button"
              v-if="this.image === ''"
              class="btn btn-outline-dark me-2 rounded-pill"
              aria-label="Validation envoi image"
              disabled>
                Valider
              </button>

              <button
              type="button"
              role="button"
              aria-label="Validation envoi image"
              v-else
              class="btn btn-outline-dark me-2 rounded-pill"
              @click.prevent="modifyImageProfil(), reload()">
                Valider
              </button>
            </form>
          </div>
        </article>

        <!-- INFORMATIONS UTILISATEUR (DROITE) -->
        <section class="col-md-7 border-start">
          <div class="card-body">

            <!-- Modifier nom -->
            <div class="d-flex">
              <h2 class="h6 text-start mb-0 d-flex align-items-center">
                <strong>
                  Nom
                </strong>
              </h2>

              <button
              v-if="urlId === localstorageUserId"
              @click="show"
              class="btn rounded-pill p-0 ms-2"
              type="button"
              role="button"
              aria-label="Edit nom"
              data-bs-toggle="collapse"
              data-bs-target="#editNom">
                <font-awesome-icon
                class="fa-sm text-black-50"
                icon="edit"
                alt="Edit Nom" />
              </button>
            </div>

            <p class="card-text text-start">
              {{ infoUser.nom }}
            </p>
            <form
            @submit.prevent="modifyName(), reload()"
            v-if="isDisplay"
            class="collapse fade"
            id="editNom"
            aria-labelledby="Modification nom"
            aria-hidden="true">

              <div class="d-flex mb-3">
                <input
                class="form-control form-control-sm me-3"
                type="text"
                name="nom"
                v-model="infoUser.nom"
                aria-label="Champs Nom"
                pattern="(-?([A-Z].\s)?([A-Z][a-z]+)\s?)+([A-Z]'([A-Z][a-z]+))?"
                required />

                <button
                type="submit"
                role="button"
                aria-label="Envoi nouveau nom"
                class="btn btn-outline-dark rounded-pill">
                  <font-awesome-icon
                  class="fa-sm"
                  icon="check"
                  alt="Modifier nom" />
                </button>
              </div>
            </form>

            <!-- Modifier prénom -->
            <div class="d-flex">
              <h2 class="h6 text-start mb-0 d-flex align-items-center">
                <strong>
                  Prénom
                </strong>
              </h2>

              <button
              v-if="urlId === localstorageUserId"
              @click="show"
              class="btn rounded-pill p-0 ms-2"
              type="button"
              role="button"
              aria-label="Modifier prénom"
              data-bs-toggle="collapse"
              data-bs-target="#editPrenom">
                <font-awesome-icon
                class="fa-sm text-black-50"
                icon="edit"
                alt="Edit Prénom" />
              </button>
            </div>

            <p class="card-text text-start">
             {{ infoUser.prenom }}
            </p>

            <form
            @submit.prevent="modifyFirstName(), reload()"
            v-if="isDisplay"
            class="collapse fade"
            id="editPrenom"
            aria-labelledby="Modification prénom"
            aria-hidden="true">

              <div class="d-flex mb-3">
                <input
                class="form-control form-control-sm me-3"
                type="text"
                name="prenom"
                aria-label="Champs modification prénom"
                v-model="infoUser.prenom"
                pattern="[A-Za-zÀ-ÖØ-öø-ÿ-]{2,15}"
                required />
                
                <button
                type="submit"
                role="button"
                aria-label="Modifer prénom envoi"
                class="btn btn-outline-dark rounded-pill">
                  <font-awesome-icon
                  class="fa-sm"
                  icon="check"
                  alt="Edit prénom" />
                </button>
              </div>
            </form>

            <!-- Modifier Bio -->
            <div class="d-flex">
              <h2 class="h6 text-start mb-0 d-flex align-items-center">
                <strong>
                  Bio
                </strong>
              </h2>

              <button
              v-if="urlId === localstorageUserId"
              @click="show"
              class="btn rounded-pill p-0 ms-2"
              type="button"
              role="button"
              aria-label="Afficher modification bio"
              data-bs-toggle="collapse"
              data-bs-target="#editBio">
                <font-awesome-icon
                class="fa-sm text-black-50"
                icon="edit"
                alt="Edit Bio" />
              </button>
            </div>

          <!-- Si aucune bio -->
            <p
            v-if="!infoUser.bio"
            class="card-text text-start">
              Vous n'avez aucune bio pour le moment.
            </p>

          <!-- Sinon affichage bio -->
            <p
            v-else
            class="card-text text-start">
              {{ infoUser.bio }}
            </p>
            <form
            @submit.prevent="modifyBio(), reload()"
            v-if="isDisplay"
            class="collapse fade"
            id="editBio"
            aria-labelledby="Modification bio"
            aria-hidden="true">

              <div class="d-flex mb-3">
                <textarea
                class="form-control form-control-sm me-3"
                type="text"
                name="bio"
                aria-label="Champs modification Bio"
                v-model="infoUser.bio" />

                <button
                type="submit"
                role="button"
                aria-label="Envoi modification bio"
                class="btn btn-outline-dark rounded-pill my-2">
                  <font-awesome-icon
                  class="fa-sm"
                  icon="check"
                  alt="Edit bio" />
                </button>
              </div>
            </form>

            <!-- MODIFIER LES IDENTIFIANTS DE CONNEXION -->
            <div class="d-flex mt-5 mb-3">
              <button
              v-if="urlId === localstorageUserId"
              @click="show"
              role="role"
              aria-label="Afficher modification identifiants"
              class="btn btn-dark d-flex rounded-pill"
              data-bs-toggle="collapse"
              data-bs-target="#editidentifiant">
                Modifier les identifiants de connexion
              </button>
            </div>

            <div
            v-if="isDisplay"
            class="collapse fade"
            id="editidentifiant"
            aria-labelledby="Modification mot de passe"
            aria-hidden="true">

              <p class="card-text d-flex text-start text-muted">
                <small>
                  Toutes modifications des identifiants nécessitent une reconnexion
                </small>
              </p>

              <!-- Modifier Email -->
              <p class="card-text d-flex justify-content-start">
                Email :
              </p>
              <form
              class="d-flex"
              @submit.prevent="modifyEmail()">

                <input
                class="form-control form-control-sm w-75"
                type="email"
                aria-label="Champs modification email"
                placeholder="Nouveau email…"
                name="email"
                v-model="newEmail"
                pattern="\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b"
                required/>

                <button
                type="submit"
                role="button"
                aria-label="Envoi modification email"
                class="btn d-flex btn-outline-dark mx-2 rounded-pill">
                  <font-awesome-icon
                  class="fa-sm"
                  icon="check"
                  alt="Edit Email" />
                </button>
              </form>

              <!-- Modifier mot de passe -->
              <p class="card-text d-flex mt-3">
                Mot de passe :
              </p>
              <form
              class="d-flex"
              @submit.prevent="modifyPassword()">

                <input
                class="form-control form-control-sm w-75" 
                type="password"
                aria-label="Champs modification mot de passe"
                placeholder="Nouveau mot de passe…"
                name="mot de passe"
                v-model="newPassWord"
                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                required/>

                <button
                type="submit"
                roloe="button"
                aria-label="Envoi modification mot de passe"
                class="btn d-flex btn-outline-dark mx-2 rounded-pill">
                  <font-awesome-icon
                  class="fa-sm"
                  icon="check"
                  alt="Edit mot de passe" />
                </button>
              </form>

            </div>

          </div>
        </section>
      </div>

      <button
      v-if="localstorageIsAdmin === 'true' || urlId === localstorageUserId"
      type="button"
      role="button"
      aria-label="Supprimer mon compte"
      class="btn btn-danger mt-5 w-50 m-auto"
      @click.prevent="deleteAccount">
        Supprimer compte
      </button>
      
    </section>
  </main>
</template>

<script>
  import { AxiosAuth } from '../services/AxiosAuth';
  import router from '../router';
  import { Notyf } from 'notyf';
  import 'notyf/notyf.min.css';

  const notyf = new Notyf();
  const formData = new FormData();
  const params = new URLSearchParams();
  const RegexTexarea = /^\s+|\s+$/;
  const RegexImage = /[^0-9a-zA-Z._-]/;

  export default {
    name: 'Profil',
    data() {
      return {
        infoUser: [],
        localstorageIsAdmin:'',
        urlId:'',
        usernameMaj:'',
        image:'',
        newPassWord:'',
        newEmail:'',
        isDisplay: false,
        isAdmin: true,
      }
    },

    created() {
      this.localstorageIsAdmin = localStorage.isAdmin;
      this.localstorageUserId = localStorage.userId;

      const url = window.location.href;
      this.urlId = url.split("/").slice(-1)[0];

      AxiosAuth.get('http://localhost:3000/api/auth/' + this.urlId, { headers: { 'authorization': 'Bearer ' + localStorage.getItem('token')}})
      .then((response) => { 
        this.infoUser = response.data;
        this.usernameMaj = this.infoUser.nom.charAt(0).toUpperCase() + this.infoUser.nom.slice(1) +  " " + this.infoUser.prenom.charAt(0).toUpperCase() + this.infoUser.prenom.slice(1)
      })
      .catch (() => notyf.error('Erreur de la page, connectez-vous !'))
    },
    
    methods: {
      show() {
        this.isDisplay = true;
      },

      hide() {
        this.isDisplay = false;
      },

      changeImage(event) {
        this.image = event.target.files[0];
      },

      reload() {
        setTimeout("window.open(self.location, '_self');", 2000);
      },

      modifyImageProfil() {
          if(RegexImage.test(this.image.name)) {
          notyf.open ({
          type: 'info',
          background: 'orange',
          message: 'Erreur nom image' });
        } else {
        formData.set('image', this.image)

        AxiosAuth.put(`http://localhost:3000/api/auth/${this.urlId}/savephoto`, formData, { headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')} })
        .then(() => notyf.success('Image modifiée !'))
        .catch ((error) => error + notyf.error('Erreur modification image, réessayez !'));
        }
      },

      modifyName() {
        formData.set('nom', this.infoUser.nom)

        AxiosAuth.put('http://localhost:3000/api/auth/' + this.urlId, formData, { headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')} })
        .then(() => notyf.success('Modification du nom !'))
        .catch ((error) => error + notyf.error('Erreur modification, réessayez !'));
      },

      modifyFirstName() {
        formData.set('prenom', this.infoUser.prenom)

        AxiosAuth.put('http://localhost:3000/api/auth/' + this.urlId, formData, { headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')} })
        .then(() => notyf.success('Modification du prénom !'))
        .catch ((error) => error + notyf.error('Erreur modification, réessayez !'));
      },

      modifyBio() {
        if(RegexTexarea.test(this.infoUser.bio)) {
          notyf.open ({
          type: 'info',
          background: 'orange',
          message: 'Champs vide' });
        } else {
          formData.set('bio', this.infoUser.bio)
          AxiosAuth.put('http://localhost:3000/api/auth/' + this.urlId, formData, { headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')} })
          .then(() => notyf.success('Modification de la biographie !'))
          .catch ((error) => error + notyf.error('Erreur modification, réessayez !'));
        }
      },

      modifyEmail() {
        params.set('email', this.newEmail)

        AxiosAuth.put(`http://localhost:3000/api/auth/${this.urlId}/updateemail`, params, { headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')} })
        .then(() =>
        notyf.success('Modification de l\'email, reconnectez-vous !'),                 
        localStorage.clear(),
        router.push({ path : '/login'}))
        .catch ((error) => error + notyf.error('Erreur modification email, réessayez !'));
      },

      modifyPassword() {
        params.append('password', this.newPassWord);
        AxiosAuth.put(`http://localhost:3000/api/auth/${this.urlId}/updatepassword`, params, { headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')} })
        .then(() =>
        notyf.success('Modification du mot de passe, reconnectez-vous !'))                
        localStorage.clear()
        router.push({ path : '/login'})
        .catch ((error) => console.log(error.response));
      },

      deleteAccount() {
        AxiosAuth.delete('http://localhost:3000/api/auth/' + this.urlId, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(() =>
        notyf.success('Compte supprimé !'),                 
        localStorage.clear(),
        router.push({ path : '/signup'}))
        .catch (() => notyf.error('Erreur compte non supprimé, réessayer !'))
      }
    }
  };
</script>

<style lang="scss">
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