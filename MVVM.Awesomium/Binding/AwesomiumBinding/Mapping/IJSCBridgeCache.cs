﻿using Awesomium.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MVVMAwesomium.AwesomiumBinding
{
    public interface IJSCBridgeCache
    {
        void Cache(object key, IJSCSGlue value);

        void CacheLocal(object key, IJSCSGlue value);

        void RegisterInSession(object key, Action<IJSCSGlue> Continue);

        IJSCSGlue GetCached(object key);

        IJSCSGlue GetCached(JSObject key);

        IJSCSGlue GetCachedOrCreateBasic(JSValue key, Type iTargetType);

    }
}
