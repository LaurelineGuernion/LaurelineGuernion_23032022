<template>
  <main class="container-sm d-flex my-5 justify-content-center">
    <section class="row">
      <div class="col">
        <!-- Logo Groupomania -->
        <img
        alt="Groupomania logo"
        src="../assets/groupomania_logo.png" />

        <!-- Texte de bienvenue -->
        <article class="pt-5 pb-5">
          <h1 class="colorwhite">
            Bienvenue sur la plate-forme d'échange facile et rapide
          </h1>
          <h2 class="colorwhite mt-5 h5">
            Le réseau-social interne ludique et innovant qui permet de communiquer, partager des informations entre collègues.<br />
            Le partage d'informations informelles n'est plus une barrière au sein de l'entreprise.</h2>
        </article>

        <section>
          <p class="colorwhite font-weight-light text-uppercase">
            N'hésitez plus et inscrivez-vous ou connectez-vous sur Groupomania
          </p>

          <!-- Bouton inscription -->
          <router-link
          class="linkwhite"
          to="/signup"> 
            <button
            type="button"
            role="button"
            aria-label="Inscrivez-vous"
            class="btn btn-outline-light btn-lg rounded-pill p-3  m-4">
            Inscrivez-vous
            </button>
          </router-link>

          <!-- Bouton connexion -->
          <router-link
          class="linkwhite"
          to="/login"> 
            <button
            type="button"
            role="button"
            aria-label="Connectez-vous"
            class="btn btn-outline-light btn-lg rounded-pill p-3 m-4">
            Connectez-vous
            </button>
          </router-link>
        </section>
        
      </div>
    </section>
  </main>
</template>