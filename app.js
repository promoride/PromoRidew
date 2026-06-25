// === MOCK DATA (MyLead Offers) ===
const products = [
    {
        id: 1,
        title: "Hulajnoga Elektryczna Xiaomi Mi Pro 2",
        category: "Hulajnogi",
        price: "1899 PLN",
        image: "https://images.unsplash.com/photo-1595822527038-0fc3f0bc3338?auto=format&fit=crop&q=80&w=400",
        description: "Najlepsza hulajnoga do dojazdów do pracy. Zasięg do 45 km, maksymalna prędkość 25 km/h.",
        reflink: "https://mylead.global/sl/xiaomi-pro-2-mock",
        commission: "8%",
        stores: [
            { name: "MediaExpert", price: "1899 PLN", url: "https://mylead.global/sl/xiaomi-pro-2-mock-me" },
            { name: "RTV Euro AGD", price: "1949 PLN", url: "https://mylead.global/sl/xiaomi-pro-2-mock-rtv" },
            { name: "Allegro", price: "1850 PLN", url: "https://mylead.global/sl/xiaomi-pro-2-mock-allegro" }
        ]
    },
    {
        id: 2,
        title: "Rower Elektryczny Engwe EP-2 Pro",
        category: "Rowery",
        price: "4299 PLN",
        image: "https://images.unsplash.com/photo-1572584642822-6f8de0243c93?auto=format&fit=crop&q=80&w=400",
        description: "Składany fatbike elektryczny o mocy 750W. Idealny w każdy teren.",
        reflink: "https://mylead.global/sl/engwe-mock",
        commission: "10%",
        stores: [
            { name: "Geekbuying", price: "4299 PLN", url: "https://mylead.global/sl/engwe-mock-gb" },
            { name: "Banggood", price: "4400 PLN", url: "https://mylead.global/sl/engwe-mock-bg" }
        ]
    },
    {
        id: 3,
        title: "Słuchawki Sony WH-1000XM5",
        category: "RTV",
        price: "1399 PLN",
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=400",
        description: "Najlepsza redukcja hałasu na rynku. Niesamowita jakość dźwięku.",
        reflink: "https://mylead.global/sl/sony-xm5-mock",
        commission: "5%",
        stores: [
            { name: "Sony Center", price: "1499 PLN", url: "https://mylead.global/sl/sony-xm5-mock-sc" },
            { name: "Amazon", price: "1399 PLN", url: "https://mylead.global/sl/sony-xm5-mock-amz" }
        ]
    },
    {
        id: 4,
        title: "Cyberpunk 2077 (Steam Key)",
        category: "Steam",
        price: "120 PLN",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400",
        description: "Klucz Steam do jednej z najbardziej wciągających gier RPG od CD Projekt RED.",
        reflink: "https://mylead.global/sl/cp2077-mock",
        commission: "15%",
        stores: [
            { name: "Kinguin", price: "120 PLN", url: "https://mylead.global/sl/cp2077-mock-kinguin" },
            { name: "G2A", price: "125 PLN", url: "https://mylead.global/sl/cp2077-mock-g2a" },
            { name: "Steam", price: "199 PLN", url: "https://mylead.global/sl/cp2077-mock-steam" }
        ]
    }
];

// === ROUTING & VIEWS ===
const appContent = document.getElementById('app-content');
    
const views = {
    home: () => {
        currentCategory = 'Wszystkie'; // Reset kategorii przy wejściu na home
        return `
        <section class="hero">
            <h1>Znajdź, Oszczędź, Zarabiaj</h1>
            <p>Najlepsze oferty, kody rabatowe i reflinki (MyLead) na elektronikę, e-mobilność i gry Steam.</p>
            <div class="search-bar" style="position: relative;">
                <i data-lucide="search" class="search-icon"></i>
                <input type="text" id="search-input" class="search-input" placeholder="Szukaj hulajnogi, kluczy Steam..." autocomplete="off">
                <div id="search-dropdown" class="search-dropdown hidden"></div>
            </div>
        </section>
        
        <section class="section section-with-sidebar" style="display: flex; gap: 32px; align-items: flex-start;">
            <aside class="sidebar-categories" style="width: 250px; flex-shrink: 0;">
                <h3 style="margin-bottom: 16px;">Kategorie</h3>
                <ul class="category-list">
                    <li><button class="category-btn active" data-action="filter-category" data-val="Wszystkie">Wszystkie</button></li>
                    <li><button class="category-btn" data-action="filter-category" data-val="Hulajnogi">Hulajnogi</button></li>
                    <li><button class="category-btn" data-action="filter-category" data-val="Rowery">Rowery</button></li>
                    <li><button class="category-btn" data-action="filter-category" data-val="RTV">RTV</button></li>
                    <li><button class="category-btn" data-action="filter-category" data-val="Steam">Steam</button></li>
                </ul>
            </aside>
            <div style="flex: 1; min-width: 0; width: 100%;">
                <h2 class="section-title" style="text-align: left; margin-top: 0; margin-bottom: 24px;">Polecane <span>Oferty</span></h2>
                <div class="grid" id="products-grid" style="margin-top: 0;">
                    ${renderProducts(products)}
                </div>
            </div>
        </section>

        <section class="section" style="margin-top: 100px; margin-bottom: 60px; text-align: center;">
            <div class="calculator-box">
                <h2>Newsletter</h2>
                <p style="margin: 16px 0; opacity: 0.8;">Otrzymuj najświeższe okazje bezpośrednio na maila!</p>
                <div style="display: flex; flex-direction: column; gap: 8px; max-width: 400px; margin: 0 auto;">
                    <div style="display: flex; gap: 16px; justify-content: center;">
                        <input type="email" id="newsletter-email" placeholder="Twój e-mail" class="search-input" style="padding-left: 24px;">
                        <button class="btn btn-primary" id="newsletter-btn">Zapisz się</button>
                    </div>
                    <span id="newsletter-msg" style="font-size: 0.875rem; text-align: left; padding-left: 12px; min-height: 20px;"></span>
                </div>
            </div>
        </section>
    `},
    
    product: (id) => {
        const product = products.find(p => p.id === parseInt(id));
        if (!product) return `<h2>Nie znaleziono produktu</h2>`;
        
        return `
            <div style="margin-top: 16px; margin-bottom: 32px;">
                <button data-navigate="home" class="btn btn-secondary" style="padding: 8px 16px;">
                    <i data-lucide="arrow-left"></i> Wróć do ofert
                </button>
            </div>
            <div class="product-details">
                <div class="product-gallery">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <span class="badge">${product.category}</span>
                    <h1 style="margin-top: 16px;">${product.title}</h1>
                    <p>${product.description}</p>
                    
                    <div class="price-compare">
                        <h3 style="margin-bottom: 16px;">Porównanie Cen (Baza MyLead)</h3>
                        ${[...product.stores].sort((a, b) => parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, ''))).map(store => `
                            <a href="${store.url}" target="_blank" rel="nofollow noopener noreferrer" class="price-row" style="text-decoration: none; color: inherit; display: flex; justify-content: space-between; align-items: center; transition: all 0.2s; cursor: pointer;">
                                <span>${store.name}</span>
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <strong>${store.price}</strong>
                                    <i data-lucide="external-link" style="width: 16px; height: 16px; opacity: 0.5;"></i>
                                </div>
                            </a>
                        `).join('')}
                    </div>

                    <a href="${product.reflink}" target="_blank" rel="nofollow noopener noreferrer" class="btn btn-primary" style="width: 100%; font-size: 1.25rem; padding: 16px;">
                        <i data-lucide="shopping-cart"></i> Kup Najtaniej (Reflink)
                    </a>
                    <p style="text-align: center; margin-top: 12px; font-size: 0.875rem; opacity: 0.6;">
                        Kupując z tego linku wspierasz stronę. Prowizja dla twórcy: ${product.commission}
                    </p>
                </div>
            </div>
        `;
    },

    guides: () => `
        <section class="section" style="margin-top: 60px; margin-bottom: 80px;">
            <h1 class="section-title" style="margin-bottom: 40px;">Poradniki <span>Afiliacyjne</span></h1>
            <div class="calculator-box" style="text-align: left;">
                <h2>Jak zacząć zarabiać z reflinkami?</h2>
                <p style="margin: 16px 0; line-height: 1.6; opacity: 0.8;">
                    Afiliacja to proces promowania produktów innych firm i otrzymywania prowizji za każdą sprzedaż dokonaną za pośrednictwem Twojego unikalnego linku partnerskiego (tzw. reflinku).
                </p>
                <ol style="margin-left: 20px; line-height: 1.8; opacity: 0.8;">
                    <li><strong>Zarejestruj się w sieci:</strong> Polecamy MyLead, która jest jedną z największych sieci w Polsce.</li>
                    <li><strong>Wybierz program:</strong> Wyszukaj programy z branży RTV, e-mobility (hulajnogi) lub gamingowej (Klucze Steam).</li>
                    <li><strong>Wygeneruj link:</strong> Użyj panelu, aby stworzyć swój unikalny link do konkretnego produktu.</li>
                    <li><strong>Promuj mądrze:</strong> Wrzucaj linki na swoje social media, bloga lub grupę dyskusyjną. Pamiętaj o oznaczaniu postów jako sponsorowane!</li>
                </ol>
            </div>
        </section>
    `,

    calculator: () => `
        <section class="section" style="margin-top: 60px; margin-bottom: 80px;">
            <h1 class="section-title" style="margin-bottom: 40px;">Kalkulator <span>Zarobków</span></h1>
            <div class="calculator-box">
                <div class="calc-group">
                    <label>Szacowany miesięczny ruch (kliknięcia): <span id="traffic-val">1000</span></label>
                    <input type="range" id="traffic-slider" min="100" max="10000" step="100" value="1000" oninput="calculateEarnings()">
                </div>
                <div class="calc-group">
                    <label>Średnia prowizja (MyLead): <span id="commission-val">5%</span></label>
                    <input type="range" id="commission-slider" min="1" max="20" step="1" value="5" oninput="calculateEarnings()">
                </div>
                <div class="calc-group">
                    <label>Średnia cena produktu (PLN): <span id="price-val">2000</span></label>
                    <input type="range" id="price-slider" min="50" max="5000" step="50" value="2000" oninput="calculateEarnings()">
                </div>
                <div class="calc-group">
                    <label>Konwersja sprzedaży: 2% (Standard)</label>
                </div>
                <div class="calc-result">
                    <p style="opacity: 0.8; margin-bottom: 8px;">Potencjalny miesięczny zarobek:</p>
                    <h3 id="total-earnings">2000 PLN</h3>
                </div>
            </div>
        </section>
    `,

    terms: () => `
        <section class="section" style="margin-top: 60px; margin-bottom: 80px;">
            <h1 class="section-title" style="margin-bottom: 40px;">Regulamin</h1>
            <div class="calculator-box" style="text-align:left; opacity: 0.9; max-width: 800px; line-height: 1.8;">
                <h3 style="margin-bottom: 12px; color: var(--accent-primary);">1. Informacje ogólne</h3>
                <ul  style="margin-left: 20px; margin-bottom: 8px;">
                    <li style="margin-bottom: 8px;">
                        Niniejszy regulamin określa zasady korzystania z serwisu internetowego PromoRide. (dalej: „Serwis").
                    </li>
                    <li style="margin-bottom: 8px;">
                        Serwis jest prowadzony przez osobę prywatną i ma charakter informacyjno‑afiliacyjny.
                    </li>
                    <li style="margin-bottom: 8px;">
                        Serwis nie prowadzi sprzedaży produktów ani usług — wszystkie zakupy odbywają się wyłącznie na stronach partnerów.
                    </li>
                    <li style="margin-bottom: 24px;">
                        Korzystanie z Serwisu oznacza akceptację niniejszego regulaminu.
                    </li>
                </ul>
                
                <h3 style="margin-bottom: 12px; color: var(--accent-primary);">2. Zakres działania Serwisu</h3>
                <p style="margin-bottom: 8px;">Serwis prezentuje:</p>
                <ul style="margin-left: 20px; margin-bottom: 8px;">
                    <li>promocje i okazje cenowe,</li>
                    <li>zestawienia produktów,</li>
                    <li>informacje o elektronice, RTV, elektromobilności (hulajnogi elektryczne, rowery elektryczne itp.),</li>
                    <li>oferty na klucze i gry cyfrowe (np. Steam).</li>
                </ul>
                <p style="margin-bottom: 8px;">
                    Serwis nie jest sklepem internetowym — nie realizuje zamówień, nie przyjmuje płatności i nie odpowiada za proces zakupowy.
                </p>
                <p style="margin-bottom: 24px;">
                    Serwis nie gwarantuje dostępności, aktualności ani poprawności ofert prezentowanych na stronach partnerów.
                </p>

                <h3 style="margin-bottom: 12px; color: var(--accent-primary);">3. Linki afiliacyjne i współpraca z MyLead</h3>
                <p style="margin-bottom: 8px;">
                    Serwis współpracuje z siecią afiliacyjną <strong>MyLead</strong> oraz innymi programami partnerskimi.
                </p>
                <p style="margin-bottom: 8px;">
                    Kliknięcie w link afiliacyjny może skutkować naliczeniem prowizji dla autora Serwisu, <strong>bez wpływu na cenę produktu.</strong>
                </p>
                <p style="margin-bottom: 8px;">
                    Serwis nie ma wpływu na:
                </p>
                <ul style="margin-left: 20px; margin-bottom: 8px;">
                    <li>ceny produktów,</li>
                    <li>dostępność ofert,</li>
                    <li>warunki promocji,</li>
                    <li>politykę zwrotów i reklamacji sklepów zewnętrznych.</li>
                </ul>
                <p style="margin-bottom: 24px;">Informacje o ofertach mogą ulegać zmianom — Serwis nie gwarantuje ich aktualności w czasie rzeczywistym.</p>

                <h3 style="margin-bottom: 12px; color: var(--accent-primary);">4. Odpowiedzialność</h3>
                <p style="margin-bottom: 8px;">Serwis dokłada starań, aby treści były rzetelne, jednak nie gwarantuje ich pełnej poprawności.</p>
                <p style="margin-bottom: 8px;">Serwis nie ponosi odpowiedzialności za:</p>
                <ul style="margin-left: 20px; margin-bottom: 8px;">
                    <li>błędy w ofertach partnerów,</li>
                    <li>zmiany cen,</li>
                    <li>nieaktualne promocje,</li>
                    <li>szkody wynikłe z zakupów dokonanych u partnerów.</li>
                </ul>
                <p style="margin-bottom: 24px;">Użytkownik korzysta z Serwisu dobrowolnie i na własną odpowiedzialność.</p>

                <h3 style="margin-bottom: 12px; color: var(--accent-primary);">5. Prawa autorskie</h3>
                <ul style="margin-left: 20px; margin-bottom: 8px;">
                    <li style="margin-bottom: 8px;">Treści, grafiki i materiały opublikowane w Serwisie stanowią własność autora lub partnerów.</li>
                    <li style="margin-bottom: 24px;">Kopiowanie lub wykorzystywanie materiałów bez zgody autora jest zabronione.</li>
                </ul>

                <h3 style="margin-bottom: 12px; color: var(--accent-primary);">6. Pliki cookies i analityka</h3>
                <p style="margin-bottom: 8px;">Serwis wykorzystuje pliki cookies w celu:</p>
                <ul style="margin-left: 20px; margin-bottom: 8px;">
                    <li>prawidłowego działania strony,</li>
                    <li>analityki ruchu (np. Google Analytics),</li>
                    <li>obsługi linków afiliacyjnych.</li>
                </ul>
                <p style="margin-bottom: 8px;">Użytkownik może zarządzać cookies w ustawieniach przeglądarki.</p>
                <p style="margin-bottom: 24px;">Szczegółowe informacje znajdują się w Polityce Prywatności.</p>

                <h3 style="margin-bottom: 12px; color: var(--accent-primary);">7. Newsletter</h3>
                <ul style="margin-left: 20px; margin-bottom: 8px;">
                    <li style="margin-bottom: 8px;">Zapis do newslettera jest dobrowolny.</li>
                    <li style="margin-bottom: 8px;">Podanie adresu e‑mail oznacza zgodę na otrzymywanie informacji o nowych ofertach.</li>
                    <li style="margin-bottom: 24px;">Użytkownik może wypisać się w dowolnym momencie.</li>
                </ul>

                <h3 style="margin-bottom: 12px; color: var(--accent-primary);">8. Kontakt</h3>
                <p style="margin-bottom: 24px;">W sprawach związanych z Serwisem można kontaktować się pod adresem:<br><strong>promoride.kontakt@gmail.com</strong></p>

                <h3 style="margin-bottom: 12px; color: var(--accent-primary);">9. Postanowienia końcowe</h3>
                <ul style="margin-left: 20px; margin-bottom: 8px;">
                    <li style="margin-bottom: 8px;">Autor Serwisu zastrzega sobie prawo do zmiany regulaminu.</li>
                    <li style="margin-bottom: 8px;">Zmiany obowiązują od momentu publikacji na stronie.</li>
                    <li style="margin-bottom: 24px;">W sprawach nieuregulowanych zastosowanie mają przepisy prawa polskiego.</li>
                </ul>

                <h3 style="margin-bottom: 12px; color: var(--accent-primary);">10. Oświadczenie afiliacyjne</h3>
                <p>Serwis PromoRide. zawiera linki afiliacyjne. Kliknięcie w link i dokonanie zakupu może skutkować naliczeniem prowizji dla autora. Nie wpływa to na cenę produktu ani prawa konsumenta.</p>
            </div>
        </section>
    `,
    
    disclosure: () => `
    <section class="section">
        <h1 class="section-title">
            Oświadczenie Afiliacyjne
        </h1>
        <div class="calculator-box" style="text-align:left; opacity: 0.8;">
            <p style="line-height: 1.8;">
                Serwis PromoRide. zawiera linki afiliacyjne prowadzące do zewnętrznych sklepów, platform oraz programów partnerskich, w tym m.in. sieci MyLead. Oznacza to, że jeśli Użytkownik kliknie w link afiliacyjny i dokona zakupu lub wykona inną wymaganą akcję, autor Serwisu może otrzymać prowizję lub inne wynagrodzenie.

                Korzystanie z linków afiliacyjnych nie wpływa na cenę produktu, warunki zakupu ani prawa konsumenta.

                Serwis nie sprzedaje produktów, nie pośredniczy w transakcjach i nie odpowiada za proces zakupowy, dostępność ofert, ceny, promocje ani politykę zwrotów i reklamacji sklepów zewnętrznych.

                Wszystkie informacje publikowane w Serwisie mają charakter informacyjny i mogą ulegać zmianom. Użytkownik powinien każdorazowo sprawdzić aktualne   dane na stronie partnera, do której prowadzi link.
            </p>
        </div>
    </section>`,

    contact: () => `
    <section class="section">
        <h1 class="section-title">
            Kontakt
        </h1>
        <div class="calculator-box">
            <p style="line-height: 1.3;">
                W razie pytań zapraszamy do kontaktu na adres e-mail: <strong>promoride.kontakt@gmail.com</strong>
            </p>
        </div>
    </section>`
};

// === FUNCTIONS ===
let currentCategory = 'Wszystkie';

function filterCategory(category, buttonElement) {
    currentCategory = category;
    
    // Zaktualizuj styl aktywnego przycisku
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    if (buttonElement) {
        buttonElement.classList.add('active');
    }

    handleSearch();
}

function renderProducts(productsToRender) {
    if (productsToRender.length === 0) {
        return `<div class="empty-state">
            <i data-lucide="search-x"></i>
            <h3>Brak wyników</h3>
            <p>Nie znaleziono żadnych ofert pasujących do Twojego zapytania.</p>
        </div>`;
    }
    
    return productsToRender.map(p => `
        <div class="card" data-navigate="product" data-id="${p.id}">
            <div class="card-img-placeholder">
                <img src="${p.image}" alt="${p.title}">
            </div>
            <div class="card-content">
                <span class="badge" style="align-self: flex-start; margin-bottom: 12px;">${p.category}</span>
                <h3 class="card-title">${p.title}</h3>
                <div class="card-price">${p.price}</div>
                <div class="card-footer">
                    <span style="opacity: 0.6; font-size: 0.875rem;">Prowizja: ${p.commission}</span>
                    <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.875rem;">Zobacz</button>
                </div>
            </div>
        </div>
    `).join('');
}

function handleSearch() {
    const searchInput = document.getElementById('search-input');
    const term = searchInput ? searchInput.value.trim().toLowerCase() : '';
    
    const filtered = products.filter(p => {
        const matchesTerm = p.title.toLowerCase().includes(term) || p.category.toLowerCase().includes(term);
        const matchesCat = currentCategory === 'Wszystkie' || p.category === currentCategory;
        return matchesTerm && matchesCat;
    });
    
    const grid = document.getElementById('products-grid');
    if (grid) {
        grid.innerHTML = renderProducts(filtered);
        lucide.createIcons();
    }
}

function handleAutocomplete(rawTerm) {
    const term = rawTerm.trim().toLowerCase();
    const dropdown = document.getElementById('search-dropdown');
    if (!dropdown) return;
    
    if (term.length === 0) {
        dropdown.classList.add('hidden');
        return;
    }
    
    const filtered = products.filter(p => {
        const matchesTerm = p.title.toLowerCase().includes(term) || p.category.toLowerCase().includes(term);
        const matchesCat = currentCategory === 'Wszystkie' || p.category === currentCategory;
        return matchesTerm && matchesCat;
    });
    
    if (filtered.length === 0) {
        dropdown.innerHTML = `<div class="dropdown-item" style="opacity: 0.5; cursor: default;">Brak podpowiedzi</div>`;
    } else {
        dropdown.innerHTML = filtered.slice(0, 5).map(p => `
            <div class="dropdown-item" data-navigate="product" data-id="${p.id}">
                <img src="${p.image}" alt="${p.title}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;">
                <div style="flex: 1;">
                    <strong style="display: block; font-size: 0.875rem;">${p.title}</strong>
                    <span style="font-size: 0.75rem; color: var(--accent-primary); font-weight: 700;">${p.price}</span>
                </div>
            </div>
        `).join('');
    }
    
    dropdown.classList.remove('hidden');
}

function calculateEarnings() {
    const traffic = parseInt(document.getElementById('traffic-slider').value);
    const commission = parseInt(document.getElementById('commission-slider').value);
    const price = parseInt(document.getElementById('price-slider').value);
    
    document.getElementById('traffic-val').innerText = traffic;
    document.getElementById('commission-val').innerText = commission + '%';
    document.getElementById('price-val').innerText = price;
    
    // Obliczenia: Ruch * Konwersja (2%) * Średnia Cena * Prowizja
    const sales = traffic * 0.02;
    const earnings = sales * price * (commission / 100);
    
    document.getElementById('total-earnings').innerText = Math.round(earnings) + ' PLN';
}

function handleNewsletter() {
    const emailInput = document.getElementById('newsletter-email');
    const msgLabel = document.getElementById('newsletter-msg');
    const email = emailInput.value.trim();
    
    // Podstawowy regex do sprawdzania adresu e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email === '') {
        msgLabel.innerText = 'Adres e-mail nie może być pusty.';
        msgLabel.style.color = 'var(--danger)';
    } else if (!emailRegex.test(email)) {
        msgLabel.innerText = 'Podaj poprawny adres e-mail (np. jan@kowalski.pl).';
        msgLabel.style.color = 'var(--danger)';
    } else {
        msgLabel.innerText = 'Dziękujemy za zapis do newslettera!';
        msgLabel.style.color = 'var(--accent-primary)';
        emailInput.value = ''; // Wyczyszczenie pola po sukcesie
    }
}

function navigate(viewName, param = null, pushHistory = true) {
    window.scrollTo(0, 0);
    const contentHtml = views[viewName] ? views[viewName](param) : views['home']();
    appContent.innerHTML = contentHtml;
    lucide.createIcons(); // Re-render icons
    
    if (pushHistory) {
        const url = `#${viewName}${param ? '/' + param : ''}`;
        history.pushState({ viewName, param }, '', url);
    }
}

window.addEventListener('popstate', (event) => {
    if (event.state) {
        navigate(event.state.viewName, event.state.param, false);
    } else {
        navigate('home', null, false);
    }
});

// === INITIALIZATION ===

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function toggleTheme() {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i data-lucide="moon"></i>';
    } else {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i data-lucide="sun"></i>';
    }
    lucide.createIcons();
}

themeToggle.addEventListener('click', toggleTheme);

// Initialize Theme from Storage
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    body.classList.remove('dark-mode');
    themeToggle.innerHTML = '<i data-lucide="moon"></i>';
}

// Cookie Banner Logic
const cookieBanner = document.getElementById('cookie-banner');
const btnAccept = document.getElementById('accept-cookies');
const btnDecline = document.getElementById('decline-cookies');

if (!localStorage.getItem('cookies-accepted')) {
    setTimeout(() => {
        cookieBanner.classList.remove('hidden');
    }, 1500);
}

btnAccept.addEventListener('click', () => {
    localStorage.setItem('cookies-accepted', 'true');
    cookieBanner.classList.add('hidden');
    // Tutaj normalnie uruchomilibyśmy kod analityki (np. Google Analytics)
});

btnDecline.addEventListener('click', () => {
    localStorage.setItem('cookies-accepted', 'false');
    cookieBanner.classList.add('hidden');
});

// Globalne nasłuchiwanie zdarzeń (Event Delegation) dla całej aplikacji
document.body.addEventListener('input', (e) => {
    if (e.target.id === 'search-input') {
        handleAutocomplete(e.target.value);
    }
});

document.body.addEventListener('keydown', (e) => {
    if (e.target.id === 'search-input' && e.key === 'Enter') {
        const term = e.target.value.trim();
        const dropdown = document.getElementById('search-dropdown');
        if (dropdown) dropdown.classList.add('hidden');
        
        // Zapisanie stanu wyszukiwania w historii przeglądarki
        if (term) {
            history.pushState({ viewName: 'home', search: term }, '', `#search/${encodeURIComponent(term)}`);
        }
        
        handleSearch();
    }
});

document.body.addEventListener('click', (e) => {
    // Ukrywanie dropdownu przy kliknięciu poza nim
    const dropdown = document.getElementById('search-dropdown');
    if (dropdown && !e.target.closest('.search-bar')) {
        dropdown.classList.add('hidden');
    }

    // Nawigacja (szuka najbliższego elementu z atrybutem data-navigate)
    const navBtn = e.target.closest('[data-navigate]');
    if (navBtn) {
        e.preventDefault();
        const view = navBtn.getAttribute('data-navigate');
        const param = navBtn.getAttribute('data-id');
        navigate(view, param || null);
    }
    
    // Przycisk Newslettera
    if (e.target.closest('#newsletter-btn')) {
        handleNewsletter();
    }
    
    // Filtrowanie kategorii
    const filterBtn = e.target.closest('[data-action="filter-category"]');
    if (filterBtn) {
        e.preventDefault();
        const cat = filterBtn.getAttribute('data-val');
        filterCategory(cat, filterBtn);
    }
});

// App Start
const initialHash = window.location.hash.slice(1);
if (initialHash.startsWith('search/')) {
    const term = decodeURIComponent(initialHash.split('/')[1]);
    navigate('home', null, false);
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.value = term;
        handleSearch();
    }
} else if (initialHash) {
    const [view, param] = initialHash.split('/');
    navigate(view, param || null, false);
} else {
    navigate('home');
}
lucide.createIcons();