# 快速开始

本文档将引导你完成服务端和客户端的安装、配置与使用。

## 一、下载文件

从 [Releases](https://github.com/your-repo/releases) 页面下载最新版本的程序包：

- `McUpdaterServer.exe` – 服务端（管理端）
- `McUpdaterClient.exe` – 客户端（更新器）

将两个程序分别放置到不同的目录，例如：
C:/UpdateServer/ # 服务端目录
C:/GameClient/ # 客户端目录（待更新的游戏目录）
## 二、配置服务端

首次运行服务端前，需要生成配置文件。

1. 在服务端目录下，打开命令行（或直接双击运行）。
2. 执行以下命令初始化配置：
```bash
McUpdaterServer.exe init
```
程序会自动创建 config/server.json 以及必要的目录结构（public, updates等）。  
3. （可选）编辑 config/server.json，根据你的需求修改以下字段：
```json
{
  "base_url" : "http://127.0.0.1:8080",   // Web服务的访问根地址（客户端用来拼接下载链接）
  "enable_incremental" : true,            // [预留]是否生成增量包（暂未实现，保持true即可）
  "enable_web_server" : true,             // 是否启动内置Web服务器（false则仅命令行管理）
  "hash_algorithm" : "sha256",            // 文件哈希算法，支持 md5 / sha1 / sha256
  "language" : "zh_CN",                   // 界面语言，zh_CN 或 en_US
  "log_file" : "./logs/server.log",       // 服务端日志文件路径
  "max_package_versions" : 10,            // [预留]保留的增量包最大数量（暂未使用）
  "output_dir" : "./updates",             // 更新包、快照等输出目录
  "server_host" : "127.0.0.1",            // HTTP服务监听的IP地址（0.0.0.0表示所有网卡）
  "server_port" : 8080                    // HTTP服务端口
}
```
## 三、放入要更新的文件

将你需要分发的所有文件（例如游戏客户端、软件资源等）复制到服务端目录下的 public/ 文件夹中。

目录结构示例：

```text
public/
├── assets/
│   ├── textures/
│   └── sounds/
├── libraries/
│   └── some.jar
├── config.properties
└── start.exe
```
::: tip
public下的目录结构和文件命名将直接映射在客户端更新中。空目录会被保留（通过标记文件实现）。
:::
## 四、打包（生成第一个版本）

首次生成版本需要扫描 public/ 并创建全量包。在服务端目录下打开命令行。

执行：

```bash
McUpdaterServer version 1.0.0
```
其中 1.0.0 为版本号，必须符合 x.x.x 格式（如 1.0.0, 2.3.1）。
程序会：

```text
扫描 public/ 下所有文件，计算哈希。
保存版本快照到 updates/snapshots/1.0.0.json。
生成全量包 updates/full/1.0.0.zip。
生成目录分包（如 assets.zip, libraries.zip）到 updates/packages/。
将版本信息记录到 updates/data/versions.json。
```

成功后你会看到类似输出：

```text
[INFO] 版本 1.0.0 创建完成!
```
## 五、后续打包（发布新版本）
当你对 `public/` 中的文件做了修改（新增、修改、删除文件）后，再次执行版本创建命令，使用更高的版本号。

例如：

```bash
McUpdaterServer version 1.1.0
```
服务端会自动：
```text
比较当前文件与上一版本（1.0.0）的差异。
生成增量包 updates/incremental/1.0.0_to_1.1.0.zip。
生成新的全量包 updates/full/1.1.0.zip。
更新目录分包（如有目录内容变化）。
```
### 删除不存在的文件
如果某个文件在新版本中被删除，客户端在更新时会自动删除该文件（前提是你在客户端配置中开启了 enable_file_deletion）。

服务端会自动检测删除的文件，并在增量包的 update_manifest.txt 中标记 D（删除）操作。客户端下载增量包后会执行删除。

## 六、启动服务端
在服务端目录下执行：

```bash
McUpdaterServer serve
```
或直接双击运行，然后在交互菜单中选择 `1. 启动Web服务器`。

看到以下输出表示启动成功：

```text
[INFO] Web服务器启动于 http://0.0.0.0:8080
```
现在服务端已就绪，客户端可以通过 http://你的IP:8080 访问更新 API。

## 七、配置客户端
客户端需要知道服务端地址和游戏目录。

1.	将 `McUpdaterClient.exe` 放到待更新的游戏根目录（游戏启动器所在目录）。

2.	首次运行客户端会自动生成配置文件 `config/updater.json`（位于游戏目录下）。

3.	编辑 `config/updater.json`，设置以下关键字段：

```json
{
  "api_timeout" : 60,                   // HTTP 请求超时时间（秒），下载文件或请求 API 的最大等待时间
  "auto_update" : true,                 // 是否自动更新（true: 无需用户确认，直接更新；false: 询问用户）
  "enable_api_cache" : true,            // 是否缓存服务端返回的更新信息（减少重复请求，提高检查速度）
  "enable_file_deletion" : true,        // 是否允许删除客户端本地文件（若服务端清单中删除了某个文件，客户端是否同步删除）
  "game_directory" : "./.minecraft",    // 游戏目录（相对于客户端可执行文件的路径），所有更新文件将写入此目录
  "hash_algorithm" : "md5",             // 哈希算法，支持 md5 / sha1 / sha256，需与服务端配置一致，用于校验文件完整性
  "log_file" : "./logs/updater.log",    // 客户端日志文件路径（相对或绝对路径）
  "skip_major_version_check" : false,   // 是否跳过主版本号检查（仅哈希模式下有效，若为 true，即使跨大版本也使用哈希同步；若为 false，跨大版本时会强制全量更新）
  "update_mode" : "version",            // 更新模式："version"（版本号模式）或 "hash"（哈希模式，推荐）
  "update_url" : "https://your-server.com/updates/version.json", // 服务端更新 API 地址（必须正确配置）
  "version" : "1.0.0"                   // 当前客户端版本号（自动维护，通常无需手动修改）
}
```
4.	保存配置文件。

## 八、一键启动
完成配置后，直接运行 McUpdaterClient.exe。

- 如果开启了 auto_update，程序会自动检查更新并下载，完成后启动游戏。

- 如果未开启，会询问用户是否更新。

客户端的工作流程：
```text
读取本地版本号（默认为 1.0.0）。
向服务端请求更新信息（携带本地版本）。
服务端返回需要下载的文件/包列表。
客户端依次下载全量包、增量包、目录包，并解压到游戏目录。
更新本地版本号，完成。
（可选）自更新：如果服务端发布了新版本的 McUpdaterClient.exe，客户端会自动替换自身并重启。
```
### 文件更新位置
- 客户端下载的所有文件（游戏资源、可执行文件等）都会写入 game_directory 指定的目录（通常就是客户端所在目录）。
- 日志文件默认写入 ./logs/updater.log，可在配置中修改 log_file 路径。

## 两种更新模式的介绍
客户端支持两种更新模式，通过 update_mode 配置项选择：

### 版本号模式（`"update_mode": "version"`）
- 服务端返回最新版本号（如 1.1.0）。

- 客户端比较本地版本号，若远程版本 > 本地版本，则触发更新。

- 更新时下载服务端指定的全量包或增量包。
::: tip 优缺点
- 优点：简单直观，适合版本跨度不大的场景。
- 缺点：无法检测文件损坏或人为篡改；跨越多个版本时可能需多次更新。
:::

### 哈希模式（`"update_mode": "hash"`，推荐）
- 服务端返回完整的文件清单（每个文件的路径、哈希、大小）。

- 客户端扫描本地文件，计算哈希，与清单比对。

- 仅下载缺失或哈希不匹配的文件（通过 /files/ 接口单独下载）。

- 同时支持目录包下载（用于快速同步整个目录）。
::: tip 优缺点
- 优点：精确修复损坏文件；支持任意版本直接同步到最新；无需维护版本号顺序。
- 缺点：首次同步或文件较多时，服务端返回的清单较大（可开启缓存缓解）。
:::
建议：对于大多数游戏/软件，使用哈希模式可获得最佳体验。