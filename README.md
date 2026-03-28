# GP Electronics Site

Statyczna strona portfolio przygotowana pod publikację przez GitHub Pages.

Repo docelowe:

- `https://github.com/grzecho322-lgtm/GP-Electronics`

Docelowy adres po włączeniu GitHub Pages:

- `https://grzecho322-lgtm.github.io/GP-Electronics/`

## Co jest w środku

- `index.html` - struktura strony
- `styles.css` - styl i układ
- `projects-data.js` - konfiguracja linków i pierwsza część listy projektów
- `projects-data-extra.js` - druga część listy projektów, opisów i materiałów
- `app.js` - logika strony głównej i filtrowanie portfolio
- `project.html` - szablon podstrony projektu
- `project.js` - logika renderowania pełnego opisu, kodu i plików

## Co podmienić najpierw

W pliku `projects-data.js` możesz dalej aktualizować obiekt `siteConfig`:

- `patroniteUrl`
- `email`
- `website`

Tablica `projects` jest już podzielona między `projects-data.js` i `projects-data-extra.js`, ale możesz ją dalej rozszerzać albo podmieniać linki do konkretnych repozytoriów, kodu, APK, PDF i innych materiałów.

## Dodawanie projektów tylko przez właściciela

Publiczny formularz został usunięty ze strony. Nowe projekty dodajesz wyłącznie przez edycję `projects-data.js` i `projects-data-extra.js` w repo `grzecho322-lgtm/GP-Electronics`, więc tylko konto z prawem zapisu do repo może publikować nowe wpisy.

Najprostsza ścieżka:

1. Otwórz `projects-data.js` albo `projects-data-extra.js` na GitHub.
2. Dopisz nowy obiekt do tablicy `projects`.
3. Uzupełnij `fullDescription`, `highlights` i `resources`.
4. Jeśli chcesz pokazać kod Arduino albo APK, podstaw link do pliku w `resources`.
5. Zapisz commit i poczekaj, aż GitHub Pages odświeży stronę.

## Lokalny podgląd

Najprościej uruchomić prosty serwer HTTP w katalogu strony, na przykład:

```bash
python3 -m http.server 8000
```

Potem otwórz `http://localhost:8000`.

## Publikacja na GitHub Pages

1. Użyj repozytorium `grzecho322-lgtm/GP-Electronics`.
2. Wgraj do niego zawartość katalogu `gp-electronics-site`.
3. Wejdź w `Settings -> Pages`.
4. Wybierz publikację z gałęzi `main` i katalogu root.
5. Po chwili GitHub opublikuje stronę pod adresem `https://grzecho322-lgtm.github.io/GP-Electronics/`.

## Ważna uwaga

Jeśli w przyszłości będziesz chciał mieć prawdziwy panel „dodaj projekt” dostępny tylko dla Ciebie z poziomu przeglądarki, wtedy trzeba będzie dołożyć autoryzację i backend lub CMS oparty o GitHub API. Obecna wersja jest bezpieczna, bo publiczna strona nie pozwala nikomu dodawać treści.
