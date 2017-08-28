/**
 * Created by qiaoqiao on 2017/4/20.
 */


export default {
    articleList:
        'http://3g.163.com/touch/jsonp/sy/recommend/0-10.html?hasad=1&loc=&refresh=A&miss=35&offset=0&size=10&callback=syrec2',
    artiContent(docId) {
        return 'http://3g.163.com/touch/article/'+docId+'/full.html?callback=artiContent'
    },
    articeListUrlWithStartNum(startNum){
        let endNum = startNum + 10;

        let url = 'http://3g.163.com/touch/jsonp/sy/recommend/'
            + startNum
            + '-'
            + endNum
            + '.html?hasad=1&loc=&refresh=A&miss=35&offset=0&size=10&callback=syrec2'

        return url
    },
}
