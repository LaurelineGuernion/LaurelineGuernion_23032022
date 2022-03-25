<template>
  <!-- LES BOUTONS COMMENTAIRES/COMMENTER-->
  <main>
    <section class="gap-3 mb-3 mt-3">
      <!-- Bouton commentaires -->
      <button
      type="button"
      role="button"
      @click.prevent="showComments(postid)"
      class="btn btn-outline-secondary me-2"
      aria-label="Bouton commentaires"
      data-bs-toggle="collapse"
      :data-bs-target="`#afficheCommentaires${postid}`"
      aria-expanded="true">
        <font-awesome-icon
        class="fa me-2"
        icon="comments"
        alt="Commentaires" />
        Commentaires
      </button>

      <!-- Bouton commenter -->
      <button
      type="button"
      role="button"
      class="btn btn-outline-secondary"
      data-bs-toggle="modal"
      aria-label="Bouton commenter"
      :data-bs-target="`#ModalCommentaire${postid}`">
        <font-awesome-icon
        class="fa me-2"
        icon="comment"
        alt="Commenter" />
        Commenter
      </button>
    </section>

    <!-- AFFICHER LES COMMENTAIRES -->
    <div
    v-for="(comment, index) in comments"
    :key="comment.id">

      <section
      class="collapse"
      :id="`afficheCommentaires${postid}`">
        <div class="m-3 rounded-3 shadow-sm pe-1">
          <div class="d-flex justify-content-between">

            <!-- Descriptif utilisateurs (image, nom/prénom -->
            <div  class="d-flex align-items-center accordion-body">
              <img
              v-if="comment.User.photo !== null"
              class="d-flex text-start rounded-circle imageprofil--size me-2"
              :src ="comment.User.photo"
              alt="Image Profil"/>

              <div
              v-else
              class="d-flex imageprofil--size justify-content-center rounded-circle align-items-center round--size principal--color colorwhite">
                <font-awesome-icon
                class="fa"
                icon="user"
                alt="Image Profil pictogramme" />
              </div>
              
              <span class="text-start ps-2">
                {{ comment.User.nom.charAt(0).toUpperCase() + comment.User.nom.slice(1) +  " " + comment.User.prenom.charAt(0).toUpperCase() + comment.User.prenom.slice(1) }}
              </span>
            </div>

            <!-- Boutons supprimer/éditer commentaires -->
            <div v-if="idUser == comment.User.id || isAdmin === 'true'">
              <button
              type="submit"
              role="button"
              aria-label="Supprimer commentaire"
              class="btn text-secondary"
              @click="deleteComment(comment.id), reload()">
                <font-awesome-icon
                class="fa-sm"
                icon="trash-alt"
                alt="Supprimer commentaire" />
              </button>

              <button
              type="submit"
              role="button"
              aria-label="Éditer commentaire"
              class="btn text-secondary"
              data-bs-toggle="modal"
              :data-bs-target="`#modifierCommentaire${index}`">
                  <font-awesome-icon
                  class="fa-sm"
                  icon="edit"
                  alt="Modifier commentaire" />
              </button>
            </div>
          
          </div>
          <!-- Contenus -->
          <p class="text-start pb-2 ms-4"> {{ comment.contenu }}</p>
        </div>
      </section>
    </div>

    <!-- Si aucun commentaire -->
    <p
    :id="`afficheCommentaires${postid}`"
    v-if="!comments.length"
    class="collapse m-3"
    aria-labelledby="Aucun commentaire">
      Aucun commentaire
    </p>

    <!-- ÉCRIRE UN COMMENTAIRE -->
    <section
    class="modal fade"
    :id="`ModalCommentaire${postid}`"
    tabindex="-1"
    aria-labelledby="Commentaire label"
    aria-hidden="true">

      <section class="modal-dialog">
        <div  class="modal-content">
          <div class="modal-header">
            <h5
            class="modal-title"
            id="commentaireLabel"
            aria-labelledby="Mon commentaire">
            Mon commentaire
            </h5>

            <button
            type="button"
            role="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close">
            </button>
          </div>

          <!-- Écrire son commentaire -->
          <div class="modal-body py-5">
            <div class="d-flex align-items-center pb-2">
              <p class="card-text ps-2 my-0">
                <strong>
                  {{ this.prenom.charAt(0).toUpperCase() + this.prenom.slice(1) + ", "}}
                </strong>
                écris ton nouveau commentaire :
              </p>
            </div>
            <textarea
            class="form-control"
            id="message-text"
            v-model="comment.contenu"
            placeholder="Écrire un commentaire…"
            aria-label="Créer un commentaire…" />
          </div>

          <div class="modal-footer">
            <button
            type="button"
            role="button"
            aria-label="Fermer la fenêtre"
            class="btn btn-secondary rounded-pill"
            data-bs-dismiss="modal">
            Fermer
            </button>

            <!-- Bouton envoyer nouveau commentaire -->
            <button
            v-if="comment.contenu !== ''"
            type="button"
            role="button"
            aria-label="Créer commentaire"
            class="btn btn-dark rounded-pill"
            @click.prevent="createComment(postid), reload()">
              <font-awesome-icon
              icon="paper-plane"
              alt="Envoyer" />
            </button>

            <button
            v-else
            type="button"
            role="button"
            aria-label="Créer commentaire bouton désactiver"
            class="btn btn-dark rounded-pill"
            disabled>
              <font-awesome-icon
              icon="paper-plane"
              alt="Envoyer" />
            </button>
            
          </div>
        </div>
      </section>
    </section>

    <!-- MODIFIER COMMENTAIRE -->
    <div
    v-for="(comment, index) in comments"
    :key="comment.id"
    class="modal fade"
    :id="'modifierCommentaire'+index"
    tabindex="-1"
    aria-labelledby="Modification commentaire"
    aria-hidden="true">

      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5
            class="modal-title"
            id="TitreLabelModifierCommentaire">
            Modifiez mon commentaire
            </h5>
            <button
            type="button"
            role="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close">
            </button>
          </div>

        <!-- Boîte modifier mon commentaire -->
          <div class="modal-body">
            <form enctype="multipart/form-data">
              <div class="mb-3">
                <label
                for="message-text"
                class="col-form-label">
                Mon nouveau commentaire :
                </label>
                <textarea
                class="form-control"
                id="message-text"
                v-model="newComment"
                placeholder="Modifier mon commentaire…">
                </textarea>
              </div>
            </form>
          </div>

          <div class="modal-footer">
            <!-- Bouton annuler ou envoi -->
            <button
            type="button"
            role="button"
            class="btn btn-secondary rounded-pill"
            data-bs-dismiss="modal">
            Annuler
            </button>

            <button
            v-if="newComment !== ''"
            @click.prevent="modifyComment(comment.id), reload()"
            type="button"
            role="button"
            class="btn btn-dark align-items-center rounded-pill">
            Enregistrer
            </button>

            <button
            v-else
            type=" submit"
            role="button"
            class="btn btn-dark align-items-center rounded-pill"
            disabled>
            Enregistrer
            </button>
          </div>

        </div>
      </div>
    </div>

  </main>
</template>

<script>
  import { AxiosAuth } from '../services/AxiosAuth';
  import { Notyf } from 'notyf';
  import 'notyf/notyf.min.css';

  const notyf = new Notyf();
  const RegexTexarea = /^\s+|\s+$/;
  const formData = new FormData();

  export default {
    name: "Post",
    props: ['postid'],
    data() {
      return {
        comments:[],
        isAdmin: false,
        idUser: '',
        comment: {
          contenu:''
        },
        newComment:'',
        prenom:'',
        nom:''
      }
    },
    created() {
      this.idUser = localStorage.userId;
      this.prenom = localStorage.prenom;
      this.nom = localStorage.nom;
      this.isAdmin = localStorage.isAdmin;
    },
    
    methods: {
      reload() {
        setTimeout("window.open(self.location, '_self');", 2000);
      },

      showComments(idPost) {
        AxiosAuth.get('http://localhost:3000/api/comments/' + idPost, { headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')} })
        .then((response) => {
        this.comments = response.data.comments;
        })
        .catch ((error) => error + notyf.error('Erreur affichage commentaires, récharger la page !'));
      },

      createComment(idPost) {
        if(RegexTexarea.test(this.comment.contenu)) {
          notyf.open ({
          type: 'info',
          background: 'orange',
          message: 'Champs vide'});
        } else {
          formData.append('contenu', this.comment.contenu);
          formData.append('PostId', idPost);
          formData.append('UserId', localStorage.getItem('userId'));

          AxiosAuth.post('http://localhost:3000/api/comments', formData, { headers: { 'Content-Type': 'multipart/form-data', 'Authorization':'Bearer ' + localStorage.getItem('token')}} )
          .then(() => notyf.success('Commentaire envoyé !'))
          .catch (() => notyf.error('Erreur de la page, reconnectez-vous !'))
        }
      },

      modifyComment(idComment) {
        if(RegexTexarea.test(this.newComment)) {
          notyf.open ({
          type: 'info',
          background: 'orange',
          message: 'Champs vide'});
        } else {
          formData.append('contenu', this.newComment)

          AxiosAuth.put('http://localhost:3000/api/comments/' + idComment, formData, { headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')} })
          .then(() => notyf.success('Commentaire modifié !'))
          .catch ((error) => error + notyf.error('Erreur modification commentaire, réessayez !'));
        }
      },

      deleteComment(idComment) {
      AxiosAuth.delete('http://localhost:3000/api/comments/' + idComment, { headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')} })
      .then(() => notyf.success('Commentaire supprimé !'))
      .catch ((error) => error + notyf.error('Erreur suppression commentaire, réessayez !'));
      }
    }
  }
</script>