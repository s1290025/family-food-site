let currentSection = "family";
let selectedTags = [];

const data = [
    /* 追加方法
  {
    id: カード番号（重複しなければOK）,
    section: "family",（family → ファミレス　home → 家庭料理）
    title: "サイゼリヤ ミラノ風ドリア",（カードタイトル）
    comment: "安くて食べやすい定番メニューです。",（カードに表示される短い説明）
    detail: "ホワイトソースとミートソースが合わさったドリアで、価格が安く満足感があります。",（クリックしたときの詳細文章）
    tags: ["チーズ", "ドリア"]（ハッシュタグ）
  },
*/
  {
    id: 1,
    section: "family",
    title: "ガスト ビーフステーキ",
    comment: "手頃な価格で食べやすく、満足感のあるメニューです。",
    detail: "ジューシーで食べごたえがあり、しっかり牛肉を食べたいときに向いています。セットで頼みやすいのも良いところです。",
    tags: ["牛肉", "ステーキ"]
  },
  {
    id: 2,
    section: "family",
    title: "バーミヤン 醤油ラーメン",
    comment: "あっさりした味で、気軽に食べやすいです。",
    detail: "こってりしすぎず、幅広い人が食べやすい定番のラーメンです。中華系のサイドメニューと一緒に頼みやすいのも魅力です。",
    tags: ["ラーメン", "中華"]
  },
  {
    id: 3,
    section: "family",
    title: "ココス チョコパフェ",
    comment: "食後でも食べやすい定番デザートです。",
    detail: "チョコの甘さとアイスの組み合わせが分かりやすく、満足感があります。家族や友人と行ったときにも選びやすいメニューです。",
    tags: ["デザート", "パフェ"]
  },
  {
    id: 4,
    section: "home",
    title: "肉じゃが",
    comment: "甘辛い味付けでご飯によく合う家庭料理です。",
    detail: "じゃがいもや玉ねぎに味がしみるとおいしく、作り置きもしやすいです。家庭料理らしさが出やすい定番メニューだと思います。",
    tags: ["牛肉", "煮物"]
  },
  {
    id: 5,
    section: "home",
    title: "にゅうめん",
    comment: "やさしい味で、体調が悪いときでも食べやすいです。",
    detail: "温かいだしと柔らかい麺で、落ち着いた味わいです。具材を変えやすく、家庭ごとの違いも出しやすい料理です。",
    tags: ["麺", "汁物"]
  },
  {
    id: 6,
    section: "home",
    title: "だし巻き卵",
    comment: "やさしい味で、朝ごはんにも合います。",
    detail: "だしの風味が感じられて、シンプルでも満足感があります。家庭によって甘めかどうかが変わるのも面白いところです。",
    tags: ["卵", "和食"]
  }
];

function switchSection(section) {
  currentSection = section;
  selectedTags = [];
  updateTabUI();
  renderTagButtons();
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

function renderTagButtons() {
  const items = getCurrentSectionItems();
  const tags = [...new Set(items.flatMap(item => item.tags))];
  const container = document.getElementById("category-buttons");

  container.innerHTML = "";

  const allButton = document.createElement("button");
  allButton.className = "category-btn" + (selectedTags.length === 0 ? " active" : "");
  allButton.textContent = "すべて";
  allButton.onclick = () => {
    selectedTags = [];
    renderTagButtons();
    renderCards();
    closeModal();
  };
  container.appendChild(allButton);

  tags.forEach(tag => {
    const button = document.createElement("button");
    button.className = "category-btn" + (selectedTags.includes(tag) ? " active" : "");
    button.textContent = tag;
    button.onclick = () => {
      toggleTag(tag);
    };
    container.appendChild(button);
  });
}

function toggleTag(tag) {
  if (selectedTags.includes(tag)) {
    selectedTags = selectedTags.filter(t => t !== tag);
  } else {
    selectedTags = [...selectedTags, tag];
  }

  renderTagButtons();
  renderCards();
  closeModal();
}

function renderCards() {
  const container = document.getElementById("items");
  let items = getCurrentSectionItems();

  if (selectedTags.length > 0) {
    items = items.filter(item =>
      selectedTags.every(tag => item.tags.includes(tag))
    );
  }

  container.innerHTML = "";

  if (items.length === 0) {
    container.innerHTML = `
      <div class="empty-message">
        条件に合うカードがありません。
      </div>
    `;
    return;
  }

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.onclick = () => showDetail(item.id);

    const tagsHtml = item.tags
      .map(tag => {
        const selectedClass = selectedTags.includes(tag) ? " tag-selected" : "";
        return `<span class="tag clickable-tag${selectedClass}" onclick="filterByTag(event, '${escapeHtml(tag)}')">#${escapeHtml(tag)}</span>`;
      })
      .join("");

    card.innerHTML = `
      <h3>${escapeHtml(item.title)}</h3>
      <p class="comment">${escapeHtml(item.comment)}</p>
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
    .map(tag => {
      const selectedClass = selectedTags.includes(tag) ? " tag-selected" : "";
      return `<span class="tag clickable-tag${selectedClass}" onclick="filterByTag(event, '${escapeHtml(tag)}')">#${escapeHtml(tag)}</span>`;
    })
    .join("");

  detail.innerHTML = `
    <h2>${escapeHtml(item.title)}</h2>
    <div class="detail-meta">${sectionLabel}</div>
    <p class="detail-text">${escapeHtml(item.detail)}</p>
    <div class="tags">${tagsHtml}</div>
  `;

  modal.classList.remove("hidden");
}

function filterByTag(event, tag) {
  event.stopPropagation();
  toggleTag(tag);
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

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

updateTabUI();
renderTagButtons();
renderCards();
