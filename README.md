# bussinessframeworksjava

Aby uruchomić backend aplikacji konieczna jest podmiana nazwy bazy danych oraz loginu i hasła użytkownika w pliku 

`backend/src/main/resources/application.properties`

Wystarczy pusta baza danych, wszystkie tabele zostaną utworzone automatycznie. Projekt uruchamiamy z wykorzystaniem InteliJ.

Aby uruchomić frontend aplikacji konieczne jest zainstalowanie Android Studio + NodeJS + NPX. Po tym w katalogu `frontend` wykonujemy polecenie

`npx react-native run-android`


Opis funkcjonalności:

- Logowanie i rejestracja użytkownika
- Uwierzytelnianie JWT
- Uprawnienia i role
- Lista kont użytkownika
- Tworzenie / edycja / usuwanie kont (finansowych) użytkownika
- Lista kategorii użytkownika
- Tworzenie / edycja / usuwanie kategorii transakcji
- Lista transakcji użytkownika
- Tworzenie / edycja / usuwanie transakcji finansowych (Przychód / Wydatek / Przelew)
- Dostęp do kont użytkowników (tylko administrator)
