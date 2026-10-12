# Anti-Human Tests · 反人类测试

> A collection of tests that measure how much a human can endure.
> 这里没有一道题是为你好的，每一页都在试探你的耐心下限。

⚠️ **本项目仅供娱乐。** 请勿用于伪造真实崩溃日志、欺骗他人、或恶心真实存在的人。
本系列页面包含**快速闪烁、整页抖动、乱码背景与猎奇动效**，可能诱发光敏性癫痫或眩晕。
每个页面进入时都会先弹一个确认框，点「取消」即可保持安静模式（不显示乱码背景、不开放混沌控件）。

---

## 🚀 在线体验

部署 GitHub Pages 后访问：`https://<你的用户名>.github.io/anti-human-tests/`

本地直接双击 `index.html` 即可，全部为纯静态页面，无外部依赖，`file://` 下也能跑。

---

## 📚 内容列表

| 页面 | 说明 | 风格 |
| --- | --- | --- |
| [`index.html`](index.html) | 反人类测试中心（首页导航） | 猎奇 |
| [`mc-crash/index.html`](mc-crash/index.html) | MC 崩溃处理大挑战 · **正经版** | 讲道理，读栈找真凶 |
| [`mc-crash/evil.html`](mc-crash/evil.html) | MC 崩溃处理大挑战 · **反套路版** | 栈顶模组多半是无辜的 |
| [`mc-crash/mixed.html`](mc-crash/mixed.html) | MC 崩溃处理大挑战 · **混合套路版** | 公平题与陷阱题交替，不告诉你哪个是哪个 |
| [`mc-crash/chaos.html`](mc-crash/chaos.html) | MC 崩溃处理大挑战 · **混沌版** | 真凶是猫、是 `.png`、是你自己 |
| [`cpp-quiz/index.html`](cpp-quiz/index.html) | MC 崩溃处理能力评估 · 内测版 v2.3.1 | 18 题，A/B/C/D 全错，答案藏在 20% 概率出现的 E 里 |
| [`cpp-quiz/ub.html`](cpp-quiz/ub.html) | 未定义行为专场 | 正确答案是「标准没规定」 |
| [`number-theory/index.html`](number-theory/index.html) | 数论测试 | 费马 / 欧拉 / CRT / 二次剩余 |
| [`combinatorics/index.html`](combinatorics/index.html) | 组合测试 | 错排 / 卡特兰 / 容斥 / 鸽巢 + 计算器玩具 |
| [`fake-crash/index.html`](fake-crash/index.html) | 假 MC 崩溃页面 | 一键生成以假乱真的崩溃报告 |
| [`fake-console/index.html`](fake-console/index.html) | 假 MC 控制台 | 会回应你输入的假服务器控制台 |
| [`fake-download/index.html`](fake-download/index.html) | 假下载页面 | 进度永远卡在 87%，讽刺流氓下载站 |
| [`java-crash/index.html`](java-crash/index.html) | Java 异常生成器（人类迷惑行为版） | 生成猎奇 Java 异常日志 |

---

## ✨ 功能

### 🎭 双形态架构（正常 / 混沌）

每个页面有**两个独立形态**，互相独立、互不污染：

- **正常形态**（`index.html` 等）：伪装成正经学习网站，功能是诚实的（如能力评估真的给分）。
  页面里埋了彩蛋，触发后**跳转到对应的 `-chaos.html`**。
- **混沌形态**（`index-chaos.html` 等）：完整反人类体验，进入先弹警告框，
  导航栏有「🎓 回到正经」可一键跳回正常形态。

**彩蛋**（在正常形态页面触发，任选其一）：

| 彩蛋 | 操作 |
| --- | --- |
| 🎮 经典秘技 | 键盘依次按 `↑ ↑ ↓ ↓ ← → ← → B A` |
| ⌨️ 打字彩蛋 | 任意输入框外直接敲出 `chaos` 五个字母 |
| 🖱️ 连点 logo | 快速点击左上角品牌 logo 5 次 |
| 🦶 连点页脚 | 快速点击页脚「学习系列」链接 5 次 |

彩蛋触发时会记住提示语，混沌页加载后会以 toast 展示（如「🎭 伪装解除：经典秘技，老玩家了」）。
也可用 URL 参数 `?chaos=1` 在正常页强制跳到混沌形态。

文件对应关系：`xxx.html` ↔ `xxx-chaos.html`，两者同目录成对出现。

### 共享混沌引擎（assets/chaos.js + assets/style.css）

- **进入确认闸门**：进入任意页面先弹警告，确认后才开放混沌控件并启动闪烁乱码背景。
- **闪烁乱码背景**：全屏乱码字符每 120ms 随机刷新，叠加色相与亮度闪烁。
- **混沌控制台**：确认后出现的额外控件——全屏故障、反色闪屏、召唤乱码雨、一键停全部动效。
- **安静模式**：`🧘 关闭猎奇动效` 一键关掉所有效果，配置读写均在内存中，页面重载后恢复默认。
- **音效**：WebAudio 合成短音，无音频文件，安静模式下自动静音。

### Java 异常生成器

- 4 种格式：bare / log4j 控制台 / Forge 崩溃报告 / 完整 FATAL 版。
- 日志以**英文为主**，混合轻度脱敏吐槽词（`f**k`、`sh*t`、`h*ll`、`d*mn`——不脏）。
- **猎奇异常对**：类名与消息强制配对，例如：

```
java.lang.F**kWatermelonException: 🍉🍉🍉🍉🍉Java馋了
    at QuietQuitting.leftGroupChat(FriendsBadTake.java:66666)
```

| 异常类 | 消息 |
| --- | --- |
| `F**kWatermelonException` | 🍉🍉🍉🍉🍉Java馋了 |
| `TouchSomeGrassException` | 🌿🌿🌿🌿🌿Java想去草坪打个滚 |
| `BuyYourOwnRamError` | 💸💸💸💸💸内存不够自己去买，看我干嘛？ |
| `ImOuttaHereException` | 🚪🚪🚪🚪🚪Java提桶跑路了 |
| `SockOverflowException` | 🧦🧦🧦🧦🧦Java被臭袜子腌入味了 |
| `CaffeineNotFoundError` | ☕☕☕☕☕Java没喝到咖啡，拒绝上班 |
| `WhyIsItAlwaysMeException` | 💔💔💔💔💔怎么又是我？Java破防了 |
| `BrainNotFoundException` | 🧠🧠🧠🧠🧠Java找不到脑子了，凑合用吧 |
| `PermissionToCryException` | 😢😢😢😢😢Java想哭，申请已批准 |
| `CatOnKeyboardException` | 🐈🐈🐈🐈🐈猫踩键盘了，Java不背锅 |
| `PizzaWasColdException` | 🍕🍕🍕🍕🍕披萨凉了，Javaemo了 |
| `GrassTouchingRequiredException` | 🌾🌾🌾🌾🌾请先去摸草再来写代码 |

- `StackOverflowError` / `OutOfMemoryError` 固定输出「内存不够自己去买，看我干嘛？」。

---

## 📋 示例输出

```
[21:43:34] [main/INFO]: Loading mods...
[21:43:34] [main/INFO]: Loaded 1 mod: installed by your friend
[21:43:34] [main/WARN]: Detected suspicious smell
[21:43:34] [main/ERROR]: com.smelly.sock.WhyAreYouLikeThisException: f**k, it crashed
    at QuietQuitting.leftGroupChat(FriendsBadTake.java:66666)
    at NullPointerPanic.screamedInternally(SpaghettiCode.java:404404)
    at GhostCommit.facepalmed(RoommateSnore.java:1)
Caused by: com.smelly.sock.SmellySockEx: Java got suffocated by a smelly sock
    at MentalBreakdown.crashed(Soul.java:2048)
[21:43:34] [main/FATAL]: Game crashed
[21:43:34] [main/FATAL]: Java crashed too
[21:43:34] [main/FATAL]: Your friend crashed too
[21:43:34] [main/INFO]: Open a window, seriously
[21:43:34] [main/INFO]: Change your socks, please
[21:43:34] [main/INFO]: Might as well restart your life
```

---

## 📖 文档

- [反人类设计原则](docs/design-principles.md) ——「反人类」不是乱来，所有恶意都经过设计。
- [受害者故事集](docs/victim-stories.md) —— 友尽、砸键盘、被室友投诉的（编的）案例。

---

## ⚠️ 免责声明

本项目是玩笑与恶作剧的集合，**不提供任何实用价值**。
其中的数学与 C++/Java 语义部分是认真的、正确的；但崩溃日志、下载页、控制台输出**全部是编造的**。

由此产生的友尽、砸键盘、闪瞎眼、被公司开除等后果，**作者概不负责**。

**特别提醒**：本项目生成的所有日志均带有明显的虚构特征（猎奇类名、表情符号、中文吐槽），
请勿用于任何欺骗性用途。

---

## 🤝 参与贡献

想贡献更反人类的想法？请先读 [CONTRIBUTING.md](CONTRIBUTING.md) 与 [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)。

## 📄 License

[MIT](LICENSE)
