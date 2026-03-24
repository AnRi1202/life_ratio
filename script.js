const locale = document.documentElement.lang.startsWith("en") ? "en" : "ja";

const copy = {
  ja: {
    typeLabels: {
      waste: "無駄な時間",
      habit: "日々のタスク",
      effort: "頑張った時間",
      untracked: "未入力",
    },
    hoursUnit: "時間",
    zeroHours: "0時間",
    minutesUnit: "分",
    secondsUnit: "秒",
    yearsUnit: "年",
    tracked: "tracked",
    untrackedName: "未入力",
    untrackedDetail: "入力していない時間",
    emptySummary: "入力したデータをもとに、人生全体の時間に対する割合を集計しています。",
    compareLabelAll: "人生全体",
    compareLabelFocused: "日常を除いた全体",
    summarySentence: (largestName, compareLabel, typeLabel) =>
      `${largestName} が最も大きく、${compareLabel}に対して見ると存在感が大きい項目です。${typeLabel} は同系色でまとめています。`,
    newWaste: "新しい項目",
    newHabit: "新しい習慣",
    newEffort: "新しい努力",
    reportTopWasteTitle: (hours, name) => `${hours} を ${name} に使っている`,
    reportTopWasteBody: (months) => `約 ${months} か月に相当します。`,
    reportTopEffortTitle: (hours, name) => `${hours} を ${name} に積み上げている`,
    reportTopEffortBody: "かなり長い時間に相当します。",
    reportWasteTotalTitle: (hours) => `無駄時間の合計は ${hours}`,
    reportEffortTotalTitle: (hours) => `頑張った時間の合計は ${hours}`,
    reportAssetBody: (yen) =>
      `今までの人生の時間から日常を除いて ${yen} とすると、これは ${yen} に相当します。`,
    reportAssetWasteBody: (totalAsset, asset) =>
      `今までの人生の時間から日常を除いて ${totalAsset} とすると、これは ${asset} に相当します。`,
    reportAssetEffortBody: (totalAsset, asset) =>
      `今までの人生の時間から日常を除いて ${totalAsset} とすると、これは ${asset} に相当します。`,
    reportEmptyTitle: (years, hours) => `${years}年間は約${hours}`,
    reportEmptyBody: "無駄な時間か頑張った時間を入力すると、ここにレポートを出します。",
    pieTooltip: (typeLabel, hours, percent) => `${typeLabel} / ${hours}h / ${percent}%`,
    legendDetail: (typeLabel, detail) => `${typeLabel}`,
    defaultWaste: [
      { name: "YouTube", startAge: 15, frequency: 14, duration: 35 },
      { name: "TikTok", startAge: 20, frequency: 10, duration: 18 },
      { name: "先延ばし", startAge: 16, frequency: 7, duration: 20 },
    ],
    defaultHabit: [
      { name: "睡眠", startAge: 0, hoursPerDay: 8, note: "毎日" },
      { name: "食事", startAge: 0, hoursPerDay: 1.5, note: "朝昼夜の合計" },
    ],
    defaultEffort: [
      { name: "勉強", startAge: 15, frequency: 5, duration: 90 },
    ],
    habitPresets: {
      sleep: { name: "睡眠", startAge: 0, hoursPerDay: 8, note: "毎日" },
      meals: { name: "食事", startAge: 0, hoursPerDay: 1.5, note: "朝昼夜の合計" },
      grooming: { name: "身支度", startAge: 0, hoursPerDay: 0.7, note: "風呂や準備" },
      commute: { name: "通学・通勤", startAge: 15, hoursPerDay: 1, note: "" },
      housework: { name: "家事", startAge: 18, hoursPerDay: 0.8, note: "" },
    },
    effortPresets: {
      study: { name: "勉強", startAge: 15, frequency: 5, duration: 90 },
      workout: { name: "筋トレ", startAge: 18, frequency: 3, duration: 75 },
      reading: { name: "読書", startAge: 15, frequency: 4, duration: 45 },
      building: { name: "制作", startAge: 16, frequency: 4, duration: 120 },
      research: { name: "研究", startAge: 20, frequency: 5, duration: 120 },
    },
  },
  en: {
    typeLabels: {
      waste: "Drift Time",
      habit: "Daily Tasks",
      effort: "Effort Time",
      untracked: "Untracked",
    },
    hoursUnit: " hours",
    zeroHours: "0 hours",
    minutesUnit: "m",
    secondsUnit: "s",
    yearsUnit: " years",
    tracked: "tracked",
    untrackedName: "Untracked",
    untrackedDetail: "Time not entered yet",
    emptySummary: "This view summarizes how your entered time sits inside your total lifetime.",
    compareLabelAll: "your whole lifetime",
    compareLabelFocused: "your life excluding routine time",
    summarySentence: (largestName, compareLabel, typeLabel) =>
      `${largestName} stands out the most when viewed against ${compareLabel}. ${typeLabel} uses one color family.`,
    newWaste: "New item",
    newHabit: "New routine",
    newEffort: "New effort",
    reportTopWasteTitle: (hours, name) => `${hours} spent on ${name}`,
    reportTopWasteBody: (months) => `That is roughly ${months} months.`,
    reportTopEffortTitle: (hours, name) => `${hours} invested in ${name}`,
    reportTopEffortBody: "That already adds up to a substantial amount of time.",
    reportWasteTotalTitle: (hours) => `Total drift time: ${hours}`,
    reportEffortTotalTitle: (hours) => `Total effort time: ${hours}`,
    reportAssetWasteBody: (totalAsset, asset) =>
      `If the time in your life so far, excluding routine time, were worth ${totalAsset}, this would equal about ${asset}.`,
    reportAssetEffortBody: (totalAsset, asset) =>
      `If the time in your life so far, excluding routine time, were worth ${totalAsset}, this would equal about ${asset}.`,
    reportEmptyTitle: (years, hours) => `${years} years is about ${hours}`,
    reportEmptyBody: "Add drift time or effort time and your written report will appear here.",
    pieTooltip: (typeLabel, hours, percent) => `${typeLabel} / ${hours}h / ${percent}%`,
    defaultWaste: [
      { name: "YouTube", startAge: 15, frequency: 14, duration: 35 },
      { name: "TikTok", startAge: 20, frequency: 10, duration: 18 },
      { name: "Procrastination", startAge: 16, frequency: 7, duration: 20 },
    ],
    defaultHabit: [
      { name: "Sleep", startAge: 0, hoursPerDay: 8, note: "Every day" },
      { name: "Meals", startAge: 0, hoursPerDay: 1.5, note: "Breakfast, lunch, dinner" },
    ],
    defaultEffort: [
      { name: "Study", startAge: 15, frequency: 5, duration: 90 },
    ],
    habitPresets: {
      sleep: { name: "Sleep", startAge: 0, hoursPerDay: 8, note: "Every day" },
      meals: { name: "Meals", startAge: 0, hoursPerDay: 1.5, note: "Breakfast, lunch, dinner" },
      grooming: { name: "Getting ready", startAge: 0, hoursPerDay: 0.7, note: "Shower and prep" },
      commute: { name: "Commute", startAge: 15, hoursPerDay: 1, note: "" },
      housework: { name: "Housework", startAge: 18, hoursPerDay: 0.8, note: "" },
    },
    effortPresets: {
      study: { name: "Study", startAge: 15, frequency: 5, duration: 90 },
      workout: { name: "Workout", startAge: 18, frequency: 3, duration: 75 },
      reading: { name: "Reading", startAge: 15, frequency: 4, duration: 45 },
      building: { name: "Making things", startAge: 16, frequency: 4, duration: 120 },
      research: { name: "Research", startAge: 20, frequency: 5, duration: 120 },
    },
  },
};

const t = copy[locale];

const typePalettes = {
  waste: ["#991b1b", "#b91c1c", "#c2410c", "#7f1d1d", "#9a3412"],
  habit: ["#d4a017", "#e0b43d", "#c78f12", "#b9860b", "#e7c35f"],
  effort: ["#15803d", "#0f766e", "#16a34a", "#22c55e", "#2f9d74"],
};
const typeLabels = t.typeLabels;

const birthYearInput = document.getElementById("birth-year");
const birthMonthInput = document.getElementById("birth-month");
const birthDayInput = document.getElementById("birth-day");
const derivedAgeInput = document.getElementById("derived-age");
const wasteList = document.getElementById("waste-list");
const habitList = document.getElementById("habit-list");
const effortList = document.getElementById("effort-list");
const wasteTemplate = document.getElementById("waste-template");
const habitTemplate = document.getElementById("habit-template");
const effortTemplate = document.getElementById("effort-template");
const addWasteButton = document.getElementById("add-waste");
const addHabitButton = document.getElementById("add-habit");
const addEffortButton = document.getElementById("add-effort");
const addWastePresetButton = document.getElementById("add-waste-preset");
const addHabitPresetButton = document.getElementById("add-habit-preset");
const addEffortPresetButton = document.getElementById("add-effort-preset");
const wastePresetSelect = document.getElementById("waste-preset");
const habitPresetSelect = document.getElementById("habit-preset");
const effortPresetSelect = document.getElementById("effort-preset");
const totalHours = document.getElementById("total-hours");
const largestCategory = document.getElementById("largest-category");
const summaryCopy = document.getElementById("summary-copy");
const appShell = document.querySelector(".app-shell");
const stageButtons = Array.from(document.querySelectorAll(".stage-pill"));
const dotModeButtons = Array.from(document.querySelectorAll("[data-dot-mode]"));
const compareModeButtons = Array.from(document.querySelectorAll("[data-compare-mode]"));
const flowSteps = Array.from(document.querySelectorAll(".flow-step"));
const nextStepButtons = Array.from(document.querySelectorAll("[data-next-step]"));
const toResultsButton = document.getElementById("to-results");
const backToInputButton = document.getElementById("back-to-input");
const toTweakButton = document.getElementById("to-tweak");
const pieChart = document.getElementById("pie-chart");
const classicPie = document.getElementById("classic-pie");
const pieHitArea = document.getElementById("pie-hit-area");
const pieTooltip = document.getElementById("pie-tooltip");
const pieTooltipTitle = document.getElementById("pie-tooltip-title");
const pieTooltipCopy = document.getElementById("pie-tooltip-copy");
const dotTooltip = document.getElementById("dot-tooltip");
const dotTooltipTitle = document.getElementById("dot-tooltip-title");
const dotTooltipCopy = document.getElementById("dot-tooltip-copy");
const legend = document.getElementById("legend");
const barChart = document.getElementById("bar-chart");
const reportList = document.getElementById("report-list");
const tabButtons = Array.from(document.querySelectorAll(".viz-tab"));
const tabPanels = Array.from(document.querySelectorAll(".viz-panel"));
const dotCount = 192;
let dotAnimationFrame = 0;
let dotMode = "all";
let compareMode = "all";
let activeFlowStep = "age";
let activeTab = "dot";
let renderTimer = null;

const getBirthdayDate = () => {
  if (!birthMonthInput.value || !birthDayInput.value) return null;
  const month = Number(birthMonthInput.value);
  const day = Number(birthDayInput.value);
  const birthYear = Number(birthYearInput.value);
  if (!Number.isFinite(month) || !Number.isFinite(day) || !Number.isFinite(birthYear)) return null;

  const birthday = new Date(birthYear, month - 1, day);
  const valid =
    birthday.getFullYear() === birthYear &&
    birthday.getMonth() === month - 1 &&
    birthday.getDate() === day;

  return valid ? birthday : null;
};

const getAgeFromBirthday = () => {
  const birthday = getBirthdayDate();
  if (!birthday) return null;

  const now = new Date();
  let age = now.getFullYear() - birthday.getFullYear();
  const hasHadBirthdayThisYear =
    now.getMonth() > birthday.getMonth() ||
    (now.getMonth() === birthday.getMonth() && now.getDate() >= birthday.getDate());

  if (!hasHadBirthdayThisYear) age -= 1;
  return Math.max(age, 0);
};

const getAgeFromBirthYear = () => {
  const birthYear = Number(birthYearInput.value);
  const currentYear = new Date().getFullYear();
  if (!Number.isFinite(birthYear)) return 0;
  return Math.max(Math.min(currentYear - birthYear, 120), 0);
};

const getCurrentAgeValue = () => {
  const birthdayAge = getAgeFromBirthday();
  return birthdayAge ?? getAgeFromBirthYear();
};

const updateDerivedAge = () => {
  derivedAgeInput.value = `${getCurrentAgeValue()}歳`;
};

const lifetimeAssetYen = 100_000_000;
const habitPresets = t.habitPresets;
const effortPresets = t.effortPresets;

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

const hideDotTooltip = () => {
  dotTooltip.hidden = true;
};

const showDotTooltip = (event, dot) => {
  const name = dot.dataset.name || t.untrackedName;
  const detail = dot.dataset.detail || t.untrackedDetail;
  dotTooltipTitle.textContent = name;
  dotTooltipCopy.textContent = detail;
  dotTooltip.hidden = false;

  const bounds = pieChart.getBoundingClientRect();
  const tooltipWidth = dotTooltip.offsetWidth || 180;
  const tooltipHeight = dotTooltip.offsetHeight || 54;
  const left = Math.min(
    Math.max(event.clientX - bounds.left + 14, 10),
    bounds.width - tooltipWidth - 10
  );
  const top = Math.min(
    Math.max(event.clientY - bounds.top - tooltipHeight - 12, 10),
    bounds.height - tooltipHeight - 10
  );

  dotTooltip.style.left = `${left}px`;
  dotTooltip.style.top = `${top}px`;
};

const setActiveTab = (tabName) => {
  activeTab = tabName;
  tabButtons.forEach((button) => {
    const active = button.dataset.tab === tabName;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", active ? "true" : "false");
  });
  tabPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.panel === tabName);
  });
  render();
};

const setStage = (stageName) => {
  appShell.dataset.stage = stageName;
  stageButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.stageTarget === stageName);
  });
};

const setFlowStep = (stepName) => {
  activeFlowStep = stepName;
  const order = ["age", "waste", "habit", "effort"];
  const activeIndex = order.indexOf(stepName);

  flowSteps.forEach((step) => {
    const stepIndex = order.indexOf(step.dataset.flowStep);
    step.classList.toggle("is-active", step.dataset.flowStep === stepName);
    step.classList.toggle("is-complete", stepIndex > -1 && stepIndex < activeIndex);
  });
};

const setDotMode = (mode) => {
  dotMode = mode;
  dotModeButtons.forEach((button) => {
    if (button.dataset.dotMode) {
      button.classList.toggle("active", button.dataset.dotMode === mode);
    }
  });
  render();
};

const setCompareMode = (mode) => {
  compareMode = mode;
  compareModeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.compareMode === mode);
  });
  render();
};

const animateDots = (items, total) => {
  ensureDots();
  const dots = Array.from(pieChart.children);
  dotAnimationFrame += 1;
  const frameId = dotAnimationFrame;
  const focusedView = dotMode === "focused";
  const baseColor = focusedView ? "rgba(255, 255, 255, 0.96)" : "rgba(35, 40, 46, 0.1)";

  dots.forEach((dot) => {
    dot.className = "dot";
    if (focusedView) {
      dot.classList.add("dot-base");
    }
    dot.dataset.type = "";
    dot.dataset.name = "";
    dot.dataset.detail = "";
    dot.style.backgroundColor = baseColor;
    dot.style.transition = focusedView ? "none" : "";
    dot.style.transitionDelay = "0ms";
    dot.style.animation = "none";
  });

  const frontOrder = Array.from({ length: dots.length }, (_, index) => index);
  const backOrder = [...frontOrder].reverse();
  const used = new Set();
  const assignments = [];
  const typeOrderCounts = { waste: 0, habit: 0, effort: 0, untracked: 0 };

  const claimIndices = (order, item, count) => {
    let claimed = 0;
    for (const index of order) {
      if (claimed >= count) break;
      if (used.has(index)) continue;
      used.add(index);
      assignments.push({
        index,
        item,
        order: assignments.length,
        typeOrder: typeOrderCounts[item.type] ?? 0,
      });
      typeOrderCounts[item.type] = (typeOrderCounts[item.type] ?? 0) + 1;
      claimed += 1;
    }
  };

  items.filter((item) => item.type !== "untracked").forEach((item) => {
    const count = Math.round((item.hours / total) * dotCount);
    if (count <= 0) return;
    if (item.type === "waste") {
      claimIndices(frontOrder, item, count);
      return;
    }
    if (item.type === "effort") {
      claimIndices(backOrder, item, count);
      return;
    }
    claimIndices(frontOrder, item, count);
  });

  if (!focusedView) {
    items.filter((item) => item.type === "untracked").forEach((item) => {
      const count = Math.round((item.hours / total) * dotCount);
      if (count <= 0) return;
      claimIndices(frontOrder, item, count);
    });
  }

  assignments.forEach(({ index, item }) => {
    dots[index].className = "dot pending";
    dots[index].dataset.type = item.type;
    dots[index].dataset.name = item.name;
    dots[index].dataset.detail = `${typeLabels[item.type]} ・ ${formatHoursLabel(item.hours)}`;
    dots[index].style.backgroundColor = item.color;
  });

  dots.forEach((dot) => {
    if (!dot.dataset.type) {
      dot.dataset.type = "untracked";
      dot.dataset.name = t.untrackedName;
      dot.dataset.detail = t.untrackedDetail;
    }
  });

  requestAnimationFrame(() => {
    if (frameId !== dotAnimationFrame) return;
    const delayMap = new Map(
      assignments.map((entry) => [
        entry.index,
        focusedView ? entry.typeOrder * 42 : entry.order * 18,
      ])
    );
    dots.forEach((dot, index) => {
      dot.style.transition = "";
      if (dot.classList.contains("pending")) {
        const order = delayMap.get(index) ?? 0;
        dot.style.transitionDelay = `${order}ms`;
        dot.style.animation = "none";
        dot.style.animationDuration = focusedView ? "900ms" : "680ms";
        dot.classList.remove("pending");
        dot.classList.add("active");
        requestAnimationFrame(() => {
          if (frameId !== dotAnimationFrame) return;
          dot.style.animation = "";
        });
      } else {
        dot.style.transitionDelay = "0ms";
      }
    });
  });
};

const formatHoursLabel = (hours) => `${Math.round(hours).toLocaleString("ja-JP")}${t.hoursUnit}`;
const formatYenValue = (yen) => {
  if (locale === "en") {
    if (yen >= 100_000_000) return `about ¥${(yen / 100_000_000).toFixed(1)}00M`;
    if (yen >= 10_000) return `about ¥${(yen / 10_000).toFixed(0)}k`;
    return `about ¥${Math.round(yen).toLocaleString("ja-JP")}`;
  }
  if (yen >= 100_000_000) {
    return `約${(yen / 100_000_000).toFixed(1)}億円`;
  }
  if (yen >= 10_000) {
    return `約${(yen / 10_000).toFixed(0)}万円`;
  }
  return `約${Math.round(yen).toLocaleString("ja-JP")}円`;
};

const formatWasteDetail = (activeYears, frequency, duration) =>
  locale === "en"
    ? `${Math.max(activeYears, 0)} years x ${frequency}/week x ${duration} min`
    : `${Math.max(activeYears, 0)}年 x 週${frequency}回 x ${duration}分`;

const formatHabitDetail = (activeYears, hoursPerDay, note) =>
  locale === "en"
    ? `${activeYears} years x 365 days x ${hoursPerDay} hours${note ? ` / ${note}` : ""}`
    : `${activeYears}年 x 365日 x ${hoursPerDay}時間${note ? ` / ${note}` : ""}`;

const formatEffortDetail = (activeYears, frequency, duration) =>
  locale === "en"
    ? `${Math.max(activeYears, 0)} years x ${frequency}/week x ${duration} min`
    : `${Math.max(activeYears, 0)}年 x 週${frequency}回 x ${duration}分`;

const getLifetimeMetrics = () => {
  const birthday = getBirthdayDate();
  if (birthday) {
    const now = new Date();
    const elapsedMs = Math.max(now.getTime() - birthday.getTime(), 0);
    return {
      hours: elapsedMs / 3_600_000,
      display: `${Math.floor(elapsedMs / 3_600_000).toLocaleString("ja-JP")}${t.hoursUnit} ${Math.floor((elapsedMs % 3_600_000) / 60_000)}${t.minutesUnit} ${Math.floor((elapsedMs % 60_000) / 1000)}${t.secondsUnit}`,
    };
  }

  const safeAge = getAgeFromBirthYear();
  const hours = safeAge * 365 * 24;
  return {
    hours,
    display: `${Math.round(hours).toLocaleString("ja-JP")}${t.hoursUnit}`,
  };
};

const updateLifetimeDisplay = () => {
  totalHours.textContent = getLifetimeMetrics().display;
};

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
      pieTooltipCopy.textContent = t.pieTooltip(
        typeLabels[item.type],
        Math.round(item.hours).toLocaleString("ja-JP"),
        Math.round((item.hours / lifetimeHours) * 100)
      );
      pieTooltip.hidden = false;
    });
    path.addEventListener("mouseleave", hidePieTooltip);
    pieHitArea.appendChild(path);
  });
};

const buildReport = (sortedItems, lifetimeHours, trackedHours, currentAge) => {
  const wasteItems = sortedItems.filter((item) => item.type === "waste");
  const effortItems = sortedItems.filter((item) => item.type === "effort");
  const habitHours = sortedItems
    .filter((item) => item.type === "habit")
    .reduce((sum, item) => sum + item.hours, 0);
  const focusedLifetimeHours = Math.max(lifetimeHours - habitHours, 1);
  const topWaste = wasteItems[0];
  const topEffort = effortItems[0];
  const lines = [];

  if (topWaste) {
    const monthEquivalent = (topWaste.hours / (24 * 30)).toFixed(1);
    lines.push({
      title: t.reportTopWasteTitle(formatHoursLabel(topWaste.hours), topWaste.name),
      body: t.reportTopWasteBody(monthEquivalent),
    });
  }

  if (topEffort) {
    lines.push({
      title: t.reportTopEffortTitle(formatHoursLabel(topEffort.hours), topEffort.name),
      body: t.reportTopEffortBody,
    });
  }

  const wasteTotal = wasteItems.reduce((sum, item) => sum + item.hours, 0);
  const effortTotal = effortItems.reduce((sum, item) => sum + item.hours, 0);

  if (wasteTotal > 0) {
    const wasteAsset = (wasteTotal / focusedLifetimeHours) * lifetimeAssetYen;

    lines.push({
      title: t.reportWasteTotalTitle(formatHoursLabel(wasteTotal)),
      body: t.reportAssetWasteBody(formatYenValue(lifetimeAssetYen), formatYenValue(wasteAsset)),
    });
  }

  if (effortTotal > 0) {
    const effortAsset = (effortTotal / focusedLifetimeHours) * lifetimeAssetYen;

    lines.push({
      title: t.reportEffortTotalTitle(formatHoursLabel(effortTotal)),
      body: t.reportAssetEffortBody(formatYenValue(lifetimeAssetYen), formatYenValue(effortAsset)),
    });
  }

  if (!lines.length && trackedHours >= 0) {
    lines.push({
      title: t.reportEmptyTitle(currentAge, Math.round(lifetimeHours || 0).toLocaleString("ja-JP") + t.hoursUnit),
      body: t.reportEmptyBody,
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
        detail: formatWasteDetail(activeYears, frequency, duration),
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
        detail: formatHabitDetail(activeYears, hoursPerDay, note),
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
        detail: formatEffortDetail(activeYears, frequency, duration),
      };
    })
    .filter((item) => item.name && item.hours > 0);

const renderCharts = (items, lifetimeHours, currentAge) => {
  const trackedHours = items.reduce((sum, item) => sum + item.hours, 0);
  const total = lifetimeHours;
  const nonRoutineItems = items.filter((item) => item.type !== "habit");
  const nonRoutineTotal = nonRoutineItems.reduce((sum, item) => sum + item.hours, 0);
  const untrackedHours = Math.max(lifetimeHours - trackedHours, 0);
  const habitHours = items.filter((item) => item.type === "habit").reduce((sum, item) => sum + item.hours, 0);
  const untrackedItem = {
    type: "untracked",
    name: t.untrackedName,
    hours: untrackedHours,
    detail: t.untrackedDetail,
    color: "#ffffff",
  };
  const compareItemsBase =
    compareMode === "focused"
      ? [...nonRoutineItems, ...(untrackedHours > 0 ? [untrackedItem] : [])]
      : [...items, ...(untrackedHours > 0 ? [untrackedItem] : [])];
  const compareTotal = compareMode === "focused" ? lifetimeHours - habitHours : lifetimeHours;
  const compareLabel = compareMode === "focused" ? t.compareLabelFocused : t.compareLabelAll;

  if (total <= 0) {
    ensureDots();
    Array.from(pieChart.children).forEach((dot) => {
      dot.className = "dot";
      dot.style.backgroundColor = "rgba(35, 40, 46, 0.1)";
      dot.style.transitionDelay = "0ms";
      dot.style.animation = "none";
    });
    classicPie.style.background = "rgba(35, 40, 46, 0.08)";
    pieHitArea.innerHTML = "";
    hidePieTooltip();
    classicPie.classList.remove("is-animating");
    legend.innerHTML = "";
    barChart.innerHTML = "";
    reportList.innerHTML = "";
    totalHours.textContent = t.zeroHours;
    largestCategory.textContent = "-";
    summaryCopy.textContent = t.emptySummary;
    return;
  }

  const sortedItems = [...items].sort((a, b) => b.hours - a.hours);
  const largest = sortedItems[0];
  const compareItems = [...compareItemsBase].sort((a, b) => b.hours - a.hours);
  let angleOffset = 0;
  const typeIndexes = { waste: 0, habit: 0, effort: 0, untracked: 0 };
  compareItems.forEach((item) => {
    if (item.type !== "untracked") {
      const palette = typePalettes[item.type] || typePalettes.habit;
      item.color = palette[typeIndexes[item.type] % palette.length];
      typeIndexes[item.type] += 1;
    }
    item.startAngle = angleOffset;
    item.endAngle = angleOffset + (item.hours / Math.max(compareTotal, 1)) * 360;
    angleOffset = item.endAngle;
  });
  const dotItemsSource =
    dotMode === "focused"
      ? [...nonRoutineItems, ...(untrackedHours > 0 ? [untrackedItem] : [])]
      : [...items, ...(untrackedHours > 0 ? [untrackedItem] : [])];
  const dotTotal = dotMode === "focused" ? lifetimeHours - habitHours : lifetimeHours;
  if (dotTotal > 0) {
    const dotItems = [...dotItemsSource]
      .sort((a, b) => b.hours - a.hours)
      .map((item) => ({ ...item }));
    const dotTypeIndexes = { waste: 0, habit: 0, effort: 0, untracked: 0 };
    dotItems.forEach((item) => {
      if (item.type !== "untracked") {
        const palette = typePalettes[item.type] || typePalettes.habit;
        item.color = palette[dotTypeIndexes[item.type] % palette.length];
        dotTypeIndexes[item.type] += 1;
      }
    });
    animateDots(dotItems, dotTotal);
  } else {
    animateDots([], 1);
  }
  const pieSegments = compareItems.map(
    (item) => `${item.color} ${item.startAngle.toFixed(1)}deg ${item.endAngle.toFixed(1)}deg`
  );
  classicPie.style.background = `conic-gradient(${pieSegments.join(", ")})`;
  renderPieHoverTargets(compareItems, Math.max(compareTotal, 1));

  totalHours.textContent = getLifetimeMetrics().display;
  largestCategory.textContent = `${Math.round((trackedHours / lifetimeHours) * 100)}% ${t.tracked}`;
  summaryCopy.textContent = t.summarySentence(largest.name, compareLabel, typeLabels[largest.type]);

  const legendItems =
    activeTab === "dot"
      ? [...dotItemsSource].sort((a, b) => b.hours - a.hours)
      : activeTab === "pie"
        ? compareItems
        : activeTab === "bar"
          ? compareItems.filter((item) => item.type !== "untracked")
          : [...sortedItems];
  const legendTotal =
    activeTab === "dot" ? Math.max(dotTotal, 1) : activeTab === "pie" || activeTab === "bar" ? Math.max(compareTotal, 1) : Math.max(lifetimeHours, 1);

  legend.innerHTML = legendItems
    .map(
      (item) => `
        <div class="legend-item legend-item-${item.type}">
          <div class="legend-swatch" style="background:${item.color};"></div>
          <div class="legend-copy">
            <strong>${item.name} <small>(${typeLabels[item.type]})</small></strong>
            <span>${item.detail}</span>
          </div>
          <strong>${Math.round(item.hours).toLocaleString("ja-JP")}h / ${Math.round((item.hours / legendTotal) * 100)}%</strong>
        </div>
      `
    )
    .join("");

  barChart.innerHTML = compareItems
    .filter((item) => item.type !== "untracked")
    .map((item) => {
      const width = (item.hours / Math.max(compareTotal, 1)) * 100;
      return `
        <div class="bar-item">
          <div class="bar-meta">
            <strong>${item.name}</strong>
            <span>${Math.round(item.hours).toLocaleString("ja-JP")}h / ${Math.round((item.hours / Math.max(compareTotal, 1)) * 100)}%</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="--target-width:${width}%; background:${item.color};"></div>
          </div>
        </div>
      `;
    })
    .join("");
  classicPie.classList.remove("is-animating");
  void classicPie.offsetWidth;
  classicPie.classList.add("is-animating");
  requestAnimationFrame(() => {
    Array.from(barChart.querySelectorAll(".bar-fill")).forEach((bar) => {
      bar.classList.add("animate");
    });
  });

  buildReport(sortedItems, lifetimeHours, trackedHours, currentAge);
};

const render = () => {
  const safeAge = getCurrentAgeValue();
  const items = [...getWasteItems(safeAge), ...getHabitItems(safeAge), ...getEffortItems(safeAge)];
  const lifetimeHours = getLifetimeMetrics().hours;
  updateDerivedAge();
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

birthYearInput.addEventListener("input", render);
const normalizeBirthdayPart = (input, maxLength) => {
  input.value = input.value.replace(/[^\d]/g, "").slice(0, maxLength);
};

const handleBirthdayInput = (event) => {
  normalizeBirthdayPart(event.target, 2);
  render();
};

birthMonthInput.addEventListener("input", handleBirthdayInput);
birthDayInput.addEventListener("input", handleBirthdayInput);
wasteList.addEventListener("input", render);
habitList.addEventListener("input", render);
effortList.addEventListener("input", render);
wasteList.addEventListener("click", handleRemove);
habitList.addEventListener("click", handleRemove);
effortList.addEventListener("click", handleRemove);
pieChart.addEventListener("mousemove", (event) => {
  const dot = event.target.closest(".dot");
  if (!dot || !pieChart.contains(dot)) {
    hideDotTooltip();
    return;
  }
  showDotTooltip(event, dot);
});
pieChart.addEventListener("mouseleave", hideDotTooltip);
tabButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveTab(button.dataset.tab));
});
dotModeButtons.forEach((button) => {
  button.addEventListener("click", () => setDotMode(button.dataset.dotMode));
});
compareModeButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    setCompareMode(button.dataset.compareMode);
  });
});
stageButtons.forEach((button) => {
  button.addEventListener("click", () => setStage(button.dataset.stageTarget));
});
nextStepButtons.forEach((button) => {
  button.addEventListener("click", () => setFlowStep(button.dataset.nextStep));
});

addWasteButton.addEventListener("click", () => {
  addWaste({ name: t.newWaste, startAge: 18, frequency: 3, duration: 30 });
  render();
});

addWastePresetButton.addEventListener("click", () => {
  if (!wastePresetSelect.value) return;
  addWaste({ name: wastePresetSelect.value, startAge: 18, frequency: 3, duration: 30 });
  wastePresetSelect.value = "";
  render();
});

addHabitButton.addEventListener("click", () => {
  addHabit({ name: t.newHabit, startAge: 0, hoursPerDay: 1, note: "" });
  render();
});

addHabitPresetButton.addEventListener("click", () => {
  if (!habitPresetSelect.value) return;
  addHabit(habitPresets[habitPresetSelect.value]);
  habitPresetSelect.value = "";
  render();
});

addEffortButton.addEventListener("click", () => {
  addEffort({ name: t.newEffort, startAge: 15, frequency: 4, duration: 60 });
  render();
});

addEffortPresetButton.addEventListener("click", () => {
  if (!effortPresetSelect.value) return;
  addEffort(effortPresets[effortPresetSelect.value]);
  effortPresetSelect.value = "";
  render();
});

toResultsButton.addEventListener("click", () => setStage("results"));
backToInputButton.addEventListener("click", () => setStage("input"));
toTweakButton.addEventListener("click", () => setStage("tweak"));

t.defaultWaste.forEach(addWaste);
t.defaultHabit.forEach(addHabit);
t.defaultEffort.forEach(addEffort);

setStage("input");
setDotMode("focused");
setCompareMode("focused");
setFlowStep("age");
birthYearInput.max = String(new Date().getFullYear());
render();

if (renderTimer) clearInterval(renderTimer);
renderTimer = setInterval(() => {
  if (birthMonthInput.value && birthDayInput.value) {
    updateLifetimeDisplay();
  }
}, 1000);
