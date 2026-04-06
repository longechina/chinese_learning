logs/
├── app/                   # 应用运行日志
│   ├── app.log            # 默认运行日志
│   ├── app_YYYYMMDD.log   # 按日期轮转的日志
├── error/                 # 错误日志和异常
│   ├── error.log
│   ├── error_YYYYMMDD.log
├── user_activity/         # 用户操作和行为记录
│   ├── user_activity.log
│   ├── user_activity_YYYYMMDD.log
├── system/                # 系统监控和资源使用日志
│   ├── system.log
│   ├── system_YYYYMMDD.log
├── ai/                    # AI 相关服务日志（如生成笔记、Quiz、Workflow）
│   ├── ai_generation.log
│   ├── ai_generation_YYYYMMDD.log
└── logs_index.json        # 汇总索引，方便快速查询和分析日志
