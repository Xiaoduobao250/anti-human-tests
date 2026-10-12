/* ==========================================================================
   Anti-Human Tests · 混沌引擎 (assets/chaos.js)
   进入确认 / 乱码背景 / 全屏故障 / 反色 / 乱飞 / 抖动 / Toast / 音效
   用法：AH.init({title:"...", page:"mc-crash"})
   ========================================================================== */
(function (root) {
  "use strict";

  var GARBAGE = ("▓▒░█▚▞▛▜▟▙◤◥◣◢╳╱╲⣿⡿⢿⠟⠻⠽⠾" +
    "01ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ" +
    "乱码崩溃混沌反人类测试拒绝运行栈溢出臭袜子摸草" +
    "f**k sh*t h*ll d*mn nope bug null NaN").split("");

  var MEMES = [
    "f**k, it crashed", "sh*t, I broke it", "what the h*ll happened",
    "g*dd*mn JVM", "bloody hell, it's on fire", "nope, I'm out",
    "内存不够自己去买，看我干嘛？", "你行你上啊，别光看着",
    "看我干嘛，又不是我崩的", "这锅我不背", "我裂开了，救救我",
    "Java馋了", "Java提桶跑路了", "Java被臭袜子腌入味了",
    "怎么又是我？Java破防了", "披萨凉了，Javaemo了",
    "请先去摸草再来写代码", "猫踩键盘了，Java不背锅"
  ];

  var FLY = [
    "💀", "💩", "🧦", "🌶️", "🔮", "🤡", "👻", "🤯", "🥴", "🙃",
    "👁️", "🦠", "🪱", "💥", "🌀", "😵", "🫠", "🤮", "👽", "💢",
    "🍉", "🌿", "☕", "🐈", "🍕", "🐛", "🦟", "🪰", "🩸", "🧠",
    "💫", "⚡", "🔥", "❄️", "🍜", "f**k", "nope", "why", "???"
  ];

  var S = {
    calm: false,
    entered: false,
    disguised: false,
    isChaosPage: false,
    bgTimer: null,
    overlayEl: null,
    invertOn: false,
    shaking: false,
    cfg: { title: "本页", autoGate: true, scary: false, sound: true, disguise: true }
  };

  /* ---------------- 基础工具 ---------------- */
  function $(id) { return document.getElementById(id); }
  function rnd(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
  function pick(a) { return a[rnd(0, a.length - 1)]; }

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function toast(msg, bad) {
    var t = $("ahToast");
    if (!t) {
      t = document.createElement("div");
      t.id = "ahToast";
      t.className = "toast";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.className = "toast show" + (bad ? " bad" : "");
    clearTimeout(t._tm);
    t._tm = setTimeout(function () { t.className = "toast"; }, 1900);
  }

  /* ---------------- 乱码背景 ---------------- */
  function bgFill() {
    var el = $("ahGlitchBg");
    if (!el) return;
    var cols = Math.max(24, Math.floor(window.innerWidth / 12));
    var rows = Math.max(14, Math.floor(window.innerHeight / 16));
    var out = [];
    for (var y = 0; y < rows; y++) {
      var line = "";
      for (var x = 0; x < cols; x++) {
        line += (Math.random() < 0.09) ? pick(GARBAGE) : pick(GARBAGE);
      }
      out.push(line);
    }
    // 偶尔插入一整行吐槽
    if (Math.random() < 0.35) {
      out[rnd(0, out.length - 1)] = (pick(MEMES) + " " + pick(GARBAGE) + pick(GARBAGE)).slice(0, cols);
    }
    el.textContent = out.join("\n");
  }

  function bgStart() {
    var el = $("ahGlitchBg");
    if (!el || S.bgTimer) return;
    bgFill();
    S.bgTimer = setInterval(bgFill, 120);
  }

  function bgStop() {
    if (S.bgTimer) { clearInterval(S.bgTimer); S.bgTimer = null; }
    var el = $("ahGlitchBg");
    if (el) el.textContent = "";
  }

  /* ---------------- 全屏故障 / 反色 ---------------- */
  function overlay(on) {
    if (on) {
      if (S.overlayEl) return;
      var d = document.createElement("div");
      d.className = "glitch-overlay";
      d.id = "ahGlitchOverlay";
      document.body.appendChild(d);
      S.overlayEl = d;
    } else if (S.overlayEl) {
      if (S.overlayEl.parentNode) S.overlayEl.parentNode.removeChild(S.overlayEl);
      S.overlayEl = null;
    }
  }

  function invert(on) {
    S.invertOn = !!on;
    document.body.classList[on ? "add" : "remove"]("invert");
  }

  /* ---------------- 抖动 ---------------- */
  function shake(on) {
    S.shaking = !!on;
    document.body.classList[on ? "add" : "remove"]("shaking");
  }

  /* ---------------- 乱飞 ---------------- */
  function spawn(n, glyphs) {
    var layer = $("ahChaosLayer");
    if (!layer) {
      layer = document.createElement("div");
      layer.className = "chaos-layer";
      layer.id = "ahChaosLayer";
      document.body.appendChild(layer);
    }
    n = n || 12;
    glyphs = glyphs || FLY;
    for (var i = 0; i < n; i++) {
      (function () {
        var f = document.createElement("div");
        f.className = "flyer";
        f.textContent = (Math.random() < 0.55) ? pick(glyphs) : pick(MEMES);
        var x = rnd(0, Math.max(1, window.innerWidth - 60));
        var y = rnd(0, Math.max(1, window.innerHeight - 60));
        f.style.left = x + "px";
        f.style.top = y + "px";
        f.style.setProperty("--dx", rnd(-260, 260) + "px");
        f.style.setProperty("--dy", rnd(-280, 180) + "px");
        f.style.setProperty("--rot", rnd(-720, 720) + "deg");
        f.style.setProperty("--dur", (rnd(900, 2200) / 1000) + "s");
        f.style.fontSize = rnd(15, 40) + "px";
        layer.appendChild(f);
        setTimeout(function () {
          if (f.parentNode) f.parentNode.removeChild(f);
        }, 2400);
      })();
    }
  }

  /* ---------------- 音效 ---------------- */
  function beep(kind) {
    if (!S.cfg.sound || S.calm) return;
    try {
      var AC = root.AudioContext || root.webkitAudioContext;
      if (!AC) return;
      var ctx = new AC();
      var o = ctx.createOscillator();
      var g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      if (kind === "bad") { o.type = "sawtooth"; o.frequency.value = 120; }
      else if (kind === "ok") { o.type = "triangle"; o.frequency.value = 720; }
      else { o.type = "square"; o.frequency.value = 300; }
      g.gain.setValueAtTime(0.05, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
      o.start(); o.stop(ctx.currentTime + 0.3);
      setTimeout(function () { try { ctx.close(); } catch (e) {} }, 420);
    } catch (e) { /* 静默失败 */ }
  }

  /* ---------------- 停掉一切 ---------------- */
  function stopAll() {
    bgStop(); overlay(false); invert(false); shake(false);
    var layer = $("ahChaosLayer");
    if (layer) layer.innerHTML = "";
    var ov = $("ahGlitchOverlay");
    if (ov && ov.parentNode) ov.parentNode.removeChild(ov);
    S.overlayEl = null;
  }

  /* ---------------- 平静模式 ---------------- */
  function setCalm(on) {
    S.calm = !!on;
    var t = $("ahCalm");
    if (t) t.textContent = S.calm ? "😵 已关闭猎奇动效（点此恢复）" : "🧘 关闭猎奇动效";
    if (S.calm) stopAll();
    else if (S.entered) bgStart();
    toast(S.calm ? "已切换安静模式" : "混沌已重新上线");
  }

  /* ---------------- 入口确认（解锁后才用） ---------------- */
  function buildGate(opt) {
    var g = document.createElement("div");
    g.className = "gate";
    g.id = "ahGate";
    var scary = !!opt.scary;
    g.innerHTML =
      '<div class="box">' +
      '<h2>⚠️ 警告 / WARNING</h2>' +
      '<p class="small">本页属于 <b>反人类测试</b> 系列：' + esc(opt.title) + '。</p>' +
      '<p class="small muted">页面包含<strong>快速闪烁、整页抖动、乱码背景与猎奇动效</strong>，' +
      '可能诱发光敏性癫痫、眩晕或强烈不适。点「让我崩溃」类按钮前请三思。</p>' +
      (scary ? '<p class="small" style="color:var(--err)">本页为恐怖/惊吓向内容，心脏不适者请直接离开。</p>' : '') +
      '<div class="btnrow" style="margin-top:14px">' +
      '<button class="btn" id="ahGateOk">✅ 我确认，进入混沌</button>' +
      '<button class="btn ghost" id="ahGateNo">↩️ 后悔了，回到正经</button>' +
      '</div>' +
      '<p class="small muted" style="margin:12px 0 0">作者概不负责；友尽、砸键盘、被室友投诉均由你自己承担。' +
      '—— 来自 Anti-Human Tests</p>' +
      '</div>';
    document.body.appendChild(g);
    $("ahGateOk").onclick = function () { g.parentNode && g.parentNode.removeChild(g); enter(true); };
    $("ahGateNo").onclick = function () { g.parentNode && g.parentNode.removeChild(g); enter(false); };
  }

  function enter(ok) {
    S.entered = true;
    var con = $("chaosConsole");
    if (con) con.style.display = ok ? "block" : "none";
    if (ok) {
      bgStart();
      toast("混沌已开启，慎点 💥");
      AH_UNLOCK_BONUS();
    } else {
      /* 混沌页上点「后悔了」→ 跳回正常形态 */
      var back = normalTarget();
      if (back) { root.location.href = back; return; }
      toast("已保持安静模式");
      setCalm(true);
    }
  }

  /* ---------------- 导航（双形态：各自链接各自形态） ---------------- */
  var NAV_DISGUISE = [
    ["index.html", "🏠 首页"],
    ["mc-crash/index.html", "⛏️ MC 工具箱"],
    ["cpp-quiz/index.html", "📋 能力评估"],
    ["number-theory/index.html", "🔢 数论练习"],
    ["combinatorics/index.html", "🎲 组合练习"],
    ["fake-crash/index.html", "📄 日志示例"],
    ["fake-console/index.html", "🖥️ 演示控制台"],
    ["fake-download/index.html", "📥 下载演示"],
    ["java-crash/index.html", "☕ 日志生成器"]
  ];
  var NAV_REAL = [
    ["index-chaos.html", "🏠 首页"],
    ["mc-crash/index-chaos.html", "⛏️ MC崩溃"],
    ["cpp-quiz/index-chaos.html", "📋 能力评估"],
    ["number-theory/index-chaos.html", "🔢 数论"],
    ["combinatorics/index-chaos.html", "🎲 组合"],
    ["fake-crash/index-chaos.html", "💥 假崩溃"],
    ["fake-console/index-chaos.html", "🖥️ 假控制台"],
    ["fake-download/index-chaos.html", "📥 假下载"],
    ["java-crash/index-chaos.html", "☕ 异常生成器"]
  ];

  function buildNav(current) {
    var host = $("ahNav");
    if (!host) return;
    var prefix = (current === "/" || !current) ? "" : "../";
    var list = S.disguised ? NAV_DISGUISE : NAV_REAL;
    var html = '<span class="brand" id="ahBrand">' +
      (S.disguised ? '技术学习<b>·</b>资源中心' : 'ANTI<b>·</b>HUMAN TESTS') + '</span>';
    for (var i = 0; i < list.length; i++) {
      var path = list[i][0], label = list[i][1];
      var on = path.indexOf(current) === 0;
      html += '<a href="' + prefix + path + '"' + (on ? ' class="on"' : "") + ">" + label + "</a>";
    }
    html += '<span class="spacer"></span>';
    if (S.disguised) {
      html += '<span class="calm" id="ahCalm">ℹ️ 关于本站</span>';
    } else {
      html += '<span class="calm" id="ahCalm">🧘 关闭猎奇动效</span>' +
              '<span class="calm" id="ahBack" title="回到正经形态">🎓 回到正经</span>';
    }
    host.innerHTML = html;
    $("ahCalm").onclick = function () {
      if (S.disguised) { toast("一个平平无奇的学习网站。真的。"); }
      else setCalm(!S.calm);
    };
    var back = $("ahBack");
    if (back) back.onclick = function () {
      var t = normalTarget();
      if (t) root.location.href = t;
    };
    /* 彩蛋 1：连点品牌 5 次（正常页专属） */
    var brandEl = $("ahBrand");
    brandEl.style.cursor = "default";
    var taps = 0, tapTm = null;
    brandEl.onclick = function () {
      if (!S.disguised) return;
      taps++;
      clearTimeout(tapTm);
      tapTm = setTimeout(function () { taps = 0; }, 1600);
      if (taps >= 5) { taps = 0; unlock("你把 logo 点出了包浆"); }
    };
  }

  /* 当前页对应的正常形态路径 */
  function normalTarget() {
    var p = root.location.pathname.split("/").pop() || "index.html";
    if (/-chaos\.html$/i.test(p)) {
      return p.replace(/-chaos\.html$/i, ".html");
    }
    return null;
  }

  /* ---------------- 初始化 ---------------- */
  function init(opt) {
    opt = opt || {};
    for (var k in opt) if (opt.hasOwnProperty(k)) S.cfg[k] = opt[k];

    /* 双形态架构：
       - 正常页（默认）：伪装成正经页面，彩蛋触发后跳转到 -chaos.html
       - -chaos.html：完整混沌形态，自带 AH_MODE="chaos" 标记
       URL 参数 ?chaos=1 可强制进入混沌态（对正常页同样生效） */
    var forced = /chaos=1/.test(root.location ? root.location.search : "");
    S.isChaosPage = (typeof root.AH_MODE === "string" && root.AH_MODE === "chaos");
    S.disguised = !(forced || S.isChaosPage || root.__AH_NO_DISGUISE || (opt.disguise === false));
    S.gateWanted = (opt.autoGate !== false && !root.__AH_NO_GATE);

    if (S.disguised) {
      document.documentElement.classList.add("ah-disguised");
    }

    buildNav(opt.page || "/");

    // 注入交互层元素（混沌页才真正用得到；正常页隐藏）
    if (!$("ahChaosLayer")) {
      var l = document.createElement("div");
      l.className = "chaos-layer"; l.id = "ahChaosLayer";
      if (S.disguised) l.style.display = "none";
      document.body.appendChild(l);
    }
    if (!$("ahGlitchBg")) {
      var b = document.createElement("div");
      b.className = "glitch-bg"; b.id = "ahGlitchBg";
      b.setAttribute("aria-hidden", "true");
      if (S.disguised) b.style.display = "none";
      document.body.appendChild(b);
    }

    if (S.disguised) {
      buildEasterEggs();     /* 只有正常页监听彩蛋 */
      disguisePage();
    }

    if (S.gateWanted !== false && !S.disguised) {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function () { buildGate(S.cfg); });
      } else {
        buildGate(S.cfg);
      }
    }

    /* 混沌页加载时，若有彩蛋提示则 toast 出来 */
    if (S.isChaosPage) {
      var hint = "";
      try { hint = root.sessionStorage.getItem("ah_unlock_hint") || ""; } catch (e) {}
      if (hint) {
        try { root.sessionStorage.removeItem("ah_unlock_hint"); } catch (e) {}
        setTimeout(function () { toast("🎭 伪装解除：" + hint); }, 600);
      }
    }
  }

  /* ---------------- 跳转到混沌形态 ---------------- */
  function gotoChaos(hint) {
    /* 记忆彩蛋提示，chaos 页加载后 toast 出来 */
    try { root.sessionStorage.setItem("ah_unlock_hint", hint || ""); } catch (e) {}
    var target = chaosTarget();
    if (target) { root.location.href = target; return; }
    /* 找不到对应 chaos 页时原地解锁（兜底） */
    unlockInPlace(hint);
  }

  /* 当前页对应的 -chaos.html 路径 */
  function chaosTarget() {
    var p = root.location.pathname.split("/").pop() || "index.html";
    if (/\.html$/i.test(p) && !/-chaos\.html$/i.test(p)) {
      var candidate = p.replace(/\.html$/i, "-chaos.html");
      return candidate;   /* 相对路径，与当前页同目录 */
    }
    return null;
  }

  /* ---------------- 原地解锁（仅兜底：无 chaos 页时） ---------------- */
  function unlockInPlace(hint) {
    if (!S.disguised) return;
    S.disguised = false;
    document.documentElement.classList.remove("ah-disguised");
    buildNav(S.cfg.page || "/");
    var gateHost = $("ahGate");
    if (gateHost && gateHost.parentNode) gateHost.parentNode.removeChild(gateHost);
    toast("🎭 伪装解除：" + hint);
    if (S.gateWanted !== false) {
      setTimeout(function () { buildGate(S.cfg); }, 60);
    }
  }

  /* ---------------- 彩蛋集合 ---------------- */
  var footTaps = 0, footTm = null;

  function buildEasterEggs() {
    var seq = [];

    /* 彩蛋 2：Konami 秘技 ↑↑↓↓←→←→BA */
    var KONAMI = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    root.addEventListener("keydown", function (e) {
      if (S.disguised === false && S.entered) return;
      seq.push(e.keyCode);
      if (seq.length > KONAMI.length) seq.shift();
      for (var i = 0; i < seq.length; i++) {
        if (seq[i] !== KONAMI[i]) { if (seq[i] !== KONAMI[0]) seq = [e.keyCode]; break; }
      }
      if (seq.length === KONAMI.length) { seq = []; unlock("经典秘技，老玩家了"); }
    });

    /* 彩蛋 3：打字输入 c-h-a-o-s */
    var typed = "";
    root.addEventListener("keypress", function (e) {
      var k = String.fromCharCode(e.which || e.keyCode).toLowerCase();
      if (!/[a-z]/.test(k)) return;
      typed = (typed + k).slice(-5);
      if (typed === "chaos") { typed = ""; unlock("手滑打错了什么奇怪的东西"); }
    });

    /* 彩蛋 4：连点页脚系列链接（伪装文案或真身文案均可） */
    document.addEventListener("click", function (e) {
      var a = e.target && e.target.closest ? e.target.closest("a") : null;
      if (!a) return;
      var txt = a.textContent || "";
      if (/反人类测试系列|前端学习系列/.test(txt)) {
        e.preventDefault();
        footTaps++;
        clearTimeout(footTm);
        footTm = setTimeout(function () { footTaps = 0; }, 1600);
        if (footTaps >= 5) { footTaps = 0; unlock("你对页脚下手了"); }
      }
    });

    /* 彩蛋 5：logo hover 时的文案彩蛋（伪装模式） */
    if (S.disguised) {
      setTimeout(function () {
        var brandEl = $("ahBrand");
        if (brandEl) brandEl.title = "本网站与任何崩溃、任何异常、任何袜子无关";
      }, 50);
    }
  }

  /* ---------------- 解锁 ---------------- */
  function unlock(hint) {
    if (!S.disguised) return;
    /* 有对应 chaos 页 → 跳转；否则原地解锁兜底 */
    if (chaosTarget()) { gotoChaos(hint); return; }
    unlockInPlace(hint);
  }

  /* ---------------- 伪装：把页面洗成正经 ---------------- */
  function disguisePage() {
    if (!S.disguised) return;
    var w = document;
    if (!w.body) { setTimeout(disguisePage, 30); return; }

    /* 1. 标题清洗（去掉 Anti-Human Tests 字样） */
    if (/Anti-Human/i.test(w.title)) {
      w.title = w.title.replace(/·\s*Anti-Human Tests\s*$/i, " · 学习资料库").replace(/Anti-Human Tests/i, "学习资料库");
    }
    var meta = w.querySelector('meta[name="description"]');
    if (meta && /反人类|Anti-Human/i.test(meta.getAttribute("content") || "")) {
      meta.setAttribute("content", "一个平平无奇的技术学习资源中心，包含练习题、示例页面与开发工具。");
    }

    /* 2. 遍历文本节点，替换露馅文案 */
    var WORDMAP = [
      [/反人类测试系列/g, "前端学习系列"],
      [/反人类测试/g, "测试练习"],
      [/Anti-Human Tests/gi, "Tech Study Hub"],
      [/反人类/g, "进阶"],
      [/如果有人因为这个项目友尽，作者概不负责。?/g, "祝你学习顺利。"],
      [/评分标准经过严格校准[：:]?答完之后\s*80%\s*的概率「就不给你答案」，?\s*20%\s*的概率突然冒出一个\s*E\s*选项。?请相信我们，?这是为了你的成长。?/g,
        "评分标准客观公正：答完之后立即给出正确答案与详细解析。祝你练习顺利。"],
      [/答完之后\s*80%\s*的概率[「"]就不给你答案[」"]，?\s*20%\s*的概率突然冒出一个\s*E\s*选项。?/g, "答完之后立即给出正确答案与解析。"],
      [/就不给你答案/g, "马上给你答案"],
      [/正确答案藏在\s*E\s*里，?而\s*E\s*只有\s*20%\s*概率出现。?/g, "答案与解析会在答题后展示。"],
      [/所有\s*A\/B\/C\/D\s*都是错的，?正确答案藏在\s*E\s*里，?而\s*E\s*只有\s*20%\s*概率出现。?/g, "每题附有详细解析，答题后自动展示。"],
      [/A\/B\/C\/D\s*全是错的/g, "每题都有唯一正确答案"],
      [/你选的\s*A\/B\/C\/D\s*都是错的。?/g, "这道题需要再想想。"],
      [/C\+\+\s*未定义行为专场/g, "C++ 进阶练习"],
      [/未定义行为专场/g, "C++ 进阶练习"],
      [/未定义行为/g, "易错行为"],
      [/UB\s*专场/g, "C++ 进阶练习"],
      [/假装正经|装正经/g, "专注学习"],
      [/仅供娱乐[，。]?请勿用于伪造真实崩溃日志[／/]\s*现实生活。?/g, "内容仅供参考。"],
      [/仅供娱乐[，。]?\s*本页所有崩溃日志都是编的，?请勿用于伪造真实日志或欺骗他人。?/g, "内容仅供参考，日志数据均为教学示例。"],
      [/仅供娱乐[，。]?请勿用于伪造真实崩溃日志。?/g, "内容仅供参考。"],
      [/仅供娱乐[，。]?/g, "内容仅供参考。"],
      [/请勿用于伪造真实(崩溃日志|日志|崩溃日志 \/ 现实生活)。?/g, "内容仅供参考。"],
      [/本页所有崩溃日志都是编的，?/g, ""],
      [/伪造真实日志或欺骗他人/g, "结合官方文档学习"],
      [/猎奇/g, "进阶"],
      [/混沌/g, "高级"],
      [/光敏性癫痫/g, "不适"],
      [/友尽/g, "困扰"],
      [/随便编/g, "灵活配置"],
      [/看了都想辞职/g, "值得仔细研究"]
    ];
    var walker = w.createTreeWalker ? w.createTreeWalker(w.body, NodeFilter.SHOW_TEXT, null, false) : null;
    if (walker) {
      var nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(function (n) {
        var v = n.nodeValue;
        if (!v) return;
        var out = v;
        for (var i = 0; i < WORDMAP.length; i++) out = out.replace(WORDMAP[i][0], WORDMAP[i][1]);
        if (out !== v) n.nodeValue = out;
      });
    }

    /* 3. 隐藏混沌控件与杀马特按钮 */
    ["chaosConsole", "madBtn", "seizureWarn", "chaosLayer"].forEach(function (id) {
      var el = $(id);
      if (el) el.style.display = "none";
    });

    /* 4. 徽章消毒：把 chaos 徽章改叫「高级」 */
    var badges = w.querySelectorAll(".badge.chaos, .badge.bad, .badge.warn");
    for (var i = 0; i < badges.length; i++) {
      var b = badges[i];
      if (/猎奇|反人类|混沌/.test(b.textContent || "")) {
        b.textContent = b.textContent.replace(/猎奇|反人类|混沌/g, "高级");
      }
    }
  }

  /* 解锁后的额外动作钩子（页面可覆盖 AH.onUnlock） */
  function AH_UNLOCK_BONUS() {
    if (typeof root.AH !== "undefined" && typeof root.AH.onUnlock === "function") {
      try { root.AH.onUnlock(); } catch (e) {}
    }
  }

  /* ---------------- 伪装护栏 ----------------
     页面用 AH.guard(disgustedFn, realFn) 包裹动效入口：
     伪装态走 disgustedFn（无害演示），真身走 realFn。 */
  function guard(disgFn, realFn) {
    return function () {
      var args = arguments, self = this;
      if (S.disguised) {
        if (typeof disgFn === "function") return disgFn.apply(self, args);
        return;
      }
      if (typeof realFn === "function") return realFn.apply(self, args);
    };
  }

  root.AH = {
    init: init, toast: toast, spawn: spawn, shake: shake,
    invert: invert, overlay: overlay, bgStart: bgStart, bgStop: bgStop,
    stopAll: stopAll, beep: beep, pick: pick, rnd: rnd, esc: esc,
    setCalm: setCalm, state: S, MEMES: MEMES, FLY: FLY, GARBAGE: GARBAGE,
    unlock: unlock, gotoChaos: gotoChaos, disguisePage: disguisePage, guard: guard,
    chaosTarget: chaosTarget, normalTarget: normalTarget,
    onUnlock: null,
    get calm() { return S.calm; },
    get disguised() { return S.disguised; },
    get isChaosPage() { return S.isChaosPage; }
  };
})(window);
