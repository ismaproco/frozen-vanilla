02/18/2014
=============
- Implemented new data model with a improved architecture.
- Created the folder and the first test file for the application

ToDo
- Is necessary to implement all of the changes of the model on the mongo_services file.

*iSmA :)



02/04/2014
=============
- Added methods to save/load Categories per User

Save
-----

- parameters can be send via GET or POST
```
/saveCategoriesUser?user_id=2&category_name=boobs
```
Load
-----

- parameters can be send via GET or POST
- ui: is the user_id if is not sended loads all categories
```
/loadCategoriesUser?ui=1
```


*iSmA :)



02/03/2014
=============
- fixed the modal information loader
- Added the category loader

TODO

- Create CRUD service operations for the instacaches
- Save/Load categories per User for the instacaches (COMPLETED)
- Save from the categories per instacache
- Load instagram photos per categories
- Update UI




01/20/2014
=============

This is going to be the dev branch so we can test and share our code, at the momento we comfortable with it, it must be publish to the heroku "production" environment with the command

git remote add github git@github.com:ismaproco/frozen-vanilla.git
git remote add heroku git@heroku.com:frozenvanilla.git

git push heroku

Disclaimer: 

- I created the "heroku/frozenvanilla" application, "japan-ko" is now depracated and should not be used (This is a personal reminder)
- PlasticBliss was added as collaborator for the "heroku/frozenvanilla"'s app


PD: Keep Coding!

---
Moved from instacache

