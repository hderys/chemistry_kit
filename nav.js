// nav.js - 統一管理所有練習頁面的下拉選單
const PAGES = [
    { id: 'home', label_zh: '🏠 返回目錄', label_en: '🏠 Home' },
    { id: 'ch1', label_zh: '⚗️ 儀器與標籤 (Ch.1)', label_en: '⚗️ Apparatus & Labels (Ch.1)' },
    { id: 'ch2', label_zh: '🔬 特性變化分類 (Ch.2)', label_en: '🔬 Properties & Changes (Ch.2)' },
    { id: 'detective', label_zh: '🕵️ 偵探訓練 (分析化學)', label_en: '🕵️ Detective Training (Analytical)' },
    { id: 'ions', label_zh: '🧪 離子與化合物 (Ch.7)', label_en: '🧪 Ionic Compounds (Ch.7)' },
    { id: 'structure', label_zh: '🏗️ 結構 (Ch.9)', label_en: '🏗️ Structure (Ch.9)' },
    { id: 'rxn', label_zh: '⚙️ 金屬反應 (Ch.11)', label_en: '⚙️ Metal Reactions (Ch.11)' },
];

// 🔧 強化版：從多個來源偵測語言
function getCurrentLanguage() {
    // 優先使用頁面已定義的 currentLang
    if (typeof currentLang !== 'undefined' && currentLang) {
        return currentLang;
    }
    // 其次從 URL 參數讀取
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    if (urlLang === 'zh' || urlLang === 'en') {
        return urlLang;
    }
    // 再從 localStorage 讀取
    const stored = localStorage.getItem('nav_lang');
    if (stored === 'zh' || stored === 'en') {
        return stored;
    }
    // 最後 fallback 到瀏覽器語言
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('zh')) {
        return 'zh';
    }
    return 'en';
}

function initNavigation(currentPage) {
    const selector = document.getElementById('practiceSelector');
    if (!selector) {
        console.warn('⚠️ practiceSelector 不存在');
        return;
    }
    
    // 使用強化版語言偵測
    const lang = getCurrentLanguage();
    
    // 生成 options
    const html = PAGES.map(page => {
        const label = lang === 'zh' ? page.label_zh : page.label_en;
        const selected = (page.id === currentPage) ? ' selected' : '';
        return `<option value="${page.id}"${selected}>${label}</option>`;
    }).join('');
    
    selector.innerHTML = html;
    
    // 移除舊的 listener，避免重複綁定
    selector.onchange = null;
    selector.addEventListener('change', function() {
        const target = this.value;
        const lang = getCurrentLanguage();
        if (target === 'home') {
            window.location.href = 'index.html?lang=' + lang;
        } else {
            window.location.href = target + '.html?lang=' + lang;
        }
    });
}

// 🔧 新增：語言切換後更新下拉選單
function updateNavLanguage(lang) {
    localStorage.setItem('nav_lang', lang);
    const selector = document.getElementById('practiceSelector');
    if (!selector) return;
    
    const currentValue = selector.value;
    const html = PAGES.map(page => {
        const label = lang === 'zh' ? page.label_zh : page.label_en;
        const selected = (page.id === currentValue) ? ' selected' : '';
        return `<option value="${page.id}"${selected}>${label}</option>`;
    }).join('');
    selector.innerHTML = html;
    selector.value = currentValue;
}