# Biketrips organizer

## Informacje ogólne

Podfolder 'backend' zawiera kod napisany w Javie, natomiast w podfolderze 'frontend'
znajduje się kod w JavaScript (w projekcie wykorzystano bibliotekę React oraz Redux do zarządzania
stanem aplikacji i akcjami).

Pracując nad projektem, aby przyspieszyć pracę, zastosowano "hot reloading" - gdy aplikacja uruchamiana jest na serwerze developerskim, zmiany w plikach frontendowych
oraz w stylach przeładowywują się automatycznie bez odświeżania przeglądarki.

Aby przetestować aplikację użyto framewroka Spock do napisania testów integracyjnych.


## Uruchamianie aplikacji w trybie developerskim (hot reloading)

1. Wymagania
* node 6.0+
* yarn (by możliwe było uruchomienie webpack dev server)
* stworzenie bazy danych MySQL (skrypt w głównym folderze projektu) oraz konfiguracja w pliku *backend/src/main/resources/application.properties*
2. Uruchomić metodę główną w klasie BiketripsManagerApplication
3. Aplikacja zostanie uruchomiona na porcie 3000

## Uruchomianie aplikacji w trybie produkcyjnym

Aby uruchomić aplikację w trybie produkcyjnym należy wygenerować plik jar:

``
$ ./gradlew assemble
``

Następnie go uruchomić:

``
$ java -jar time-bank-0.0.1-SNAPSHOT.jar --spring.profiles.active=production
``

Aplikacja zostanie uruchomiona na porcie 8080.
