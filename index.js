const data = [
    {
        id: "0x01_CORE",
        title: "Core_System",
        desc: "Zarządzanie jądrem interfejsu i optymalizacja procesów niskopoziomowych w czasie rzeczywistym.",
        icon: "cpu",
        img: "https://picsum.photos/800/800?random=201",
        subpage: `
                    <p>Moduł <strong>Core_System</strong> odpowiada za spójność warstwy prezentacji z logiką aplikacji: kolejkowanie zadań renderowania, budżet klatek i priorytety aktualizacji stanu.</p>
                    <p>W praktyce oznacza to świadome ograniczanie kosztownych operacji DOM, debouncing zdarzeń wejścia oraz izolację ciężkich obliczeń od głównego wątku tam, gdzie to możliwe.</p>
                    <ul>
                        <li>Profilowanie i „hot paths” w interfejsie</li>
                        <li>Stabilne API komponentów bazowych</li>
                        <li>Regresje wydajnościowe jako część procesu</li>
                    </ul>
                `
    },
    {
        id: "0x02_MOTN",
        title: "Motion_Logic",
        desc: "Implementacja płynnych przejść stanów przy zachowaniu rygorystycznej wydajności i responsywności.",
        icon: "activity",
        img: "https://picsum.photos/800/800?random=202",
        subpage: `
                    <p><strong>Motion_Logic</strong> definiuje język ruchu interfejsu: krzywe easingu, czasy trwania i reguły redukcji ruchu dla użytkowników wrażliwych na animacje.</p>
                    <p>Celem jest wrażenie „ciężaru” i precyzji bez kosztu w postaci janku — animacje muszą być przewidywalne i tanie dla GPU tam, gdzie to ma sens.</p>
                    <ul>
                        <li>Transform i opacity zamiast layoutu</li>
                        <li>Stany pośrednie i anulowanie przejść</li>
                        <li>Spójna skala czasu w całym produkcie</li>
                    </ul>
                `
    },
    {
        id: "0x03_SHDR",
        title: "SVG_Shaders",
        desc: "Zaawansowana manipulacja potokiem graficznym za pomocą filtrów splotu i proceduralnego szumu.",
        icon: "zap",
        img: "https://picsum.photos/800/800?random=203",
        subpage: `
                    <p>Sekcja <strong>SVG_Shaders</strong> skupia się na efektach wektorowych: filtry SVG, maski, blend modes i ich interakcja z responsywną siatką.</p>
                    <p>To narzędzie dla momentów, w których chcesz uniknąć ciężkich bitmap przy zachowaniu ostrego skalowania i kontroli nad parametrami w czasie rzeczywistym.</p>
                    <ul>
                        <li>feGaussianBlur, feColorMatrix, displacement</li>
                        <li>Ograniczenia mobilnych silników SVG</li>
                        <li>Fallbacki dla starszych przeglądarek</li>
                    </ul>
                `
    },
    {
        id: "0x04_DATA",
        title: "Data_Streams",
        desc: "Monitorowanie przepływu informacji przez asynchroniczne kanały komunikacji systemowej.",
        icon: "database",
        img: "https://picsum.photos/800/800?random=204",
        subpage: `
                    <p><strong>Data_Streams</strong> opisuje przepływ danych od źródła do widoku: żądania sieciowe, cache, invalidacja i prezentacja stanów ładowania oraz błędów.</p>
                    <p>Dobrze zaprojektowany strumień danych redukuje „flicker” UI i sprawia, że użytkownik zawsze wie, co się dzieje w tle systemu.</p>
                    <ul>
                        <li>Źródła prawdy i synchronizacja</li>
                        <li>Backoff, retry i anulowanie żądań</li>
                        <li>Telemetria opóźnień end-to-end</li>
                    </ul>
                `
    },
    {
        id: "0x05_SCRT",
        title: "Secure_Shell",
        desc: "Warstwa ochronna zapewniająca integralność danych przesyłanych wewnątrz siatki interfejsu.",
        icon: "shield",
        img: "https://picsum.photos/800/800?random=205",
        subpage: `
                    <p>Moduł <strong>Secure_Shell</strong> to zestaw praktyk frontowych: bezpieczne osadzanie treści, polityki CSP, higiena tokenów i minimalizacja powierzchni ataku w interfejsie.</p>
                    <p>UI często jest pierwszą linią — tutaj decydujesz, co w ogóle trafia do DOM i jak obsługujesz dane wrażliwe po stronie klienta.</p>
                    <ul>
                        <li>Escapowanie i sanityzacja HTML</li>
                        <li>SameSite, secure cookies, storage</li>
                        <li>Audyt zależności i supply chain</li>
                    </ul>
                `
    }
];

const subpageEl = () => document.getElementById('subpage');
const subpageMetaEl = () => document.getElementById('subpage-meta');
const subpageTitleEl = () => document.getElementById('subpage-title-el');
const subpageBodyEl = () => document.getElementById('subpage-body');

const THEME_STORAGE_KEY = 'TERMINAL_UI_THEME';

function getTheme() {
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

function applyTheme(theme) {
    const t = theme === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', t);
    try {
        localStorage.setItem(THEME_STORAGE_KEY, t);
    } catch (e) { /* ignore */ }
    const btn = document.getElementById('theme-toggle');
    if (btn) {
        btn.setAttribute('aria-pressed', t === 'light' ? 'true' : 'false');
        const label = t === 'light' ? 'Przełącz na motyw ciemny' : 'Przełącz na motyw jasny';
        btn.setAttribute('aria-label', label);
        btn.title = label;
    }
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function initThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    applyTheme(getTheme());
    btn.addEventListener('click', function () {
        applyTheme(getTheme() === 'dark' ? 'light' : 'dark');
    });
}

let subpageCloseToken = 0;

function panelFromHash() {
    const raw = window.location.hash.replace(/^#/, '');
    if (!raw) return null;
    const id = decodeURIComponent(raw);
    return data.find((d) => d.id === id) || null;
}

/** Jedno źródło prawdy: hash w URL (pushState nie wywołuje hashchange). */
function syncSubpageFromHash() {
    const item = panelFromHash();
    const sp = subpageEl();
    if (item) {
        subpageCloseToken++;
        sp.classList.remove('is-closing');
        subpageMetaEl().textContent = `/ MODULE: ${item.id} /`;
        subpageTitleEl().textContent = item.title;
        subpageBodyEl().innerHTML = item.subpage || `<p>${item.desc}</p>`;
        sp.classList.add('is-open');
        sp.setAttribute('aria-hidden', 'false');
        document.body.classList.add('subpage-active');
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    } else {
        if (!sp.classList.contains('is-open')) {
            sp.classList.remove('is-closing');
            sp.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('subpage-active');
            return;
        }
        const token = ++subpageCloseToken;
        sp.classList.remove('is-open');
        sp.classList.add('is-closing');

        const onEnd = (e) => {
            if (e.target !== sp) return;
            if (e.animationName !== 'fadeOutShrink') return;
            if (!sp.classList.contains('is-closing')) return;
            if (token !== subpageCloseToken) return;
            sp.removeEventListener('animationend', onEnd);
            sp.classList.remove('is-closing');
            sp.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('subpage-active');
        };
        sp.addEventListener('animationend', onEnd);
    }
}

function navigateToPanel(item) {
    const h = `#${encodeURIComponent(item.id)}`;
    if (window.location.hash !== h) {
        history.pushState({ panel: item.id }, '', h);
    }
    syncSubpageFromHash();
}

function closeSubpage() {
    if (window.location.hash) {
        const base = window.location.pathname + window.location.search;
        history.replaceState(null, '', base);
    }
    syncSubpageFromHash();
}

function init() {
    initThemeToggle();

    const root = document.getElementById('grid-root');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
        root.classList.remove('grid-intro-pending');
    }

    let panelHoverTimer = null;
    const PANEL_HOVER_DELAY_MS = 220;

    data.forEach((item, index) => {
        const panel = document.createElement('div');
        panel.className = `panel ${index === 0 ? 'active' : ''}`;
        panel.dataset.panelId = item.id;

        panel.innerHTML = `
                    <div class="corner corner-tl"></div>
                    <div class="corner corner-br"></div>
                    <img src="${item.img}" alt="[Postać 3D claymorphism: miękki plastik, ludzik w hoodie #A5C9FF, obły kształt, matowa tekstura]">
                    
                    <div class="panel-content">
                        <div class="collapsed-info">
                            <div class="icon-box">
                                <i data-lucide="${item.icon}" size="22"></i>
                            </div>
                            <span class="vertical-label">${item.title}</span>
                        </div>

                        <div class="expanded-info">
                            <span class="metadata">/ LOG_ID: ${item.id} /</span>
                            <h3 class="panel-title">${item.title}</h3>
                            <p class="panel-desc">${item.desc}</p>
                            <button type="button" class="btn-action" data-open-subpage>
                                <i data-lucide="terminal" size="18"></i>
                                Start_Process
                            </button>
                        </div>
                    </div>
                `;

        const activate = () => {
            document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
            panel.classList.add('active');
        };

        panel.addEventListener('click', activate);
        panel.addEventListener('mouseenter', () => {
            if (!window.matchMedia('(min-width: 768px)').matches) return;
            clearTimeout(panelHoverTimer);
            panelHoverTimer = setTimeout(() => {
                activate();
                panelHoverTimer = null;
            }, PANEL_HOVER_DELAY_MS);
        });
        panel.addEventListener('mouseleave', () => {
            clearTimeout(panelHoverTimer);
            panelHoverTimer = null;
        });

        const btn = panel.querySelector('[data-open-subpage]');
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            activate();
            navigateToPanel(item);
        });

        root.appendChild(panel);
    });

    if (!reduceMotion) {
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                root.classList.remove('grid-intro-pending');
                root.classList.add('grid-intro-ready');
            });
        });
    } else {
        root.classList.add('grid-intro-ready');
    }

    document.getElementById('subpage-back').addEventListener('click', () => {
        closeSubpage();
    });

    window.addEventListener('hashchange', syncSubpageFromHash);
    window.addEventListener('popstate', syncSubpageFromHash);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && subpageEl().classList.contains('is-open')) {
            closeSubpage();
        }
    });

    syncSubpageFromHash();

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    startClock();
}

function startClock() {
    const el = document.getElementById('timestamp');
    setInterval(() => {
        const now = new Date();
        el.textContent = now.toTimeString().split(' ')[0];
    }, 1000);
}

window.onload = init;


// Add these to your existing script section
document.addEventListener("DOMContentLoaded", function () {
    // Remove draggable attribute from all elements
    document.querySelectorAll('[draggable="true"]').forEach((el) => {
        el.removeAttribute("draggable");
    });

    // Prevent dragstart event
    document.addEventListener("dragstart", function (e) {
        e.preventDefault();
        return false;
    });

    // Prevent drop event
    document.addEventListener("drop", function (e) {
        e.preventDefault();
        return false;
    });

    // Prevent dragover event
    document.addEventListener("dragover", function (e) {
        e.preventDefault();
        return false;
    });
});