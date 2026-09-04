# Chemical Tanker Daily Brief

한국 화주 대상 **케미컬 탱커(파슬 탱커)** 용선 브로킹 데스크용 조간 브리프.
전날(KST 00:00–24:00)을 커버해 매일 아침 발행한다.

## 발행 스케줄

| 항목 | 값 |
|---|---|
| 발행 | 매일 08:45 KST 착수 → 09시경 도착 |
| Routine cron | `45 23 * * *` (UTC) |
| 실행 | 매 회차 새 세션 |
| 알림 | 푸시 + 이메일 |
| 산출물 | Claude Artifact (1일 1건, 아카이브 누적) |

claude.ai Routines UI에서 시각 변경·일시정지·프롬프트 수정 가능.
KST → UTC 환산 필요(KST = UTC+9, 자정을 넘기면 요일 필드도 이동).

## 편집 원칙 (넷 다 필수)

### 1. 케미컬 탱커가 주인공, CPP는 아니다
MR·LR·핸디막스는 **CPP 마켓**이다. Scorpio·Torm·Hafnia 등 CPP 선사의 TCE·기간용선
수치를 헤드라인·지표 밴드·시황 표에 올리지 않는다. CPP는 **스윙 톤수**(코티드 톤수가
CPP↔케미컬을 오가는 경로)라는 드라이버로서만, 시황 섹션 하단 "CPP 스필오버" 각주
한 문단에 넣는다.

다루는 범위:
- **선형** IMO II 스테인리스(<25k) / 25–45k / 45–55k IMO III 에폭시·마린라인 코티드
- **화물** 메탄올, MEG·글리콜, 에탄올, 가성소다, 스티렌, 아크릴로니트릴, 페놀,
  벤젠·자일렌 등 방향족, 황산, 팜유·식용유
- **항로** USG→아시아, MEG→극동, 유럽→아시아, Intra-Asia, 동남아→한국
- **지표** ODFIX, Clarksons 케미컬 탱커 스팟·TC 지수, COA 비중·리프라이싱,
  파슬 스팟 호가·선복(space)
- **선사** Stolt-Nielsen, Odfjell, MOL Chemical Tankers, Iino, Navig8 Chemicals,
  Ace Quantum, Womar, Nordic Tankers, Hansa Tankers + 국내(KSS해운, 흥아해운,
  장금상선, 태영상선)

### 2. 직접 확인된 것만 싣는다
"데이터 제한 / 확인 불가 / 추정 / 특이사항 없음" 행, 날짜·출처 불명 수치,
근거 없는 정성적 서술, 하단 "데이터 한계" 박스 — 전부 쓰지 않는다.
확인된 항목이 적으면 **브리프가 짧아지는 것이 정답**. 섹션에 확인된 내용이
없으면 섹션을 통째로 뺀다. Baltic Exchange는 네트워크 차단이며, 그 사실을
적지 말고 해당 항목만 뺀다.

### 3. 출처는 인라인
별도 "출처" 섹션 없음. 모든 수치·사실·표 셀 옆에 링크 칩을 단다.

```html
<a class="s" href="URL">매체명 9/3</a>
```
```css
a.s{font-family:var(--mono);font-size:10.5px;color:var(--muted);text-decoration:none;
  border-bottom:1px dotted var(--line-strong);white-space:nowrap;margin-left:5px;
  padding-bottom:1px;vertical-align:1px}
a.s::before{content:"↗";margin-right:2px;opacity:.55}
a.s:hover{color:var(--accent-ink);border-bottom-color:var(--accent)}
```
며칠 지난 데이터는 칩에 그 날짜를 그대로 적는다(예: "The National 7/17").

### 4. 짧게
스크롤 2–3회, 1–2분 분량. 표 5–9행, 불릿 섹션당 3–4개, 체크포인트 5개.

## 화주 커버리지

LG화학, 롯데케미칼, 한화솔루션/한화토탈에너지스, 여천NCC, 금호석유화학, 대한유화,
SK지오센트릭, S-Oil, GS칼텍스, H&L Advanced, 효성, 코오롱, 태광
\+ 글로벌(BASF, Dow, SABIC, Shell, ExxonMobil, INEOS, Formosa, 중국 신규 NCC).
정부 주도 재편, NCC 통폐합, 가동률·T/A, 증설·폐쇄, 자산 매각, 신규 수출 물량.

## 고정 구조

1. 마스트헤드 — 발행일 / 커버 기간 / 헤드라인(케미컬 이슈 한 가지, 25–30자)
2. 한눈에 — 3항목, 사실 + 브로커 함의 + 출처 칩
3. 지표 밴드 — 4–6개. 케미컬 지표 우선, 그다음 초크포인트·벙커. 기준일 필수
4. ① 케미컬 탱커 시황 — 표 + 브로커 해석 + CPP 스필오버 각주
5. ② 초크포인트 — 케미컬 항로에 닿는 경로를 먼저 서술
6. ③ 화주 동향 — 화주 / 확인된 사실 / 용선 데스크 함의 3열 + 브로커 해석
7. ④ 규제
8. 오늘의 데스크 체크포인트 — 5개
9. 짧은 푸터. 출처 섹션·데이터 한계 박스 없음

## 디자인 토큰

- 본문 `Noto Sans KR` / 제목 `Archivo` / 수치·라벨 `IBM Plex Mono`
- 액센트 틸: 라이트 `#0D6E78`, 다크 `#4FBECB`. 지면은 쿨 그레이
- 시맨틱: 상승 `#166540` / 하락 `#A5312A` / 경고 `#8E5F12`
- 라이트·다크 3단 토큰 (`:root` → `prefers-color-scheme` → `[data-theme]`)
- ≥1040px: 좌측 176px 스티키 목차 레일 + 본문 2열 그리드
- 표는 `overflow-x:auto`, 수치는 `tabular-nums`. 차트 없음 — 표 + 델타 칩

## 아카이브

발행된 브리프는 Claude Artifact 갤러리(claude.ai/code/artifacts)에 1일 1건씩
`Chemical Tanker Daily Brief M.D` 제목으로 누적된다. 이 리포지토리는 발행 사양만
관리하며 브리프 원본 HTML은 복제하지 않는다.
