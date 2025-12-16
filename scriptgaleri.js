document.addEventListener("DOMContentLoaded", () => {
    const $$ = (sel, scope = document) => [...scope.querySelectorAll(sel)];
    const imgs = $$(".gallery-img");

    const names = new Map(imgs.map(img => [img.id, img.dataset.name || "Produk Batik Nusantara"]));
    let lastCard = null;
    const clearCard = (card) => {
        if (!card) return;
        const out = card.querySelector(".product-name");
        if (out) out.textContent = "";
        card.classList.remove("active");
    };

    const handleClick = ({ target }) => {
        const card = target.closest(".gallery-item");
        if (!card) return;

        // klik card yang sama -> toggle off
        if (card.classList.contains("active")) {
            clearCard(card);
            lastCard = null;
            return;
        }

        // klik card baru -> hapus yang lama
        clearCard(lastCard);

        // tampilkan yang baru
        const out = card.querySelector(".product-name");
        const name = names.get(target.id);
        if (out) out.textContent = `${name}`;

        card.classList.add("active");
        lastCard = card;
     };

    for (const img of imgs) {
        img.addEventListener("click", handleClick);
    }
});