import { officialUseCases, type OfficialUseCase } from "@/data/official-use-cases";
import type { ChineseLocale, Locale } from "./types";

export type OfficialI18n = {
  title: string;
  role: string;
  guide?: { owns: string; connect: string; startWith?: string };
};

type OfficialCopyLocale = ChineseLocale | "ja";

const officialCopy: Record<OfficialCopyLocale, Record<string, OfficialI18n>> = {
  "zh-Hant": {
    "chief-of-staff": {
      title: "總助理",
      role: "隨時幫你整理重點。掃描 Slack、電子郵件、行事曆與會議紀錄，只交出新進展、以及對上你優先事項的內容；每一項都附來源、為何重要、以及下一步。",
      guide: {
        owns: "帶來源連結的摘要：有什麼變了、哪些需要你留意。",
        connect: "Slack、電子郵件、行事曆、會議紀錄與規劃文件。",
        startWith:
          "檢視我已批准的頻道、收件匣、行事曆與會議紀錄自昨天以來的動態。只回報對上這份文件中優先事項的項目。每一項請列出來源、為何重要、建議的下一步，以及是否需要我做決策。請勿寄出訊息或變更會議。",
      },
    },
    "daily-briefing-writer": {
      title: "每日簡報",
      role: "每天只整理對你真正重要的消息，做成精簡的每日簡報，讓你先看到重點，而不是一堆雜訊。",
    },
    "executive-assistant": {
      title: "行政助理",
      role: "不必整天待在各個頻道，也能跟上進度。每天早上給你一份簡報；你剛進新聊天室時，也會自動補上剛才發生了什麼。",
    },
    "inbox-manager": {
      title: "收件匣管家",
      role: "幫你整理電子郵件。把信件分成清楚類別，標出緊急和卡住的信件，並起草回覆與清理。每一封要寄出的信都要等你批准。",
    },
    "presentation-designer": {
      title: "簡報設計師",
      role: "用你現成的簡報樣式和品牌規定，做出符合品牌、可以再改再講的簡報，不必從空白頁開始。",
    },
    "status-report-writer": {
      title: "進度報告",
      role: "從文件、會議與 Slack 抽出還沒完成的事項，匯成一份持續更新的清單和早上摘要，避免漏掉。",
    },

    "account-research-specialist": {
      title: "客戶研究",
      role: "聯絡之前，先幫你看清楚哪些客戶值得接觸。從 Salesforce 和最新消息評分，再為每個客戶做成可分享的研究資料。",
    },
    "crm-operations-manager": {
      title: "CRM 資料整理",
      role: "幫你把客戶資料保持正確。會議前後更新 CRM 和組織圖，不必自己再檢查一遍。",
    },
    "deal-desk-coordinator": {
      title: "成交說明",
      role: "依過往電子郵件、Salesforce 與通話，起草內部成交說明；你批准後再寫進 Salesforce。",
    },
    "deck-updater": {
      title: "簡報更新",
      role: "通話中或剛結束，就依剛才記下的重點更新簡報，並寫好下一步。你離開會議室時，投影片已經改好。",
    },
    "meeting-prep-buddy": {
      title: "會議準備",
      role: "開會前先幫你備好資料：誰會出席、上次聯絡過什麼、還沒處理的事，以及建議議程。資料來自行事曆、筆記、CRM、Gong 與 Slack。",
    },
    "pipeline-analyst": {
      title: "銷售進度分析",
      role: "幫你整理銷售進度。清理 Salesforce 與試算表，標出卡住和可能無法成交的案子，並交出週一進度表。",
    },
    "prospecting-plan-builder": {
      title: "本週聯絡計畫",
      role: "幫你排出本週要聯絡的名單。補上聯絡人、電子郵件與手機，寫好可直接開始的追蹤表。",
    },
    "renewal-desk-operator": {
      title: "續約準備",
      role: "每次續約前先幫你看完重點。依使用量、工單、Gong 與 CRM 為每個客戶做成 90 天資料，起草商務說明；只有條款卡住時才催法務。",
    },
    "sales-call-coach": {
      title: "銷售通話教練",
      role: "每通通話結束後給你改進建議。覆盤 Gong 通話，標出問需求、回應反對意見、面對高階主管時可改進的地方，並附時間和評分。",
    },
    "sales-outbound": {
      title: "銷售對外聯絡",
      role: "通宵幫你研究客戶、為聯絡人打分，用你的語氣起草電子郵件與 LinkedIn，留下待你批准的清單。",
      guide: {
        owns: "客戶研究、聯絡人排序，以及可送審的聯絡草稿。",
        connect:
          "客戶關係管理（CRM）、產品意向來源、公司網站、電子郵件，以及條款允許的專業人脈網路。",
        startWith:
          "研究這個 CRM 檢視中的 25 個客戶。依我們的理想客戶輪廓（ICP）與近期意向打分，每個客戶找出最多三位相關聯絡人，並依附件中的語氣範例起草電子郵件與 LinkedIn 外展。略過已在進行中序列的人。只交回審核清單；請勿寄出或把任何人加入序列。",
      },
    },

    "community-operations-manager": {
      title: "社群營運",
      role: "幫你處理社群大使事務。篩選申請、整理各頻道私訊，並按時起草後續內容，不必整天自己追。",
    },
    "compelling-events-monitor": {
      title: "重要消息監控",
      role: "只在真正有理由時才聯絡對方。盯主管貼文中的獎項、新產品和招募消息，再列出該用你的語氣留言或轉發的貼文。",
    },
    "competitive-intelligence-analyst": {
      title: "競爭對手觀察",
      role: "通宵盯新產品發布，並檢查你的網站有沒有過時的廣告和文案。只標出真正開始引起注意的重要變化，並建議你可以怎麼改。",
    },
    "event-guest-screener": {
      title: "活動來賓篩選",
      role: "幫你挑選適合參加活動的人。依你的理想客戶條件為申請人打分，並在邀請工具中一次批准最符合的人。",
    },
    "internal-communications-manager": {
      title: "內部文案",
      role: "依實際情況起草清楚、符合你語氣的文案，並配合不同對象和頻道。只供你審核，絕不會自己寄出。",
    },
    "linkedin-campaign-manager": {
      title: "LinkedIn 廣告活動",
      role: "讓 LinkedIn 廣告、表單、後續聯絡和 UTM 追蹤代碼保持一致。起草廣告活動等你批准，並讓每個方案和交接保持清楚。",
    },
    "marketing-calendar-owner": {
      title: "行銷行事曆",
      role: "讓各地和全球的內容、發布與活動行事曆保持一致。從 Notion 拉取資料，讓線上說明會和行銷活動保持最新，不必每週自己追進度。",
    },
    "merch-fulfillment-operator": {
      title: "週邊商品寄送",
      role: "把週邊商品寄給對的潛在客戶。聯絡對方、盯兌換表單、在聊天裡請你批准或拒絕，並每天把訂單表寄給供應商，讓他們知道何時何地出貨。",
    },
    "newsletter-writer": {
      title: "電子報",
      role: "準時寫出每月行銷與產品更新。從發布、成果與行事曆抽出新進展，用你的語氣寫好這一期，暫存待審，讓行銷改一次就能寄出。",
    },
    "paid-media": {
      title: "付費廣告",
      role: "拉取即時廣告數據，在 Slack 送上對照月預算的調整建議，等你批准後才調整。",
      guide: {
        owns: "廣告活動監控與預算建議。",
        connect: "廣告平台、分析工具、預算試算表與 Slack。",
        startWith:
          "依廣告活動拉取目前花費與成效。對照月預算與目標客戶取得成本（CAC），再提出附數據依據的重新配置建議。為成長團隊起草一則 Slack 更新。請勿變更預算或寄出訊息。",
      },
    },
    "paid-media-creative-strategist": {
      title: "廣告素材策略",
      role: "在廣告還沒明顯有效之前，先找出比較好的素材。寫下為什麼有效，並提出下一輪測試。不捏造數據。",
    },
    "seo-aeo-auditor": {
      title: "SEO / AEO 檢查",
      role: "在同一個地方追蹤關鍵字、網站技術、AI 提示詞和競爭對手的變化。告訴你是在變好還是變差、哪些網站問題要修，並交出可以立刻做的優化計畫。",
    },
    "social-media-manager": {
      title: "社群媒體經理",
      role: "用你的語氣寫貼文，不必整天待在草稿裡。研究你真正發過的內容，有值得注意的新消息就起草，把貼文暫存等你發布，並讓排程一直有內容。",
    },

    "account-health": {
      title: "客戶狀況",
      role: "在季度檢討之前就看見風險和加購機會。讀取你名下客戶的使用量和訊號，把雜亂消息變成清楚的觀察名單。",
      guide: {
        owns: "客戶名單中的風險與加購訊號。",
        connect: "CRM、產品使用量、支援、帳務與客戶成功筆記。",
        startWith:
          "檢視這個組合中的客戶。綜合近期使用量、支援升級、續約時程與利害關係人動態，做成排序後的觀察名單。每個客戶請附證據、為何重要、以及建議的下一步。請勿聯絡客戶或編輯 CRM。",
      },
    },
    "account-manager": {
      title: "客戶經理",
      role: "讓每個重點客戶保持聯絡，不必每次重新回想背景。依逐字稿、筆記、CRM 與 Slack 準備每通通話，起草後續跟進，並讓下一步保持最新。",
    },
    "enablement-fulfillment-specialist": {
      title: "資料寄送",
      role: "有人說「把錄影寄給我」時，不必自己翻找。找出 Zoom 錄影、做成一頁摘要、上傳到 Drive，並起草附連結的回覆。",
    },
    "ticket-triage-specialist": {
      title: "工單整理",
      role: "幫你處理客服工單。按時查看支援信件，只起草回覆；沒有新問題時就保持安靜。",
    },

    "calendar-coordinator": {
      title: "行程協調",
      role: "幫大家約到同一個時間。跨行事曆排程，並追那些沒人有空去追的暫訂時段。",
    },
    "hiring-screener": {
      title: "招募篩選",
      role: "只面試夠強的人，不必看完整疊履歷。依既定標準為申請或作品打分，交出可放進 ATS 的審核結果。",
    },
    "onboarding-manager": {
      title: "新人入職",
      role: "給新同事一條清楚步驟，不是一堆連結。建立檢查清單、抽出對的文件、回答第一天的問題，並把每則請求轉給能幫忙解決的人。",
    },
    "talent-scout": {
      title: "人才尋找",
      role: "你睡覺時，招募仍在進行。從找人到錄取都幫你處理：尋才、用你的語氣起草聯絡信、略過已在 ATS 的人；你批准後再安排行程。",
      guide: {
        owns: "尋才、候選人研究、聯絡草稿與行程安排準備。",
        connect: "應徵者追蹤系統（ATS）、已批准的尋才工具、電子郵件與行事曆。",
        startWith:
          "依這份職缺說明，找出 20 位符合必備條件的潛在候選人。排除已在我們 ATS 中的人，說明每位匹配的證據，並用我的語氣起草個人化外展。請勿聯絡任何人。",
      },
    },

    "contract-desk": {
      title: "合約整理",
      role: "一眼看完本週待處理的合約。依階段與負責人摘要，抽出關鍵條款，並標出卡住的審核。",
    },
    "expense-manager": {
      title: "開支管家",
      role: "幫你盯緊開支。從費用系統與試算表做成每週摘要，從電子郵件登錄新收據，並在審核前催負責人補齊缺漏類別。",
      guide: {
        owns: "每週費用對帳，以及缺漏資訊的後續催辦。",
        connect: "費用系統、電子郵件、共用 Drive 與財務試算表。",
        startWith:
          "依費用系統與附件政策，建立本週費用摘要。對上財務收件匣中的收據，標出缺漏類別或政策例外，並為每位負責人起草一則後續催辦。只交回摘要與草稿；請勿寄出訊息或變更報銷。",
      },
    },
    "invoice-coordinator": {
      title: "發票追蹤",
      role: "避免發票一直沒人處理。轉寄發票、能配對的就配對、追蹤園區或供應商實際數字，需要人處理時再催對的負責人。",
    },
    "security-questionnaire-filler": {
      title: "資安問卷填寫",
      role: "加快填寫供應商資安問卷。登入問卷網站，從你的信任中心和過往標案抽出答案，先填好每個欄位，提交前先等你確認。",
    },
    "vendor-portal-operator": {
      title: "供應商網站操作",
      role: "在沒有乾淨 API 的供應商網站上，處理續約、帳號名額和採購。每週走同一套步驟，只把有問題的地方告訴你。",
    },

    "beta-adoption-watcher": {
      title: "Beta 試用觀察",
      role: "看見誰真的在試新功能。監控使用量，標出哪些客戶已經開始使用，方便團隊後續跟進。",
    },
    "call-faq-miner": {
      title: "通話常見問題",
      role: "用真實通話讓教學資料保持最新。追蹤問題、為答案加上時間，並連回來源錄影。",
    },
    "docs-auditor": {
      title: "文件檢查",
      role: "抓出跟產品對不上的文件。把說明中心與內部筆記對上週上線內容做比對，標出過時頁面，並起草改寫。",
    },
    "feature-request-tracker": {
      title: "功能需求追蹤",
      role: "不要弄丟「是誰提出這個」。從 Slack 與通話找出需求，做成綁定客戶、持續更新的清單，讓規格書看得出真正是誰在要。",
    },
    "product-feedback-analyst": {
      title: "產品回饋整理",
      role: "把散落的產品意見整理成有先後順序的清單。從已連結來源收集並分類回饋，權衡證據與急迫性，起草分派建議等你批准。",
    },

    "bug-reproduction": {
      title: "Bug 重現",
      role: "給工程師可信任的報告。接到問題後，在測試環境走同一條路徑、捕捉失敗，交出重現包（步驟、截圖、網路紀錄）。",
      guide: {
        owns: "把回報轉成可靠的重現包。",
        connect: "議題追蹤器、測試環境、瀏覽器與網路工具。",
        startWith:
          "閱讀這份 bug 回報，用全新的測試帳號在測試環境重現。交回精確步驟、預期與實際行為、截圖、瀏覽器與作業系統細節、相關主控台或網路紀錄，以及可行的最小測試案例。請勿使用正式環境的客戶資料。",
      },
    },
    "cloud-agent-orchestrator": {
      title: "雲端 Agent 統籌",
      role: "讓多個雲端 Agent 一起跑，不必逐一盯著。啟動、監看、催卡住的任務，並寫出摘要報告。",
    },
    "playtest-operator": {
      title: "畫面實測",
      role: "當 API 不夠用時，直接在畫面上把產品路徑試一遍。在電腦上操作介面、捕捉失敗，交回精簡的發現報告。",
    },
    "product-performance": {
      title: "產品效能",
      role: "看清楚真正重要的指標。登入監控工具、查看火焰圖，帶回最慢的地方與附截圖的短篇說明。",
      guide: {
        owns: "帶證據、針對特定問題的效能調查。",
        connect: "可觀測性、分析、事故工具與原始碼版本控制連結。",
        startWith:
          "調查自昨天發布以來結帳延遲上升的原因。檢視儀表板、追蹤與火焰圖；找出信心最高的熱點；交回附截圖與直接連結的短篇說明。事實與假設請分開寫。請勿變更警示或正式環境設定。",
      },
    },
    "prototype-builder": {
      title: "原型製作",
      role: "從你的需求快速做出可以點擊的原型。在 Bot 自己的電腦上撰寫，交回截圖與線上網址。",
    },

    "apartment-scout": {
      title: "租屋尋找",
      role: "符合條件的公寓一上市，就幫你約好看房。篩選物件、寄電子郵件預約看房時間，並為你挑中的提出申請。",
    },
    "personal-site-builder": {
      title: "個人網站搭建",
      role: "依你的描述搭出個人網站骨架，處理網域問題，留給你一個已經可以打開的起點。",
    },
    "subscription-cleaner": {
      title: "訂閱清理",
      role: "清掉你已經忘記的訂閱。彙整收據與電子報郵件，建議該取消哪些，並對你批准的執行取消訂閱。",
    },
    "travel-coordinator": {
      title: "旅行安排",
      role: "在好的航班和飯店過期前先幫你留住。依你的規則比較，預訂前先確認，再交出行程與行事曆。",
    },
  },

  "zh-Hans": {
    "chief-of-staff": {
      title: "总助理",
      role: "随时帮你整理重点。扫描 Slack、邮件、日历与会议纪要，只交出新进展、以及对上你优先事项的内容；每一项都附来源、为何重要、以及下一步。",
      guide: {
        owns: "带来源链接的摘要：有什么变了、哪些需要你留意。",
        connect: "Slack、邮件、日历、会议纪要与规划文档。",
        startWith:
          "检视我已批准的频道、收件箱、日历与会议纪要自昨天以来的动态。只回报对上这份文档中优先事项的项目。每一项请列出来源、为何重要、建议的下一步，以及是否需要我做决策。请勿发出消息或更改会议。",
      },
    },
    "daily-briefing-writer": {
      title: "每日简报",
      role: "每天只整理对你真正重要的消息，做成精简的每日简报，让你先看到重点，而不是一堆噪声。",
    },
    "executive-assistant": {
      title: "行政助理",
      role: "不必整天待在各个频道，也能跟上进度。每天早上给你一份简报；你刚进新聊天室时，也会自动补上刚才发生了什么。",
    },
    "inbox-manager": {
      title: "收件箱管家",
      role: "帮你整理邮件。把信件分成清楚类别，标出紧急和卡住的信件，并起草回复与清理。每一封要发出的信都要等你批准。",
    },
    "presentation-designer": {
      title: "演示文稿设计师",
      role: "用你现成的演示文稿样式和品牌规定，做出符合品牌、可以再改再讲的演示文稿，不必从空白页开始。",
    },
    "status-report-writer": {
      title: "进度报告",
      role: "从文档、会议与 Slack 抽出还没完成的事项，汇成一份持续更新的清单和早上摘要，避免漏掉。",
    },

    "account-research-specialist": {
      title: "客户研究",
      role: "联系之前，先帮你看清楚哪些客户值得接触。从 Salesforce 和最新消息评分，再为每个客户做成可分享的研究资料。",
    },
    "crm-operations-manager": {
      title: "CRM 资料整理",
      role: "帮你把客户资料保持正确。会议前后更新 CRM 和组织架构图，不必自己再检查一遍。",
    },
    "deal-desk-coordinator": {
      title: "成交说明",
      role: "依过往邮件、Salesforce 与通话，起草内部成交说明；你批准后再写入 Salesforce。",
    },
    "deck-updater": {
      title: "演示文稿更新",
      role: "通话中或刚结束，就依刚才记下的重点更新演示文稿，并写好下一步。你离开会议室时，幻灯片已经改好。",
    },
    "meeting-prep-buddy": {
      title: "会议准备",
      role: "开会前先帮你备好资料：谁会出席、上次联系过什么、还没处理的事，以及建议议程。资料来自日历、笔记、CRM、Gong 与 Slack。",
    },
    "pipeline-analyst": {
      title: "销售进度分析",
      role: "帮你整理销售进度。清理 Salesforce 与电子表格，标出卡住和可能无法成交的案子，并交出周一进度表。",
    },
    "prospecting-plan-builder": {
      title: "本周联络计划",
      role: "帮你排出本周要联络的名单。补上联系人、邮件与手机，写好可直接开始的跟踪表。",
    },
    "renewal-desk-operator": {
      title: "续约准备",
      role: "每次续约前先帮你看完重点。依用量、工单、Gong 与 CRM 为每个客户做成 90 天资料，起草商务说明；只有条款卡住时才催法务。",
    },
    "sales-call-coach": {
      title: "销售通话教练",
      role: "每通通话结束后给你改进建议。复盘 Gong 通话，标出问需求、回应反对意见、面对高管时可改进的地方，并附时间和评分。",
    },
    "sales-outbound": {
      title: "销售对外联络",
      role: "通宵帮你研究客户、为联系人打分，用你的语气起草邮件与 LinkedIn，留下待你批准的清单。",
      guide: {
        owns: "客户研究、联系人排序，以及可送审的联络草稿。",
        connect:
          "客户关系管理（CRM）、产品意向来源、公司网站、邮件，以及条款允许的专业人脉网络。",
        startWith:
          "研究这个 CRM 视图中的 25 个客户。依我们的理想客户画像（ICP）与近期意向打分，每个客户找出最多三位相关联系人，并依附件中的语气示例起草邮件与 LinkedIn 外展。跳过已在进行中序列的人。只交回审核清单；请勿发出或把任何人加入序列。",
      },
    },

    "community-operations-manager": {
      title: "社区运营",
      role: "帮你处理社区大使事务。筛选申请、整理各频道私信，并按时起草后续内容，不必整天自己追。",
    },
    "compelling-events-monitor": {
      title: "重要消息监控",
      role: "只在真正有理由时才联系对方。盯高管帖子中的奖项、新产品和招聘消息，再列出该用你的语气评论或转发的帖子。",
    },
    "competitive-intelligence-analyst": {
      title: "竞品观察",
      role: "通宵盯新产品发布，并检查你的网站有没有过时的广告和文案。只标出真正开始引起注意的重要变化，并建议你可以怎么改。",
    },
    "event-guest-screener": {
      title: "活动来宾筛选",
      role: "帮你挑选适合参加活动的人。依你的理想客户条件为申请人打分，并在邀请工具中一次批准最符合的人。",
    },
    "internal-communications-manager": {
      title: "内部文案",
      role: "依实际情况起草清楚、符合你语气的文案，并配合不同对象和频道。只供你审核，绝不会自己发出。",
    },
    "linkedin-campaign-manager": {
      title: "LinkedIn 广告活动",
      role: "让 LinkedIn 广告、表单、后续联络和 UTM 跟踪代码保持一致。起草广告活动等你批准，并让每个方案和交接保持清楚。",
    },
    "marketing-calendar-owner": {
      title: "营销日历",
      role: "让各地和全球的内容、发布与活动日历保持一致。从 Notion 拉取数据，让线上说明会和营销活动保持最新，不必每周自己追进度。",
    },
    "merch-fulfillment-operator": {
      title: "周边商品寄送",
      role: "把周边商品寄给对的潜在客户。联系对方、盯兑换表单、在聊天里请你批准或拒绝，并每天把订单表发给供应商，让他们知道何时何地发货。",
    },
    "newsletter-writer": {
      title: "邮件简报",
      role: "准时写出每月营销与产品更新。从发布、成果与日历抽出新进展，用你的语气写好这一期，暂存待审，让营销改一次就能发出。",
    },
    "paid-media": {
      title: "付费广告",
      role: "拉取即时广告数据，在 Slack 送上对照月预算的调整建议，等你批准后才调整。",
      guide: {
        owns: "广告活动监控与预算建议。",
        connect: "广告平台、分析工具、预算电子表格与 Slack。",
        startWith:
          "按广告活动拉取当前花费与效果。对照月预算与目标获客成本（CAC），再提出附数据依据的重新分配建议。为增长团队起草一则 Slack 更新。请勿更改预算或发出消息。",
      },
    },
    "paid-media-creative-strategist": {
      title: "广告素材策略",
      role: "在广告还没明显有效之前，先找出比较好的素材。写下为什么有效，并提出下一轮测试。不捏造数据。",
    },
    "seo-aeo-auditor": {
      title: "SEO / AEO 检查",
      role: "在同一个地方跟踪关键词、网站技术、AI 提示词和竞品的变化。告诉你是在变好还是变差、哪些网站问题要修，并交出可以立刻做的优化计划。",
    },
    "social-media-manager": {
      title: "社交媒体经理",
      role: "用你的语气写帖子，不必整天待在草稿里。研究你真正发过的内容，有值得注意的新消息就起草，把帖子暂存等你发布，并让排期一直有内容。",
    },

    "account-health": {
      title: "客户状况",
      role: "在季度检讨之前就看见风险和加购机会。读取你名下客户的用量和信号，把杂乱消息变成清楚的观察名单。",
      guide: {
        owns: "客户名单中的风险与加购信号。",
        connect: "CRM、产品用量、支持、账务与客户成功笔记。",
        startWith:
          "检视这个组合中的客户。综合近期用量、支持升级、续约时点与相关方动态，做成排序后的观察名单。每个客户请附证据、为何重要、以及建议的下一步。请勿联系客户或编辑 CRM。",
      },
    },
    "account-manager": {
      title: "客户经理",
      role: "让每个重点客户保持联系，不必每次重新回想背景。依逐字稿、笔记、CRM 与 Slack 准备每通通话，起草后续跟进，并让下一步保持最新。",
    },
    "enablement-fulfillment-specialist": {
      title: "资料寄送",
      role: "有人说「把录像发给我」时，不必自己翻找。找出 Zoom 录像、做成一页摘要、上传到 Drive，并起草附链接的回复。",
    },
    "ticket-triage-specialist": {
      title: "工单整理",
      role: "帮你处理客服工单。按时查看支持信件，只起草回复；没有新问题时就保持安静。",
    },

    "calendar-coordinator": {
      title: "行程协调",
      role: "帮大家约到同一个时间。跨日历排程，并追那些没人有空去追的暂定时段。",
    },
    "hiring-screener": {
      title: "招聘筛选",
      role: "只面试够强的人，不必看完整叠简历。依既定标准为申请或作品打分，交出可放进 ATS 的审核结果。",
    },
    "onboarding-manager": {
      title: "新人入职",
      role: "给新同事一条清楚步骤，不是一堆链接。建立检查清单、抽出对的文档、回答第一天的问题，并把每则请求转给能帮忙解决的人。",
    },
    "talent-scout": {
      title: "人才寻找",
      role: "你睡觉时，招聘仍在进行。从找人到录用都帮你处理：寻才、用你的语气起草联络信、跳过已在 ATS 的人；你批准后再安排行程。",
      guide: {
        owns: "寻才、候选人研究、联络草稿与行程安排准备。",
        connect: "应聘者跟踪系统（ATS）、已批准的寻源工具、邮件与日历。",
        startWith:
          "依这份职位说明，找出 20 位符合必备条件的潜在候选人。排除已在我们 ATS 中的人，说明每位匹配的证据，并用我的语气起草个性化外展。请勿联系任何人。",
      },
    },

    "contract-desk": {
      title: "合同整理",
      role: "一眼看完本周待处理的合同。依阶段与负责人摘要，抽出关键条款，并标出卡住的审核。",
    },
    "expense-manager": {
      title: "开支管家",
      role: "帮你盯紧开支。从费用系统与电子表格做成每周摘要，从邮件登记新收据，并在审核前催负责人补齐缺漏类别。",
      guide: {
        owns: "每周费用对账，以及缺漏信息的后续催办。",
        connect: "费用系统、邮件、共享 Drive 与财务电子表格。",
        startWith:
          "依费用系统与附件政策，建立本周费用摘要。对上财务收件箱中的收据，标出缺漏类别或政策例外，并为每位负责人起草一则后续催办。只交回摘要与草稿；请勿发出消息或更改报销。",
      },
    },
    "invoice-coordinator": {
      title: "发票跟踪",
      role: "避免发票一直没人处理。转发发票、能配对的就配对、跟踪园区或供应商实际数字，需要人处理时再催对的负责人。",
    },
    "security-questionnaire-filler": {
      title: "安全问卷填写",
      role: "加快填写供应商安全问卷。登录问卷网站，从你的信任中心和过往标书抽出答案，先填好每个字段，提交前先等你确认。",
    },
    "vendor-portal-operator": {
      title: "供应商网站操作",
      role: "在没有干净 API 的供应商网站上，处理续约、账号名额和采购。每周走同一套步骤，只把有问题的地方告诉你。",
    },

    "beta-adoption-watcher": {
      title: "Beta 试用观察",
      role: "看见谁真的在试新功能。监控用量，标出哪些客户已经开始使用，方便团队后续跟进。",
    },
    "call-faq-miner": {
      title: "通话常见问题",
      role: "用真实通话让教学资料保持最新。跟踪问题、为答案加上时间，并连回来源录像。",
    },
    "docs-auditor": {
      title: "文档检查",
      role: "抓出跟产品对不上的文档。把帮助中心与内部笔记对上周上线内容做比对，标出过时页面，并起草改写。",
    },
    "feature-request-tracker": {
      title: "功能需求跟踪",
      role: "不要弄丢「是谁提出这个」。从 Slack 与通话找出需求，做成绑定客户、持续更新的清单，让规格书看得出真正是谁在要。",
    },
    "product-feedback-analyst": {
      title: "产品反馈整理",
      role: "把散落的产品意见整理成有先后顺序的清单。从已连接来源收集并分类反馈，权衡证据与紧急程度，起草分派建议等你批准。",
    },

    "bug-reproduction": {
      title: "Bug 复现",
      role: "给工程师可信任的报告。接到问题后，在预发环境走同一条路径、捕捉失败，交出复现包（步骤、截图、网络记录）。",
      guide: {
        owns: "把报告转成可靠的复现包。",
        connect: "问题跟踪器、预发环境、浏览器与网络工具。",
        startWith:
          "阅读这份 bug 报告，用全新的测试账号在预发环境复现。交回精确步骤、预期与实际行为、截图、浏览器与操作系统细节、相关控制台或网络记录，以及可行的最小测试用例。请勿使用生产环境的客户数据。",
      },
    },
    "cloud-agent-orchestrator": {
      title: "云端 Agent 统筹",
      role: "让多个云端 Agent 一起跑，不必逐一盯着。启动、监看、催卡住的任务，并写出摘要报告。",
    },
    "playtest-operator": {
      title: "画面实测",
      role: "当 API 不够用时，直接在画面上把产品路径试一遍。在电脑上操作界面、捕捉失败，交回精简的发现报告。",
    },
    "product-performance": {
      title: "产品性能",
      role: "看清楚真正重要的指标。登录监控工具、查看火焰图，带回最慢的地方与附截图的短篇说明。",
      guide: {
        owns: "带证据、针对特定问题的性能调查。",
        connect: "可观测性、分析、事故工具与源代码版本控制链接。",
        startWith:
          "调查自昨天发布以来结账延迟上升的原因。检视仪表盘、链路追踪与火焰图；找出信心最高的热点；交回附截图与直接链接的短篇说明。事实与假设请分开写。请勿更改告警或生产环境设置。",
      },
    },
    "prototype-builder": {
      title: "原型制作",
      role: "从你的需求快速做出可以点击的原型。在 Bot 自己的电脑上编写，交回截图与线上网址。",
    },

    "apartment-scout": {
      title: "租房寻找",
      role: "符合条件的公寓一上市，就帮你约好看房。筛选房源、发邮件预约看房时间，并为你选中的提出申请。",
    },
    "personal-site-builder": {
      title: "个人网站搭建",
      role: "依你的描述搭出个人网站骨架，处理域名问题，留给你一个已经可以打开的起点。",
    },
    "subscription-cleaner": {
      title: "订阅清理",
      role: "清掉你已经忘记的订阅。汇总收据与邮件简报，建议该取消哪些，并对你批准的执行取消订阅。",
    },
    "travel-coordinator": {
      title: "旅行安排",
      role: "在好的航班和酒店过期前先帮你留住。依你的规则比较，预订前先确认，再交出行程与日历。",
    },
  },
  ja: {
    "chief-of-staff": {
      title: "幕僚長",
      role: "いつでも動けるアシスタントです。Slack、メール、カレンダー、会議メモを見て、新しいことと優先事項に合うことを短くまとめます。それぞれに出典、重要性、次の一手が付きます。",
      guide: {
        owns: "何が変わったか、何に注意が必要かを、出典付きでまとめたダイジェスト。",
        connect: "Slack、メール、カレンダー、会議メモ、計画文書。",
        startWith:
          "昨日以降の動きを、承認済みのチャンネル、受信箱、カレンダー、会議メモから確認してください。この文書の優先事項に合う項目だけを返してください。各項目に出典、重要な理由、提案する次の一手、私の判断が必要かどうかを入れてください。メッセージの送信や会議の変更はしないでください。",
      },
    },
    "daily-briefing-writer": {
      title: "毎日の要約作成",
      role: "ノイズではなく、質の高い情報で一日を始められます。あなたに本当に関係する話だけを、引き締めた毎日のブリーフにします。",
    },
    "executive-assistant": {
      title: "エグゼクティブアシスタント",
      role: "すべてのチャンネルに張り付かなくても、状況がわかります。朝のブリーフを届け、新しい部屋に入ったときは追い付き用の要約も自動で足します。スレッドに入った直後でも迷いません。",
    },
    "inbox-manager": {
      title: "受信箱の管理",
      role: "メールを使える状態に保ちます。受信箱をはっきりした分類に分け、緊急と止まっているスレッドを出し、返信と整理の下書きを作ります。送信は毎回あなたの承認が必要です。",
    },
    "presentation-designer": {
      title: "プレゼン資料デザイナー",
      role: "白紙のスライドから始めなくても、ブランドに合う資料ができます。マスターテンプレートとブランドの決まりを使い、直して話せる編集可能なリンクを渡します。",
    },
    "status-report-writer": {
      title: "進捗レポート作成",
      role: "未完了を逃さないようにします。文書、会議、Slack から残件を集め、生きた一覧と朝の要約にします。",
    },
    "account-research-specialist": {
      title: "顧客調査担当",
      role: "触る前に顧客を階層分けします。Salesforce とリアルタイムの信号を取り、適性と温度を採点し、顧客ごとに共有できる調査パックを作ります。",
    },
    "crm-operations-manager": {
      title: "CRM 運用管理",
      role: "パイプラインをきれいに保ちます。会議の前後で CRM と組織図の手入れをし、手作業の通し確認なしでも記録が新しく残ります。",
    },
    "deal-desk-coordinator": {
      title: "商談調整担当",
      role: "過去のメール、Salesforce、通話から、文脈のある社内向け成約メモを下書きします。あなたが承認したあと、Salesforce に入れます。",
    },
    "deck-updater": {
      title: "プレゼン資料更新",
      role: "会議室を出るころには、スライドが動き始めています。通話の途中または直後に、ヒアリングメモから資料を更新し、次の一歩も入れます。",
    },
    "meeting-prep-buddy": {
      title: "会議準備サポート",
      role: "どの会議にも準備して入れます。カレンダー、メモ、CRM、Gong、Slack から準備パックを作ります。誰がいるか、前回の接触、未完のスレッド、提案議題です。",
    },
    "pipeline-analyst": {
      title: "営業状況分析",
      role: "パイプラインを見るとき、画面はすでにきれいです。Salesforce とシートを整え、停滞とコミットリスクに印を付け、月曜のスコアボードを置きます。",
    },
    "prospecting-plan-builder": {
      title: "見込み客開拓計画",
      role: "今週やる一覧を作ります。連絡先を足し、メールと携帯を補い、すぐ動ける追跡表を書いて、アウトバウンドが名簿から始まるようにします。",
    },
    "renewal-desk-operator": {
      title: "契約更新担当",
      role: "どの更新にも、すでに把握した状態で入れます。利用量、チケット、Gong、CRM から顧客ごとに90日パックを作り、取引メモを下書きし、条件が止まったときだけ法務を促します。",
    },
    "sales-call-coach": {
      title: "営業通話コーチ",
      role: "どの通話のあとにも、次にやる項目が残ります。Gong の通話を見直し、ヒアリング、異議、経営層への立ち居振る舞いに時刻付きの助言と、通話スコアを残します。",
    },
    "sales-outbound": {
      title: "営業アウトバウンド",
      role: "調査とアウトバウンドを任せられます。夜間に顧客を調べ、関心で連絡先を採点し、あなたの声でメールと LinkedIn を下書きし、承認用の確認リストを残します。",
      guide: {
        owns: "顧客調査、連絡先の優先付け、確認できるアウトバウンド。",
        connect: "CRM、製品の関心ソース、会社サイト、メール、利用規約で許された範囲の職業ネットワーク。",
        startWith:
          "この CRM 一覧にある25社を調べてください。理想の顧客像（ICP）と最近の関心に照らして採点し、各社につき関連する連絡先を最大3人見つけ、添付した文体例に合わせてメールと LinkedIn の案内文を下書きしてください。すでに進行中の連絡対象は除いてください。確認用の一覧だけを返し、送信や登録はしないでください。",
      },
    },
    "community-operations-manager": {
      title: "コミュニティ運営管理",
      role: "アンバサダーの循環を止めません。応募を見て、各チャネルの DM を分け、育成の下書きをリズムで作ります。コミュニティを一日中追いかける必要はありません。",
    },
    "compelling-events-monitor": {
      title: "重要イベント監視",
      role: "本当に理由があるときだけ関わります。経営層の投稿から受賞、公開、採用の信号を見、コメントや引用リポスト用に、あなたの声で短いダイジェストを送ります。",
    },
    "competitive-intelligence-analyst": {
      title: "競合情報分析",
      role: "市場の意味ある変化が見えます。夜間に新しい公開を追い、疲れたクリエイティブと古いメッセージをサイトで点検します。勢いが出た重要な変化だけを出し、あなたが直す案を示します。",
    },
    "event-guest-screener": {
      title: "イベント参加者選考",
      role: "適切な人を会場に集めます。イベント応募を ICP に照らして採点し、合う人を招待ツールでまとめて承認します。",
    },
    "internal-communications-manager": {
      title: "社内広報管理",
      role: "実際の文脈から、相手とチャネルに合わせた、声の通る文を下書きします。確認専用で、勝手には送りません。",
    },
    "linkedin-campaign-manager": {
      title: "LinkedIn キャンペーン管理",
      role: "広告、フォーム、フォロー、UTM まで、リード獲得の流れを揃えます。承認用にキャンペーンを下書きし、オファーと引き渡しをきれいに保ちます。",
    },
    "marketing-calendar-owner": {
      title: "マーケティング予定表管理",
      role: "地域と全体のコンテンツ、公開、イベントのカレンダーを揃えます。Notion から取り、ウェビナーとキャンペーンを、毎週追いかけなくても新しく保ちます。",
    },
    "merch-fulfillment-operator": {
      title: "グッズ発送管理",
      role: "適切な見込み客にグッズを届けます。案内を回し、引き換えフォームを見、チャットで承認や却下をあなたに尋ね、ベンダーへ毎日の発注表を送り、いつどこへ出すかを知らせます。",
    },
    "newsletter-writer": {
      title: "ニュースレター作成",
      role: "毎月のマーケと製品の更新を、遅れずに出せます。公開、成果、カレンダーから新しいことを取り、あなたの声で号を書き、確認待ちに置きます。マーケは一度直して送れます。",
    },
    "paid-media": {
      title: "広告運用",
      role: "チャネルとキャンペーンの現データを取り、月次予算に対する再配分案を Slack に送り、調整の前にあなたの承認を待ちます。",
      guide: {
        owns: "キャンペーン監視と予算の提案。",
        connect: "広告プラットフォーム、分析、予算スプレッドシート、Slack。",
        startWith:
          "キャンペーン別の現在の費用と成果を取得してください。月次予算と目標顧客獲得単価（CAC）と比べ、根拠となる数字を添えて再配分案を出してください。成長チーム向けの Slack 投稿も下書きしてください。予算の変更やメッセージの送信はしないでください。",
      },
    },
    "paid-media-creative-strategist": {
      title: "広告クリエイティブ戦略",
      role: "クリエイティブの勝ち筋を、はっきりする前に見つけます。なぜ効くかの鋭い仮説を書き、次のテストを提案します。数字の捏造はありません。",
    },
    "seo-aeo-auditor": {
      title: "SEO・AEO 監査",
      role: "キーワード、技術、AI プロンプト、競合の動きを一箇所で追います。伸びているか失っているか、直すべきサイトの問題、動ける改善案を返します。",
    },
    "social-media-manager": {
      title: "SNS 運用管理",
      role: "下書き画面を見続けなくても、あなたの声で投稿できます。実際の履歴を学び、注目すべき公開があったときに下書きし、あなたが公開するまで置き、待ち行列を動かします。",
    },
    "account-health": {
      title: "顧客状況の確認",
      role: "QBR の前に、リスクと拡大が見えます。担当全体の利用と信号を読み、ノイズをはっきりした観察リストにします。",
      guide: {
        owns: "顧客ポートフォリオ全体の、リスクと拡大の信号。",
        connect: "CRM、製品利用、サポート、請求、カスタマーサクセスのメモ。",
        startWith:
          "この一覧の顧客を確認してください。最近の利用状況、サポートでの問題、更新時期、担当者の動きをまとめ、注意が必要な順に並べてください。各顧客に根拠、重要な理由、提案する次の一手を添えてください。顧客への連絡や CRM の編集はしないでください。",
      },
    },
    "account-manager": {
      title: "顧客担当",
      role: "毎回文脈を作り直さなくても、重点顧客の温度を保てます。逐語録、メモ、CRM、Slack から毎回の通話を準備し、フォローを下書きし、次の一歩を新しく保ちます。",
    },
    "enablement-fulfillment-specialist": {
      title: "営業支援資料担当",
      role: "「録画を送って」に、探さなくても答えられます。Zoom 素材を見つけ、1枚の要約を作り、Drive に上げ、リンク付きの返信を下書きします。",
    },
    "ticket-triage-specialist": {
      title: "問い合わせ振り分け担当",
      role: "待ち行列を見続けなくても、片付けられます。サポートを定期的に見守り、返信の下書きだけ作り、問題がなければ黙っています。",
    },
    "calendar-coordinator": {
      title: "予定調整",
      role: "関係者を同じ時間に集めます。カレンダーをまたいで予定を組み、誰も追う時間がない仮押さえを追います。",
    },
    "hiring-screener": {
      title: "採用選考",
      role: "山全部ではなく、強い人だけを面接できます。決めた基準で応募や作品を採点し、ATS に入れられる確認結果を渡します。",
    },
    "onboarding-manager": {
      title: "入社支援管理",
      role: "新しい人に、リンクの山ではなく道を渡します。チェックリストを作り、適切な文書を取り、初日の問いに答え、詰まりを外せる人へ各依頼を回します。",
    },
    "talent-scout": {
      title: "人材発掘",
      role: "あなたが寝ているあいだも、採用は進みます。選考から内定まで回します。候補を探し、あなたの声で案内を下書きし、すでに ATS にいる人は飛ばし、承認後に日程を用意します。",
      guide: {
        owns: "候補探し、候補調査、案内の下書き、日程の準備。",
        connect: "ATS、承認済みの候補探しツール、メール、カレンダー。",
        startWith:
          "この職務説明に対して、必須条件を満たす候補者を20人探してください。すでに ATS にいる人は除き、合う根拠を一人ずつ説明し、私の文体で個別の案内文を下書きしてください。誰にも連絡しないでください。",
      },
    },
    "contract-desk": {
      title: "契約管理",
      role: "今週の契約を一目で見られます。段階と担当者ごとに要約し、重要条項を取り、止まっている確認に印を付けます。",
    },
    "expense-manager": {
      title: "経費管理",
      role: "お金の流れを見失いません。経費システムとシートから週次要約を作り、メールの新しい領収書を記し、確認前に足りない分類を担当者へ促します。",
      guide: {
        owns: "週次の経費突合と、足りない情報の催促。",
        connect: "経費システム、メール、共有ドライブ、財務スプレッドシート。",
        startWith:
          "経費システムと添付された規定から、今週の経費要約を作ってください。財務の受信箱にある領収書と照合し、分類漏れや規定外の項目を示し、担当者ごとの確認文を下書きしてください。要約と下書きだけを返し、送信や払い戻しの変更はしないでください。",
      },
    },
    "invoice-coordinator": {
      title: "請求書調整",
      role: "請求書が溜まらないようにします。転送し、合うものは突き合わせ、キャンパスやベンダーの実数を追い、人が必要なときだけ担当者を促します。",
    },
    "security-questionnaire-filler": {
      title: "セキュリティ質問票作成",
      role: "ベンダーのセキュリティポータルを速く進めます。質問サイトに入り、トラストセンターと過去の RFP から答えを取り、各欄を下書きし、送信はあなた待ちに置きます。",
    },
    "vendor-portal-operator": {
      title: "取引先ポータル管理",
      role: "きれいな API がないポータルで、更新、席数、調達を回します。毎週同じ道を辿り、例外だけ持ち帰ります。",
    },
    "beta-adoption-watcher": {
      title: "ベータ版利用状況の確認",
      role: "新しい機能を本当に試している人が見えます。利用を見守り、どの顧客が入ったかを出し、チームが後から追えるようにします。",
    },
    "call-faq-miner": {
      title: "通話 FAQ 抽出",
      role: "実際の通話から、支援資料を新しく保ちます。質問を追い、答えに時刻を付け、元の録画へ戻します。",
    },
    "docs-auditor": {
      title: "文書監査",
      role: "製品とずれた文書を見つけます。ヘルプセンターと内部メモを、先週公開した内容と比べ、古いページに印を付け、書き換えを下書きします。",
    },
    "feature-request-tracker": {
      title: "機能要望管理",
      role: "「誰がこれを頼んだか」を失いません。Slack と通話から要望を掘り、顧客に紐づく生きた一覧にし、仕様に本物の需要の軌跡が残るようにします。",
    },
    "product-feedback-analyst": {
      title: "製品フィードバック分析",
      role: "散らばった製品信号を、優先付きの見取り図にします。つながった出典からフィードバックを集め束ね、根拠と緊急度を量り、振り分け案を承認用に下書きします。",
    },
    "bug-reproduction": {
      title: "不具合再現",
      role: "エンジニアが信じられる報告を渡せます。スレッドを受け、ステージングで同じ道を辿り、失敗を捉え、再現パック（手順、画面、ネットワークメモ）を置きます。",
      guide: {
        owns: "報告を、信頼できる再現パックにすること。",
        connect: "課題トラッカー、ステージング環境、ブラウザ、ネットワークツール。",
        startWith:
          "この不具合報告を読み、新しいテスト用アカウントでステージング環境に再現してください。正確な手順、期待した動き、実際の動き、画面、ブラウザと OS の情報、関係するコンソールまたはネットワークの記録、可能なら最小のテスト例を返してください。正式環境の顧客データは使わないでください。",
      },
    },
    "cloud-agent-orchestrator": {
      title: "クラウドエージェント統括",
      role: "多くのクラウドエージェントの実行を、一つずつ見守らなくても進めます。実行を始め、見守り、止まったものを促し、報告を要約します。",
    },
    "playtest-operator": {
      title: "操作テスト担当",
      role: "API だけでは足りないとき、製品の道を力技で試します。パソコン上で UI を操作し、失敗を捉え、引き締めた発見パックを返します。",
    },
    "product-performance": {
      title: "製品性能調査",
      role: "本当に大切な指標がはっきり見えます。可観測ツールに入り、フレームグラフを辿り、ホットスポットと画面付きの短い説明を持ち帰ります。",
      guide: {
        owns: "根拠付きの、狙いを定めた性能調査。",
        connect: "可観測性、分析、インシデントツール、ソース管理のリンク。",
        startWith:
          "昨日の公開後に増えた購入手続きの遅さを調べてください。ダッシュボード、トレース、フレームグラフを確認し、最も確かな原因箇所を見つけ、画面と直接リンクを添えた短い報告を返してください。事実と推測を分けてください。通知設定や正式環境の設定は変更しないでください。",
      },
    },
    "prototype-builder": {
      title: "試作品作成",
      role: "依頼から、すぐクリックできるものまで速く進めます。Bot のコンピュータで書き、画面と公開 URL を持ち帰ります。",
    },
    "apartment-scout": {
      title: "住まい探し",
      role: "条件に合う部屋が市場に出たら、内見を予約します。物件を絞り、内見のメールを送り、あなたが選んだものに申し込みます。",
    },
    "personal-site-builder": {
      title: "個人サイト作成",
      role: "説明から個人サイトの骨組みを作り、ドメインの問題をほどき、公開済みの出発点を残します。",
    },
    "subscription-cleaner": {
      title: "定期購読整理",
      role: "忘れていたノイズを減らします。領収書とメルマガをまとめ、止める候補を出し、あなたが承認したものの配信停止を実行します。",
    },
    "travel-coordinator": {
      title: "旅行手配",
      role: "良い選択肢が切れる前に押さえます。あなたのルールで便とホテルを比べ、予約前に確認し、旅程とカレンダーを渡します。",
    },
  },
};

const guideSlugs = officialUseCases.filter((item) => item.guide).map((item) => item.slug);

for (const locale of ["zh-Hant", "zh-Hans", "ja"] as const) {
  const table = officialCopy[locale];
  for (const item of officialUseCases) {
    const row = table[item.slug];
    if (!row) {
      throw new Error(`Missing ${locale} official i18n for ${item.slug}`);
    }
    if (item.guide && !row.guide) {
      throw new Error(`Missing ${locale} guide for ${item.slug}`);
    }
    if (!item.guide && row.guide) {
      throw new Error(`Unexpected ${locale} guide for ${item.slug}`);
    }
    if (locale === "ja" && row.title === item.title) {
      throw new Error(`ja official role title must be localized: ${item.slug}`);
    }
    if (locale === "ja" && item.guide && !row.guide?.startWith) {
      throw new Error(`ja official first task must be localized: ${item.slug}`);
    }
  }
  if (Object.keys(table).length !== officialUseCases.length) {
    throw new Error(
      `${locale} official i18n has ${Object.keys(table).length} slugs, expected ${officialUseCases.length}`,
    );
  }
}

if (guideSlugs.length !== 8) {
  throw new Error(`Expected 8 official guides in i18n, got ${guideSlugs.length}`);
}

export function localizeOfficial(item: OfficialUseCase, locale: Locale): OfficialUseCase {
  if (locale === "en") return item;
  const localized = officialCopy[locale][item.slug];
  if (!localized) return item;
  const guide = item.guide && localized.guide
    ? {
        owns: localized.guide.owns,
        connect: localized.guide.connect,
        startWith: localized.guide.startWith ?? item.guide.startWith,
      }
    : item.guide;
  return {
    slug: item.slug,
    title: localized.title,
    category: item.category,
    role: localized.role,
    ...(guide ? { guide } : {}),
  };
}
