/**
 * ============================================================
 * TINARA - TRI DES ACTUALITÉS
 * ============================================================
 *
 * Classe automatiquement les articles :
 * du plus récent au plus ancien.
 *
 * Chaque article doit posséder :
 *
 * data-date="YYYY-MM-DD"
 *
 * Exemple :
 *
 * data-date="2026-09-01"
 *
 * Le tri fonctionne pour :
 *
 * - le carrousel "Toutes"
 * - la grille des catégories
 *
 * ============================================================
 */

(function () {

    'use strict';


    /**
     * Trie les articles d'un conteneur
     * du plus récent au plus ancien.
     *
     * @param {HTMLElement} container
     */
    function sortArticlesByDate(container) {

        if (!container) {
            return;
        }


        /*
         * Récupération des articles présents
         * dans le conteneur.
         */
        const articles = Array.from(
            container.querySelectorAll(
                '.actu-carousel-item, .actu-grid-item'
            )
        );


        /*
         * Tri décroissant :
         *
         * date la plus récente
         *          ↓
         * date la plus ancienne
         */
        articles.sort(function (articleA, articleB) {

            const dateA = articleA.dataset.date;
            const dateB = articleB.dataset.date;


            /*
             * Si une date est absente, on place
             * l'article concerné à la fin.
             */
            if (!dateA && !dateB) {
                return 0;
            }

            if (!dateA) {
                return 1;
            }

            if (!dateB) {
                return -1;
            }


            /*
             * Le format YYYY-MM-DD permet une
             * comparaison fiable directement avec
             * Date.parse().
             */
            const timestampA = Date.parse(dateA);
            const timestampB = Date.parse(dateB);


            /*
             * Si une date est invalide,
             * elle est également placée à la fin.
             */
            if (Number.isNaN(timestampA) && Number.isNaN(timestampB)) {
                return 0;
            }

            if (Number.isNaN(timestampA)) {
                return 1;
            }

            if (Number.isNaN(timestampB)) {
                return -1;
            }


            /*
             * PLUS RÉCENT → PLUS ANCIEN
             */
            return timestampB - timestampA;

        });


        /*
         * Réinsertion des articles dans le nouvel ordre.
         */
        articles.forEach(function (article) {

            container.appendChild(article);

        });

    }


    /**
     * ============================================================
     * INITIALISATION
     * ============================================================
     *
     * Le script est chargé en bas de la page, donc le HTML
     * des articles existe déjà au moment de son exécution.
     */

    const carouselTrack = document.getElementById('actuTrack');

    const grid = document.getElementById('actuGrid');


    /*
     * Tri du carrousel.
     */
    sortArticlesByDate(carouselTrack);


    /*
     * Tri de la grille des catégories.
     */
    sortArticlesByDate(grid);


})();