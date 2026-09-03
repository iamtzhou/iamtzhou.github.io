# Academic / Technical Homepage V1

一个由 Markdown 驱动的静态个人主页。使用 Astro 构建，不依赖后端、数据库或运行时 API；除 CV 打印按钮外不加载客户端 JavaScript。

## 本地运行

```powershell
npm install
npm run dev
```

访问终端显示的本地地址。生产构建：

```powershell
npm run build
npm run preview
```

## 替换内容

如果要让 AI 创建或修改内容，请直接把 [AI Markdown 内容生成规范](./CONTENT_AUTHORING_FOR_AI.md) 提供给 AI。该文件包含可复制的提示词、四类完整模板和生成后检查清单。

所有实际展示内容都在 `src/content/`：

- `profile.md`：姓名、身份、简介、研究兴趣、教育与个人链接。
- `projects/*.md`：项目。
- `publications/*.md`：论文。
- `articles/*.md`：技术文章。

现有条目是用于验证页面、排序、详情页和草稿规则的示例内容。替换它们即可，不需要修改页面代码。文件名就是稳定 slug，例如 `projects/my-system.md` 会生成 `/projects/my-system/`。

字段契约集中在 `src/content.config.ts`。保存或构建时，缺失字段、错误日期、无效 URL 等会直接报错。

站点的 `/sitemap.xml`、`/robots.txt` 和首页 Person JSON-LD 会在构建时自动生成。Sitemap 会收录固定页面以及所有公开的 Project、Publication 和 Article，并排除 `draft: true` 的内容；Person 数据来自 `profile.md`。日常更新内容时无需手工维护这些 SEO 文件。

核心规则：

- `draft: true`：本地开发可见并标注 Draft，生产构建不生成该条目。
- `featured: true`：保留为内容编辑标记；首页不会读取它。Project 中的该字段目前仅用于 CV 的精选项目。
- Project 使用 `startDate` / `endDate` 月份范围并按结束月份倒序；Article 按 `date` 倒序；Publications 按 `year` 倒序。
- 长正文写在 frontmatter 下方的 Markdown body 中。

## 个性化检查单

1. 替换 `src/content/profile.md` 与三个集合中的示例条目。
2. 用自己的 1200×630 分享图替换 `public/og.png`。
3. 如需调整颜色与字体，只改 `src/styles/global.css` 顶部的变量即可。
4. 本地确认后再进入部署阶段。

## Deployment

向 `main` 分支 push 后，GitHub Actions 会自动构建站点并部署到 GitHub Pages。
