# AI Markdown 内容生成规范

本文件是本网站 Markdown 内容的完整写作契约。可以把本文件直接提供给 AI，并要求它依据用户给出的事实生成或修改内容文件。

## 1. AI 的任务边界

AI 只能在以下内容路径中创建或修改 Markdown：

```text
src/content/profile.md
src/content/projects/*.md
src/content/publications/*.md
src/content/articles/*.md
```

除非用户明确要求，AI 不得修改：

- `src/content.config.ts`
- `src/pages/`
- `src/layouts/`
- `src/components/`
- `src/styles/`
- 构建、依赖或部署配置

AI 必须遵守以下事实约束：

1. 只能使用用户明确提供或允许使用的信息。
2. 不得编造项目成果、论文状态、作者、venue、日期、URL、教育经历或个人身份。
3. 必要信息缺失时，应向用户询问；不能确认是否公开的条目应设置 `draft: true`。
4. 不得把示例内容当成用户的真实经历。
5. 不得为了填满模板增加 schema 中不存在的字段。

## 2. 通用文件规则

### 文件名与 URL

- Project、Paper、Article 的文件名就是稳定 slug。
- 文件名只使用小写英文字母、数字和连字符，例如 `agent-evaluation-harness.md`。
- 不使用空格、中文、下划线或日期前缀。
- 已公开文件不要随意重命名，否则页面 URL 会改变。

对应关系：

```text
src/content/projects/my-project.md
→ /projects/my-project/

src/content/publications/my-paper.md
→ /publications/my-paper/

src/content/articles/my-article.md
→ /articles/my-article/
```

### 文件结构

每个文件由 YAML frontmatter 和 Markdown 正文组成：

```markdown
---
字段: 值
---

正文从这里开始。
```

规则：

- `---` 必须各自独占一行。
- YAML 使用两个空格缩进，不使用 Tab。
- Project 的开始和结束月份统一写成带引号的 `YYYY.M`，例如 `"2026.5"`。
- Article 的日期统一写成 `YYYY-MM-DD`。
- 布尔值只能写成小写的 `true` 或 `false`。
- `year` 必须是不带引号的整数，例如 `2026`。
- URL 必须是完整的 `https://...` 地址；站内 CV 链接可以写 `/cv/`。
- 包含冒号、井号或其他 YAML 特殊字符的长文本应使用引号。
- 不要重复字段名，例如错误写法 `summary: summary: ...`。
- 页面标题来自 frontmatter，正文不要再写一个重复的一级标题 `# Title`。

### 正文原则

- `summary` 只承担列表摘要，建议一到两句。
- 背景、方法、结果、设计决策和说明写在 Markdown body 中。
- 正文从普通段落或二级标题 `##` 开始。
- 使用清晰的短段落；需要时可以使用列表、链接、引用和代码块。
- 不要加入营销话术、空洞形容词或未经证实的影响力描述。
- 不要在正文中重复 frontmatter 的作者、年份、标签等索引信息，除非语义确实需要。

## 3. Profile：个人资料

固定路径：

```text
src/content/profile.md
```

网站只能存在一个 `profile.md`。

完整模板：

```markdown
---
name: "English Name"
nameZh: "中文名"
role: "Role or academic status"
affiliation: "University · School or Department"
location: "City, Country"
summary: "One concise sentence describing the main research and technical interests."
interests:
  - "Research interest one"
  - "Research interest two"
  - "Research interest three"
email: "name@example.com"
links:
  github: "https://github.com/username"
  cv: "/cv/"
education:
  - institution: "University name"
    degree: "Degree and field"
    period: "2023 — Present"
---

Write the longer biography here.
```

字段说明：

| 字段 | 必填 | 类型与用途 |
| --- | --- | --- |
| `name` | 是 | 英文名；同时用于页面标题 |
| `nameZh` | 否 | 中文名 |
| `role` | 是 | 当前身份 |
| `affiliation` | 是 | 学校与院系 |
| `location` | 是 | 所在城市与国家或地区 |
| `summary` | 是 | 首页主要介绍句 |
| `interests` | 是 | 至少一项，显示在首页 |
| `email` | 是 | 合法邮箱地址 |
| `links` | 是 | 链接对象；目前支持 `github` 和 `cv` |
| `education` | 是 | 教育经历数组，可以包含多项 |

注意：

- 不要添加 Google Scholar 字段。
- `links` 即使没有任何链接也必须保留，可写成 `links: {}`。
- Profile 的 Markdown 正文可作为完整个人简介的信息源；当前单屏首页只显示 `summary`，不会显示正文。

## 4. Project：项目

目标目录：

```text
src/content/projects/
```

完整模板：

```markdown
---
title: "Project title"
startDate: "2026.5"
endDate: "2026.6"
summary: "One or two factual sentences describing the project."
tags:
  - "Agents"
  - "Evaluation"
featured: false
draft: true
links:
  Repository: "https://github.com/username/repository"
  Demo: "https://example.com"
---

Opening paragraph explaining what the project is and why it exists.

## Motivation

Explain the concrete problem.

## What I built

Describe the implementation, your contribution, and important design decisions.

## Results or current status

State verified results, limitations, or the current stage without exaggeration.
```

字段说明：

| 字段 | 必填 | 类型与用途 |
| --- | --- | --- |
| `title` | 是 | 项目名称 |
| `startDate` | 是 | 项目开始月份，使用带引号的 `YYYY.M` |
| `endDate` | 是 | 项目结束月份，使用带引号的 `YYYY.M`，不得早于 `startDate` |
| `summary` | 是 | Project Index 中的摘要 |
| `tags` | 否 | 字符串数组；省略时为空数组 |
| `featured` | 否 | 编辑标记；目前 `true` 的项目会进入 CV 的 Selected projects |
| `draft` | 否 | `true` 时生产构建不会生成该详情页 |
| `links` | 否 | 链接名称到完整 URL 的映射 |

正文标题可以根据项目内容调整，不要求机械保留模板中的三个小节。

## 5. Paper：论文或研究稿件

目标目录：

```text
src/content/publications/
```

完整模板：

```markdown
---
title: "Paper title"
year: 2026
authors:
  - "Author One"
  - "Author Two"
venue: "Conference, journal, workshop, preprint, or working paper"
summary: "A concise factual description of the research question and contribution."
featured: false
draft: true
links:
  PDF: "https://example.com/paper.pdf"
  Code: "https://github.com/username/repository"
---

Opening paragraph or abstract.

## Abstract

Describe the problem, method, evidence, and conclusion.

## Citation

Add a BibTeX block only when the user provides verified citation information.
```

字段说明：

| 字段 | 必填 | 类型与用途 |
| --- | --- | --- |
| `title` | 是 | 论文标题 |
| `year` | 是 | 用于排序的整数年份 |
| `authors` | 是 | 至少一位作者，顺序必须与正式版本一致 |
| `venue` | 是 | 正式 venue 或准确状态，例如 `Preprint`、`Working paper` |
| `summary` | 是 | Paper Index 中的摘要 |
| `featured` | 否 | 保留的编辑标记；当前首页不展示论文 |
| `draft` | 否 | `true` 时生产构建不会生成该详情页 |
| `links` | 否 | PDF、Code、Project page 等链接 |

注意：

- 不得把“准备投稿”写成“已投稿”，不得把“投稿”写成“录用”。
- 不知道 venue 时使用用户确认的中性状态，不得猜测。
- 作者姓名、顺序和年份必须来自用户提供的可靠信息。

## 6. Article：技术文章

目标目录：

```text
src/content/articles/
```

完整模板：

```markdown
---
title: "Article title"
date: 2026-01-31
summary: "A concise description of what the reader will learn."
tags:
  - "Agents"
  - "Engineering"
featured: false
draft: true
---

Opening paragraph introducing the concrete question.

## First section

Develop the argument with examples or evidence.

## Conclusion

Summarize the useful takeaway without repeating the introduction.
```

字段说明：

| 字段 | 必填 | 类型与用途 |
| --- | --- | --- |
| `title` | 是 | 文章标题 |
| `date` | 是 | 发布或计划发布日期，格式为 `YYYY-MM-DD` |
| `summary` | 是 | Writing Index 中的摘要 |
| `tags` | 否 | 主题标签数组 |
| `featured` | 否 | 保留的编辑标记；当前首页不展示文章 |
| `draft` | 否 | `true` 时生产构建不会生成该详情页 |

Article 当前没有 `links` frontmatter。相关外部链接应自然地写进 Markdown 正文。

## 7. 发布状态、排序和页面生成

- 本地运行 `npm run dev` 时，Draft 会显示并带有 Draft 标记。
- 生产运行 `npm run build` 时，`draft: true` 的内容不会生成详情页，也不会进入列表。
- Project 先按 `endDate`、再按 `startDate` 从新到旧排序，页面显示为 `YYYY.M-YYYY.M`。
- Article 按 `date` 从新到旧排序。
- Paper 按 `year` 从新到旧排序。
- 首页是固定单屏，不展示 Project、Paper 或 Article 条目；它们通过右上角导航进入。
- 新建合规文件后，不需要修改页面代码。

## 8. AI 生成后的强制检查

AI 在交付前必须逐项确认：

1. 文件位于正确目录。
2. 文件名是小写 kebab-case，并且没有覆盖无关文件。
3. frontmatter 的开始和结束分隔线完整。
4. YAML 只使用空格缩进，数组缩进正确。
5. 没有重复键和额外字段。
6. 日期、年份、布尔值、邮箱和 URL 类型正确。
7. 所有事实都来自用户；不确定内容未被包装成事实。
8. 正文没有重复一级标题。
9. 新内容默认先使用 `draft: true`，除非用户明确要求公开。
10. 在项目根目录运行 `npm run build`，确认 schema 校验和静态构建成功。

如果构建失败，AI 应修复自己生成的内容；不得通过删除 schema 校验或放宽字段类型来绕过错误。

## 9. 可直接复制给 AI 的任务提示词

```text
请先完整阅读 CONTENT_AUTHORING_FOR_AI.md，并严格遵守其中的目录、schema、事实边界、YAML 和正文规则。

请根据我下面提供的事实，生成一个 [Profile / Project / Paper / Article] Markdown 文件。

要求：
1. 只使用我提供的事实，不得推测或编造；
2. 缺少必要信息时先向我提问；
3. 如果我没有明确要求公开，设置 draft: true；
4. 选择正确目录和小写 kebab-case 文件名；
5. 不修改网站代码、schema、样式、构建或部署配置；
6. 生成后运行 npm run build，并修复由该内容导致的错误；
7. 最终告诉我创建或修改了哪个文件，以及仍有哪些信息需要我确认。

我提供的事实：
[在这里粘贴材料]
```

## 10. 权威性顺序

发生冲突时按以下顺序判断：

1. 用户当前的明确要求；
2. `src/content.config.ts` 中可执行的 schema；
3. 本文件；
4. 现有内容示例。

现有 Markdown 只能作为格式参考，不能作为用户事实来源。
