module.exports = {
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    // If you are using less-loader@5 please spread the lessOptions to options directly
                    modifyVars: {
                        'primary-color': '#5800C0',
                        'link-color': '#5800C0',
                        'border-radius-base': '5px',
                    },
                    javascriptEnabled: true,
                },
            },
        },
    },
};