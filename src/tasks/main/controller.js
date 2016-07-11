import caption from '../../utils/caption';

import articlePageContent from '../../templates/build/pages/article';
import poll from '../../templates/build/poll';

import widget_aioInit from '../../templates/build/widgets/widget_aioInit';

const composePageContentHtml = (articleData, votingData) => {
    let socialLinks = [
        {
            caption: 'ВКонтакте',
            link: 'http://goo.gl/YFa5PI'
        },
        {
            caption: 'Facebook',
            link: 'http://goo.gl/1AbwRq'
        },
        {
            caption: 'Одноклассники',
            link: 'http://goo.gl/GQhtzd'
        },
        {
            caption: 'Telegram',
            link: 'http://goo.gl/0yn1gz'
        },
        {
            caption: 'Instagram',
            link: 'http://goo.gl/mKqUDh'
        }
    ];

    socialLinks.sort(() => {
        return 0.5 - Math.random()
    });

    return articlePageContent({
        id: articleData.id,
        caption: caption(articleData, {mode: 'text'}),
        author: articleData.author,
        photoCredits: articleData.photoCredits,
        time: articleData.time,
        company: articleData.company,
        dropcap: articleData.dropcap,
        headerImage: articleData.headerImage,
        headerImageDescription: articleData.headerImageDescription,
        wideImage: articleData.wideImage,
        video: articleData.video,
        lead: articleData.lead,
        showAio: articleData.type === 'drive-test',
        gallery: articleData.gallery,
        category: articleData.category,
        articleContent: articleData.articleContent,
        hreviewData: articleData.hreviewData,
        commentsCount: articleData.commentsCount,
        socialLinksMobile: socialLinks.slice(0, 2),
        poll: articleData.poll ? poll({
            id: articleData.id, 
            voted: parseInt(votingData.value),
            question: articleData.poll.question,
            options: articleData.poll.options,
        }) : null,
        regularArticle: articleData.regularArticle,
    });
}

function controller(articleData, votingData, requestUrl, getCarcassFn) {
    let pageContentHtml = composePageContentHtml(
        articleData,
        votingData
    );

    let seo = {};

    if (articleData.type === 'drive-test') {
        seo = {
            ogTitle: caption(articleData, {mode: 'text'}) + ' — ДРАЙВ',
            ogUrl: `https://www.drive.ru${requestUrl}`,
            ogImage: articleData.headerImageSrc
        }
    }

    return {
        html: getCarcassFn(pageContentHtml, {
            additionalBottomScripts: widget_aioInit(),
            seo
        })
    }
}

export default controller;