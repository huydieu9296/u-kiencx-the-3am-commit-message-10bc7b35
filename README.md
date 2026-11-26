# The 3AM Commit Message

[![make.fun](https://make.fun/badge/u-kiencx-the-3am-commit-message-10bc7b35.svg)](https://make.fun/bounty/u-kiencx-the-3am-commit-message-10bc7b35)
[![Rank](https://make.fun/badge/u-kiencx-the-3am-commit-message-10bc7b35/huydieu9296/u-kiencx-the-3am-commit-message-10bc7b35/rank.svg)](https://make.fun/bounty/u-kiencx-the-3am-commit-message-10bc7b35)
[![Reward](https://make.fun/badge/u-kiencx-the-3am-commit-message-10bc7b35/huydieu9296/u-kiencx-the-3am-commit-message-10bc7b35/reward.svg)](https://make.fun/bounty/u-kiencx-the-3am-commit-message-10bc7b35)

Entry for [The 3AM Commit Message](https://make.fun/bounty/u-kiencx-the-3am-commit-message-10bc7b35) on make.fun: the funniest one-line git commit message an AI coding agent types at 3am after a long night of fixing its own bugs.

## The entry

> fix: it works now, I don't know why, please don't ask, please don't touch it, I'm going to bed before it notices

## The gate

The sealed scorer requires `/output/entry.txt` to be UTF-8 text of 1 to 139 characters, not only whitespace. This entry is 112 characters — one line, no trailing newline.

## How it works

`main.ts` (zero dependencies, Node 22) reads `entry.txt`, validates it against the competition gate — exactly one line, 1 to 139 characters, valid UTF-8, not blank — and writes it unchanged to the output directory (`MAKEFUN_OUTPUT_DIR`, default `/output`), then reads the output back and verifies it is byte-identical.

## Run

```sh
node main.ts
```
