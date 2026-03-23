# Chinese Learning Dataset

> A very small personal dataset built purely for learning programming and natural language processing (NLP). Nothing serious here.

🌐 Companion website: [chineselearning-longe.streamlit.app](https://chineselearning-longe.streamlit.app)

---

## About

This dataset is sourced from Chinese text content. At the moment it only provides a **high-level outline skeleton** (chapter structure) — the actual content will be expanded and filled in gradually over time.

**Primary purpose:** Learning NLP techniques. That's it.

If it happens to be useful for anyone learning Chinese, great — but this is not intended as a Chinese learning resource.

---

## Current Status / TODO

### Data Cleaning
- [ ] Clean existing Chinese dataset
- [ ] Expand outline skeleton into full content
- [ ] Structure data into JSON format

### Model
Currently using a lightweight open-source language model from Meta (free tier). It has limitations and isn't great for complex tasks, but it works fine as an experiment. Planning to find cheaper or free multimodal AI alternatives down the line.

---

## Roadmap: Agent Crew

Planning to build a crew of **5 agents** to handle the dataset pipeline — essentially object-oriented programming, with each agent defined as a class with its own methods and responsibilities.

### Agent Architecture

| Agent | Role | Model Complexity |
|-------|------|-----------------|
| **Agent 1 — Supervisor** | Monitors all agents, reports progress | Complex |
| **Agent 2 — Design** | Handles UI and visual design tasks | Simple |
| **Agent 3 — Deployment** | Manages GitHub / Streamlit publishing | Simple |
| **Agent 4 — Data Processing** | Scrapes and cleans Chinese text from PDFs, web pages, and raw text files; outputs structured JSON | Complex |
| **Agent 5 — Script Editor** | Takes cleaned data and refines/updates scripts accordingly | Complex |

### Workflow

```
Supervisor Agent (1)
    ├── Data Processing Agent (4) → clean text / PDF / web → JSON
    │       └── Script Editor Agent (5) → update scripts
    ├── Design Agent (2) → UI design
    └── Deployment Agent (3) → GitHub + Streamlit publish
```

---

## Stack

- **Language model:** Meta open-source lightweight model (free)
- **Web app:** Streamlit
- **Data format:** JSON
- **Deployment:** GitHub + Streamlit Cloud



- Current Status: Skeleton only; detailed content isn’t needed yet because an app will provide AI-assisted support.

- AI Support: The AI will use the outline and examples for systematic learning, guided by principles and workflow I’ll provide.

- Future Plans: Add code, upload videos, images, and more detailed materials.

- Purpose: Just started, mainly for my coding practice; not sure if it would be useful for your Chinese learning.

---
Teaching Principles

Here’s what I’m thinking: for example, why AI learning languages has limitations. AI lacks teaching principles. When a teacher teaches, the first goal is to help the student understand, not just deliver knowledge. AI may know language learning theory and provide resources, but it doesn’t provide teaching itself. Teaching has its own principles. I’ve studied a lot of language teaching theory at Peking University—for instance, when learning a language, full immersion is the first step, which would require giving AI very specific teaching instructions. AI usually cannot judge a learner’s level and can’t use gestures or face-to-face interaction to aid understanding, but it can use images or videos. The problem is, if AI searches for resources on its own, it won’t match the learner’s level, and the results may not be appropriate.

LLM Limitations

Large language models, like Claude or ChatGPT, have context limits. Feeding in an entire book is cumbersome. You need to compress the materials into an outline and match resources according to it, which avoids context limitations. Otherwise, every query is tedious. Large models have a lot of knowledge but don’t understand teaching principles or methods—they lack “common sense” for instruction.

Solution

I plan to prepare dedicated video and image databases as backup resources for AI. I’ll also build databases for vocabulary, sentences, pronunciation, and grammar, all graded (beginner, intermediate, advanced). Images and videos will be graded as well. The different databases can be interlinked. Using Python or JSON, I’ll create key-value mappings so AI can retrieve relevant resources based on the outline without needing all content directly. Videos, images, vocabulary, grammar, sentences, and texts will all be connected to the outline, forming a large network for easy AI reference.

I plan to use agent-based division to handle these tasks. I’m still exploring and learning—treating it as practice haha.

---

教学常识

我现在的想法是这样的：比如说，为什么用人工智能学习语言会有局限？因为AI缺少教学理念。老师教学生时，首先要帮助学生理解。而AI虽然有语言学习的理论知识，它提供的是资源，而不是教学本身。教学有一套自己的原则，我以前在北京大学看过很多语言教学理论。比如，学习一门语言时，第一步是完全沉浸在语言环境中，这就需要给AI特别的教学指令。AI通常分不清教学水平，也无法像老师那样用肢体语言或面对面交流帮助理解，但可以通过图片或视频辅助理解。问题是，如果让AI自己去搜索资源，它并不会根据学习者水平筛选，搜索结果可能不匹配。

大型语言模型也有问题。比如Claude或ChatGPT，如果把整本书喂进去，很麻烦，而且有上下文限制。必须把资料压缩成一个outline，然后每次根据outline匹配资源，这样就突破了模型的限制。否则每次查询都很麻烦，而且大模型虽然知识丰富，但它并不懂教学原则和方法，没有“常识”。

我的解决方案是，自己准备视频和图片数据库，作为AI查找资料的备用资源。同时建立词汇、句子、发音、语法等数据库，并分级（初级、中级、高级）。图片和视频也分级。不同数据库之间可以互相关联，通过Python或JSON建立键值匹配，这样AI只需根据outline就能查到相关资源，无需把全部内容输入模型。视频、图片、词汇、语法、句子、文本等都和outline串联，形成一个大网络，便于AI查找。

我打算用agent分工来做这些事情，目前还在摸索和学习，把它当作练习哈哈哈。

---


