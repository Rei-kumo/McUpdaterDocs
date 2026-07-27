export default {
    title: 'McUpdaterDocs',
    description: '支持全量/增量/目录分包的客户端-服务器更新解决方案',
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { text: '指南', link: '/guide/getting-started' },
            { text: '配置参考', link: '/config-reference' },
            { text: 'FAQ', link: '/faq' }
        ],
        sidebar: {
            '/guide/': [
                {
                    text: '开始使用',
                    items: [
                        { text: '快速开始', link: '/guide/getting-started' },
                        { text: '后续维护', link: '/guide/maintenance' }
                    ]
                }
            ],
            '/': [
                { text: '配置参考', link: '/config-reference' },
                { text: '常见问题', link: '/faq' }
            ]
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/your-repo' }
        ],
        footer: {
            message: 'Released under MIT License',
            copyright: 'Copyright © 2024'
        }
    }
}