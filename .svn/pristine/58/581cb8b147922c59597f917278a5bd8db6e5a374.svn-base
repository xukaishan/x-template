import QzService from '@/api';
const options = { headers: { 'Content-Type': 'application/json' } };

const apis = new QzService({
    /** get */
    getTreeList: {
        url: '/ks-prj/menu/getTreeList',
        method: 'get',
    },
    /** get */
    getTest: {
        url: '/api/ip/self?app_id=ixssxqertpltndez&app_secret=QUF5S2JLZkNqSHdyeVVLczdCNSt1QT09',
        method: 'get',
    },
    /** post */
    save: {
        url: '/ks-prj/info/save',
        method: 'post',
        options,
    },
    /** upload */
    takeSummary: {
        url: '/ks-prj/excelTempl/takeSummary',
        method: 'upload',
    },
});

export default apis;