# 配置文件参考

## 服务端配置 (`config/server.json`)

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `output_dir` | string | `"./updates"` | 生成的更新包、快照等文件的输出目录 |
| `server_host` | string | `"127.0.0.1"` | HTTP 服务监听地址，`0.0.0.0` 表示监听所有网卡 |
| `server_port` | int | `8080` | HTTP 服务端口 |
| `base_url` | string | `"http://127.0.0.1:8080"` | 客户端访问的根 URL，需与 `server_host` + `server_port` 对应 |
| `hash_algorithm` | string | `"sha256"` | 文件哈希算法，支持 `md5`, `sha1`, `sha256` |
| `enable_web_server` | bool | `true` | 是否启动 Web 服务器（一般保持 true） |
| `enable_incremental` | bool | `true` | 是否生成增量包（关闭则每次只生成全量包） |
| `max_package_versions` | int | `10` | 保留的增量包最大数量（暂未完全实现） |
| `log_file` | string | `"./logs/server.log"` | 服务端日志文件路径 |
| `language` | string | `"zh_CN"` | 界面语言，支持 `zh_CN` 和 `en_US` |

## 客户端配置 (`config/updater.json`)

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `version` | string | `"1.0.0"` | 当前客户端版本号（自动维护，一般不需手动修改） |
| `launcher_version` | string | `"0.0.1"` | 启动器自身版本号（用于自更新） |
| `update_url` | string | `""` | 服务端更新 API 地址，例如 `http://192.168.1.100:8080/api/update` |
| `game_directory` | string | `"./.minecraft"` | 游戏目录（相对于客户端 exe 的路径） |
| `auto_update` | bool | `true` | 是否自动更新（不询问用户） |
| `log_file` | string | `"./logs/updater.log"` | 客户端日志文件路径 |
| `update_mode` | string | `"hash"` | 更新模式，`"version"` 或 `"hash"`（推荐 hash） |
| `hash_algorithm` | string | `"sha256"` | 哈希算法，需与服务端一致 |
| `enable_file_deletion` | bool | `true` | 是否允许删除客户端本地文件（按服务端清单） |
| `skip_major_version_check` | bool | `false` | 跳过主版本号检查（哈希模式下跨大版本是否强制全量） |
| `enable_api_cache` | bool | `true` | 是否缓存服务端返回的更新信息（减少请求） |
| `api_timeout` | int | `60` | HTTP 请求超时时间（秒） |

## 工作空间与输出目录说明

- **`public/`**（服务端根目录下的固定文件夹）：存放待分发的文件（游戏资源、可执行文件等）。**不要**手动修改 `public/` 下的文件结构，所有变更应通过版本命令重新扫描。
- **`updates/`**（由 `output_dir` 指定）：存放生成的所有更新数据。
  - `updates/full/` – 全量包（`<version>.zip`）
  - `updates/incremental/` – 增量包（`<from>_to_<to>.zip`）
  - `updates/packages/` – 目录分包（`<dirname>.zip` 和 `root.zip`）
  - `updates/snapshots/` – 版本快照（`<version>.json`）
  - `updates/data/` – 版本元数据（`versions.json`）

## 配置文件生成与重新加载

- 服务端：首次运行 `McUpdaterServer.exe init` 生成默认配置。修改后需**重启服务端**生效。
- 客户端：首次运行客户端自动生成默认配置。修改后**下次启动**生效，无需重启。

## 示例配置文件

### 服务端 `config/server.json`
```json
{
  "output_dir": "./updates",
  "server_host": "0.0.0.0",
  "server_port": 8080,
  "base_url": "http://192.168.1.100:8080",
  "hash_algorithm": "sha256",
  "enable_web_server": true,
  "enable_incremental": true,
  "max_package_versions": 10,
  "log_file": "./logs/server.log",
  "language": "zh_CN"
}
```
### 客户端 `config/updater.json`
```json
{
  "version": "1.0.0",
  "launcher_version": "0.0.1",
  "update_url": "http://192.168.1.100:8080/api/update",
  "game_directory": "./",
  "auto_update": true,
  "log_file": "./logs/updater.log",
  "update_mode": "hash",
  "hash_algorithm": "sha256",
  "enable_file_deletion": true,
  "skip_major_version_check": false,
  "enable_api_cache": true,
  "api_timeout": 60
}
```