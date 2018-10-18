# React - review

Ten projekt został wygenerowany z użyciem `create-react-app` oriyginalna instrukcja znajduje się w [`/docs/how-it-was-bootstrapped.md`](./docs/how-it-was-bootstrapped.md)

Design pochodzi ze strony http://todomvc.com/examples/vanillajs/

Cel główny ćwiczenia: Doprowadzić aplikację do działania.

# Zadania

## 1. Przygotuj stan, na podstawie którego renderowana będzie lista zadań i zastąp statyczny kod użyciem funkcji `map`

### Wskazówki:
- stan powinien być przechowywany w komponencie `App`
- w stanie powinno znaleźć się pole `tasks`
- dla ułatwienia weryfikacji poprawności zadania sugeruję w polu `tasks`
  umieścić na początku tablicę z 3 zadaniami - jedno zrobione, jedno w trakcie
  edycji i jedno normalne

## 2. Dodawanie tasków

### Wskazówki:
- stan formularza przechowaj w komponencie `App`
- przygotuj metody, które przekażesz w `render` jako wartości atrybutów `onSubmit` i `onChange` odpowiednim znacznikom
- pamiętaj, że formularz z pojedynczym `input` można wysyłać wciśnięciem klawisza
  `ENTER`
- spraw, żeby nowo dodany task pojawił się na górze listy
- spraw, żeby pole dodawania czyściło się po dodaniu taska

## 3. Usuwanie tasków

### Wskazówki:
- po najechaniu na element listy pojawia się czerwony `x` po prawej stronie
- niech kliknięcie w niego usuwa danego taska

## 4. Oznaczanie tasków jako "zrobione"

### Wskazówki:
- po lewej stronie taska znajduje się okrągły "checkbox"; niech kliknięcie w niego oznacza task jako "zrobiony"
- niech tekst informujący o tym ile tasków zostało do realizacji również
  przedstawia prawdziwe informacje (jest pod listą z lewej strony)

## 5. Edycja taska

### Wskazówki:
- każdy z tasków powinien wchodzić w tryb edycji (patrz klasa CSS `editing` 
  na drugim elemencie listy) po podwójnym kliknięciu myszką 
  (mamy taki atrybut jak `onDoubleClick`; działa analogicznie jak `onClick`)
- tryb edycji powinien wyłączać się, gdy kursor myszy opuszcza obrys pola edycji
  (atrubut `onMouseLeave`) lub wduszony zostanie klawisz `ENTER`

## 6. Filtrowanie tasków

### Wskazówki:
- pod listą tasków znajdują się 3 przyciski "All", "Active", "Completed"
- domyślnie zaznaczony jest przycisk "All", spraw, żeby dało się zaznaczyć pozostałe
- niech zaznaczenie "Active" sprawia, że z listy znikają wszystkie taski, które
  są ukończone
- niech zaznaczenie "Completed" sprawia, że z listy znikają wszystkie taski, które nie są ukończone
- niech zaznaczenie "All" sprawia, że na liście znowu pojawią się wszystkie taski

## 7. Zapisywanie tasków w Firebase i synchronizacja w czasie rzeczywistym

### Wskazówki:
- potrzebujesz biblioteki `firebase`
- niech taski będą zapisywane w ścieżce `/publicTodos` (niech zapis będzie niezależny od tego, czy użytkownik jest zalogowany czy nie - pula tasków ma być wspólna dla wszystkich użytkowników aplikacji)
- niech w metodzie `componentDidMount` komponentu `App` włączana jest subskrypcja na zdarzenie `value` w tej ścieżce
- niech zdarzenie `submit` formularza zapisuje taski bezpośrednio w `firebase`

## 8. Przygotuj `TasksContext` i przenieś do niego logikę synchronizacji z Firebasem

### Wskazówki:
- użyj HOC
- aplikacja nie powinna zmienić swojego działania

## 9. Dodaj routing

### Wskazówki:
- potrzebujesz biblioteki `react-router-dom`
- spraw, żeby pod adresem `localhost:3000/public` pojawiała się lista tasków którą opracowaliśmy powyżej
- spraw, żeby pod adresem `localhost:3000/private` pojawiał się formularz logowania do Firebase oraz formularz rejestracji dla nowych użytkowników;
jeżeli użytkownik będzie zalogowany, to powinien zobaczyć tam podobną listę
zadań, ale niech dane, z których będzie ona korzystać pochodzą ze ścieżki
`/privateTodos/[id użytkownika]` z firebase (czyli niech będą zależne od tego, kóry użytkownik się do aplikacji zalogował) 

## 10. Dodaj nawigację

### Wskazówki:
- niech na stronie `localhost:3000` pojawi się lista 2 linków `Private tasks` oraz `Public tasks` - niech prowadzą do odpowiednich widoków

## 11. (Z dedykacją dla Remiego) Dodaj panel ustawień użytkownika

### Wskazówki:
- panel ma być dostępny pod adresem `localhost:3000/settings`
- użytkownik będzie mógł ustawić:
  - kolor tła aplikacji
  - swój pseudonim, który powinien od tego czasu wyświetlać się na górze strony po zalogowaniu
  - lokalizację (współrzędne lat i lon), które sprawią, że pod adresem `localhost:3000/where-am-i` pojawi się mapa z markerem ustawionym w tym miejscu
  (tutaj bonus: lokalizację można też odczytać z Geolocation API w przeglądarce)