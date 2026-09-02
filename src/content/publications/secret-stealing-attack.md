---
title: "Secret Stealing Attacks on Local LLM Fine-Tuning through Supply-Chain Model Code Backdoors"
year: 2026
authors:
  - "Zi Li"
  - "Tian Zhou"
  - "Wenze Li"
  - "Jingyu Hua"
  - "Yunlong Mao"
  - "Sheng Zhong"
venue: "EMNLP 2026"
summary: "We study supply-chain model-code backdoors that steal sparse high-entropy secrets from local LLM fine-tuning data and enable verifiable black-box recovery after deployment."
featured: false
draft: false
---

We show that local fine-tuning is not a sufficient privacy boundary when the model executes attacker-controlled code. The attack performs online tensor-rule matching to locate secrets, binds them to enumerable query keys, and injects memorization gradients while limiting visible disruption to normal training.

## Abstract

Across summarization, medical QA, and code-generation tasks, the method achieves over 98% Strict ASR in the default LoRA setting with limited primary-task utility degradation, while supporting attacker-verifiable recovery of leaked secrets through black-box queries.
