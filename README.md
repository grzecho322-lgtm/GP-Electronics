# GP Electronics Site

Statyczna strona portfolio przygotowana pod publikację przez GitHub Pages.

Repo docelowe:

- `https://github.com/grzecho322-lgtm/GP-Electronics`

Docelowy adres po włączeniu GitHub Pages:

- `https://grzecho322-lgtm.github.io/GP-Electronics/`

## Co jest w środku

- `index.html` - struktura strony
- `styles.css` - styl i układ
- `app.js` - konfiguracja linków, lista projektów i filtrowanie portfolio

## Co podmienić najpierw

W pliku `app.js` możesz dalej aktualizować obiekt `siteConfig`:

- `patroniteUrl`
- `email`
- `website`

Tablica `defaultProjects` jest już wypełniona projektami z obecnego workspace, ale możesz ją dalej rozszerzać albo podmieniać linki do konkretnych repozytoriów.

## Dodawanie projektów tylko przez właściciela

Publiczny formularz został usunięty ze strony. Nowe projekty dodajesz wyłącznie przez edycję `app.js` w repo `grzecho322-lgtm/GP-Electronics`, więc tylko konto z prawem zapisu do repo może publikować nowe wpisy.

Najprostsza ścieżka:

1. Otwórz `app.js` na GitHub.
2. Dopisz nowy obiekt do tablicy `defaultProjects`.
3. Zapisz commit.
4. Poczekaj, aż GitHub Pages odświeży stronę.

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
