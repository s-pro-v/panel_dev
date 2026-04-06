/* global commandModules, lucide */
(function () {
    "use strict";

    const THEME_STORAGE_KEY = "CLI_TOOLKIT_THEME";

    /**
     * Obrazy tła paneli — stałe URL (Unsplash) dopasowane do tematu modułu.
     * Nieznany id → picsum z seedem (stabilny obraz na moduł).
     */
    const MODULE_PANEL_IMAGES = {
        win_net_sys: {
            url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&h=800&q=80",
            alt: "Sieć, połączenia, infrastruktura",
        },
        /* PowerShell — Pexels (kod/ekran); przy błędzie → Picsum w onerror */
        ps_devops: {
            url: "https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
            alt: "PowerShell — DevOps i automatyzacja",
        },
        ps_adv: {
            url: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
            alt: "PowerShell — operacje zaawansowane",
        },
        /* Diagnostyka — UI vs sprzęt (osobne zdjęcia) */
        diag_ui: {
            url: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
            alt: "Diagnostyka — narzędzia i interfejs Windows",
        },
        diag_hw: {
            url: "https://images.pexels.com/photos/163100/pexels-photo-163100.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
            alt: "Diagnostyka — sprzęt, logi, wydajność",
        },
        sys_fix: {
            url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&h=800&q=80",
            alt: "Naprawa i serwis",
        },
        net_repair: {
            url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&h=800&q=80",
            alt: "Sieć Wi‑Fi i łączność",
        },
        cmd_daily: {
            url: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&h=800&q=80",
            alt: "Klawiatura i szybkie polecenia",
        },
        /* Windows Package Manager (winget) — paczki / magazyn */
        winget_pkg: {
            url: "https://images.pexels.com/photos/4484078/pexels-photo-4484078.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
            alt: "Windows Package Manager — winget",
        },
        maint_policy: {
            url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&h=800&q=80",
            alt: "Bezpieczeństwo i polityki",
        },
        safe_mode: {
            url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&h=800&q=80",
            alt: "Ochrona i tryb awaryjny",
        },
        reset_dns: {
            url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&h=800&q=80",
            alt: "Przepływ danych i DNS",
        },
    };

    function getPanelImage(moduleId) {
        const m = MODULE_PANEL_IMAGES[moduleId];
        if (m) return m;
        return {
            url:
                "https://picsum.photos/seed/" +
                encodeURIComponent(moduleId) +
                "/800/800",
            alt: "Moduł " + moduleId,
        };
    }

    function getTheme() {
        return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    }

    function applyTheme(theme) {
        const t = theme === "light" ? "light" : "dark";
        const root = document.documentElement;
        root.classList.add("theme-switching");
        root.setAttribute("data-theme", t);
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                setTimeout(function () {
                    root.classList.remove("theme-switching");
                }, 200);
            });
        });
        try {
            localStorage.setItem(THEME_STORAGE_KEY, t);
        } catch (e) { }
        const btn = document.getElementById("theme-toggle");
        if (btn) {
            btn.setAttribute("aria-pressed", t === "light" ? "true" : "false");
            const label =
                t === "light" ? "Przełącz na motyw ciemny" : "Przełącz na motyw jasny";
            btn.setAttribute("aria-label", label);
            btn.title = label;
        }
        if (typeof lucide !== "undefined") lucide.createIcons();
    }

    function initThemeToggle() {
        const btn = document.getElementById("theme-toggle");
        if (!btn) return;
        applyTheme(getTheme());
        btn.addEventListener("click", function () {
            applyTheme(getTheme() === "dark" ? "light" : "dark");
        });
    }

    function getCmdIcon(item) {
        if (item.critical) {
            return '<i class="fas fa-triangle-exclamation cmd-type-icon cmd-type-icon--critical" title="Critical"></i>';
        }
        const cmd = (item.cmd || "").toLowerCase();

        if (
            cmd.startsWith("get-") ||
            cmd.startsWith("invoke-") ||
            cmd.startsWith("set-") ||
            cmd.startsWith("test-") ||
            cmd.startsWith("stop-")
        ) {
            return '<i class="fas fa-code cmd-type-icon cmd-type-icon--ps" title="PowerShell"></i>';
        }
        if (/netsh|ipconfig|ping|arp|route|nbtstat/.test(cmd)) {
            return '<i class="fas fa-globe cmd-type-icon cmd-type-icon--net" title="Network"></i>';
        }
        if (/dism|sfc|chkdsk|repair|fix/.test(cmd)) {
            return '<i class="fas fa-medkit cmd-type-icon cmd-type-icon--repair" title="Repair"></i>';
        }
        if (/tasklist|netstat|systeminfo|wmic|fsutil|schtasks/.test(cmd)) {
            return '<i class="fas fa-info-circle cmd-type-icon cmd-type-icon--info" title="Info"></i>';
        }
        if (/bcdedit/.test(cmd)) {
            return '<i class="fas fa-power-off cmd-type-icon cmd-type-icon--boot" title="Boot"></i>';
        }
        if (/msinfo32|cleanmgr|eventvwr|\.msc|optionalfeatures|resmon|perfmon/.test(cmd)) {
            return '<i class="fas fa-window-maximize cmd-type-icon cmd-type-icon--gui" title="GUI"></i>';
        }
        if (/^winget\b/.test(cmd)) {
            return '<i class="fas fa-cube cmd-type-icon cmd-type-icon--winget" title="winget"></i>';
        }
        if (/^wsl\b/.test(cmd)) {
            return '<i class="fas fa-terminal cmd-type-icon cmd-type-icon--wsl" title="WSL"></i>';
        }
        if (/^shutdown\b|^logoff/.test(cmd)) {
            return '<i class="fas fa-power-off cmd-type-icon cmd-type-icon--power" title="Power"></i>';
        }
        if (/^explorer\b/.test(cmd)) {
            return '<i class="fas fa-folder-open cmd-type-icon cmd-type-icon--explorer" title="Explorer"></i>';
        }
        if (/^where\b/.test(cmd)) {
            return '<i class="fas fa-magnifying-glass cmd-type-icon cmd-type-icon--lookup" title="Lookup"></i>';
        }
        if (/^mstsc/.test(cmd)) {
            return '<i class="fas fa-desktop cmd-type-icon cmd-type-icon--rdp" title="RDP"></i>';
        }
        if (/^assoc|^ftype/.test(cmd)) {
            return '<i class="fas fa-link cmd-type-icon cmd-type-icon--link" title="File types"></i>';
        }
        if (/^start ms-settings/.test(cmd)) {
            return '<i class="fas fa-gear cmd-type-icon cmd-type-icon--settings-gear" title="Settings"></i>';
        }
        return '<i class="fas fa-terminal cmd-type-icon cmd-type-icon--default" title="CLI"></i>';
    }

    function grandTotalCommands() {
        return commandModules.reduce(function (acc, m) {
            return acc + m.commands.length;
        }, 0);
    }

    function moduleSnippet(m) {
        const d = m.commands[0] && m.commands[0].desc ? m.commands[0].desc : "Moduł poleceń systemowych.";
        return d.length > 180 ? d.slice(0, 177) + "…" : d;
    }

    /** Zwraca główną część tytułu i opcjonalnie tekst z ostatniego bloku [...] (druga linia). */
    function splitModuleTitle(name) {
        if (!name || typeof name !== "string") return { main: "", sub: "" };
        const m = name.match(/^(.*)\s*\[([^\]]*)\]\s*$/);
        if (m) {
            return {
                main: m[1].replace(/\s+/g, " ").trim(),
                sub: m[2].replace(/\s+/g, " ").trim(),
            };
        }
        return { main: name.replace(/\s+/g, " ").trim(), sub: "" };
    }

    function verticalTitle(name) {
        const s = splitModuleTitle(name).main;
        return s.length > 22 ? s.slice(0, 20) + "…" : s;
    }

    function filteredModules(query) {
        const q = query.toLowerCase().trim();
        if (!q) return commandModules.slice();
        return commandModules.filter(function (m) {
            if (m.name.toLowerCase().includes(q)) return true;
            return m.commands.some(function (c) {
                return (
                    (c.cmd && c.cmd.toLowerCase().includes(q)) ||
                    (c.desc && c.desc.toLowerCase().includes(q))
                );
            });
        });
    }

    function countMatchingInModule(m, q) {
        if (!q) return m.commands.length;
        return m.commands.filter(function (c) {
            return (
                (c.cmd && c.cmd.toLowerCase().includes(q)) ||
                (c.desc && c.desc.toLowerCase().includes(q))
            );
        }).length;
    }

    function updateFooter(query) {
        const q = query.toLowerCase().trim();
        const mods = filteredModules(query);
        const match = mods.reduce(function (a, m) {
            return a + countMatchingInModule(m, q);
        }, 0);
        const el = document.getElementById("footerMeta");
        if (el) {
            el.textContent =
                "DB_SIZE: " +
                grandTotalCommands() +
                " // MATCH: " +
                match +
                " // WIDOK: " +
                mods.length +
                " MOD";
        }
    }

    const searchInput = () => document.getElementById("searchInput");
    const toastEl = () => document.getElementById("toast");

    function copyToClipboard(text) {
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        const t = toastEl();
        if (t) {
            t.textContent = "COPIED: " + text;
            t.style.display = "block";
            clearTimeout(copyToClipboard._timer);
            copyToClipboard._timer = setTimeout(function () {
                t.style.display = "none";
            }, 2200);
        }
    }

    function renderSubpageBody(module) {
        const q = searchInput() ? searchInput().value.toLowerCase().trim() : "";
        const body = document.getElementById("subpage-body");
        if (!body) return;

        const cmds = module.commands.filter(function (c) {
            if (!q) return true;
            return (
                (c.cmd && c.cmd.toLowerCase().includes(q)) ||
                (c.desc && c.desc.toLowerCase().includes(q))
            );
        });

        if (cmds.length === 0) {
            body.innerHTML =
                '<p class="panel-desc" style="margin:0">Brak poleceń pasujących do wyszukiwania.</p>';
            return;
        }

        const ul = document.createElement("ul");
        ul.className = "cli-cmd-list";
        cmds.forEach(function (item) {
            const li = document.createElement("li");
            li.className = "cli-cmd-row";
            li.innerHTML =
                '<div class="cli-cmd-line">' +
                '<span class="cmd-icon-slot">' +
                getCmdIcon(item) +
                "</span>" +
                "<span>" +
                escapeHtml(item.cmd || "") +
                "</span>" +
                "</div>" +
                '<div class="cli-cmd-desc">' +
                escapeHtml(item.desc || "") +
                "</div>";
            li.addEventListener("click", function () {
                copyToClipboard(item.cmd || "");
            });
            ul.appendChild(li);
        });
        body.innerHTML = "";
        body.appendChild(ul);
    }

    function escapeHtml(s) {
        const d = document.createElement("div");
        d.textContent = s;
        return d.innerHTML;
    }

    const subpageEl = () => document.getElementById("subpage");
    let subpageCloseToken = 0;

    function moduleFromHash() {
        const raw = window.location.hash.replace(/^#/, "");
        if (!raw) return null;
        const id = decodeURIComponent(raw);
        return commandModules.find(function (d) {
            return d.id === id;
        });
    }

    function syncSubpageFromHash() {
        const item = moduleFromHash();
        const sp = subpageEl();
        if (!sp) return;

        if (item) {
            subpageCloseToken++;
            sp.classList.remove("is-closing");
            const meta = document.getElementById("subpage-meta");
            const title = document.getElementById("subpage-title-el");
            if (meta) meta.textContent = "/ MODULE: " + item.id + " / " + item.commands.length + " CMD /";
            if (title) {
                const parts = splitModuleTitle(item.name);
                const mainEl = title.querySelector(".subpage-title__main");
                const subEl = title.querySelector(".subpage-title__sub");
                if (mainEl && subEl) {
                    mainEl.textContent = parts.main;
                    subEl.textContent = parts.sub;
                    subEl.hidden = !parts.sub;
                } else {
                    title.textContent = item.name;
                }
            }
            renderSubpageBody(item);
            sp.classList.add("is-open");
            sp.setAttribute("aria-hidden", "false");
            document.body.classList.add("subpage-active");
            if (typeof lucide !== "undefined") lucide.createIcons();
        } else {
            if (!sp.classList.contains("is-open")) {
                sp.classList.remove("is-closing");
                sp.setAttribute("aria-hidden", "true");
                document.body.classList.remove("subpage-active");
                return;
            }
            const token = ++subpageCloseToken;
            sp.classList.remove("is-open");
            sp.classList.add("is-closing");

            const onEnd = function (e) {
                if (e.target !== sp) return;
                if (e.animationName !== "fadeOutShrink") return;
                if (!sp.classList.contains("is-closing")) return;
                if (token !== subpageCloseToken) return;
                sp.removeEventListener("animationend", onEnd);
                sp.classList.remove("is-closing");
                sp.setAttribute("aria-hidden", "true");
                document.body.classList.remove("subpage-active");
            };
            sp.addEventListener("animationend", onEnd);
        }
    }

    function navigateToModule(item) {
        const h = "#" + encodeURIComponent(item.id);
        if (window.location.hash !== h) {
            history.pushState({ module: item.id }, "", h);
        }
        syncSubpageFromHash();
    }

    function closeSubpage() {
        if (window.location.hash) {
            const base = window.location.pathname + window.location.search;
            history.replaceState(null, "", base);
        }
        syncSubpageFromHash();
    }

    function buildPanels(queryStr) {
        const root = document.getElementById("grid-root");
        if (!root) return;

        root.innerHTML = "";
        root.classList.remove("grid-intro-ready");
        root.classList.add("grid-intro-pending");

        const modules = filteredModules(queryStr);
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (modules.length === 0) {
            const empty = document.createElement("div");
            empty.className = "cli-empty-panels";
            empty.textContent =
                "Brak modułów pasujących do zapytania. Wyczyść wyszukiwarkę (Ctrl+K) lub zmień frazę.";
            root.appendChild(empty);
            if (!reduceMotion) {
                root.classList.remove("grid-intro-pending");
                root.classList.add("grid-intro-ready");
            } else {
                root.classList.remove("grid-intro-pending");
                root.classList.add("grid-intro-ready");
            }
            updateFooter(queryStr);
            return;
        }

        let panelHoverTimer = null;
        const PANEL_HOVER_DELAY_MS = 220;

        modules.forEach(function (item, index) {
            const panel = document.createElement("div");
            panel.className = "panel" + (index === 0 ? " active" : "");
            panel.dataset.panelId = item.id;

            const panelImg = getPanelImage(item.id);
            panel.innerHTML =
                '<div class="corner corner-tl"></div>' +
                '<div class="corner corner-br"></div>' +
                '<img src="' +
                panelImg.url +
                '" alt="' +
                escapeHtml(panelImg.alt) +
                '" loading="lazy" decoding="async" data-panel-id="' +
                escapeHtml(item.id) +
                '">' +
                '<div class="panel-content">' +
                '<div class="collapsed-info">' +
                '<div class="icon-box">' +
                '<i class="fas fa-' +
                item.icon +
                ' cmd-panel-icon" aria-hidden="true"></i>' +
                "</div>" +
                '<span class="vertical-label">' +
                escapeHtml(verticalTitle(item.name)) +
                "</span>" +
                "</div>" +
                '<div class="expanded-info">' +
                '<span class="metadata">/ LOG_ID: ' +
                item.id +
                " /</span>" +
                (function () {
                    const p = splitModuleTitle(item.name);
                    let h =
                        '<h3 class="panel-title">' +
                        '<span class="panel-title__main">' +
                        escapeHtml(p.main) +
                        "</span>";
                    if (p.sub) {
                        h +=
                            '<span class="panel-title__sub">' + escapeHtml(p.sub) + "</span>";
                    }
                    h += "</h3>";
                    return h;
                })() +
                '<p class="panel-desc">' +
                escapeHtml(moduleSnippet(item)) +
                "</p>" +
                '<div class="expanded-info__cta">' +
                '<button type="button" class="btn-action btn-action--panel" data-open-subpage>' +
                '<i data-lucide="terminal" width="18" height="18"></i>' +
                "Lista_poleceń" +
                "</button>" +
                "</div>" +
                "</div>" +
                "</div>";

            const imgEl = panel.querySelector("img");
            if (imgEl) {
                const fallbackSrc =
                    "https://picsum.photos/seed/" + encodeURIComponent(item.id) + "/800/800";
                imgEl.addEventListener("error", function onPanelImgErr() {
                    if (imgEl.getAttribute("data-fallback-applied") === "1") return;
                    imgEl.setAttribute("data-fallback-applied", "1");
                    imgEl.removeEventListener("error", onPanelImgErr);
                    imgEl.src = fallbackSrc;
                });
            }

            const activate = function () {
                document.querySelectorAll("#grid-root .panel").forEach(function (p) {
                    p.classList.remove("active");
                });
                panel.classList.add("active");
            };

            panel.addEventListener("click", activate);
            panel.addEventListener("mouseenter", function () {
                if (!window.matchMedia("(min-width: 768px)").matches) return;
                clearTimeout(panelHoverTimer);
                panelHoverTimer = setTimeout(function () {
                    activate();
                    panelHoverTimer = null;
                }, PANEL_HOVER_DELAY_MS);
            });
            panel.addEventListener("mouseleave", function () {
                clearTimeout(panelHoverTimer);
                panelHoverTimer = null;
            });

            const btn = panel.querySelector("[data-open-subpage]");
            btn.addEventListener("click", function (e) {
                e.stopPropagation();
                activate();
                navigateToModule(item);
            });

            root.appendChild(panel);
        });

        if (!reduceMotion) {
            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    root.classList.remove("grid-intro-pending");
                    root.classList.add("grid-intro-ready");
                });
            });
        } else {
            root.classList.remove("grid-intro-pending");
            root.classList.add("grid-intro-ready");
        }

        if (typeof lucide !== "undefined") lucide.createIcons();
        updateFooter(queryStr);
    }

    function startClock() {
        const el = document.getElementById("timestamp");
        if (!el) return;
        function tick() {
            el.textContent = new Date().toTimeString().split(" ")[0];
        }
        tick();
        setInterval(tick, 1000);
    }

    function init() {
        initThemeToggle();
        startClock();

        const si = searchInput();
        if (si) {
            si.addEventListener("input", function () {
                buildPanels(si.value);
                if (subpageEl() && subpageEl().classList.contains("is-open")) {
                    const m = moduleFromHash();
                    if (m) renderSubpageBody(m);
                }
            });
        }

        document.getElementById("subpage-back").addEventListener("click", closeSubpage);

        window.addEventListener("hashchange", syncSubpageFromHash);
        window.addEventListener("popstate", syncSubpageFromHash);

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && subpageEl() && subpageEl().classList.contains("is-open")) {
                closeSubpage();
            }
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault();
                if (searchInput()) searchInput().focus();
            }
        });

        buildPanels("");
        syncSubpageFromHash();
    }

    window.addEventListener("load", init);
})();
