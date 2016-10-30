;(function (seajs, global, doc) {
    // util
    var STORAGE_KEY = 'vsl_manifest';
    var STORAGE_PR = 'vsl_';
    var REG_PR = new RegExp('^' + STORAGE_PR);
    var noCacheStr = 'nc=' + new Date().getTime();
    var notUpdateList = {};
    var updateList = {};
    var DB = localStorage;

    // storage
    // keep js file local storage
    var cacheList = {},
        readyList = {},
        waitCacheList = [],
        timer;


    var isEmptyObject = function (obj) {
        for (var name in obj) {
            return false;
        }
        return true;
    };
    var removeAllStorage = function () {
        for (var name in DB) {
            if (REG_PR.test(name)) {
                DB.removeItem(name);
            }
        }
    };
    var removeStorageWithoutList = function (list) {
        if (isEmptyObject(list)) {
            removeAllStorage();
            return;
        }
        for (var name in DB) {
            if (REG_PR.test(name)) {
                if (!list[name]) {
                    DB.removeItem(name);
                }
            }
        }
    };
    var removeStorageWithList = function (list) {
        if (isEmptyObject(list)) {
            return;
        }
        for (var name in list) {
            DB.removeItem(name);
        }
    };


    var _init = function(){
        // update
        // remove update file's storage
        // if debug, then remove the DB data and return
        if (seajs.data && seajs.data.debug) {
            removeAllStorage();
            return;
        }
        // if have not config.manifest object, or have not DB, then return
        var manifest = seajs.data.manifest;
        if (!manifest || !DB) {
            return;
        }
        noCacheStr = manifest.appVersion ? 'v=' + manifest.appVersion : noCacheStr;
        var storageMF = DB[STORAGE_KEY];
        if (!storageMF) {
            removeAllStorage();
        } else {
            storageMF = JSON.parse(storageMF);
            if (storageMF.version !== manifest.version) {
                removeAllStorage();
            } else {
                if (manifest.common && storageMF.common) {
                    for (var name in storageMF.common) {
                        if (storageMF.common[name] === manifest.common[name]) {
                            notUpdateList[STORAGE_PR + seajs.resolve(name)] = true;
                        } else {
                            updateList[STORAGE_PR + seajs.resolve(name)] = true;
                        }
                    }
                }
                if (storageMF.appVersion !== manifest.appVersion) {
                    removeStorageWithoutList(notUpdateList);
                } else {
                    removeStorageWithList(updateList);
                }
            }
        }
        DB[STORAGE_KEY] = JSON.stringify(manifest);
    }



    var createScript = function (id, text) {
        var node = doc.createElement('script');
        node.type = 'text/javascript';
        node.id = id;
        node.innerHTML = text;
        doc.body.appendChild(node);
    };

    var storageWaitList = function () {
        var len = waitCacheList.length,
            noReadyList = [];
        for (var i = 0; i < len; i++) {
            var tmp = waitCacheList.pop(),
                funString = '',
                seaCacheTmp = seajs.cache[tmp];

            //console.log(seaCacheTmp)

            if (seaCacheTmp && seaCacheTmp.factory) {
                funString = ';define("' + seaCacheTmp.id + '",' +JSON.stringify(seaCacheTmp.dependencies) + ',' + seaCacheTmp.factory.toString() + ')';
                DB[STORAGE_PR + seaCacheTmp.uri] = funString;
            } else {
                noReadyList.push(tmp);
            }
        }
        var tmpLen = noReadyList.length;
        for (var i = 0; i < tmpLen; i++) {
            waitCacheList.push(noReadyList[i]);
        }
    };


    seajs.on('load', function (a) {
        _init();
       // storageWaitList()
    });

/*    seajs.on('exec', function (a) {
    });*/


    seajs.on('resolve', function (a) {

        var uri = seajs.resolve(a.id, a.refUri);
        if (uri) {
            if (DB[STORAGE_PR + uri]) {
                if (!readyList[uri]) {
                    readyList[uri] = true;
                    createScript(uri, DB[STORAGE_PR + uri]);
                }
            } else {
                if (!cacheList[uri]) {
                    cacheList[uri] = true;
                    waitCacheList.push(uri);
                }
            }
        }
    });

    seajs.on('fetch', function (a) {

        if (!a.requestUri) {
            a.requestUri = a.uri + '?' + noCacheStr;
            return;
        }
        if (a.requestUri.indexOf('?') !== -1) {
            a.requestUri = a.requestUri + '&' + noCacheStr;
        } else {
            a.requestUri = a.requestUri + '?' + noCacheStr;
        }
    });

    seajs.on('define', function (a) {
        if(seajs.data&&!seajs.data.debug){
            clearTimeout(timer);
            timer = setTimeout(storageWaitList, 300);
        }
        //clearTimeout(timer);
        //timer = setTimeout(storageWaitList, 1);
    });



    /* window.__seajs_plugin_storage = {
     cacheList: cacheList,
     readyList: readyList,
     waitCacheList: waitCacheList
     };*/
})(seajs, window, document);

