![]()

# blok-tech - Bookbuddy

Voor blok tech ga ik een matching app genaamd Bookbuddy maken. In deze matching app kunnen mensen die van lezen houden andere mensen vinden die ook van lezen houden. Met de personen met wie je bent gematcht kun je chatten over het boek dat je nu aan het lezen bent, kun je boeken aan elkaar aanraden en samen je volgende boek lezen en deze bespreken. De feature die ik voor deze matching app ga bouwen is de signup en login. Wanneer je bij signup een account aanmaakt kun je hiermee vervolgens inloggen. Wanneer je een account hebt aangemaakt of ben ingelogd word je doorverwezen naar een account pagina waar je dan je account kunt updaten.

Bookbuddy is open source, waardoor iedereen er aan mee kan werken.

Hier kun je zien hoe bookbuddy er nu uitziet:
![Homepage Bookbuddy](https://github.com/Inevdhoven/blok-tech/blob/main/wiki_images/bookbuddy_home.png)

![Signup Bookbuddy](https://github.com/Inevdhoven/blok-tech/blob/main/wiki_images/bookbuddy_signup.png)

![Login Bookbuddy](https://github.com/Inevdhoven/blok-tech/blob/main/wiki_images/bookbuddy_login.png)

![Account Bookbuddy](https://github.com/Inevdhoven/blok-tech/blob/main/wiki_images/bookbuddy_account.png)

## Hoe installeer je Bookbuddy

Voor het installeren van Bookbuddy heb moet je eerst een clone maken van deze repo. Dit doe je door in de terminal het volgende te typen:

```
git clone https://github.com/Inevdhoven/blok-tech.git
```

Wanneer je mijn repo hebt gecloned moet je de volgende code in de terminal typen:

```
npm install
```

Dit is voor het installeren van alle packages die mijn repo gebruikt. Wanneer dit allemaal is geinstalleerd kun je BookBuddy runnen op je localhost door het volgende in te typen:

```
npm run start
```

Dit project maakt gebruik van een database bij [MongoDB](https://www.mongodb.com/). Om je eigen database te connecten moet je een bestand .env aan maken met de volgende regel erin:

```
MONGO_URI=Hier de link naar je eigen database
```

## Documentatie/Wiki

Alle informatie over de matching app en over wat ik heb gedaan kun je lezen in mijn [Wiki](https://github.com/Inevdhoven/blok-tech/wiki). In de Wiki ga ik meer in op wat voor matching app het is, laat ik zien hoe de vormgeving eruit moet komen te zien en kun je hier lezen over het onderzoek dat ik heb gedaan.

## Code of Conduct

Voor meer informatie over hoe ik graag zou willen dat jullie met mijn project en met elkaar omgaan, kun je lezen mijn [Code of Conduct](https://github.com/Inevdhoven/blok-tech/CODE_OF_CONDUCT.md) lezen.

## License

De license die voor Bookbuddy word gebruikt is MIT. Meer informatie over de MIT license kun je [hier](https://github.com/Inevdhoven/blok-tech/blob/main/license) lezen.
