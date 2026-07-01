/* global commandModules, lucide */
(function () {
    "use strict";

    const THEME_STORAGE_KEY = "CLI_TOOLKIT_THEME";

    /**
     * Wektorowe tła paneli w formacie SVG (HUD / blueprint).
     */
    const MODULE_PANEL_SVGS = {
        win_net_sys: '<svg class="panel-svg-bg svg-theme-net" viewBox="0 0 100 100" fill="none" stroke="currentColor" preserveAspectRatio="xMidYMid meet"><line class="hud-axis" x1="50" y1="8" x2="50" y2="92" stroke-width="0.5" stroke-dasharray="1,4"/><line class="hud-axis" x1="8" y1="50" x2="92" y2="50" stroke-width="0.5" stroke-dasharray="1,4"/><circle class="hud-axis" cx="50" cy="50" r="5" stroke-width="0.5"/><circle class="hud-grid" cx="50" cy="50" r="40" stroke-width="0.6" stroke-dasharray="2,2"/><path class="hud-accent" d="M28 32 L46 29 L46 47 L28 47 Z M28 49 L46 49 L46 67 L28 64 Z M48 28.5 L72 24 L72 47 L48 47 Z M48 49 L72 49 L72 72 L48 67.5 Z" stroke-width="1.2"/><line class="hud-wire" x1="28" y1="32" x2="12" y2="20" stroke-width="0.8"/><circle class="hud-node" cx="12" cy="20" r="2" fill="currentColor"/><line class="hud-wire" x1="28" y1="64" x2="12" y2="75" stroke-width="0.8"/><circle class="hud-node" cx="12" cy="75" r="2" fill="currentColor"/><line class="hud-wire" x1="72" y1="24" x2="88" y2="15" stroke-width="0.8"/><circle class="hud-node" cx="88" cy="15" r="2" fill="currentColor"/><line class="hud-wire" x1="72" y1="72" x2="88" y2="80" stroke-width="0.8"/><circle class="hud-node" cx="88" cy="80" r="2" fill="currentColor"/><path class="hud-wire" d="M 12 20 L 12 75" stroke-width="0.5" stroke-dasharray="1,2"/><path class="hud-wire" d="M 88 15 L 88 80" stroke-width="0.5" stroke-dasharray="1,2"/><path class="hud-wire" d="M 12 20 C 50 0, 50 0, 88 15" stroke-width="0.5" stroke-dasharray="2,3"/></svg>',

        ps_devops: '<svg class="panel-svg-bg svg-theme-ps" viewBox="0 0 100 100" fill="none" stroke="currentColor" preserveAspectRatio="xMidYMid meet"><line class="hud-axis" x1="50" y1="8" x2="50" y2="92" stroke-width="0.5" stroke-dasharray="1,4"/><line class="hud-axis" x1="8" y1="50" x2="92" y2="50" stroke-width="0.5" stroke-dasharray="1,4"/><circle class="hud-grid" cx="50" cy="50" r="40" stroke-width="0.6" stroke-dasharray="2,2"/><path class="hud-accent" d="M38 30 C30 30, 32 38, 32 50 C 32 62, 30 70, 38 70" stroke-width="1.2" stroke-linecap="round"/><path class="hud-accent" d="M62 30 C70 30, 68 38, 68 50 C 68 62, 70 70, 62 70" stroke-width="1.2" stroke-linecap="round"/><path class="hud-accent" d="M42 43 L48 50 L42 57" stroke-width="1.2" stroke-linecap="round"/><line class="hud-accent" x1="50" y1="57" x2="58" y2="57" stroke-width="1.5" stroke-linecap="round"/><line class="hud-wire" x1="32" y1="50" x2="12" y2="50" stroke-width="0.8"/><circle class="hud-node" cx="12" cy="50" r="2.5" fill="currentColor"/><line class="hud-wire" x1="68" y1="50" x2="88" y2="50" stroke-width="0.8"/><circle class="hud-node" cx="88" cy="50" r="2.5" fill="currentColor"/><line class="hud-wire" x1="50" y1="30" x2="50" y2="12" stroke-width="0.8"/><circle class="hud-node" cx="50" cy="12" r="2" fill="currentColor"/><line class="hud-wire" x1="50" y1="70" x2="50" y2="88" stroke-width="0.8"/><circle class="hud-node" cx="50" cy="88" r="2" fill="currentColor"/></svg>',

        diag_ui: '<svg class="panel-svg-bg svg-theme-diag" viewBox="0 0 100 100" fill="none" stroke="currentColor" preserveAspectRatio="xMidYMid meet"><line class="hud-axis" x1="50" y1="8" x2="50" y2="92" stroke-width="0.5" stroke-dasharray="1,4"/><line class="hud-axis" x1="8" y1="50" x2="92" y2="50" stroke-width="0.5" stroke-dasharray="1,4"/><circle class="hud-grid" cx="50" cy="50" r="40" stroke-width="0.6" stroke-dasharray="2,2"/><rect class="hud-accent" x="25" y="30" width="50" height="40" rx="2" stroke-width="1.2" fill="none"/><line class="hud-accent" x1="25" y1="38" x2="75" y2="38" stroke-width="0.8"/><circle class="hud-node" cx="31" cy="34" r="1" fill="currentColor"/><circle class="hud-node" cx="35" cy="34" r="1" fill="currentColor"/><path class="hud-accent" d="M 30 60 L 40 45 L 48 65 L 56 50 L 64 62 L 70 55" stroke-width="1.2" stroke-linecap="round"/><line class="hud-wire" x1="25" y1="50" x2="12" y2="35" stroke-width="0.8"/><circle class="hud-node" cx="12" cy="35" r="2" fill="currentColor"/><line class="hud-wire" x1="25" y1="60" x2="12" y2="65" stroke-width="0.8"/><circle class="hud-node" cx="12" cy="65" r="2" fill="currentColor"/><line class="hud-wire" x1="75" y1="50" x2="88" y2="35" stroke-width="0.8"/><circle class="hud-node" cx="88" cy="35" r="2" fill="currentColor"/><line class="hud-wire" x1="75" y1="60" x2="88" y2="65" stroke-width="0.8"/><circle class="hud-node" cx="88" cy="65" r="2" fill="currentColor"/></svg>',

        sys_fix: '<svg class="panel-svg-bg svg-theme-critical" viewBox="0 0 100 100" fill="none" stroke="currentColor" preserveAspectRatio="xMidYMid meet"><line class="hud-axis" x1="50" y1="8" x2="50" y2="92" stroke-width="0.5" stroke-dasharray="1,4"/><line class="hud-axis" x1="8" y1="50" x2="92" y2="50" stroke-width="0.5" stroke-dasharray="1,4"/><circle class="hud-grid" cx="50" cy="50" r="40" stroke-width="0.6" stroke-dasharray="2,2"/><path class="hud-accent" d="M30 30 L50 22 L70 30 L70 52 C70 65, 50 78, 50 78 C50 78, 30 65, 30 52 Z" stroke-width="1.2"/><circle class="hud-accent" cx="50" cy="46" r="10" stroke-width="1"/><path class="hud-accent" d="M50 32 L50 35 M50 57 L50 60 M39 46 L42 46 M58 46 L61 46 M42 38 L44 40 M58 54 L60 56 M42 54 L44 52 M58 38 L60 40" stroke-width="2" stroke-linecap="round"/><line class="hud-wire" x1="30" y1="30" x2="12" y2="20" stroke-width="0.8"/><circle class="hud-node" cx="12" cy="20" r="2.5" fill="currentColor"/><line class="hud-wire" x1="70" y1="30" x2="88" y2="20" stroke-width="0.8"/><circle class="hud-node" cx="88" cy="20" r="2.5" fill="currentColor"/><line class="hud-wire" x1="50" y1="78" x2="50" y2="90" stroke-width="0.8"/><circle class="hud-node" cx="50" cy="90" r="2" fill="currentColor"/></svg>',

        net_repair: '<svg class="panel-svg-bg" viewBox="0 0 100 100" fill="none" stroke="currentColor" preserveAspectRatio="xMidYMid meet"><line class="hud-axis" x1="50" y1="8" x2="50" y2="92" stroke-width="0.5" stroke-dasharray="1,4"/><line class="hud-axis" x1="8" y1="50" x2="92" y2="50" stroke-width="0.5" stroke-dasharray="1,4"/><circle class="hud-grid" cx="50" cy="50" r="40" stroke-width="0.6" stroke-dasharray="2,2"/><path class="hud-accent" d="M30 40 A28 28 0 0 1 70 40" stroke-width="1.2" stroke-linecap="round"/><path class="hud-accent" d="M37 49 A18 18 0 0 1 63 49" stroke-width="1.2" stroke-linecap="round"/><path class="hud-accent" d="M44 58 A8 8 0 0 1 56 58" stroke-width="1.2" stroke-linecap="round"/><circle class="hud-node" cx="50" cy="65" r="2" fill="currentColor"/><rect class="hud-accent" x="30" y="70" width="40" height="12" rx="1" stroke-width="1"/><circle class="hud-node" cx="36" cy="76" r="1" fill="currentColor"/><circle class="hud-node" cx="41" cy="76" r="1" fill="currentColor"/><line class="hud-wire" x1="30" y1="40" x2="12" y2="35" stroke-width="0.8"/><circle class="hud-node" cx="12" cy="35" r="2" fill="currentColor"/><line class="hud-wire" x1="70" y1="40" x2="88" y2="35" stroke-width="0.8"/><circle class="hud-node" cx="88" cy="35" r="2" fill="currentColor"/></svg>',

        diag_hw: '<svg class="panel-svg-bg svg-theme-diag" viewBox="0 0 100 100" fill="none" stroke="currentColor" preserveAspectRatio="xMidYMid meet"><line class="hud-axis" x1="50" y1="8" x2="50" y2="92" stroke-width="0.5" stroke-dasharray="1,4"/><line class="hud-axis" x1="8" y1="50" x2="92" y2="50" stroke-width="0.5" stroke-dasharray="1,4"/><circle class="hud-grid" cx="50" cy="50" r="40" stroke-width="0.6" stroke-dasharray="2,2"/><rect class="hud-accent" x="30" y="30" width="40" height="40" rx="3" stroke-width="1.5" fill="none"/><rect class="hud-accent" x="42" y="42" width="16" height="16" stroke-width="1"/><line class="hud-wire" x1="20" y1="35" x2="30" y2="35" stroke-width="1"/><circle class="hud-node" cx="16" cy="35" r="1.5" fill="currentColor"/><line class="hud-wire" x1="20" y1="50" x2="30" y2="50" stroke-width="1"/><circle class="hud-node" cx="16" cy="50" r="1.5" fill="currentColor"/><line class="hud-wire" x1="20" y1="65" x2="30" y2="65" stroke-width="1"/><circle class="hud-node" cx="16" cy="65" r="1.5" fill="currentColor"/><line class="hud-wire" x1="70" y1="35" x2="80" y2="35" stroke-width="1"/><circle class="hud-node" cx="84" cy="35" r="1.5" fill="currentColor"/><line class="hud-wire" x1="70" y1="50" x2="80" y2="50" stroke-width="1"/><circle class="hud-node" cx="84" cy="50" r="1.5" fill="currentColor"/><line class="hud-wire" x1="70" y1="65" x2="80" y2="65" stroke-width="1"/><circle class="hud-node" cx="84" cy="65" r="1.5" fill="currentColor"/><line class="hud-wire" x1="38" y1="20" x2="38" y2="30" stroke-width="1"/><circle class="hud-node" cx="38" cy="16" r="1.5" fill="currentColor"/><line class="hud-wire" x1="50" y1="20" x2="50" y2="30" stroke-width="1"/><circle class="hud-node" cx="50" cy="16" r="1.5" fill="currentColor"/><line class="hud-wire" x1="62" y1="20" x2="62" y2="30" stroke-width="1"/><circle class="hud-node" cx="62" cy="16" r="1.5" fill="currentColor"/><line class="hud-wire" x1="38" y1="70" x2="38" y2="80" stroke-width="1"/><circle class="hud-node" cx="38" cy="84" r="1.5" fill="currentColor"/><line class="hud-wire" x1="50" y1="70" x2="50" y2="80" stroke-width="1"/><circle class="hud-node" cx="50" cy="84" r="1.5" fill="currentColor"/><line class="hud-wire" x1="62" y1="70" x2="62" y2="80" stroke-width="1"/><circle class="hud-node" cx="62" cy="84" r="1.5" fill="currentColor"/></svg>',

        cmd_daily: '<svg class="panel-svg-bg svg-theme-daily" viewBox="0 0 100 100" fill="none" stroke="currentColor" preserveAspectRatio="xMidYMid meet"><line class="hud-axis" x1="50" y1="8" x2="50" y2="92" stroke-width="0.5" stroke-dasharray="1,4"/><line class="hud-axis" x1="8" y1="50" x2="92" y2="50" stroke-width="0.5" stroke-dasharray="1,4"/><circle class="hud-grid" cx="50" cy="50" r="40" stroke-width="0.6" stroke-dasharray="2,2"/><rect class="hud-accent" x="25" y="32" width="50" height="36" rx="2" stroke-width="1.2"/><path class="hud-accent" d="M31 44 L37 50 L31 56" stroke-width="1.2" stroke-linecap="round"/><line class="hud-accent" x1="40" y1="56" x2="52" y2="56" stroke-width="1.5" stroke-linecap="round"/><path class="hud-accent" d="M 68 20 L 53 43 L 64 43 L 49 70 L 76 37 L 65 37 Z" fill="none" stroke-width="1"/><line class="hud-wire" x1="25" y1="50" x2="12" y2="50" stroke-width="0.8"/><circle class="hud-node" cx="12" cy="50" r="2.5" fill="currentColor"/></svg>',

        winget_pkg: '<svg class="panel-svg-bg svg-theme-winget" viewBox="0 0 100 100" fill="none" stroke="currentColor" preserveAspectRatio="xMidYMid meet"><line class="hud-axis" x1="50" y1="8" x2="50" y2="92" stroke-width="0.5" stroke-dasharray="1,4"/><line class="hud-axis" x1="8" y1="50" x2="92" y2="50" stroke-width="0.5" stroke-dasharray="1,4"/><circle class="hud-grid" cx="50" cy="50" r="40" stroke-width="0.6" stroke-dasharray="2,2"/><path class="hud-accent" d="M50 25 L75 38 L75 68 L50 81 L25 68 L25 38 Z" stroke-width="1.2"/><path class="hud-accent" d="M50 25 L50 81 M50 53 L25 38 M50 53 L75 38" stroke-width="1"/><path class="hud-accent" d="M50 4 L50 18 M45 13 L50 18 L55 13" stroke-width="1.5" stroke-linecap="round"/><line class="hud-wire" x1="25" y1="53" x2="10" y2="53" stroke-width="0.8"/><circle class="hud-node" cx="10" cy="53" r="2" fill="currentColor"/><line class="hud-wire" x1="75" y1="53" x2="90" y2="53" stroke-width="0.8"/><circle class="hud-node" cx="90" cy="53" r="2" fill="currentColor"/></svg>',

        maint_policy: '<svg class="panel-svg-bg svg-theme-maint" viewBox="0 0 100 100" fill="none" stroke="currentColor" preserveAspectRatio="xMidYMid meet"><line class="hud-axis" x1="50" y1="8" x2="50" y2="92" stroke-width="0.5" stroke-dasharray="1,4"/><line class="hud-axis" x1="8" y1="50" x2="92" y2="50" stroke-width="0.5" stroke-dasharray="1,4"/><circle class="hud-grid" cx="50" cy="50" r="40" stroke-width="0.6" stroke-dasharray="2,2"/><rect class="hud-accent" x="28" y="22" width="34" height="46" rx="2" stroke-width="1.2"/><line class="hud-accent" x1="36" y1="32" x2="54" y2="32" stroke-width="0.8"/><line class="hud-accent" x1="36" y1="40" x2="54" y2="40" stroke-width="0.8"/><line class="hud-accent" x1="36" y1="48" x2="46" y2="48" stroke-width="0.8"/><rect class="hud-accent" x="50" y="52" width="22" height="16" rx="1.5" stroke-width="1" fill="var(--panel)"/><path class="hud-accent" d="M55 52 L55 46 C55 41, 67 41, 67 46 L67 52" stroke-width="1"/><circle class="hud-node" cx="61" cy="60" r="1" fill="currentColor"/><line class="hud-wire" x1="28" y1="45" x2="12" y2="45" stroke-width="0.8"/><circle class="hud-node" cx="12" cy="45" r="2.5" fill="currentColor"/><line class="hud-wire" x1="62" y1="22" x2="78" y2="15" stroke-width="0.8"/><circle class="hud-node" cx="78" cy="15" r="2" fill="currentColor"/></svg>',

        ps_adv: '<svg class="panel-svg-bg svg-theme-ps" viewBox="0 0 100 100" fill="none" stroke="currentColor" preserveAspectRatio="xMidYMid meet"><line class="hud-axis" x1="50" y1="8" x2="50" y2="92" stroke-width="0.5" stroke-dasharray="1,4"/><line class="hud-axis" x1="8" y1="50" x2="92" y2="50" stroke-width="0.5" stroke-dasharray="1,4"/><circle class="hud-grid" cx="50" cy="50" r="40" stroke-width="0.6" stroke-dasharray="2,2"/><rect class="hud-accent" x="25" y="28" width="50" height="44" rx="2" stroke-width="1.2"/><text class="hud-accent" x="32" y="55" font-family="monospace" font-size="24" font-weight="900" fill="currentColor" stroke="none">$</text><line class="hud-accent" x1="50" y1="36" x2="68" y2="36" stroke-width="0.8"/><line class="hud-accent" x1="50" y1="44" x2="68" y2="44" stroke-width="0.8"/><circle class="hud-accent" cx="50" cy="58" r="3"/><circle class="hud-accent" cx="62" cy="58" r="3"/><line class="hud-wire" x1="25" y1="50" x2="12" y2="50" stroke-width="0.8"/><circle class="hud-node" cx="12" cy="50" r="2.5" fill="currentColor"/><line class="hud-wire" x1="75" y1="50" x2="88" y2="50" stroke-width="0.8"/><circle class="hud-node" cx="88" cy="50" r="2.5" fill="currentColor"/></svg>',

        safe_mode: '<svg class="panel-svg-bg svg-theme-critical" viewBox="0 0 100 100" fill="none" stroke="currentColor" preserveAspectRatio="xMidYMid meet"><line class="hud-axis" x1="50" y1="8" x2="50" y2="92" stroke-width="0.5" stroke-dasharray="1,4"/><line class="hud-axis" x1="8" y1="50" x2="92" y2="50" stroke-width="0.5" stroke-dasharray="1,4"/><circle class="hud-grid" cx="50" cy="50" r="40" stroke-width="0.6" stroke-dasharray="2,2"/><circle class="hud-accent" cx="50" cy="50" r="24" stroke-width="1.5"/><circle class="hud-accent" cx="50" cy="50" r="12" stroke-width="1"/><line class="hud-accent" x1="50" y1="26" x2="50" y2="38" stroke-width="2"/><line class="hud-accent" x1="50" y1="62" x2="50" y2="74" stroke-width="2"/><line class="hud-accent" x1="26" y1="50" x2="38" y2="50" stroke-width="2"/><line class="hud-accent" x1="62" y1="50" x2="74" y2="50" stroke-width="2"/><path class="hud-wire" d="M 20 80 L 80 80 M 30 80 L 40 90 M 50 80 L 60 90 M 70 80 L 80 90" stroke-width="0.8"/><line class="hud-wire" x1="26" y1="50" x2="12" y2="35" stroke-width="0.8"/><circle class="hud-node" cx="12" cy="35" r="2" fill="currentColor"/><line class="hud-wire" x1="74" y1="50" x2="88" y2="35" stroke-width="0.8"/><circle class="hud-node" cx="88" cy="35" r="2" fill="currentColor"/></svg>',

        reset_dns: '<svg class="panel-svg-bg svg-theme-net" viewBox="0 0 100 100" fill="none" stroke="currentColor" preserveAspectRatio="xMidYMid meet"><line class="hud-axis" x1="50" y1="8" x2="50" y2="92" stroke-width="0.5" stroke-dasharray="1,4"/><line class="hud-axis" x1="8" y1="50" x2="92" y2="50" stroke-width="0.5" stroke-dasharray="1,4"/><circle class="hud-grid" cx="50" cy="50" r="40" stroke-width="0.6" stroke-dasharray="2,2"/><circle class="hud-accent" cx="50" cy="50" r="18" stroke-width="1" stroke-dasharray="2,1"/><ellipse class="hud-accent" cx="50" cy="50" rx="18" ry="6"/><ellipse class="hud-accent" cx="50" cy="50" rx="6" ry="18"/><path class="hud-accent" d="M 24 50 A 26 26 0 1 1 50 76" stroke-width="1.2"/><path class="hud-accent" d="M 76 50 A 26 26 0 1 1 50 24" stroke-width="1.2"/><polygon class="hud-node" points="50,80 54,72 46,72" fill="currentColor"/><polygon class="hud-node" points="50,20 54,28 46,28" fill="currentColor"/><line class="hud-wire" x1="24" y1="50" x2="10" y2="50" stroke-width="0.8"/><circle class="hud-node" cx="10" cy="50" r="2.5" fill="currentColor"/></svg>',

        event_logs: '<svg class="panel-svg-bg svg-theme-diag" viewBox="0 0 100 100" fill="none" stroke="currentColor" preserveAspectRatio="xMidYMid meet"><line class="hud-axis" x1="50" y1="8" x2="50" y2="92" stroke-width="0.5" stroke-dasharray="1,4"/><line class="hud-axis" x1="8" y1="50" x2="92" y2="50" stroke-width="0.5" stroke-dasharray="1,4"/><circle class="hud-grid" cx="50" cy="50" r="40" stroke-width="0.6" stroke-dasharray="2,2"/><circle class="hud-accent" cx="36" cy="42" r="15" stroke-width="1"/><line class="hud-accent" x1="36" y1="42" x2="36" y2="32" stroke-width="1.2"/><line class="hud-accent" x1="36" y1="42" x2="45" y2="42" stroke-width="1.2"/><rect class="hud-accent" x="52" y="32" width="26" height="36" rx="1" stroke-width="1.2"/><line class="hud-accent" x1="57" y1="40" x2="73" y2="40" stroke-width="0.8"/><line class="hud-accent" x1="57" y1="48" x2="73" y2="48" stroke-width="0.8"/><line class="hud-accent" x1="57" y1="56" x2="67" y2="56" stroke-width="0.8"/><line class="hud-wire" x1="21" y1="42" x2="10" y2="42" stroke-width="0.8"/><circle class="hud-node" cx="10" cy="42" r="2" fill="currentColor"/><line class="hud-wire" x1="78" y1="50" x2="90" y2="50" stroke-width="0.8"/><circle class="hud-node" cx="90" cy="50" r="2" fill="currentColor"/></svg>',

        printers_devices: '<svg class="panel-svg-bg svg-theme-maint" viewBox="0 0 100 100" fill="none" stroke="currentColor" preserveAspectRatio="xMidYMid meet"><line class="hud-axis" x1="50" y1="8" x2="50" y2="92" stroke-width="0.5" stroke-dasharray="1,4"/><line class="hud-axis" x1="8" y1="50" x2="92" y2="50" stroke-width="0.5" stroke-dasharray="1,4"/><circle class="hud-grid" cx="50" cy="50" r="40" stroke-width="0.6" stroke-dasharray="2,2"/><path class="hud-accent" d="M 32 46 L 68 46 L 72 64 L 28 64 Z" stroke-width="1.2"/><rect class="hud-accent" x="40" y="28" width="20" height="18" rx="1" stroke-width="0.8"/><line class="hud-accent" x1="44" y1="34" x2="56" y2="34" stroke-width="0.6"/><line class="hud-accent" x1="44" y1="40" x2="56" y2="40" stroke-width="0.6"/><rect class="hud-accent" x="36" y="64" width="28" height="12" rx="1" stroke-width="0.8"/><path class="hud-wire" d="M 16 50 C 16 38, 28 38, 28 46" stroke-width="0.8" stroke-dasharray="2,2"/><circle class="hud-node" cx="16" cy="50" r="2" fill="currentColor"/></svg>',

        troubleshoot: '<svg class="panel-svg-bg svg-theme-critical" viewBox="0 0 100 100" fill="none" stroke="currentColor" preserveAspectRatio="xMidYMid meet"><line class="hud-axis" x1="50" y1="8" x2="50" y2="92" stroke-width="0.5" stroke-dasharray="1,4"/><line class="hud-axis" x1="8" y1="50" x2="92" y2="50" stroke-width="0.5" stroke-dasharray="1,4"/><circle class="hud-grid" cx="50" cy="50" r="40" stroke-width="0.6" stroke-dasharray="2,2"/><circle class="hud-accent" cx="44" cy="44" r="16" stroke-width="1.2"/><line class="hud-accent" x1="55" y1="55" x2="76" y2="76" stroke-width="2.5" stroke-linecap="round"/><rect class="hud-accent" x="41" y="38" width="6" height="12" rx="2" stroke-width="0.8" fill="none"/><circle class="hud-node" cx="44" cy="35" r="1.5" fill="currentColor"/><path class="hud-accent" d="M 36 40 L 41 41 M 35 44 L 41 44 M 36 48 L 41 47 M 52 40 L 47 41 M 53 44 L 47 44 M 52 48 L 47 47" stroke-width="0.8"/><line class="hud-wire" x1="76" y1="76" x2="88" y2="88" stroke-width="0.8"/><circle class="hud-node" cx="88" cy="88" r="2.5" fill="currentColor"/><line class="hud-wire" x1="28" y1="44" x2="12" y2="44" stroke-width="0.8"/><circle class="hud-node" cx="12" cy="44" r="2.5" fill="currentColor"/></svg>'
    };

    function getPanelSvg(moduleId) {
        return MODULE_PANEL_SVGS[moduleId] || '';
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

    function showToast(message, durationMs) {
        const t = toastEl();
        if (!t) return;
        t.textContent = message;
        t.style.display = "block";
        clearTimeout(showToast._timer);
        showToast._timer = setTimeout(function () {
            t.style.display = "none";
        }, durationMs || 2800);
    }

    function utf8ToBase64(str) {
        const bytes = new TextEncoder().encode(str);
        let bin = "";
        for (let i = 0; i < bytes.length; i++) {
            bin += String.fromCharCode(bytes[i]);
        }
        return btoa(bin);
    }

    function isPowerShellCmd(cmd) {
        const s = (cmd || "").trim();
        if (!s) return false;
        if (
            /^(Get-|Set-|Start-|Stop-|Invoke-|Test-|New-|Remove-|Import-|Export-|Resolve-|Find-|Select-|Where-|ForEach-|Out-|Write-|Clear-|Add-|Connect-|Disconnect-|Enable-|Disable-|Restart-|Compare-|Convert-|Format-|Measure-|Sort-|Group-|Wait-|Enter-|Push-|Pop-|Update-|Install-|Uninstall-|winget\s)/i.test(
                s
            )
        ) {
            return true;
        }
        if (/\$[a-zA-Z_]/.test(s)) return true;
        if (/^\[CmdletBinding/i.test(s)) return true;
        if (/\|\s*(Where-Object|ForEach-Object|Select-Object|Sort-Object)/i.test(s)) {
            return true;
        }
        return false;
    }

    function openInTerminal(cmd, options) {
        if (!cmd) return;
        const opts = options || {};
        const asAdmin = !!opts.admin;
        const shell = isPowerShellCmd(cmd) ? "ps" : "cmd";
        let uri;
        try {
            uri =
                "clitoolkit://run/?cmd=" +
                encodeURIComponent(utf8ToBase64(cmd)) +
                "&shell=" +
                shell +
                (asAdmin ? "&admin=1" : "");
        } catch (e) {
            showToast("Nie udało się przygotować URI terminala.");
            return;
        }
        const a = document.createElement("a");
        a.href = uri;
        a.rel = "noopener";
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        if (asAdmin) {
            showToast(
                "OTWIERAM JAKO ADMIN (UAC)… Alt+klik = użytkownik, Alt+Shift+klik = admin.",
                3800
            );
        } else {
            showToast(
                "OTWIERAM TERMINAL (użytkownik)… Alt+Shift+klik = administrator.",
                3600
            );
        }
    }

    function copyToClipboard(text, silent) {
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        if (!silent) {
            showToast("COPIED: " + text);
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
            li.addEventListener("click", function (e) {
                const cmd = item.cmd || "";
                if (e.altKey) {
                    e.preventDefault();
                    openInTerminal(cmd, { admin: e.shiftKey });
                    return;
                }
                copyToClipboard(cmd);
            });
            li.setAttribute(
                "title",
                "Klik: kopiuj | Alt+klik: terminal (użytkownik) | Alt+Shift+klik: terminal (administrator)"
            );
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
    let gridIntroComplete = false;

    function scheduleGridIntro(root) {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const quick = gridIntroComplete;

        root.classList.remove("grid-intro-ready", "grid-rebuild");
        root.classList.add("grid-intro-pending");
        if (quick) root.classList.add("grid-rebuild");

        const finish = function () {
            if (!root.querySelector(".panel.active")) {
                const first = root.querySelector(".panel");
                if (first) first.classList.add("active");
            }
            root.classList.remove("grid-intro-pending");
            void root.offsetWidth;
            root.classList.add("grid-intro-ready");
            gridIntroComplete = true;
            document.documentElement.classList.remove("page-boot");
            document.documentElement.classList.add("page-ready");
            const guard = document.getElementById("boot-guard");
            if (guard) guard.remove();
        };

        if (reduceMotion) {
            finish();
            return;
        }

        requestAnimationFrame(function () {
            requestAnimationFrame(finish);
        });
    }

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

        if (modules.length === 0) {
            const empty = document.createElement("div");
            empty.className = "cli-empty-panels";
            empty.textContent =
                "Brak modułów pasujących do zapytania. Wyczyść wyszukiwarkę (Ctrl+K) lub zmień frazę.";
            root.appendChild(empty);
            scheduleGridIntro(root);
            updateFooter(queryStr);
            return;
        }

        modules.forEach(function (item, index) {
            const panel = document.createElement("div");
            panel.className = "panel";
            panel.dataset.panelId = item.id;
            panel.style.setProperty("--panel-stagger", String(index));

            const panelSvg = getPanelSvg(item.id);
            panel.innerHTML =
                '<div class="corner corner-tl"></div>' +
                '<div class="corner corner-br"></div>' +
                panelSvg +
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

            const activate = function () {
                document.querySelectorAll("#grid-root .panel").forEach(function (p) {
                    p.classList.remove("active");
                });
                panel.classList.add("active");
            };

            const openModule = function () {
                activate();
                navigateToModule(item);
            };

            panel.addEventListener("click", function (e) {
                if (e.target.closest("[data-open-subpage]")) return;
                activate();
            });

            const btn = panel.querySelector("[data-open-subpage]");
            if (btn) {
                btn.addEventListener("click", function (e) {
                    e.stopPropagation();
                    openModule();
                });
            }

            root.appendChild(panel);
        });

        if (typeof lucide !== "undefined") lucide.createIcons();
        scheduleGridIntro(root);
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