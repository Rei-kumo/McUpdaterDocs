export const VpSimpleConfig = {
    title: 'McUpdaterDocs',
    description: '支持全量/增量/目录分包的客户端-服务器更新解决方案',
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { text: '指南', link: '/guide/getting-started' },
            { text: '配置参考', link: '/set/config-reference' },
            { text: 'FAQ', link: '/set/faq' }
        ],
        sidebar: {
            '/guide/': [
                {
                    text: '快速开始',
                    items: [
                        { text: '服务端部署', link: '/guide/getting-startedserver' },
                        { text: '客户端部署', link: '/guide/getting-startedclient' }
                    ]
                }
            ],
            '/set/': [
                {
                    text: '基本配置',
                    items: [
                        { text: '配置参考', link: '/set/config-reference' },
                        { text: '常见问题', link: '/set/faq' }
                    ]
                }
            ],
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/Rei-kumo/' }
        ],
        footer: {
            message: 'Released under MIT License',
            copyright: 'Copyright © Reikumo 2025-2026'
        }
    }
};
