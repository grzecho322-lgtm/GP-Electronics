# GP Electronics Site

Statyczna strona portfolio przygotowana pod publikację przez GitHub Pages.

Repo docelowe:

- `https://github.com/grzecho322-lgtm/GP-Electronics`

Docelowy adres po włączeniu GitHub Pages:

- `https://grzecho322-lgtm.github.io/GP-Electronics/`

## Co jest w środku

- `index.html` - struktura strony
- `styles.css` - styl i układ
- `app.js` - konfiguracja linków, lista projektów, filtrowanie i formularz podglądu

## Co podmienić najpierw

W pliku `app.js` możesz dalej aktualizować obiekt `siteConfig`:

- `patroniteUrl`
- `email`
- `website`

Tablica `defaultProjects` jest już wypełniona projektami z obecnego workspace, ale możesz ją dalej rozszerzać albo podmieniać linki do konkretnych repozytoriów.

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

## Ważna uwaga o formularzu

Formularz "Dodaj projekt" zapisuje nowe projekty lokalnie w `localStorage`, więc służy głównie do szybkiego podglądu. Jeśli chcesz, żeby projekt był widoczny publicznie dla wszystkich odwiedzających, dopisz go do `defaultProjects` w `app.js` i wypchnij zmiany do repozytorium.
