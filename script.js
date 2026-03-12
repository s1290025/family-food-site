let currentSection = "family";
let currentCategory = "all";

const data = [
  {
    id: 1,
    section: "family",
    category: "牛肉",
    title: "ガスト ビーフステーキ",
    comment: "手頃な価格で食べやすく、満足感のあるメニューです。",
    detail: "ジューシーで食べごたえがあり、しっかり牛肉を食べたいときに向いています。セットで頼みやすいのも良いところです。",
    tags: ["牛肉", "ステーキ", "ファミレス"]
  },
  {
    id: 2,
    section: "family",
    category: "ラーメン",
    title: "バーミヤン 醤油ラーメン",
    comment: "あっさりした味で、気軽に食べやすいです。",
    detail: "こってりしすぎず、幅広い人が食べやすい定番のラーメンです。中華系のサイドメニューと一緒に頼みやすいのも魅力です。",
    tags: ["ラーメン", "中華", "ファミレス"]
  },
  {
    id: 3,
    section: "family",
    category: "デザート",
    title: "ココス チョコパフェ",
    comment: "食後でも食べやすい定番デザートです。",
    detail: "チョコの甘さとアイスの組み合わせが分かりやすく、満足感があります。家族や友人と行ったときにも選びやすいメニューです。",
    tags: ["デザート", "パフェ", "ファミレス"]
  },
  {
    id: 4,
    section: "home",
    category: "牛肉",
    title: "肉じゃが",
    comment: "甘辛い味付けでご飯によく合う家庭料理です。",
    detail: "じゃがいもや玉ねぎに味がしみるとおいしく、作り置きもしやすいです。家庭料理らしさが出やすい定番メニューだと思います。",
    tags: ["牛肉", "煮物", "家庭料理"]
  },
  {
    id: 5,
    section: "home",
    category: "麺",
    title: "にゅうめん",
    comment: "やさしい味で、体調が悪いときでも食べやすいです。",
    detail: "温かいだしと柔らかい麺で、落ち着いた味わいです。具材を変えやすく、家庭ごとの違いも出しやすい料理です。",
    tags: ["麺", "汁物", "家庭料理"]
  },
  {
    id: 6,
    section: "home",
    category: "卵",
    title: "だし巻き卵",
    comment: "やさしい味で、朝ごはんにも合います。",
    detail: "だしの風味が感じられて、シンプルでも満足感があります。家庭によって甘めかどうかが変わるのも面白いところです。",
    tags: ["卵", "和食", "家庭料理"]
  }
];

function switchSection(section) {
  currentSection = section;
  currentCategory = "all";
  updateTabUI();
  renderCategoryButtons();
  renderCards();
  closeModal();
}

function updateTabUI() {
  document.getElementById("tab-family").classList.toggle("active", currentSection === "family");
  document.getElementById("tab-home").classList.toggle("active", currentSection === "home");
}

function getCurrentSectionItems() {
  return data.filter(item => item.section === currentSection);
}

function renderCategoryButtons() {
  const items = getCurrentSectionItems();
  const categories = [...new Set(items.map(item => item.category))];
  const container = document.getElementById("category-buttons");

  container.innerHTML = "";

  const allButton = document.createElement("button");
  allButton.className = "category-btn" + (currentCategory === "all" ? " active" : "");
  allButton.textContent = "すべて";
  allButton.onclick = () => {
    currentCategory = "all";
    renderCategoryButtons();
    renderCards();
    closeModal();
  };
  container.appendChild(allButton);

  categories.forEach(category => {
    const button = document.createElement("button");
    button.className = "category-btn" + (currentCategory === category ? " active" : "");
    button.textContent = category;
    button.onclick = () => {
      currentCategory = category;
      renderCategoryButtons();
      renderCards();
      closeModal();
    };
    container.appendChild(button);
  });
}

function renderCards() {
  const container = document.getElementById("items");
  let items = getCurrentSectionItems();

  if (currentCategory !== "all") {
    items = items.filter(item => item.category === currentCategory);
  }

  container.innerHTML = "";

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.onclick = () => showDetail(item.id);

    const tagsHtml = item.tags
      .map(tag => `<span class="tag">#${tag}</span>`)
      .join("");

    card.innerHTML = `
      <h3>${item.title}</h3>
      <p class="comment">${item.comment}</p>
      <div class="tags">${tagsHtml}</div>
    `;

    container.appendChild(card);
  });
}

function showDetail(id) {
  const item = data.find(d => d.id === id);
  if (!item) return;

  const modal = document.getElementById("modal");
  const detail = document.getElementById("modal-detail");

  const sectionLabel = item.section === "family" ? "ファミレス紹介" : "家庭料理紹介";
  const tagsHtml = item.tags
    .map(tag => `<span class="tag">#${tag}</span>`)
    .join("");

  detail.innerHTML = `
    <h2>${item.title}</h2>
    <div class="detail-meta">${sectionLabel} / ${item.category}</div>
    <p class="detail-text">${item.detail}</p>
    <div class="tags">${tagsHtml}</div>
  `;

  modal.classList.remove("hidden");
}

function closeModal(event) {
  if (event && event.target !== event.currentTarget) {
    return;
  }

  const modal = document.getElementById("modal");
  const detail = document.getElementById("modal-detail");
  detail.innerHTML = "";
  modal.classList.add("hidden");
}

updateTabUI();
renderCategoryButtons();
renderCards();
