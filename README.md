# Chantier — appli web installable (PWA)

Version v6 du prototype Claude Design, en plein écran, installable sur iPhone,
utilisable hors ligne. Les données saisies sont gardées sur le téléphone (localStorage).

Habillage « Liquid Glass » repris de la v4 : fond en dégradés, surfaces translucides
floutées (`backdrop-filter`), accent bleu iOS, capsules, barre d'onglets flottante.
Thème clair par défaut comme la v4 ; thème sombre dans Compte. Intitulés en police système iOS.

## Tout est configurable

- **Sites** : menu Sites → « + Nouveau site » ; sur un site, Configurer → « Paramètres »
  pour renommer, changer la description, la couleur, l'adresse, ou supprimer.
- **Couleurs** : partout où l'on choisit une couleur (site, calendrier, catégorie), une grille de
  **24 pastilles** usuelles rangées par teinte (rouge, bordeaux, saumon, orange, ambre, jaune, beige, marron,
  olive, lime, vert, menthe, sauge, canard, ciel, bleu, marine, indigo, violet, prune, rose, ardoise, gris, noir) ;
  la pastille choisie porte une coche. Dans la fiche d'une catégorie (Projet, Stocks), la couleur teinte sa
  pastille, son icône et sa ligne de liste ; retoucher la pastille retire la couleur.
- **Projets** : bouton « Modifier » sur la fiche (nom, description d’une ligne, phase, site, adresse,
  suppression). La fin affichée vient des dates « du … au … » choisies à la création.
- **Étapes** (en mode Modifier), **factures**, **intervenants**, **événements** :
  toucher l'élément pour le modifier ou le supprimer.
- **Notes du projet** : au-dessus des étapes, une ligne qui grandit avec le texte (une ligne si
  vide). Au-delà de 4 lignes, elle s’affiche réduite avec « Afficher tout » / « Réduire ». Partagées
  comme le reste du projet et connues de Claude.
- **Stock** : l'écran principal ne sert qu'à **consommer** (bouton « − Consommer », retire 1). Toucher un article ouvre sa
  **fiche** : une quantité saisie à la main sert au choix à **Ajouter** au stock ou à **Commander** (« Commander 24 unités »,
  qui met l'article au panier « à commander » sans toucher au stock) ; une commande envoyée se **réceptionne** depuis la même
  fiche. La flèche **›** de la carte ouvre le formulaire du produit.
- **Fournisseurs** : fiche → « Modifier ». **Messages** : « Modifier ou supprimer le message ».

Chaque suppression demande deux touchers. Tout est sauvegardé sur le téléphone.

## Gestes

- **Glisser vers la gauche** sur un projet, un article, un mail, un événement, un contact, une facture,
  une étape, une note ou un intervenant : bouton **Supprimer** (ou glisser jusqu’au bout). Un bandeau
  **Annuler** reste 6 secondes.
- **Glisser vers la droite** sur un projet, ou bouton punaise dans sa fiche : **épingler**. Les projets
  épinglés restent en tête de liste, quelle que soit la section (Terminés, En cours, À faire).
- **Maintenir** un projet, un fichier, un dossier, une conversation ou un message de Claude : menu
  d'options (comme sur iPhone). Sur un projet, **maintenir puis glisser** sans lever le doigt change
  sa place dans la liste (les épinglés entre eux, les autres entre eux).

## Barre d'onglets

Compte › **Barre d’onglets** : jusqu’à 7 sections parmi Projets, Stocks, Mails, Planning, Contacts,
Claude et Fichiers, dans l’ordre choisi. 5 sont visibles à la fois ; au-delà, la barre se fait glisser
à gauche ou à droite (fondu sur le bord et indicateur de position sur les 2/3 de la barre), et l’onglet ouvert est
ramené en vue. **Maintenir puis glisser** une ligne du réglage, ou une icône directement dans la barre,
change l’ordre. Maintenir une icône sans glisser : Ouvrir, Personnaliser la barre, Retirer de la barre.
Une section retirée reste accessible par « Ouvrir » sous « Autres sections ».
La barre est **propre à chaque compte** (fiche `me/<compte>` dans Supabase) : elle suit la personne sur
tous ses appareils, et deux comptes sur un même téléphone ont chacun la leur. À la première connexion,
la barre déjà réglée sur l'appareil devient celle du compte (sauf s'il en a déjà une).

## Fichiers

- Dossiers et fichiers partagés par toute l'entreprise, rangés dans Supabase (espace privé « docs »,
  50 Mo par fichier). Le stockage est isolé dans le code (`FST`) pour pouvoir passer plus tard sur
  OVH Object Storage sans changer le reste de l'appli.
- **+** : nouveau dossier, **importer depuis iCloud Drive** (ou Photos, ou un autre emplacement de
  l'app Fichiers), prendre une photo. **…** : sélectionner, icônes ou liste, tri par nom, date, taille,
  type. Recherche dans tous les dossiers.
- Maintenir un élément : ouvrir, renommer, dupliquer, déplacer, partager (enregistrer dans Fichiers,
  ouvrir dans une autre app), lire les informations, supprimer (corbeille de 30 jours ; le fichier
  n'est effacé du stockage qu'à la corbeille vidée).
- **Visionneuse** : photos (pincer ou toucher deux fois pour zoomer), vidéos, audio, PDF (pages dans
  l'appli), texte, mails `.eml` et Outlook `.msg` (avec leurs pièces jointes). Word, Excel,
  PowerPoint : « Ouvrir » (aperçu de Safari) ou « Ouvrir dans… ». Glisser à gauche ou à droite :
  fichier suivant ou précédent ; glisser vers le bas : fermer ; toucher : afficher ou masquer les
  boutons.
- **Projets** (archive) : chaque projet a son dossier, créé avec lui : Fichiers › Projets › site ›
  projet › Photos (Avant, Pendant, Après), Devis, Factures. Les photos du projet y figurent par lien
  (stockées une seule fois, dans l'espace « photos »), les documents joints aux devis et factures y
  sont rangés, et le **rapport PDF** du projet est à sa racine. Ces dossiers sont tenus à jour par
  l'appli (nom du projet, déplacement de site) : ni renommés, ni déplacés, ni supprimés tant que le
  projet existe ; on peut y ajouter ses propres fichiers et dossiers. Un projet supprimé laisse son
  dossier (archive), qui redevient libre.

## Claude

Onglet **Claude** : conversations avec Claude Sonnet, avec un résumé des données de l'appli (projets,
planning des 14 prochains jours, stock sous le seuil), que l'on peut retirer par conversation. Les
conversations restent sur l'appareil (50 au plus) ; maintenir un message pour le copier.

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
  **Adresse mail** modifiable dans l'appli : chacun la sienne (Compte › Identifiant, mail et mot de
  passe), le propriétaire celles des membres ; elle sert aussitôt pour se connecter.
- **Profil développeur** (Compte › Maintenance de l'appli › « + Profil développeur ») : droits d'un
  admin pour entretenir l'appli, sans gestion des profils, rangé hors de l'équipe. Il voit le
  panneau **Maintenance** : version installée et en ligne, cache et service worker,
  synchronisation, stockage de l'appareil, serveur, journal des erreurs de l'appareil, « Vider le
  cache », « Copier le diagnostic ».
- **Synchronisation** fiche par fiche (site, projet, article, événement, contact, réglage, photo,
  base EAN) : envoi un instant après chaque saisie, réception à l'ouverture, au retour du réseau et
  toutes les 15 s. Deux personnes qui modifient des fiches différentes ne perdent rien ; sur la même
  fiche, la dernière modification l'emporte. Hors connexion, les saisies attendent le retour du réseau
  (Compte › Partage indique l'état).
- **Restent sur l'appareil** : thème, site affiché, boîte mail personnelle et son mot de passe.
  Une sauvegarde restaurée sur un appareil est ensuite partagée avec tous.

## Réglages

Compte › **Réglages** : une page par section (aussi par l'icône à droite d'« Articles » dans Stocks, ou la roue dentée des autres onglets ; Projet n'a plus de bouton de réglages).

- **Projets** : tri par avancement (plus de liste d'emplacements ; les catégories se modifient directement dans Projet),
  (Tous / En cours / Terminés) activé ou non, photos des projets affichées ou masquées.
- **Stocks** : catégories et sous-catégories de chaque catégorie (toucher pour renommer ou supprimer, « Ajouter » pour en créer), articles et seuils du site (le bouton de commande ajoute un pack s’il est connu, sinon 1) ; **base de référence EAN** (import du catalogue CSV
  du négoce, export, vider).
- **Mails** : adresse mail, serveur IMAP (deviné d'après l'adresse), mot de passe d'application
  (gardé sur l'appareil, jamais dans les sauvegardes), nombre de mails à synchroniser (10, 30, 50,
  100), session cloud.
- **Planning** : « Heures de début et de fin par défaut » (interrupteur proposé à chaque nouvel
  événement) ; calendriers (nom, couleur, catégories proposées), ajout et suppression ; les
  événements d'un calendrier supprimé passent dans le premier calendrier restant.
- **Contacts** : rubriques (renommer, ajouter, supprimer ; « Fournisseur » reste car elle porte le
  stock et les factures), annuaire complet.

## Projets, stock, planning, contacts, mails

- **Bouton « + »** au bout des listes défilantes (catégories, rubriques, calendriers), dans les
  formulaires comme dans les onglets : ajout immédiat, réservé au propriétaire et aux admins.
- **Corbeille** (Compte, propriétaire et admins) : projets, contacts, événements, articles,
  factures, étapes, notes, intervenants, photos et messages supprimés restent 30 jours, partagés avec
  toute l'entreprise ; « Restaurer » les remet en place, glisser vers la gauche les supprime pour de
  bon. Glisser vers la gauche supprime aussi dans l'annuaire, les calendriers et les articles des
  réglages.
- **Projet** (v37) : en-tête avec icône, recherche et « + » ; sections **Tous / À faire / En cours / Terminés** (une seule à la fois) ; rubrique **Filtres** que le bouton **^** replie ou déplie (le filtre actif reste rappelé dans le titre) ;
  **priorités** Urgent, Prioritaire, Normal, Faible (comptées et cliquables pour filtrer) ; boutons de
  **catégories** (aucune au départ). « + » ouvre la fiche **Nouvelle catégorie** : nom et **icône** à choisir dans un
  catalogue de 83 icônes de chantier (outils, peinture, chantier, bâtiment, électricité, plomberie et chauffage,
  équipement, suivi ; bibliothèque Lucide, licence ISC). Le crayon « Modifier » transforme les pastilles en **liste** : une ligne par
  catégorie (icône, nom, nombre de projets) avec ses sous-catégories dessous, « + Sous-catégorie » et « Nouvelle
  catégorie » ; toucher une ligne ouvre sa fiche (nom, icône, Supprimer) ; **glisser une ligne vers la gauche** la
  supprime (« Annuler » reste proposé ; ses projets n'ont alors plus de catégorie ou de sous-catégorie). Mêmes
  fiches dans le formulaire Nouveau projet et dans Stocks. **Moteur de catégories** (Projet, Stocks, filtre des Contacts) : une seule ligne ; toucher une
  catégorie l'épingle à gauche (avec son icône et un ✕) et ses **sous-catégories** apparaissent à sa droite, dans la
  même ligne ; la retoucher la désélectionne. Les projets sont de petites cartes horizontales : vignette carrée,
  nom, sous-catégorie et étapes (ou « Terminé » pour un projet sans étapes), priorité, flèche. Plus de grande photo, y compris sur la fiche.
  **Nouveau projet** : photo et titre, **Description** (avec dictée) juste dessous, deux menus Catégorie /
  Sous-catégorie, Priorité, pièces jointes (photos, plans, documents), emplacement (champ libre), puis trois
  interrupteurs, tous **désactivés par défaut** : **Étapes** (aucune étape pré-créée ; sans étapes, la fiche
  propose « Marquer terminé » et « Modifier le projet › Suivi par étapes » les active), **Planning** et
  **Budget estimatif** (minimum et maximum). Plus aucun exemple de saisie dans les champs ; plus de fournisseurs
  à la création. Un projet a une catégorie, une sous-catégorie et une priorité (« Modifier le projet » aussi).
- **Projets** : un projet a un calendrier ; son événement de planning reprend les deux à la création
  (changer ensuite les catégories du projet ne modifie pas les événements déjà créés). Bouton
  « Photo » sur la fiche pour changer la photo d'affichage. Planning du projet à la création : une date (« Du ») ou une période (« Du 15 mai au 12 juin »),
  affichée chaque jour dans le planning ; sans échéance saisie, la fin devient l'échéance.
  Fiche : la **description** (en gros) juste sous le titre, une **barre de progression** compacte rangée dans
  l'en-tête, sous l'emplacement (touchable pour marquer terminé un projet sans étapes), les notes du projet, puis la barre **Étapes · Documents · Photos**
  (Étapes absent d'un projet sans étapes). Plus de carte Budget, de fournisseurs rattachés au projet ni de rubrique
  « À prévoir pour la suite » ; les **Intervenants** (équipe du site) sont en bas de la fiche, avec « + Ajouter ».
  Onglet **Documents** : trois boutons identiques **+ Devis**, **+ Facture**, **+ Document**, qui joignent un fichier
  et le rangent dans le dossier du projet correspondant (Devis, Factures, ou le dossier du projet) ; une rangée de
  filtres **Tous / Devis / Factures / Documents** (avec leur nombre) trie la liste, où chaque fichier porte son type.
  Plus de saisie de montants, de fournisseurs ni de statuts. Onglet **Photos** : Avant et Après en grille, **Pendant** en journal avec
  l'heure de prise de vue (lue dans la photo) et une description ; couverture, déplacer, remplacer,
  supprimer (photos réduites à 1600 px, gardées sur l'appareil, incluses dans les sauvegardes).
  **Documents** : rapport PDF du projet (synthèse, notes, étapes avec leur date d'achèvement, intervenants,
  photos avec date et description) en tête de liste, « Ouvrir le dossier dans Fichiers ».
- **Stocks** (v37) : en-tête Stocks, scanner et « + » ; deux grands boutons **À commander** et **En stock**
  (avec le nombre d'articles ; plus d'« En commande ») ; rubrique **Catégories** (aucune au départ, plus « Autres »)
  avec son « + » (même fiche nom + icône que pour les projets) ; la catégorie choisie, ses **Sous-catégories** avec leur « + » ; puis les **Articles**
  en cartes horizontales : photo, nom, catégorie · sous-catégorie, marque et modèle, quantité, seuil. Un
  produit passe tout seul dans « À commander » quand son stock atteint le seuil d'alerte. Ces catégories n'ont aucun
  lien avec celles des projets. « Modifier » (propriétaire et admins) affiche un ✕ sur chaque pastille : toucher la
  pastille la renomme, deux touches sur ✕ la suppriment (ses articles passent en « Autres » pour une catégorie,
  en « Divers » pour une sous-catégorie). Mêmes réglages dans Réglages › Stocks (icône à droite d'« Articles »).
  **Nouveau produit** : photo en haut à gauche (importer, prendre ou chercher avec Claude), nom, marque, modèle,
  deux menus Catégorie / Sous-catégorie, **Quantités** : **Unité de base** (un nombre de pièces : 1 pour une
  bouteille, 2 pour un paquet de deux ampoules, qui devient un « lot de 2 »), **Quantité du pack** (en unités de
  base : 12 bouteilles, ou 12 lots de 2 ampoules, soit 24 pièces ; le bouton de commande ajoute un pack), **Seuil
  d'alerte** saisi à la main, puis le **stock actuel** (packs complets et unités seules ; le total est calculé et
  converti en pièces). L'article passe dans « À commander » dès que son stock atteint ou passe sous le seuil, Description (dictée), pièces jointes,
  référence (code EAN) et, tout en bas, une grande rubrique **Scanner le QR code / code-barres** qui remplit le nom,
  la marque, le modèle, la référence et le conditionnement quand ils sont connus. Bouton
  **scan EAN** (caméra, photo du code ou saisie). Un code est cherché dans vos articles, puis la
  **base de référence** (catalogue du négoce importé + produits déjà nommés, sans réseau), puis Open
  Products Facts et Open Food Facts, puis par la session cloud sur les sites du bâtiment (Plateforme
  du Bâtiment, Point.P, Cedeo, BigMat…) et enfin le reste du web.
  **Photo du produit** : dans la fiche de l'article, « Ajouter une photo » (appareil photo ou photothèque) ou
  « Rechercher la photo (Claude) » (Open Food Facts par code EAN, sinon recherche web de Claude) ; la photo
  est synchronisée et s'affiche sur la carte de l'article.
  **Scan** : un article déjà connu ouvre « Ajouter au stock » avec la seule quantité à saisir, comme
  un toucher sur sa carte ; l'unité de base et la quantité du pack se règlent dans « Modifier l'article ».
- **Fond animé** (Compte › « Fond animé », désactivé par défaut) : les taches de couleur du fond suivent l'inclinaison du
  téléphone (accéléromètre, avec ressort) et sursautent quand on le secoue ; le calcul s'arrête dès que le téléphone est
  immobile. iOS demande l'autorisation « Mouvement et orientation » à l'activation. Désactivé si « Réduire les animations » est actif.
- **Style Liquid Glass** : fond dégradé coloré, cartes, feuilles, menus et barre du bas en verre dépoli (flou +
  saturation), reflet fin sur les bords, boutons bombés (sélection, accent, boutons pleins) et léger
  assombrissement au toucher. Tout se règle dans la feuille de style et les variables en tête de `index.html` ;
  « Réduire la transparence » (réglage iOS) remplace le verre par un fond opaque.
- **Formulaires** : « Catégorie » et « Sous-catégorie » d'un projet sont des listes déroulantes ; le calendrier
  d'un événement se choisit par pastille de couleur (son nom s'affiche à côté du titre) ; un champ « fichier »
  (PDF, pièce d'identité…) dépose le document dans Fichiers. Le nouvel événement n'a plus de « Catégorie »,
  les notes sont juste sous l'intitulé, et « Contact » devient « Intervenant » avec un PDF ; la fiche contact
  a « ID du contact » et « Intervenant » (PDF).
- **Planning** : calendriers en haut (avec « + » et « Modifier »), vue du mois façon Calendrier
  d’Apple ; un projet ou un événement sur plusieurs jours y est tracé en barre continue. Un
  événement a une date de début et de fin, et des heures de début et de fin si l’interrupteur est
  activé (sinon toute la journée) ; sur plusieurs jours, il apparaît chaque jour (J1/3, J2/3…). Le choix du site ne propose
  que ses projets. Plus de calendriers Commandes ni Factures : les échéances de factures et les
  commandes à passer vont dans **Administratif**, les réceptions attendues dans **Prestation / visite**.
- **Contacts** : rubriques modifiables (bouton « Modifier » au bout de la liste), catégorie,
  adresse, affectation aux sites, sélecteur de site. Délai et prix ne sont plus demandés à la
  création (modifiables ensuite sur la fiche d'un fournisseur).
- **Mails** : résumé en deux lignes. Compte › Réglages › **Mails** : clé Claude de l'entreprise
  (propriétaire, admin), puis pour chacun adresse et mot de passe d'application. La boîte est lue par la
  fonction Supabase « chantier-ia » (voir `supabase/README.md`). Dans la fiche d'un mail, la case de
  réponse est vide : on y tape ses éléments de réponse (ou une réponse complète), puis « Générer une
  réponse » demande à Claude de la rédiger (« Mes éléments » revient aux notes). Destinataire, objet et
  réponse se modifient, puis « Envoyer la réponse » l'envoie directement depuis la boîte (ou « Ouvrir dans
  l'app Mail »).
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

- **Suppression** : un élément supprimé demande une confirmation avec un avertissement : il est placé dans la
  corbeille pendant 30 jours (Compte › Corbeille) avant suppression définitive ; les éléments qui ne passent pas
  par la corbeille (site, calendrier, profil) l'annoncent aussi.
- Plus aucune donnée d'exemple : l'appli démarre vide (aucun site, projet, contact, stock, mail, événement ni photo).
  Les exemples des versions précédentes sont retirés une seule fois de chaque appareil et, par la synchronisation,
  de la base commune ; ce qui a été renommé, complété ou ajouté est conservé.
- Repartir de zéro sur cet appareil : ouvrir l'adresse suivie de `#reset`.
- Les photos et la carte viennent d'internet ; une fois vues, elles restent en cache.
- Après une mise à jour du site, changer `VERSION` dans `sw.js` pour forcer le rafraîchissement.
