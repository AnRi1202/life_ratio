const typePalettes = {
  waste: ["#991b1b", "#b91c1c", "#c2410c", "#7f1d1d", "#9a3412"],
  habit: ["#64748b", "#6b7280", "#475569", "#71717a", "#52525b"],
  effort: ["#15803d", "#0f766e", "#2563eb", "#0ea5e9", "#16a34a"],
};
const typeLabels = {
  waste: "無駄な時間",
  habit: "日々のタスク",
  effort: "頑張った時間",
};

const currentAgeInput = document.getElementById("current-age");
const wasteList = document.getElementById("waste-list");
const habitList = document.getElementById("habit-list");
const effortList = document.getElementById("effort-list");
const wasteTemplate = document.getElementById("waste-template");
const habitTemplate = document.getElementById("habit-template");
const effortTemplate = document.getElementById("effort-template");
const addWasteButton = document.getElementById("add-waste");
const addHabitButton = document.getElementById("add-habit");
const addEffortButton = document.getElementById("add-effort");
const totalHours = document.getElementById("total-hours");
const largestCategory = document.getElementById("largest-category");
const summaryCopy = document.getElementById("summary-copy");
const pieChart = document.getElementById("pie-chart");
const classicPie = document.getElementById("classic-pie");
const pieHitArea = document.getElementById("pie-hit-area");
const pieTooltip = document.getElementById("pie-tooltip");
const pieTooltipTitle = document.getElementById("pie-tooltip-title");
const pieTooltipCopy = document.getElementById("pie-tooltip-copy");
const pieTotal = document.getElementById("pie-total");
const legend = document.getElementById("legend");
const barChart = document.getElementById("bar-chart");
const reportList = document.getElementById("report-list");
const tabButtons = Array.from(document.querySelectorAll(".viz-tab"));
const tabPanels = Array.from(document.querySelectorAll(".viz-panel"));
const dotCount = 220;
let dotAnimationFrame = 0;

const equivalences = [
  { label: "8時間睡眠", hours: 8 },
  { label: "大学の講義90分", hours: 1.5 },
  { label: "フルタイム勤務1日", hours: 8 },
  { label: "東京-大阪の往復新幹線", hours: 6 },
  { label: "映画1本", hours: 2 },
  { label: "1週間", hours: 24 * 7 },
  { label: "1か月", hours: 24 * 30 },
];

const ensureDots = () => {
  if (pieChart.childElementCount === dotCount) return;
  pieChart.innerHTML = "";
  for (let index = 0; index < dotCount; index += 1) {
    const dot = document.createElement("span");
    dot.className = "dot";
    dot.style.setProperty("--delay", `${Math.floor(index / 10) * 18}ms`);
    pieChart.appendChild(dot);
  }
};

const setActiveTab = (tabName) => {
  tabButtons.forEach((button) => {
    const active = button.dataset.tab === tabName;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", active ? "true" : "false");
  });
  tabPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.panel === tabName);
  });
};

const animateDots = (items, total) => {
  ensureDots();
  const dots = Array.from(pieChart.children);
  dotAnimationFrame += 1;
  const frameId = dotAnimationFrame;

  dots.forEach((dot) => {
    dot.className = "dot";
    dot.style.backgroundColor = "rgba(35, 40, 46, 0.1)";
  });

  let cursor = 0;
  items.forEach((item) => {
    const count = Math.round((item.hours / total) * dotCount);
    for (let index = cursor; index < cursor + count && index < dots.length; index += 1) {
      dots[index].className = "dot pending";
      dots[index].style.backgroundColor = item.color;
    }
    cursor += count;
  });

  requestAnimationFrame(() => {
    if (frameId !== dotAnimationFrame) return;
    dots.forEach((dot, index) => {
      if (dot.classList.contains("pending")) {
        dot.style.transitionDelay = `${index * 8}ms`;
        dot.classList.remove("pending");
        dot.classList.add("active");
      } else {
        dot.style.transitionDelay = "0ms";
      }
    });
  });
};

const formatHoursLabel = (hours) => `${Math.round(hours).toLocaleString("ja-JP")}時間`;

const getActiveYears = (currentAge, startAge, endAgeRaw) => {
  const parsedEndAge = Number(endAgeRaw);
  const cappedEndAge =
    Number.isFinite(parsedEndAge) && endAgeRaw !== "" ? Math.min(parsedEndAge, currentAge) : currentAge;
  return Math.max(cappedEndAge - startAge, 0);
};

const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const describeArc = (startAngle, endAngle) => {
  const outerRadius = 50;
  const innerRadius = 22;
  const startOuter = polarToCartesian(50, 50, outerRadius, endAngle);
  const endOuter = polarToCartesian(50, 50, outerRadius, startAngle);
  const startInner = polarToCartesian(50, 50, innerRadius, endAngle);
  const endInner = polarToCartesian(50, 50, innerRadius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    `M ${startOuter.x} ${startOuter.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 0 ${endOuter.x} ${endOuter.y}`,
    `L ${endInner.x} ${endInner.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 1 ${startInner.x} ${startInner.y}`,
    "Z",
  ].join(" ");
};

const hidePieTooltip = () => {
  pieTooltip.hidden = true;
};

const renderPieHoverTargets = (items, lifetimeHours) => {
  pieHitArea.innerHTML = "";

  items.forEach((item) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", describeArc(item.startAngle, item.endAngle));
    path.setAttribute("class", "pie-segment");
    path.addEventListener("mouseenter", () => {
      pieTooltipTitle.textContent = item.name;
      pieTooltipCopy.textContent = `${typeLabels[item.type]} / ${Math.round(item.hours).toLocaleString("ja-JP")}h / ${Math.round((item.hours / lifetimeHours) * 100)}%`;
      pieTooltip.hidden = false;
    });
    path.addEventListener("mouseleave", hidePieTooltip);
    pieHitArea.appendChild(path);
  });
};

const buildReport = (sortedItems, lifetimeHours, trackedHours, currentAge) => {
  const wasteItems = sortedItems.filter((item) => item.type === "waste");
  const effortItems = sortedItems.filter((item) => item.type === "effort");
  const topWaste = wasteItems[0];
  const topEffort = effortItems[0];
  const lines = [];

  if (topWaste) {
    const monthEquivalent = (topWaste.hours / (24 * 30)).toFixed(1);
    const wasteShare = Math.round((topWaste.hours / lifetimeHours) * 100);
    lines.push({
      title: `無駄時間: ${topWaste.name} は人生の ${wasteShare}%`,
      body: `${formatHoursLabel(topWaste.hours)} は約 ${monthEquivalent} か月分です。8時間換算なら約 ${Math.round(topWaste.hours / 8)} 日ぶんです。`,
    });
  }

  if (topEffort) {
    const effortDays = Math.round(topEffort.hours / 8);
    const effortShare = Math.round((topEffort.hours / lifetimeHours) * 100);
    lines.push({
      title: `頑張った時間: ${topEffort.name} は人生の ${effortShare}%`,
      body: `${formatHoursLabel(topEffort.hours)} は、8時間集中を約 ${effortDays} 日続けた量です。`,
    });
  }

  const wasteTotal = wasteItems.reduce((sum, item) => sum + item.hours, 0);
  const effortTotal = effortItems.reduce((sum, item) => sum + item.hours, 0);

  if (wasteTotal > 0) {
    const closest = equivalences.reduce((best, entry) => {
      const score = wasteTotal / entry.hours;
      if (!best) return { ...entry, score };
      return Math.abs(score - Math.round(score)) < Math.abs(best.score - Math.round(best.score))
        ? { ...entry, score }
        : best;
    }, null);

    lines.push({
      title: `無駄時間の合計は ${Math.round((wasteTotal / lifetimeHours) * 100)}%`,
      body: `${formatHoursLabel(wasteTotal)} は、${closest.label} を ${Math.round(closest.score).toLocaleString("ja-JP")} 回くり返した量に近いです。`,
    });
  }

  if (effortTotal > 0) {
    const closest = equivalences.reduce((best, entry) => {
      const score = effortTotal / entry.hours;
      if (!best) return { ...entry, score };
      return Math.abs(score - Math.round(score)) < Math.abs(best.score - Math.round(best.score))
        ? { ...entry, score }
        : best;
    }, null);

    lines.push({
      title: `頑張った時間の合計は ${Math.round((effortTotal / lifetimeHours) * 100)}%`,
      body: `${formatHoursLabel(effortTotal)} は、${closest.label} を ${Math.round(closest.score).toLocaleString("ja-JP")} 回くり返した量に近いです。`,
    });
  }

  if (!lines.length && trackedHours >= 0) {
    lines.push({
      title: `${currentAge}年間は約${Math.round((lifetimeHours || 0)).toLocaleString("ja-JP")}時間`,
      body: `無駄な時間か頑張った時間を入力すると、ここにレポートを出します。`,
    });
  }

  reportList.innerHTML = lines
    .map(
      (line) => `
        <article class="report-item">
          <strong>${line.title}</strong>
          <p>${line.body}</p>
        </article>
      `
    )
    .join("");
};

const createWasteEntry = ({ name, startAge, endAge = "", frequency, duration }) => {
  const fragment = wasteTemplate.content.cloneNode(true);
  const card = fragment.querySelector(".entry-card");

  card.querySelector("[data-name]").value = name;
  card.querySelector("[data-start-age]").value = startAge;
  card.querySelector("[data-end-age]").value = endAge;
  card.querySelector("[data-frequency]").value = frequency;
  card.querySelector("[data-duration]").value = duration;

  return fragment;
};

const createHabitEntry = ({ name, startAge, endAge = "", hoursPerDay, note }) => {
  const fragment = habitTemplate.content.cloneNode(true);
  const card = fragment.querySelector(".entry-card");

  card.querySelector("[data-name]").value = name;
  card.querySelector("[data-start-age]").value = startAge;
  card.querySelector("[data-end-age]").value = endAge;
  card.querySelector("[data-hours-per-day]").value = hoursPerDay;
  card.querySelector("[data-note]").value = note;

  return fragment;
};

const createEffortEntry = ({ name, startAge, endAge = "", frequency, duration }) => {
  const fragment = effortTemplate.content.cloneNode(true);
  const card = fragment.querySelector(".entry-card");

  card.querySelector("[data-name]").value = name;
  card.querySelector("[data-start-age]").value = startAge;
  card.querySelector("[data-end-age]").value = endAge;
  card.querySelector("[data-frequency]").value = frequency;
  card.querySelector("[data-duration]").value = duration;

  return fragment;
};

const getWasteItems = (currentAge) =>
  Array.from(wasteList.querySelectorAll(".entry-card"))
    .map((card) => {
      const name = card.querySelector("[data-name]").value.trim();
      const startAge = Number(card.querySelector("[data-start-age]").value);
      const endAgeRaw = card.querySelector("[data-end-age]").value;
      const frequency = Number(card.querySelector("[data-frequency]").value);
      const duration = Number(card.querySelector("[data-duration]").value);
      const activeYears = getActiveYears(currentAge, startAge, endAgeRaw);
      const hours = activeYears * 52 * frequency * (duration / 60);

      return {
        type: "waste",
        name,
        hours,
        detail: `${Math.max(activeYears, 0)}年 x 週${frequency}回 x ${duration}分`,
      };
    })
    .filter((item) => item.name && item.hours > 0);

const getHabitItems = (currentAge) =>
  Array.from(habitList.querySelectorAll(".entry-card"))
    .map((card) => {
      const name = card.querySelector("[data-name]").value.trim();
      const startAge = Number(card.querySelector("[data-start-age]").value);
      const endAgeRaw = card.querySelector("[data-end-age]").value;
      const hoursPerDay = Number(card.querySelector("[data-hours-per-day]").value);
      const note = card.querySelector("[data-note]").value.trim();
      const activeYears = getActiveYears(currentAge, startAge, endAgeRaw);
      const hours = activeYears * 365 * hoursPerDay;

      return {
        type: "habit",
        name,
        hours,
        detail: `${activeYears}年 x 365日 x ${hoursPerDay}時間${note ? ` / ${note}` : ""}`,
      };
    })
    .filter((item) => item.name && item.hours > 0);

const getEffortItems = (currentAge) =>
  Array.from(effortList.querySelectorAll(".entry-card"))
    .map((card) => {
      const name = card.querySelector("[data-name]").value.trim();
      const startAge = Number(card.querySelector("[data-start-age]").value);
      const endAgeRaw = card.querySelector("[data-end-age]").value;
      const frequency = Number(card.querySelector("[data-frequency]").value);
      const duration = Number(card.querySelector("[data-duration]").value);
      const activeYears = getActiveYears(currentAge, startAge, endAgeRaw);
      const hours = activeYears * 52 * frequency * (duration / 60);

      return {
        type: "effort",
        name,
        hours,
        detail: `${Math.max(activeYears, 0)}年 x 週${frequency}回 x ${duration}分`,
      };
    })
    .filter((item) => item.name && item.hours > 0);

const renderCharts = (items, lifetimeHours, currentAge) => {
  const trackedHours = items.reduce((sum, item) => sum + item.hours, 0);
  const total = lifetimeHours;

  if (total <= 0) {
    ensureDots();
    Array.from(pieChart.children).forEach((dot) => {
      dot.className = "dot";
      dot.style.backgroundColor = "rgba(35, 40, 46, 0.1)";
      dot.style.transitionDelay = "0ms";
    });
    classicPie.style.background = "rgba(35, 40, 46, 0.08)";
    pieHitArea.innerHTML = "";
    hidePieTooltip();
    pieTotal.textContent = "0h";
    legend.innerHTML = "";
    barChart.innerHTML = "";
    reportList.innerHTML = "";
    totalHours.textContent = "0時間";
    largestCategory.textContent = "-";
    summaryCopy.textContent = "入力したデータをもとに、人生全体の時間に対する割合を集計しています。";
    return;
  }

  const sortedItems = [...items].sort((a, b) => b.hours - a.hours);
  const largest = sortedItems[0];
  let angleOffset = 0;
  const typeIndexes = { waste: 0, habit: 0, effort: 0 };
  sortedItems.forEach((item) => {
    const palette = typePalettes[item.type] || typePalettes.habit;
    item.color = palette[typeIndexes[item.type] % palette.length];
    typeIndexes[item.type] += 1;
    item.startAngle = angleOffset;
    item.endAngle = angleOffset + (item.hours / total) * 360;
    angleOffset = item.endAngle;
  });
  animateDots(sortedItems, total);
  const pieSegments = sortedItems.map(
    (item) => `${item.color} ${item.startAngle.toFixed(1)}deg ${item.endAngle.toFixed(1)}deg`
  );
  if (angleOffset < 360) {
    pieSegments.push(`#ffffff ${angleOffset.toFixed(1)}deg 360deg`);
  }
  classicPie.style.background = `conic-gradient(${pieSegments.join(", ")})`;
  renderPieHoverTargets(sortedItems, lifetimeHours);

  pieTotal.textContent = `${Math.round(total).toLocaleString("ja-JP")}h`;
  totalHours.textContent = `${Math.round(total).toLocaleString("ja-JP")}時間`;
  largestCategory.textContent = `${Math.round((trackedHours / lifetimeHours) * 100)}% tracked`;
  summaryCopy.textContent = `${largest.name} が最も大きく、人生全体の ${Math.round((largest.hours / total) * 100)}% を占めています。${typeLabels[largest.type]} は同系色でまとめています。`;

  legend.innerHTML = sortedItems
    .map(
      (item) => `
        <div class="legend-item legend-item-${item.type}">
          <div class="legend-swatch" style="background:${item.color};"></div>
          <div class="legend-copy">
            <strong>${item.name} <small>(${typeLabels[item.type]})</small></strong>
            <span>${item.detail}</span>
          </div>
          <strong>${Math.round(item.hours).toLocaleString("ja-JP")}h / ${Math.round((item.hours / lifetimeHours) * 100)}%</strong>
        </div>
      `
    )
    .join("");

  barChart.innerHTML = sortedItems
    .map((item) => {
      const width = (item.hours / lifetimeHours) * 100;
      return `
        <div class="bar-item">
          <div class="bar-meta">
            <strong>${item.name}</strong>
            <span>${Math.round(item.hours).toLocaleString("ja-JP")}h / ${Math.round((item.hours / lifetimeHours) * 100)}%</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="width:${width}%; background:${item.color};"></div>
          </div>
        </div>
      `;
    })
    .join("");

  buildReport(sortedItems, lifetimeHours, trackedHours, currentAge);
};

const render = () => {
  const currentAge = Number(currentAgeInput.value);
  const safeAge = Number.isFinite(currentAge) && currentAge > 0 ? currentAge : 0;
  const items = [...getWasteItems(safeAge), ...getHabitItems(safeAge), ...getEffortItems(safeAge)];
  const lifetimeHours = safeAge * 365 * 24;
  renderCharts(items, lifetimeHours, safeAge);
};

const addWaste = (data) => {
  wasteList.appendChild(createWasteEntry(data));
};

const addHabit = (data) => {
  habitList.appendChild(createHabitEntry(data));
};

const addEffort = (data) => {
  effortList.appendChild(createEffortEntry(data));
};

const handleRemove = (event) => {
  const button = event.target.closest("[data-remove]");
  if (!button) return;
  button.closest(".entry-card").remove();
  render();
};

currentAgeInput.addEventListener("input", render);
wasteList.addEventListener("input", render);
habitList.addEventListener("input", render);
effortList.addEventListener("input", render);
wasteList.addEventListener("click", handleRemove);
habitList.addEventListener("click", handleRemove);
effortList.addEventListener("click", handleRemove);
tabButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveTab(button.dataset.tab));
});

addWasteButton.addEventListener("click", () => {
  addWaste({ name: "New item", startAge: 18, frequency: 3, duration: 30 });
  render();
});

addHabitButton.addEventListener("click", () => {
  addHabit({ name: "新しい習慣", startAge: 0, hoursPerDay: 1, note: "" });
  render();
});

addEffortButton.addEventListener("click", () => {
  addEffort({ name: "新しい努力", startAge: 15, frequency: 4, duration: 60 });
  render();
});

[
  { name: "YouTube", startAge: 15, frequency: 14, duration: 35 },
  { name: "Instagram", startAge: 16, frequency: 18, duration: 12 },
  { name: "X", startAge: 17, frequency: 25, duration: 8 },
  { name: "Porn", startAge: 18, frequency: 3, duration: 20 },
  { name: "TikTok", startAge: 20, frequency: 10, duration: 18 },
].forEach(addWaste);

[
  { name: "睡眠", startAge: 0, hoursPerDay: 8, note: "毎日" },
  { name: "食事", startAge: 0, hoursPerDay: 1.5, note: "朝昼夜の合計" },
  { name: "身支度", startAge: 0, hoursPerDay: 0.7, note: "風呂や準備" },
].forEach(addHabit);

[
  { name: "勉強", startAge: 15, frequency: 5, duration: 90 },
  { name: "筋トレ", startAge: 18, frequency: 3, duration: 75 },
].forEach(addEffort);

render();
