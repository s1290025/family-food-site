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
    title: "Ramen Jiro (ラーメン二郎)",
    comment: "Huge portions! High-calorie! Unique ordering rules! Addictive ramen!",
    detail: `Ramen Jiro is famous for its huge portions and unique ordering rules. The rules are slightly different at each Jiro shop.
    
    Even the small size, called shō-ramen, is often more than twice as large as a normal bowl of ramen at other shops. Most Jiro shops offer two main sizes: shō-ramen (about 300g of noodles) and dai-ramen (about 400–500g of noodles).
    
    First, you buy a ticket from the vending machine. Then you sit down and place the ticket on the counter. If you want to change the noodle portion, you can tell the staff at this point.

    After that, the staff will ask, “Do you want garlic?” At this point, you tell them the amount of the default toppings.

    You can choose garlic (ninniku), vegetables (yasai), pork fat (abura), and stronger soy sauce flavor (karame). You can also increase the amount by saying “mashi” (more) or “mashi-mashi” (a lot more).

    For example, if you want garlic, extra vegetables, and pork fat, you can say:
    “ninniku, yasai mashi, abura.”

    This ordering style is called the “call.”

    When you finish eating, put your bowl and cup on the counter and wipe the table.`,
    tags: ["ramen", "jiro-style ramen", "high calorie", "pork"]
  },
  {
    id: 2,
    section: "home",
    title: "Oyakodon (親子丼)",
    comment: "Chicken and egg — that’s why it’s called “oyako-don”!",
    detail: "Chicken and egg — that’s why it’s called “oyako-don”!",
    tags: ["bowl", "egg", "chicken", "onion", "soy sause"]
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
  allButton.textContent = "All";
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

  const tagsHtml = item.tags
    .map(tag => {
      const selectedClass = selectedTags.includes(tag) ? " tag-selected" : "";
      return `<span class="tag clickable-tag${selectedClass}" onclick="filterByTag(event, '${escapeHtml(tag)}')">#${escapeHtml(tag)}</span>`;
    })
    .join("");

  detail.innerHTML = `
    <h2>${escapeHtml(item.title)}</h2>

    <p class="detail-comment">
      <strong>${escapeHtml(item.comment)}</strong>
    </p>

    <p class="detail-text">
      ${escapeHtml(item.detail)}
    </p>

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
