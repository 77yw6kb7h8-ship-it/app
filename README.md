# Chantier — appli web installable (PWA)

Version v6 du prototype Claude Design, en plein écran, installable sur iPhone,
utilisable hors ligne. Les données saisies sont gardées sur le téléphone (localStorage).

Habillage « Liquid Glass » repris de la v4 : fond en dégradés, surfaces translucides
floutées (`backdrop-filter`), accent bleu iOS, capsules, barre d'onglets flottante.
Thème clair par défaut comme la v4 ; thème sombre dans Compte. Intitulés en police système iOS.

## Tout est configurable

- **Sites** : menu Sites → « + Nouveau site » ; sur un site, Configurer → « Nom, couleur… »
  pour renommer, changer la description, la couleur, l'adresse, ou supprimer.
- **Projets** : bouton « Modifier » sur la fiche (nom, phase, échéance, site, adresse, suppression).
- **Étapes** (en mode Modifier), **notes**, **factures**, **intervenants**, **événements** :
  toucher l'élément pour le modifier ou le supprimer.
- **Stock** : ouvrir un article → « Modifier l'article ».
- **Fournisseurs** : fiche → « Modifier ». **Messages** : « Modifier ou supprimer le message ».

Chaque suppression demande deux touchers. Tout est sauvegardé sur le téléphone.

## Gestes

- **Glisser vers la gauche** sur un projet, un article, un mail, un événement, un contact, une facture,
  une étape, une note ou un intervenant : bouton **Supprimer** (ou glisser jusqu’au bout). Un bandeau
  **Annuler** reste 6 secondes.
- **Glisser vers la droite** sur un projet, ou bouton punaise dans sa fiche : **épingler**. Les projets
  épinglés restent en tête de liste, quelle que soit la section (Terminés, En cours, À faire).

## Comptes et partage (Supabase)

Les données saisies sont partagées entre tous les profils de l'entreprise et tous leurs appareils,
via le projet Supabase (Irlande) décrit dans `supabase/README.md`.

- **Connexion** par adresse mail ou identifiant et mot de passe (comptes Supabase). La première
  personne crée son compte puis l'**entreprise** : elle en devient propriétaire et les données de son
  appareil deviennent la base commune. Les appareils suivants reçoivent cette base à la connexion
  (leurs anciennes données sont gardées dans `chantier-app-v6-avant-partage`).
- **Profils** (Compte › Profils, propriétaire) : nom, identifiant, adresse, mot de passe de départ et
  rôle. Propriétaire : tout, dont les profils ; Admin : tout sauf les profils ; User : consultation
  et saisie, sans suppression ni réglages. Ces règles sont aussi appliquées par le serveur.
- **Synchronisation** fiche par fiche (site, projet, article, événement, contact, réglage, photo,
  base EAN) : envoi un instant après chaque saisie, réception à l'ouverture, au retour du réseau et
  toutes les 15 s. Deux personnes qui modifient des fiches différentes ne perdent rien ; sur la même
  fiche, la dernière modification l'emporte. Hors connexion, les saisies attendent le retour du réseau
  (Compte › Partage indique l'état).
- **Restent sur l'appareil** : thème, site affiché, boîte mail personnelle et son mot de passe,
  jeton de la session cloud, journal d'usage. Une sauvegarde restaurée sur un appareil est ensuite
  partagée avec tous.

## Journal d’usage

Compte › **Usage de l’appli** (propriétaire, admin) : fonctions les plus utilisées et enchaînements
répétés. Le journal reste sur l’appareil ; « Exporter le journal » le range dans iCloud Drive pour
l’analyser et améliorer l’appli.

## Réglages

Compte › **Réglages** : une page par section (aussi par la roue dentée en haut de chaque onglet).

- **Projets** : disciplines (toucher pour renommer ou supprimer ; un nouveau nom est repris dans les
  projets, le stock, le planning et les contacts), emplacements proposés, tri par avancement
  (En cours / À faire / Terminés) activé ou non, photos des projets affichées ou masquées,
  fournisseurs par projet activés ou non.
- **Stocks** : articles, seuils et lots du site ; **base de référence EAN** (import du catalogue CSV
  du négoce, export, vider).
- **Mails** : adresse mail, serveur IMAP (deviné d'après l'adresse), mot de passe d'application
  (gardé sur l'appareil, jamais dans les sauvegardes), nombre de mails à synchroniser (10, 30, 50,
  100), session cloud.
- **Planning** : calendriers (nom, couleur, disciplines proposées), ajout et suppression ; les
  événements d'un calendrier supprimé passent dans le premier calendrier restant.
- **Contacts** : rubriques (renommer, ajouter, supprimer ; « Fournisseur » reste car elle porte le
  stock et les factures), annuaire complet.

## Projets, stock, planning, contacts, mails

- **Bouton « + »** au bout des listes défilantes (disciplines, rubriques, calendriers), dans les
  formulaires comme dans les onglets : ajout immédiat, réservé au propriétaire et aux admins.
- **Corbeille** (Compte, propriétaire et admins) : projets, contacts, événements, articles,
  factures, étapes, notes, intervenants, photos et messages supprimés restent 30 jours, partagés avec
  toute l'entreprise ; « Restaurer » les remet en place, glisser vers la gauche les supprime pour de
  bon. Glisser vers la gauche supprime aussi dans l'annuaire, les calendriers et les articles des
  réglages.
- **Projets** : barre des disciplines (filtre) avec **+** pour en créer une. Un projet peut avoir
  plusieurs disciplines et un calendrier ; son événement de planning reprend les deux à la création
  (changer ensuite les disciplines du projet ne modifie pas les événements déjà créés). Bouton
  « Photo » sur la fiche pour changer la photo d'affichage. À la création, seul
  l'**emplacement** est demandé (RDC, 2ème étage…, en boutons ; « Modifier » au bout pour changer
  la liste). Planning du projet à la création : une date (« Du ») ou une période (« Du 15 mai au 12 juin »),
  affichée chaque jour dans le planning ; sans échéance saisie, la fin devient l'échéance.
  Les fournisseurs s'ajoutent par une **barre de recherche** dans l'annuaire, à la
  création comme avec « + Attacher ». Onglet **Photos** : dossier Avant / Après, couverture,
  remplacer, déplacer, supprimer (photos réduites à 1600 px, gardées sur l'appareil, incluses dans
  les sauvegardes).
- **Stocks** : discipline › sous-catégorie (Électricité › Câbles / Ampoules / Prises…) ; bouton
  **scan EAN** (caméra, photo du code ou saisie). Un code est cherché dans vos articles, puis la
  **base de référence** (catalogue du négoce importé + produits déjà nommés, sans réseau), puis Open
  Products Facts et Open Food Facts, puis par la session cloud sur les sites du bâtiment (Plateforme
  du Bâtiment, Point.P, Cedeo, BigMat…) et enfin le reste du web.
- **Planning** : calendriers en haut (avec « + » et « Modifier »), vue du mois façon Calendrier
  d’Apple ; un projet ou un événement sur plusieurs jours y est tracé en barre continue. Un
  événement a une date de début et de fin ; sur un seul jour, une durée (1 h, 2 h, 3 h, ½ journée,
  journée) ; sur plusieurs jours, il apparaît chaque jour (J1/3, J2/3…). Le choix du site ne propose
  que ses projets. **Commandes** et **Factures** restent des calendriers automatiques.
- **Contacts** : rubriques modifiables (bouton « Modifier » au bout de la liste), discipline,
  adresse, affectation aux sites, sélecteur de site. Délai et prix ne sont plus demandés à la
  création (modifiables ensuite sur la fiche d'un fournisseur).
- **Mails** : résumé en deux lignes et brouillon proposé. Compte › Réglages › **Mails** : clé Claude
  de l'entreprise (propriétaire, admin), puis pour chacun adresse et mot de passe d'application. La boîte
  est lue par la fonction Supabase « chantier-ia » (voir `supabase/README.md`). Dans la fiche d'un mail,
  destinataire, objet et réponse se modifient, puis « Envoyer la réponse » l'envoie directement depuis la
  boîte (ou « Ouvrir dans l'app Mail »). Si Claude n'a pas préparé de brouillon, la raison est affichée.
  Réglages › Mails › Claude : consommation du mois, solde estimé, « Recharger » (page Billing d'Anthropic).

## Identifiants lisibles

Compte → **Afficher les identifiants** : chaque fiche montre son numéro —
`PRJ-0001` (projet), `FAC-0001` (facture), `STK-0001` (article de stock),
`FRN-0001` (fournisseur), `SITE-0001` (site). Un numéro est attribué à la création,
ne change jamais (même après renommage) et n'est jamais réutilisé après une suppression.
Il est inclus dans les sauvegardes.

## Sauvegarde iCloud Drive

Les données vivent dans Safari, sur l'appareil. Pour les garder ailleurs ou les passer
d'un appareil à l'autre : Compte → **Sauvegarde · iCloud Drive**.

- **Exporter** crée un fichier `chantier-SAV-AAAAMMJJ-HHMM-XXXX.json` ; l'identifiant
  `SAV-…` est unique et reste affiché dans Compte. Sur iPhone : « Enregistrer dans Fichiers »
  → iCloud Drive › **Chantier › Sauvegardes** (dossier créé sur le Mac, synchronisé par iCloud).
- **Importer** choisit un fichier de sauvegarde, demande confirmation puis remplace toutes
  les données de l'appareil.

## Mettre en ligne

Le dossier `chantier/` est un site statique : il suffit de l'héberger en **HTTPS**.

- **Netlify Drop** : glisser le dossier `chantier/` sur https://app.netlify.com/drop
  (créer un compte gratuit pour garder le site).
- **GitHub Pages** : Settings → Pages → branche `main`, dossier `/ (root)` ;
  l'appli est alors à `https://<compte>.github.io/project/chantier/`.

## Installer sur l'iPhone

1. Ouvrir l'adresse dans **Safari**.
2. Bouton **Partager** → **Sur l'écran d'accueil** → Ajouter.
3. Lancer « Chantier » depuis l'icône : plein écran, fonctionne sans réseau.

## Bon à savoir

- Remettre les données de démo : ouvrir l'adresse suivie de `#reset`.
- Les photos et la carte viennent d'internet ; une fois vues, elles restent en cache.
- Après une mise à jour du site, changer `VERSION` dans `sw.js` pour forcer le rafraîchissement.
