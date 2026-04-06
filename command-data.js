var commandModules = [
    {
        id: "win_net_sys",
        name: "Windows [Net & Sys]",
        icon: "network-wired",
        commands: [
            { id: 7001, cmd: "netsh int ip reset", critical: true, desc: "Resetuje konfigurację stosu TCP/IP (adresy, routing, Winsock) do stanu domyślnego. Stosuje się przy „dziwnych” problemach sieci po aktualizacji, złych sterownikach karty lub uszkodzonych ustawieniach; wymaga często restartu. Może zmienić statyczne wpisy — zrób kopię ustawień." },
            { id: 7002, cmd: "netsh advfirewall set allprofiles state off", critical: false, desc: "Wyłącza Zaporę systemu Windows dla profili domeny, prywatnego i publicznego. Tylko na krótko do testu (czy coś blokuje port); na stałe zostaw firewall włączony — inaczej pełny dostęp z sieci." },
            { id: 7003, cmd: "pathping google.com", critical: false, desc: "Łączy ping i traceroute: przez kilkadziesiąt sekund mierzy opóźnienia i stratę pakietów na każdym skoku. Zamień host na problematyczny adres — zobaczysz, czy utrata jest w LAN, u ISP czy dalej." },
            { id: 7004, cmd: "arp -a", critical: false, desc: "Pokazuje tablicę ARP: które adresy IP w podsieci są znane i z jakim adresem MAC są powiązane. Przydatne przy konfliktach IP, sprawdzaniu urządzeń w LAN i diagnozie połączeń lokalnych." },
            { id: 7005, cmd: "net session", critical: false, desc: "Lista aktywnych sesji SMB/CIFS do tego komputera (udziały, podłączenia z innych maszyn). Wymaga uprawnień; pomaga zobaczyć kto jest podpięty jako klient plików." },
            { id: 7006, cmd: "wmic process get name,executablepath", critical: false, desc: "Dla każdego działającego procesu wypisuje nazwę i pełną ścieżkę pliku .exe — szybko znajdziesz podejrzane programy uruchomione z nietypowych folderów." },
            { id: 7007, cmd: "powercfg /requests", critical: false, desc: "Wymienia procesy i sterowniki, które „trzymają” system przytomny (blokują sleep/hibernację). Gdy laptop nie chce zasnąć, tu widać winowajcę (np. odtwarzacz, narzędzie sieciowe)." },
            { id: 7008, cmd: "powercfg /lastwake", critical: false, desc: "Pokazuje ostatni element (urządzenie, zadanie harmonogramu), który wybudził PC ze stanu uśpienia. Użyteczne przy samoczynnym włączaniu się komputera w nocy." },
            { id: 7009, cmd: "cipher /e", critical: false, desc: "Włącza szyfrowanie EFS dla wskazanego folderu/pliku (klucze powiązane z kontem Windows). /d odszyfrowuje. Nie mylić z BitLockerem — EFS chroni przed innymi użytkownikami na tym samym systemie." },
            { id: 7010, cmd: "net user Administrator /active:yes", critical: false, desc: "Aktywuje wbudowane konto Administrator (domyślnie wyłączone). Potrzebne czasem do napraw w trybie awaryjnym; po pracy warto je z powrotem wyłączyć: /active:no." },
            { id: 7011, cmd: "driverquery /fo table /si", critical: false, desc: "Lista sterowników z informacją o podpisie cyfrowym (/si). Pomaga znaleźć niepodpisane lub testowe sterowniki powodujące BSOD." },
            { id: 7012, cmd: "route print", critical: false, desc: "Wyświetla tablice routingu IPv4/IPv6: bramę domyślną, trasy statyczne, interfejsy. Niezbędne gdy ruch idzie złą drogą (VPN, druga karta sieciowa)." },
            { id: 7013, cmd: "nbtstat -n", critical: false, desc: "Pokazuje lokalne nazwy NetBIOS zarejestrowane na komputerze. Stosowane przy starszych protokołach i udostępnianiu plików (SMB/Workgroup); pomaga w konfliktach nazw w sieci LAN." },
            { id: 7014, cmd: "schtasks /query /fo LIST /v", critical: false, desc: "Pełna lista zadań harmonogramu z parametrami: harmonogram, konto, akcja, stan. Przegląd „co się uruchamia samo” — aktualizacje, malware, skrypty administracyjne." }
        ]
    },
    {
        id: "ps_devops",
        name: "PowerShell [DevOps & Automation]",
        icon: "code-branch",
        commands: [
            { id: 9001, cmd: "Get-NetTCPConnection -State Established", critical: false, desc: "Zwraca tylko aktywne połączenia TCP w stanie Established (w pełni nawiązane). Widzisz lokalny i zdalny adres/port oraz PID procesu — do śledzenia „kto z kim rozmawia” w sieci." },
            { id: 9002, cmd: "Resolve-DnsName -Name domain.com -Server 8.8.8.8", critical: false, desc: "Odpytuje DNS wskazanego serwera (tu 8.8.8.8), omijając cache i DNS routera. Zamień domain.com na swój host — sprawdzisz, czy rekordy są poprawne globalnie." },
            { id: 9003, cmd: "Get-WmiObject Win32_LogicalDisk | Select DeviceID, FreeSpace", critical: false, desc: "Pobiera przez WMI wolne miejsce na dyskach logicznych (litera wolumenu). Wartość FreeSpace w bajtach; przydatne w skryptach i szybkim audycie zapłędnienia dysków." },
            { id: 9004, cmd: "Get-EventLog -LogName System -EntryType Error -Newest 50", critical: false, desc: "Ostatnie 50 błędów z dziennika System (nie ostrzeżenia). Pierwszy krok przy diagnozie crashy, sterowników i usług systemowych." },
            { id: 9005, cmd: "Get-Service | Where-Object {$_.StartType -eq 'Disabled'}", critical: false, desc: "Wypisuje usługi z typem startu Disabled — świadomie wyłączone; pomaga audytować co nie wystartuje nawet przy ręcznym uruchomieniu." },
            { id: 9006, cmd: "Set-ExecutionPolicy Unrestricted", critical: true, desc: "Ustawia politykę wykonywania skryptów na Unrestricted (lokalne skrypty bez podpisu). Ryzyko uruchomienia złośliwego .ps1 — używaj tymczasowo i rozważ RemoteSigned zamiast tego." },
            { id: 9007, cmd: "Get-ADUser -Filter *", critical: false, desc: "Zwraca użytkowników z Active Directory (domena). Wymaga modułu AD/RSAT i uprawnień do odczytu AD; zamień filtr na konkretny, jeśli lista jest ogromna." },
            { id: 9008, cmd: "Invoke-Command -ComputerName X -ScriptBlock { Get-Process }", critical: false, desc: "Zdalne wykonanie bloku na innym komputerze (PowerShell Remoting). Zamień X na nazwę hosta; wymaga WinRM i zaufania między maszynami." },
            { id: 9009, cmd: "Test-Connection -ComputerName X -Count 10", critical: false, desc: "Wysyła 10 sond ICMP (jak ping) i zwraca statystyki. Lepsze niż cmd ping przy skryptach — obiekt z czasem odpowiedzi i statusem." },
            { id: 9010, cmd: "Find-Package -Name 'git'", critical: false, desc: "Przeszukuje zarejestrowane źródła pakietów OneGet (głównie Chocolatey/NuGet w zależności od konfiguracji). Szuka nazwy pakietu przed instalacją." },
            { id: 9013, cmd: "Get-Process | Sort-Object CPU -Descending | Select-Object -First 15 Name, CPU, Id", critical: false, desc: "Sortuje procesy po zużyciu czasu procesora i pokazuje top 15 z PID. Szybko znajdziesz, co obciąża CPU w danej chwili (CPU to skumulowany czas, nie % w jednej chwili)." },
            { id: 9014, cmd: "Get-ChildItem Env: | Sort-Object Name", critical: false, desc: "Wyświetla wszystkie zmienne środowiskowe bieżącej sesji (PATH, USERPROFILE, TEMP…). Przydatne gdy „nie znajduje” komendy lub zła wersja Pythona/Node." },
            { id: 9015, cmd: "Test-NetConnection -ComputerName 8.8.8.8 -Port 53", critical: false, desc: "Testuje połączenie TCP do hosta na podanym porcie (tu DNS na Google). Pokazuje TcpTestSucceeded — czy firewall/router nie blokuje wyjścia; zamień host i port pod swoją usługę." }
        ]
    },
    {
        id: "diag_ui",
        name: "Diagnostics [Common UI]",
        icon: "desktop",
        commands: [
            { id: 10001, cmd: "msinfo32", critical: false, desc: "System Information: drzewo sprzętu, sterowników, wersji OS, konfliktów zasobów i środowiska. Eksport raportu do pliku — baza pod wsparcie techniczne i porównanie dwóch maszyn." },
            { id: 10002, cmd: "eventvwr.msc", critical: false, desc: "Podgląd zdarzeń: dzienniki Application, System, Security i setki innych. Źródło błędów aplikacji, sterowników, aktualizacji — filtruj po ID i poziomie (Error/Warning)." },
            { id: 10003, cmd: "resmon", critical: false, desc: "Resource Monitor: które procesy czytają dysk, sieć, pamięć w czasie rzeczywistym. Gdy Task Manager za mało szczegółowy — tu widać pliki i połączenia per proces." },
            { id: 10004, cmd: "perfmon", critical: false, desc: "Performance Monitor: liczniki wydajności (CPU, dysk, sieć) w czasie rzeczywistym i logi długoterminowe. Do profilowania wąskich gardeł pod obciążeniem." },
            { id: 10006, cmd: "cleanmgr /sageset:1", critical: false, desc: "Tryb konfiguracji czyszczenia dysku dla profilu 1 (zaznaczasz kategorie: miniatury, Windows Update, itd.). Potem uruchom cleanmgr /sagerun:1 aby wykonać z tym zestawem." },
            { id: 10007, cmd: "compmgmt.msc", critical: false, desc: "Konsola „Zarządzanie komputerem”: zdarzenia, dyski, użytkownicy lokalni, usługi, harmonogram — jedno okno pod codzienną administrację stacji roboczej." },
            { id: 10008, cmd: "services.msc", critical: false, desc: "Lista usług Windows: uruchomione/zatrzymane, typ startu (automatyczny/ręczny), logowanie jako. Ostrożnie ze zatrzymywaniem usług systemowych." },
            { id: 10009, cmd: "devmgmt.msc", critical: false, desc: "Menedżer urządzeń: nierozpoznany sprzęt, sterowniki, wyłączanie urządzenia, aktualizacja sterownika. Żółty wykrzyknik = problem z instalacją." },
            { id: 10010, cmd: "diskmgmt.msc", critical: false, desc: "Zarządzanie dyskami: partycje, litery, rozszerzanie/shrink wolumenu, inicjalizacja nowych dysków. Bez narzędzia partycji — typowa administracja dysków w Windows." },
            { id: 10011, cmd: "certmgr.msc", critical: false, desc: "Magazyn certyfikatów bieżącego użytkownika: osobiste, zaufane, pośrednie. Przegląd certyfikatów TLS, podpisów kodu, e-podpisu." },
            { id: 10012, cmd: "OptionalFeatures", critical: false, desc: "Funkcje opcjonalne Windows: WSL, Hyper-V, .NET, Internet Explorer, drukowanie… Włącz/wyłącz komponenty bez pełnego obrazu ISO (część wymaga restartu)." }
        ]
    },
    {
        id: "sys_fix",
        name: "System Fix [Critical]",
        icon: "shield-virus",
        commands: [
            { id: 1001, cmd: "sfc /scannow", critical: true, desc: "System File Checker: porównuje pliki systemowe z katalogiem WinSxS i naprawia uszkodzone. Uruchamiaj jako administrator; po błędach często potrzebne jest wcześniejsze DISM RestoreHealth." },
            { id: 1002, cmd: "DISM /Online /Cleanup-Image /CheckHealth", critical: false, desc: "Szybki test flagi uszkodzenia obrazu offline (bez pełnego skanu). Jeśli wykryje problem, uruchom ScanHealth lub RestoreHealth." },
            { id: 1003, cmd: "DISM /Online /Cleanup-Image /ScanHealth", critical: false, desc: "Pełniejsze skanowanie magazynu komponentów Windows w poszukiwaniu korupcji. Dłuższe niż CheckHealth; nie naprawia samo — tylko diagnozuje." },
            { id: 1004, cmd: "DISM /Online /Cleanup-Image /RestoreHealth", critical: true, desc: "Pobiera dobre kopie plików z Windows Update i naprawia obraz systemu (WinSxS). Wykonuj przed sfc gdy SFC nie może naprawić; wymaga działającej sieci lub źródła." },
            { id: 1005, cmd: "chkdsk C: /f /r", critical: false, desc: "/f naprawia błędy systemu plików; /r szuka uszkodzonych sektorów (długie). Wymaga blokady wolumenu — często restart; na SSD rozważ najpierw /scan." },
            { id: 1006, cmd: "bootrec /fixmbr", critical: false, desc: "Z środowiska odzyskiwania: zapisuje nowy kod rozruchowy MBR zgodny z Windows. Gdy master boot record jest uszkodzony (nie startuje OS)." },
            { id: 1007, cmd: "bootrec /rebuildbcd", critical: false, desc: "Skanuje dyski i odbudowuje magazyn BCD (wpisy bootmenu). Gdy „brak systemu operacyjnego” lub po dual-boot — ale może wymagać ręcznej edycji ścieżek." },
            { id: 1008, cmd: "rstrui.exe", critical: false, desc: "Kreator przywracania systemu do punktu przywracania (rejestr + pliki systemowe). Nie usuwa dokumentów użytkownika; cofa zmiany po złej aktualizacji lub sterowniku." },
            { id: 1009, cmd: "wsreset.exe", critical: false, desc: "Czyści cache Microsoft Store i resetuje aplikację Sklepu (bez usuwania zainstalowanych aplikacji). Gdy Sklep się nie otwiera lub instalacja wisi." }
        ]
    },
    {
        id: "net_repair",
        name: "Network Repair [Direct]",
        icon: "wifi",
        commands: [
            { id: 2001, cmd: "ipconfig /flushdns", critical: false, desc: "Kasuje lokalny cache resolvera DNS. Stosuj gdy strona działa na telefonie, ale nie w przeglądarce, po zmianie DNS lub „stare” wpisy po migracji serwera." },
            { id: 2002, cmd: "netsh winsock reset", critical: true, desc: "Przywraca domyślny katalog Winsock (warstwa sieci nad TCP). Pomaga po malware, starych VPN lub „brak internetu mimo połączenia”; zwykle wymaga restartu." },
            { id: 2003, cmd: "netsh int ip reset", critical: false, desc: "Resetuje stos TCP/IP i zapisuje kopię zapasową w pliku log. Łagodniejszy niż pełna reinstalacja stosu — często razem z winsock reset." },
            { id: 2004, cmd: "ipconfig /release && ipconfig /renew", critical: false, desc: "Zwalnia bieżący lease DHCP i prosi router o nowy adres IP. Przy konfliktach IP lub po zmianie konfiguracji sieci LAN." },
            { id: 2005, cmd: "netsh wlan show profiles", critical: false, desc: "Lista zapisanych profili Wi‑Fi. Hasła: netsh wlan show profile name=\"SSID\" key=clear (wymaga admina) — pokaże klucz sieci." },
            { id: 2006, cmd: "netsh interface show interface", critical: false, desc: "Wszystkie interfejsy (Ethernet, Wi‑Fi, VPN) z nazwą i stanem połączenia. Sprawdzisz czy karta jest wyłączona w systemie." },
            { id: 2007, cmd: "arp -d *", critical: false, desc: "Czyści całą tablicę ARP. Gdy maszyna „widzi” stary MAC do adresu IP po zmianie sprzętu w sieci lokalnej." },
            { id: 2008, cmd: "pathping 8.8.8.8", critical: false, desc: "Jak pathping do hosta — mierzy stratę na trasie i na każdym hopie. Zamień 8.8.8.8 na adres problematycznej usługi." }
        ]
    },
    {
        id: "diag_hw",
        name: "Diagnostics [Hardware & Logs]",
        icon: "microchip",
        commands: [
            { id: 3001, cmd: "tasklist", critical: false, desc: "Lista procesów z PID i nazwą obrazu. Podstawa do późniejszego taskkill lub powiązania z netstat -ano." },
            { id: 3002, cmd: "netstat -ano", critical: false, desc: "-a wszystkie połączenia, -n numerycznie, -o PID procesu. Łączysz z tasklist: znajdź program nasłuchujący na porcie lub łączący się na zewnątrz." },
            { id: 3003, cmd: "systeminfo", critical: false, desc: "Tekstowy raport: wersja Windows, uptime, pamięć, model BIOS, poprawki KB. Szybki eksport stanu maszyny do zgłoszenia supportu." },
            { id: 3004, cmd: "wmic cpu get loadpercentage", critical: false, desc: "Jednorazowy odczyt obciążenia procesora w % (średnia chwilowa). WMIC jest przestarzały, ale nadal działa wszędzie." },
            { id: 3005, cmd: "powercfg /batteryreport", critical: false, desc: "Generuje battery-report.html z historią cykli, pojemnością względem designu i ostatnimi sesjami. Ocena zużycia baterii laptopa." },
            { id: 3006, cmd: "perfmon /report", critical: false, desc: "Generator raportu „System Diagnostics” (minuty): CPU, pamięć, dysk, sieć, błędy. Jednorazowy snapshot wydajności." },
            { id: 3007, cmd: "dxdiag", critical: false, desc: "DirectX Diagnostic: karta graficzna, sterowniki audio/wideo, wersje DirectX, testy dźwięku. Typowe przy problemach z grami i ekranem." },
            { id: 3008, cmd: "mdsched.exe", critical: false, desc: "Windows Memory Diagnostic — test RAM przy następnym restarcie. Używaj przy BSOD, zniekształtach obrazu, podejrzanych błędach pamięci." },
            { id: 3009, cmd: "driverquery /v", critical: false, desc: "Rozszerzona lista: nazwa modułu, pełna ścieżka, wersja, data. Więcej niż /fo table — do audytu sterowników." },
            { id: 3010, cmd: "chkdsk C: /scan", critical: false, desc: "Skanowanie systemu plików NTFS w locie (bez pełnego offline). Wykrywa problemy; naprawa wymaga /f lub narzędzi offline." },
            { id: 3011, cmd: "fsutil volume diskfree C:", critical: false, desc: "Natychmiastowy odczyt wolnego i całkowitego miejsca na wolumenie (bajty). Lżejsze niż eksplorator przy skryptach." },
            { id: 3012, cmd: "tasklist /svc", critical: false, desc: "Przy każdym procesie lista powiązanych usług. Wyjaśnia dlaczego jeden svchost.exe obsługuje wiele usług — które dokładnie." }
        ]
    },
    {
        id: "cmd_daily",
        name: "Windows [Szybkie polecenia]",
        icon: "bolt",
        commands: [
            { id: 12001, cmd: "where ", critical: false, desc: "Szuka wykonywalnych na PATH i w bieżącym katalogu. Dopisz nazwę (np. where python). Gdy kilka wersji — pokaże wszystkie dopasowania w kolejności PATH." },
            { id: 12002, cmd: "explorer .", critical: false, desc: "Otwiera okno Eksploratora w katalogu, w którym stoi konsola (`.` = bieżący folder). Wygodne po cd do projektu." },
            { id: 12003, cmd: "start ms-settings:", critical: false, desc: "Uruchamia aplikację Ustawienia. Można dodać URI (np. ms-settings:network-status) — skrót do konkretnej strony ustawień." },
            { id: 12004, cmd: "netstat -ano | findstr :", critical: false, desc: "Filtruje netstat do linii zawierających port: dopisz np. `:443` lub `:3389`. Potem odczytaj PID w ostatniej kolumnie i znajdź proces w tasklist." },
            { id: 12005, cmd: "taskkill /F /IM ", critical: true, desc: "/F wymusza zakończenie, /IM podaje nazwę obrazu (np. notepad.exe). Zamyka wszystkie instancje o tej nazwie — ryzyko utraty niezapisanych danych." },
            { id: 12006, cmd: "shutdown /r /t 0", critical: true, desc: "/r restart, /t 0 bez odliczania. Uwaga: natychmiastowe zamknięcie aplikacji; użyj /t 60 jeśli potrzebujesz czasu na zapis." },
            { id: 12007, cmd: "shutdown /s /t 0", critical: true, desc: "/s wyłączenie zasilania, /t 0 od razu. Różni się od hibernacji — pełne zamknięcie systemu." },
            { id: 12008, cmd: "logoff", critical: true, desc: "Kończy sesję użytkownika (jak Wyloguj): zamyka aplikacje jak przy wylogowaniu z menu Start. Nie dotyka innych sesji na tym samym hoście (RDP)." },
            { id: 12009, cmd: "mstsc", critical: false, desc: "Microsoft Terminal Services Client — okno połączenia RDP. Możesz podać /v:serwer lub zapisać plik .rdp z ustawieniami ekranu i przekierowań." },
            { id: 12010, cmd: "wsl -l -v", critical: false, desc: "Lista zainstalowanych dystrybucji WSL z wersją (1 vs 2) i stanem. WSL2 = pełna maszyna wirtualna lekka; WSL1 = translacja wywołań." },
            { id: 12011, cmd: "wsl --shutdown", critical: false, desc: "Zatrzymuje wszystkie dystrybucje WSL2 i zwalnia pamięć VM. Gdy WSL „zawiesił” sieć lub zużywa RAM po zamknięciu terminala." },
            { id: 12012, cmd: "assoc", critical: false, desc: "Wyświetla lub ustawia powiązanie rozszerzenia z typem logicznym (np. `.txt` → `txtfile`). Zmiana wpływa na domyślne otwieranie nowych typów." },
            { id: 12013, cmd: "ftype ", critical: false, desc: "Łączy typ pliku (z assoc) z konkretną komendą uruchomienia (np. jaki exe otwiera ten typ). Wymaga dokładnej składni ze ścieżką i `%*` dla argumentów." }
        ]
    },
    {
        id: "winget_pkg",
        name: "Windows Package Manager [winget]",
        icon: "cube",
        commands: [
            { id: 11001, cmd: "winget upgrade --all", critical: false, desc: "Aktualizuje wszystkie pakiety rozpoznane przez winget do najnowszych wersji z repozytoriów. Może pytać o licencje — wtedy dodaj flagi --accept-* lub uruchom w interaktywnej konsoli." },
            { id: 11002, cmd: "winget list --upgrade-available", critical: false, desc: "Pokazuje tylko to, co jest zainstalowane i ma nowszą wersję w źródłach. Planowanie aktualizacji bez ich natychmiastowego stosowania." },
            { id: 11003, cmd: "winget search ", critical: false, desc: "Przeszukuje katalogi (np. winget, msstore) po słowie kluczowym. Dopisz frazę po spacji; w wynikach szukaj kolumny Id do instalacji z -e --id." },
            { id: 11004, cmd: "winget upgrade --all --include-unknown", critical: false, desc: "Uwzględnia aplikacje zainstalowane poza winget, gdy wersja jest „nieznana” — winget spróbuje dopasować pakiet. Może zaproponować nie to, czego oczekujesz; sprawdzaj podgląd." },
            { id: 11005, cmd: "winget list", critical: false, desc: "Pełna lista pakietów zarządzanych przez winget: nazwa, ID, wersja, dostępność aktualizacji. Odpowiednik „co mam z App Installer”." },
            { id: 11006, cmd: "winget show ", critical: false, desc: "Metadane jednego pakietu: opis, wydawca, zależności, instalator (silent switches). Zawsze przed `install` warto zweryfikować ID i źródło." },
            { id: 11007, cmd: "winget install -e --id ", critical: false, desc: "-e (exact) dopasowuje dokładnie Id manifestu (np. Git.Git), bez pomyłek z podobnymi nazwami. Dopisz ID na końcu — stabilne w skryptach." },
            { id: 11008, cmd: "winget uninstall -e --id ", critical: true, desc: "Usuwa pakiet po ID jak w instalacji. Nie mylić z odinstalowaniem ręcznie skopiowanego programu — tylko wpisy znane menedżerowi." },
            { id: 11009, cmd: "winget upgrade -e --id ", critical: false, desc: "Aktualizuje pojedynczy pakiet bez ruszania pozostałych. Przydatne przy ostrożnym wdrażaniu (np. najpierw tylko przeglądarka)." },
            { id: 11010, cmd: "winget source list", critical: false, desc: "Wypisuje skonfigurowane źródła (community winget, msstore, ewentualnie własne). Sprawdzisz, czy `winget` jest dostępne i czy nie wyłączono repozytorium." },
            { id: 11011, cmd: "winget export packages.txt", critical: false, desc: "Zapisuje listę pakietów i wersji do pliku (YAML/JSON zależnie od wersji). Przenoszenie środowiska na nowy PC lub backup zestawu narzędzi." },
            { id: 11012, cmd: "winget import packages.txt", critical: false, desc: "Instaluje zestaw z pliku wygenerowanego przez export (może pomijać już zainstalowane). Użyj po czystej instalacji Windows." },
            { id: 11013, cmd: "winget --info", critical: false, desc: "Wersja klienta, lokalizacje logów, stan linków (App Installer), czasem przydatne przy zgłoszeniu błędu do Microsoft." },
            { id: 11014, cmd: "winget settings", critical: false, desc: "Otwiera settings.json w edytorze domyślnym: m.in. telemetry, kolorowanie, wyłączenie źródeł. Wymaga znajomości JSON — kopiuj zapas przed edycją." },
            { id: 11015, cmd: "winget search --source winget ", critical: false, desc: "Ogranicza wyszukiwanie do repozytorium community (bez wyników ze sklepu). Mniej „szumu”, gdy szukasz klasycznych aplikacji win32." },
            { id: 11016, cmd: "winget upgrade --all --accept-package-agreements --accept-source-agreements", critical: false, desc: "Automatycznie akceptuje umowy licencyjne źródeł i pakietów — bez pauz na Enter. Do harmonogramu zadań lub skryptów nocnych; upewnij się, że akceptujesz warunki zbiorczo." },
            { id: 11017, cmd: "winget source reset --force", critical: true, desc: "Przywraca domyślne URL-e i nazwy źródeł (naprawa pustych wyników po ręcznej edycji). --force bez potwierdzenia — może nadpisać Twoje zmiany." }
        ]
    },
    {
        id: "maint_policy",
        name: "Maintenance & Policy",
        icon: "tools",
        commands: [
            { id: 4001, cmd: "cleanmgr", critical: false, desc: "Kreator Oczyszczania dysku: miniatury, Kosz, pliki tymczasowe, logi aktualizacji. Wybierz dysk i kategorie do usunięcia — zwolnienie miejsca bez ręcznego grzebania po folderach." },
            { id: 4002, cmd: "defrag C: /A", critical: false, desc: "/A tylko analiza (czy wolumen wymaga optymalizacji). Na SSD Windows 10+ zwykle wykonuje TRIM zamiast klasycznej defragmentacji — sprawdź typ dysku przed ręcznym defrag." },
            { id: 4003, cmd: "cipher /w:C:", critical: false, desc: "Nadpisuje wolną przestrzeń zerami (wielokrotnie w nowszych wersjach), utrudniając odzyskanie skasowanych plików. Długo trwa na dużych dyskach; nie zastępuje szyfrowania całego dysku (BitLocker)." },
            { id: 5001, cmd: "net user", critical: false, desc: "Lista kont lokalnych (nie domenowych). Z parametrem nazwy konta: szczegóły, wymuszenie hasła, aktywność. Wymaga uprawnień do odczytu SAM." },
            { id: 5002, cmd: "net localgroup administrators", critical: false, desc: "Członkowie grupy Administratorzy lokalnie — kto ma pełne prawa na tej maszynie. Audyt bezpieczeństwa po dodaniu oprogramowania lub współdzielonym PC." },
            { id: 5003, cmd: "whoami /all", critical: false, desc: "Pełny kontekst bezpieczeństwa: nazwa, SID, grupy, przywileje (SeDebugPrivilege itd.). Diagnostyka „dlaczego nie mam dostępu” w domenie lub z UAC." },
            { id: 5005, cmd: "gpupdate /force", critical: false, desc: "Ponowne pobranie i zastosowanie GPO z kontrolera domeny (lub lokalnych zasad). Po zmianach polityki haseł, mapowania dysków — bez restartu sesji w wielu przypadkach." },
            { id: 5006, cmd: "slmgr /xpr", critical: false, desc: "Okno z informacją czy Windows jest aktywowany i ewentualną datą wygaśnięcia (licencje MAK/KMS). Nie pokazuje klucza produktu — tylko status." }
        ]
    },
    {
        id: "ps_adv",
        name: "PowerShell [Advanced Ops]",
        icon: "terminal",
        commands: [
            { id: 6001, cmd: "Get-ComputerInfo", critical: false, desc: "Jedno polecenie zwraca setki pól: OS, BIOS, procesor, pamięć, hypervisor, wersja kernela. Wygodniejsze niż systeminfo w skryptach (obiekt, nie tekst)." },
            { id: 6002, cmd: "Get-NetAdapter", critical: false, desc: "Karty sieciowe z nazwą, stanem (Up/Down), prędkością, MAC. Parametr -Physical tylko fizyczne karty; przydatne przy problemach z mostem lub VPN." },
            { id: 9011, cmd: "Get-WindowsFeature", critical: false, desc: "Moduł Server Manager: role i funkcje Windows Server (IIS, AD DS…). Na kliencie nie działa — tylko edycje serwerowe z odpowiednim modułem." },
            { id: 9012, cmd: "Get-EventLog -LogName System -Newest 20", critical: false, desc: "Ostatnie 20 zdarzeń z dziennika System bez filtra poziomu — szybki podgląd „co się działo ostatnio” (ostrzeżenia i informacje też)." }
        ]
    },
    {
        id: "safe_mode",
        name: "Safe Mode [Boot]",
        icon: "life-ring",
        commands: [
            { id: 1001, cmd: "bcdedit /set {default} safeboot minimal", critical: false, desc: "Przy następnym rozruchu: tryb awaryjny bez sieci — tylko sterowniki podstawowe. Do usuwania problematycznych sterowników lub malware; wymaga restartu." },
            { id: 1002, cmd: "bcdedit /set {default} safeboot network", critical: false, desc: "Tryb awaryjny z obsługą sieci (sterowniki karty i stos TCP/IP). Gdy potrzebujesz internetu do narzędzi w trybie awaryjnym." },
            { id: 1003, cmd: "bcdedit /deletevalue {current} safeboot", critical: false, desc: "Usuwa flagę safeboot z bieżącego wpisu — po naprawie wracasz do normalnego startu. Uruchom z uprawnieniami administratora." }
        ]
    },
    {
        id: "reset_dns",
        name: "Reset DNS",
        icon: "sync-alt",
        commands: [
            { cmd: "ipconfig /flushdns", desc: "Czyści lokalny cache DNS resolvera. Stosuj gdy strona działa na innym urządzeniu, ale nie w tej przeglądarce, albo po zmianie rekordów u dostawcy DNS." },
            { cmd: "ipconfig /release", desc: "Zwalnia dzierżawę adresu IPv4 z interfejsów DHCP (Ethernet/Wi‑Fi). Po tym zwykle brak internetu do momentu renew / restartu routera." },
            { cmd: "ipconfig /renew", desc: "Prosi serwer DHCP o nowy adres (często po release). Router może przydzielić ten sam lub inny IP w zależności od puli." },
            { cmd: "netsh winsock reset", desc: "Przywraca domyślny katalog Winsock (warstwa między aplikacjami a TCP/IP). Pomaga po uszkodzeniu przez VPN, malware lub stare filtry LSP; zwykle wymaga restartu systemu." }
        ]
    }
];
